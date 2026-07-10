import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ModelStats {
  roles: number;
  processes: number;
  provisions: number;
  dataClasses: number;
  registries: number;
  events: number;
  gateways: number;
  references: number;
  approvals: number;
  enums: number;
  measurements: number;
  subprocesses: number;
  forms: number;
  subforms: number;
  symbols: number;
  calculations: number;
  stateMachines: number;
  terms: number;
  notes: number;
  tables: number;
  figures: number;
  links: number;
  mapProfiles: number;
  viewProfiles: number;
  root: string;
  namespace: string;
}

export interface FlowNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
}

export interface FlowEdge {
  from: string;
  to: string;
  label: string;
}

export interface SubprocessFlow {
  id: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export type NodeType = 'start' | 'end' | 'timer' | 'process' | 'gateway' | 'unknown';

export interface ModelTreeNode {
  id: string;
  label: string;
  detail?: string;
}

export interface ModelTreeGroup {
  label: string;
  items: ModelTreeNode[];
}

export interface ModelTree {
  title: string;
  namespace: string;
  version: string;
  groups: ModelTreeGroup[];
}

interface PrimmeElementBase {
  id: string;
  name?: string;
  label?: string;
}

interface PrimmeEvent extends PrimmeElementBase {
  eventType: 'start' | 'end' | 'timer';
  type?: string;
}

interface PrimmeProcess extends PrimmeElementBase {
  modality: string;
  actor?: { id: string } | null;
}

interface PrimmeGateway extends PrimmeElementBase {
  label?: string;
  gatewayType?: string;
}

type PrimmeElement = PrimmeEvent | PrimmeProcess | PrimmeGateway | PrimmeElementBase;

interface SubprocessComponent {
  name: string;
  element: PrimmeElement | null;
  x: number;
  y: number;
}

interface SubprocessEdge {
  id: string;
  from: SubprocessComponent | null;
  to: SubprocessComponent | null;
  description: string;
}

interface SubprocessPage {
  id: string;
  childs: SubprocessComponent[];
  edges: SubprocessEdge[];
}

interface PrimmeModel {
  meta?: { title?: string; namespace?: string; edition?: string };
  root?: string;
  roles?: PrimmeElementBase[];
  processes?: PrimmeProcess[];
  provisions?: PrimmeElementBase[];
  dataclasses?: PrimmeElementBase[];
  regs?: PrimmeElementBase[];
  events?: PrimmeEvent[];
  gateways?: PrimmeGateway[];
  refs?: PrimmeElementBase[];
  approvals?: PrimmeElementBase[];
  enums?: PrimmeElementBase[];
  vars?: PrimmeElementBase[];
  pages?: SubprocessPage[];
  forms?: PrimmeElementBase[];
  subforms?: PrimmeElementBase[];
  symbols?: PrimmeElementBase[];
  calculations?: PrimmeElementBase[];
  stateMachines?: PrimmeElementBase[];
  terms?: PrimmeElementBase[];
  notes?: PrimmeElementBase[];
  tables?: PrimmeElementBase[];
  figures?: PrimmeElementBase[];
  links?: PrimmeElementBase[];
  mapProfiles?: PrimmeElementBase[];
  viewProfiles?: PrimmeElementBase[];
}

interface RawComponent {
  name: string;
  element: PrimmeElement | null;
  x: number;
  y: number;
  _relations?: { element: string };
}

interface RawEdge {
  id: string;
  from: unknown;
  to: unknown;
  description: string;
  _relations?: { from: string; to: string };
}

interface RawSubprocessPage {
  id: string;
  childs: unknown[];
  _relations?: {
    childs: RawComponent[];
    edges: RawEdge[];
  };
}

interface RawParseContext {
  root?: string;
  metadata?: { title?: string; namespace?: string; edition?: string };
  roles?: Record<string, PrimmeElementBase>;
  processes?: Record<string, PrimmeProcess>;
  events?: Record<string, PrimmeEvent>;
  gateways?: Record<string, PrimmeGateway>;
  dataClasses?: Record<string, PrimmeElementBase>;
  registers?: Record<string, PrimmeElementBase>;
  enums?: Record<string, PrimmeElementBase>;
  provisions?: Record<string, PrimmeElementBase>;
  approvals?: Record<string, PrimmeElementBase>;
  variables?: Record<string, PrimmeElementBase>;
  pages?: Record<string, RawSubprocessPage>;
}

interface LoadModule {
  load: (content: string) => PrimmeModel;
}

interface ParseModule {
  default: (content: string, config: unknown, options: unknown) => RawParseContext;
}

interface ConfigModule {
  PARSER_CONFIG: unknown;
}

function classifyElement(element: PrimmeElement | null): NodeType {
  if (!element) return 'unknown';
  if ('eventType' in element) {
    if (element.eventType === 'start') return 'start';
    if (element.eventType === 'end') return 'end';
    if (element.eventType === 'timer' || 'type' in element) return 'timer';
  }
  if ('modality' in element) return 'process';
  if ('label' in element || 'gatewayType' in element) return 'gateway';
  return 'unknown';
}

function deriveLabel(element: PrimmeElement | null, name: string): string {
  if (!element) return name;
  if (element.label) return element.label;
  if (element.name) return element.name;
  return name;
}

function extractFlow(page: SubprocessPage): SubprocessFlow {
  const nodes: FlowNode[] = page.childs
    .filter((c): c is SubprocessComponent & { element: PrimmeElement } => c.element !== null)
    .map((c) => ({
      id: c.name,
      label: deriveLabel(c.element, c.name),
      type: classifyElement(c.element),
      x: c.x ?? 0,
      y: c.y ?? 0,
    }));

  const nodeIds = new Set(nodes.map(n => n.id));
  const edges: FlowEdge[] = page.edges
    .filter((e): e is SubprocessEdge & { from: SubprocessComponent; to: SubprocessComponent } =>
      e.from !== null && e.to !== null)
    .filter((e) => nodeIds.has(e.from.name) && nodeIds.has(e.to.name))
    .map((e) => ({
      from: e.from.name,
      to: e.to.name,
      label: e.description ?? '',
    }));

  return { id: page.id ?? '', nodes, edges };
}

function buildGroup<T>(
  label: string,
  items: T[],
  map: (item: T) => ModelTreeNode,
): ModelTreeGroup {
  return { label, items: items.map(map) };
}

async function loadModel(publicPath: string): Promise<PrimmeModel | null> {
  try {
    const dynamicImport = (await import('@primmel/primmel')) as unknown as Partial<LoadModule>;
    const load = dynamicImport.load;
    if (!load) return null;
    const fullPath = resolve('public', publicPath.replace(/^\//, ''));
    const content = readFileSync(fullPath, 'utf8');
    return load(content);
  } catch {
    return null;
  }
}

export async function parseModelFile(publicPath: string): Promise<ModelStats | null> {
  const model = await loadModel(publicPath);
  if (!model) return null;

  return {
    roles: model.roles?.length ?? 0,
    processes: model.processes?.length ?? 0,
    provisions: model.provisions?.length ?? 0,
    dataClasses: model.dataclasses?.length ?? 0,
    registries: model.regs?.length ?? 0,
    events: model.events?.length ?? 0,
    gateways: model.gateways?.length ?? 0,
    references: model.refs?.length ?? 0,
    approvals: model.approvals?.length ?? 0,
    enums: model.enums?.length ?? 0,
    measurements: model.vars?.length ?? 0,
    subprocesses: model.pages?.length ?? 0,
    forms: model.forms?.length ?? 0,
    subforms: model.subforms?.length ?? 0,
    symbols: model.symbols?.length ?? 0,
    calculations: model.calculations?.length ?? 0,
    stateMachines: model.stateMachines?.length ?? 0,
    terms: model.terms?.length ?? 0,
    notes: model.notes?.length ?? 0,
    tables: model.tables?.length ?? 0,
    figures: model.figures?.length ?? 0,
    links: model.links?.length ?? 0,
    mapProfiles: model.mapProfiles?.length ?? 0,
    viewProfiles: model.viewProfiles?.length ?? 0,
    root: model.root ?? '',
    namespace: model.meta?.namespace ?? '',
  };
}

export async function parseModelFlows(publicPath: string): Promise<SubprocessFlow[]> {
  const model = await loadModel(publicPath);
  if (model?.pages?.length) {
    const flows = model.pages
      .filter((p) => p.childs?.length > 0)
      .map(extractFlow);
    if (flows.length > 0) return flows;
  }
  return parseModelFlowsRaw(publicPath);
}

export async function parseModelTree(publicPath: string): Promise<ModelTree | null> {
  const model = await loadModel(publicPath);
  if (model) return buildModelTree(model);
  return parseModelTreeRaw(publicPath);
}

function buildModelTree(model: PrimmeModel): ModelTree {
  const groups: ModelTreeGroup[] = [];

  if (model.roles?.length) {
    groups.push(buildGroup('Roles', model.roles, (r) => ({
      id: r.id, label: r.name || r.id,
    })));
  }
  if (model.processes?.length) {
    groups.push(buildGroup('Processes', model.processes, (p) => ({
      id: p.id, label: p.name || p.id,
      detail: p.actor ? `actor: ${p.actor.id}` : undefined,
    })));
  }
  if (model.events?.length) {
    groups.push(buildGroup('Events', model.events, (e) => ({
      id: e.id, label: e.id, detail: e.eventType,
    })));
  }
  if (model.gateways?.length) {
    groups.push(buildGroup('Gateways', model.gateways, (g) => ({
      id: g.id, label: g.label || g.id,
    })));
  }
  if (model.dataclasses?.length) {
    groups.push(buildGroup('Data Classes', model.dataclasses, (d) => ({
      id: d.id, label: d.id,
    })));
  }
  if (model.regs?.length) {
    groups.push(buildGroup('Registries', model.regs, (r) => ({
      id: r.id, label: r.id,
    })));
  }
  if (model.enums?.length) {
    groups.push(buildGroup('Enums', model.enums, (e) => ({
      id: e.id, label: e.id,
    })));
  }
  if (model.provisions?.length) {
    groups.push(buildGroup('Provisions', model.provisions, (p) => ({
      id: p.id, label: p.id,
    })));
  }
  if (model.approvals?.length) {
    groups.push(buildGroup('Approvals', model.approvals, (a) => ({
      id: a.id, label: a.id,
    })));
  }
  if (model.vars?.length) {
    groups.push(buildGroup('Measurements', model.vars, (v) => ({
      id: v.id, label: v.id,
    })));
  }
  if (model.forms?.length) {
    groups.push(buildGroup('Forms', model.forms, (f) => ({
      id: f.id, label: f.id,
    })));
  }
  if (model.subforms?.length) {
    groups.push(buildGroup('Subforms', model.subforms, (s) => ({
      id: s.id, label: s.id,
    })));
  }
  if (model.symbols?.length) {
    groups.push(buildGroup('Symbols', model.symbols, (s) => ({
      id: s.id, label: s.id,
    })));
  }
  if (model.calculations?.length) {
    groups.push(buildGroup('Calculations', model.calculations, (c) => ({
      id: c.id, label: c.id,
    })));
  }
  if (model.stateMachines?.length) {
    groups.push(buildGroup('State Machines', model.stateMachines, (s) => ({
      id: s.id, label: s.id,
    })));
  }
  if (model.terms?.length) {
    groups.push(buildGroup('Terms', model.terms, (t) => ({
      id: t.id, label: t.id,
    })));
  }
  if (model.refs?.length) {
    groups.push(buildGroup('References', model.refs, (r) => ({
      id: r.id, label: r.id,
    })));
  }
  if (model.mapProfiles?.length) {
    groups.push(buildGroup('Map Profiles', model.mapProfiles, (m) => ({
      id: m.id, label: m.id,
    })));
  }

  return {
    title: model.meta?.title ?? model.root ?? '',
    namespace: model.meta?.namespace ?? '',
    version: model.meta?.edition ?? '',
    groups,
  };
}

async function loadRawParser(): Promise<{ parse: ParseModule['default']; config: ConfigModule['PARSER_CONFIG'] } | null> {
  try {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const parseMod = require('@primmel/primmel/dist/src/ser-des/parse.js') as ParseModule;
    const configMod = require('@primmel/primmel/dist/src/ser-des/config/index.js') as ConfigModule;
    const parse = parseMod.default;
    const config = configMod.PARSER_CONFIG;
    if (!parse || !config) return null;
    return { parse, config };
  } catch {
    return null;
  }
}

function readModelContent(publicPath: string): string {
  const fullPath = resolve('public', publicPath.replace(/^\//, ''));
  return readFileSync(fullPath, 'utf8');
}

async function parseModelFlowsRaw(publicPath: string): Promise<SubprocessFlow[]> {
  const parser = await loadRawParser();
  if (!parser) return [];

  try {
    const content = readModelContent(publicPath);
    const ctx = parser.parse(content, parser.config, {});

    const lookup: Record<string, PrimmeElement> = {};
    const buckets: Array<[string, Record<string, PrimmeElementBase> | undefined]> = [
      ['events', ctx.events],
      ['processes', ctx.processes],
      ['gateways', ctx.gateways],
    ];
    for (const [, bucket] of buckets) {
      if (!bucket) continue;
      for (const [id, val] of Object.entries(bucket)) {
        lookup[id] = val;
      }
    }

    const pages = ctx.pages ?? {};
    return Object.values(pages)
      .filter((page) => page._relations?.childs?.length)
      .map((page) => extractRawFlow(page, lookup));
  } catch {
    return [];
  }
}

function extractRawFlow(
  page: RawSubprocessPage,
  lookup: Record<string, PrimmeElement>,
): SubprocessFlow {
  const rawChilds = page._relations?.childs ?? [];
  const rawEdges = page._relations?.edges ?? [];

  const nodes: FlowNode[] = rawChilds.map((c) => {
    const element = c._relations?.element ? lookup[c._relations.element] ?? null : null;
    return {
      id: c.name,
      label: deriveLabel(element, c.name),
      type: classifyElement(element),
      x: c.x ?? 0,
      y: c.y ?? 0,
    };
  });

  const nodeIds = new Set(nodes.map(n => n.id));
  const edges: FlowEdge[] = rawEdges
    .filter((e) => e._relations?.from && e._relations?.to)
    .filter((e) => nodeIds.has(e._relations!.from) && nodeIds.has(e._relations!.to))
    .map((e) => ({
      from: e._relations!.from,
      to: e._relations!.to,
      label: e.description ?? '',
    }));

  return { id: page.id ?? '', nodes, edges };
}

async function parseModelTreeRaw(publicPath: string): Promise<ModelTree | null> {
  const parser = await loadRawParser();
  if (!parser) return null;

  try {
    const content = readModelContent(publicPath);
    const ctx = parser.parse(content, parser.config, {});

    const groups: ModelTreeGroup[] = [];

    const bucketToGroup = (
      bucket: Record<string, PrimmeElementBase> | undefined,
      label: string,
      map: (val: PrimmeElementBase, id: string) => ModelTreeNode,
    ) => {
      if (!bucket || Object.keys(bucket).length === 0) return;
      const items = Object.entries(bucket).map(([id, val]) => map(val, id));
      groups.push({ label, items });
    };

    bucketToGroup(ctx.roles, 'Roles', (r, id) => ({ id, label: r.name || id }));
    bucketToGroup(ctx.processes as Record<string, PrimmeElementBase> | undefined, 'Processes', (p, id) => ({
      id, label: p.name || id,
    }));
    bucketToGroup(ctx.events as Record<string, PrimmeElementBase> | undefined, 'Events', (e, id) => ({
      id, label: id, detail: (e as PrimmeEvent).eventType,
    }));
    bucketToGroup(ctx.gateways as Record<string, PrimmeElementBase> | undefined, 'Gateways', (g, id) => ({
      id, label: g.label || id,
    }));
    bucketToGroup(ctx.dataClasses, 'Data Classes', (_d, id) => ({ id, label: id }));
    bucketToGroup(ctx.registers, 'Registries', (_r, id) => ({ id, label: id }));
    bucketToGroup(ctx.enums, 'Enums', (_e, id) => ({ id, label: id }));
    bucketToGroup(ctx.provisions, 'Provisions', (_p, id) => ({ id, label: id }));
    bucketToGroup(ctx.approvals, 'Approvals', (_a, id) => ({ id, label: id }));
    bucketToGroup(ctx.variables, 'Measurements', (_v, id) => ({ id, label: id }));

    return {
      title: ctx.metadata?.title ?? ctx.root ?? '',
      namespace: ctx.metadata?.namespace ?? '',
      version: ctx.metadata?.edition ?? '',
      groups,
    };
  } catch {
    return null;
  }
}
