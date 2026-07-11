import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

// ── Public types (used by components and tests) ──

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

interface FlowEdge {
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

interface ModelTreeNode {
  id: string;
  label: string;
  detail?: string;
}

interface ModelTreeGroup {
  label: string;
  items: ModelTreeNode[];
}

export interface ModelTree {
  title: string;
  namespace: string;
  version: string;
  groups: ModelTreeGroup[];
}

export interface ParsedModel {
  stats: ModelStats;
  flows: SubprocessFlow[];
  tree: ModelTree;
}

// ── Internal: unified model shape (both adapters produce this) ──

interface ElementBase {
  id: string;
  name?: string;
  label?: string;
}

interface EventElement extends ElementBase {
  eventType: 'start' | 'end' | 'timer';
  type?: string;
}

interface ProcessElement extends ElementBase {
  modality: string;
  actor?: { id: string } | null;
}

interface GatewayElement extends ElementBase {
  gatewayType?: string;
}

type ModelElement = ElementBase | EventElement | ProcessElement | GatewayElement;

interface SubprocessComponent {
  name: string;
  element: ModelElement | null;
  x: number;
  y: number;
}

interface SubprocessEdge {
  from: SubprocessComponent | null;
  to: SubprocessComponent | null;
  description: string;
}

interface SubprocessPage {
  id: string;
  childs: SubprocessComponent[];
  edges: SubprocessEdge[];
}

interface UnifiedModel {
  meta: { title?: string; namespace?: string; edition?: string };
  root: string;
  roles: ElementBase[];
  processes: ProcessElement[];
  provisions: ElementBase[];
  dataclasses: ElementBase[];
  regs: ElementBase[];
  events: EventElement[];
  gateways: GatewayElement[];
  refs: ElementBase[];
  approvals: ElementBase[];
  enums: ElementBase[];
  vars: ElementBase[];
  pages: SubprocessPage[];
  forms: ElementBase[];
  subforms: ElementBase[];
  symbols: ElementBase[];
  calculations: ElementBase[];
  stateMachines: ElementBase[];
  terms: ElementBase[];
  notes: ElementBase[];
  tables: ElementBase[];
  figures: ElementBase[];
  links: ElementBase[];
  mapProfiles: ElementBase[];
  viewProfiles: ElementBase[];
}

// ── Seam: ModelSource ──

interface ModelSource {
  getModel(publicPath: string): UnifiedModel | null;
}

function readModelContent(publicPath: string): string {
  const fullPath = resolve('public', publicPath.replace(/^\//, ''));
  return readFileSync(fullPath, 'utf8');
}

const nodeRequire = createRequire(import.meta.url);

// ── Adapter 1: Resolved ──

function createResolvedSource(): ModelSource {
  return {
    getModel(publicPath) {
      try {
        const mod = nodeRequire('@primmel/primmel') as { load?: (c: string) => unknown };
        if (!mod.load) return null;
        const raw = mod.load(readModelContent(publicPath)) as Record<string, unknown>;
        return mapResolvedModel(raw);
      } catch {
        return null;
      }
    },
  };
}

function mapResolvedModel(raw: Record<string, unknown>): UnifiedModel {
  const arr = <T>(key: string): T[] => (raw[key] as T[]) ?? [];
  return {
    meta: (raw.meta as UnifiedModel['meta']) ?? {},
    root: (raw.root as string) ?? '',
    roles: arr<ElementBase>('roles'),
    processes: arr<ProcessElement>('processes'),
    provisions: arr<ElementBase>('provisions'),
    dataclasses: arr<ElementBase>('dataclasses'),
    regs: arr<ElementBase>('regs'),
    events: arr<EventElement>('events'),
    gateways: arr<GatewayElement>('gateways'),
    refs: arr<ElementBase>('refs'),
    approvals: arr<ElementBase>('approvals'),
    enums: arr<ElementBase>('enums'),
    vars: arr<ElementBase>('vars'),
    pages: (raw.pages as SubprocessPage[]) ?? [],
    forms: arr<ElementBase>('forms'),
    subforms: arr<ElementBase>('subforms'),
    symbols: arr<ElementBase>('symbols'),
    calculations: arr<ElementBase>('calculations'),
    stateMachines: arr<ElementBase>('stateMachines'),
    terms: arr<ElementBase>('terms'),
    notes: arr<ElementBase>('notes'),
    tables: arr<ElementBase>('tables'),
    figures: arr<ElementBase>('figures'),
    links: arr<ElementBase>('links'),
    mapProfiles: arr<ElementBase>('mapProfiles'),
    viewProfiles: arr<ElementBase>('viewProfiles'),
  };
}

// ── Adapter 2: Raw (bypasses resolver bug) ──

interface RawParseContext {
  root?: string;
  metadata?: { title?: string; namespace?: string; edition?: string };
  roles?: Record<string, ElementBase>;
  processes?: Record<string, ProcessElement>;
  events?: Record<string, EventElement>;
  gateways?: Record<string, GatewayElement>;
  dataClasses?: Record<string, ElementBase>;
  registers?: Record<string, ElementBase>;
  enums?: Record<string, ElementBase>;
  provisions?: Record<string, ElementBase>;
  approvals?: Record<string, ElementBase>;
  variables?: Record<string, ElementBase>;
  pages?: Record<string, RawSubprocessPage>;
}

interface RawSubprocessPage {
  id: string;
  _relations?: { childs: RawComponent[]; edges: RawEdge[] };
}

interface RawComponent {
  name: string;
  x: number;
  y: number;
  _relations?: { element: string };
}

interface RawEdge {
  description: string;
  _relations?: { from: string; to: string };
}

function createRawSource(): ModelSource {
  return {
    getModel(publicPath) {
      try {
        const parser = loadRawParserModules();
        if (!parser) return null;
        const ctx = parser.parse(readModelContent(publicPath), parser.config, {});
        return normalizeRawContext(ctx);
      } catch {
        return null;
      }
    },
  };
}

function loadRawParserModules(): { parse: (c: string, cfg: unknown, o: unknown) => RawParseContext; config: unknown } | null {
  try {
    const parseMod = nodeRequire('@primmel/primmel/dist/src/ser-des/parse.js') as {
      default: (c: string, cfg: unknown, o: unknown) => RawParseContext;
    };
    const configMod = nodeRequire('@primmel/primmel/dist/src/ser-des/config/index.js') as {
      PARSER_CONFIG: unknown;
    };
    if (!parseMod.default || !configMod.PARSER_CONFIG) return null;
    return { parse: parseMod.default, config: configMod.PARSER_CONFIG };
  } catch {
    return null;
  }
}

function normalizeRawContext(ctx: RawParseContext): UnifiedModel {
  const values = <T>(b: Record<string, T> | undefined): T[] => (b ? Object.values(b) : []);

  const lookup: Record<string, ModelElement> = {};
  for (const bucket of [ctx.events, ctx.processes, ctx.gateways, ctx.roles]) {
    if (!bucket) continue;
    for (const [id, val] of Object.entries(bucket)) lookup[id] = val;
  }

  return {
    meta: ctx.metadata ?? {},
    root: ctx.root ?? '',
    roles: values(ctx.roles),
    processes: values(ctx.processes),
    provisions: values(ctx.provisions),
    dataclasses: values(ctx.dataClasses),
    regs: values(ctx.registers),
    events: values(ctx.events),
    gateways: values(ctx.gateways),
    refs: [],
    approvals: values(ctx.approvals),
    enums: values(ctx.enums),
    vars: values(ctx.variables),
    pages: Object.values(ctx.pages ?? {})
      .filter((p) => p._relations?.childs?.length)
      .map((p) => normalizeRawPage(p, lookup)),
    forms: [], subforms: [], symbols: [], calculations: [],
    stateMachines: [], terms: [], notes: [], tables: [],
    figures: [], links: [], mapProfiles: [], viewProfiles: [],
  };
}

function normalizeRawPage(page: RawSubprocessPage, lookup: Record<string, ModelElement>): SubprocessPage {
  const rawChilds = page._relations?.childs ?? [];
  const rawEdges = page._relations?.edges ?? [];

  const components: SubprocessComponent[] = rawChilds.map((c) => ({
    name: c.name,
    element: c._relations?.element ? lookup[c._relations.element] ?? null : null,
    x: c.x ?? 0,
    y: c.y ?? 0,
  }));

  const compMap = new Map(components.map((c) => [c.name, c]));
  const edges: SubprocessEdge[] = rawEdges
    .filter((e) => e._relations?.from && e._relations?.to)
    .map((e) => ({
      from: compMap.get(e._relations!.from) ?? null,
      to: compMap.get(e._relations!.to) ?? null,
      description: e.description ?? '',
    }));

  return { id: page.id, childs: components, edges };
}

// ── Factory: try resolved, fall back to raw ──

function resolveModel(publicPath: string): UnifiedModel | null {
  return createResolvedSource().getModel(publicPath) ?? createRawSource().getModel(publicPath);
}

// ── Extraction (against UnifiedModel only) ──

function classifyElement(element: ModelElement | null): NodeType {
  if (!element) return 'unknown';
  if ('eventType' in element) {
    if (element.eventType === 'start') return 'start';
    if (element.eventType === 'end') return 'end';
    if (element.eventType === 'timer' || 'type' in element) return 'timer';
  }
  if ('modality' in element) return 'process';
  if ('gatewayType' in element) return 'gateway';
  return 'unknown';
}

function deriveLabel(element: ModelElement | null, fallback: string): string {
  if (!element) return fallback;
  return element.label || element.name || fallback;
}

function extractStats(model: UnifiedModel): ModelStats {
  const len = (a: ElementBase[]) => a.length;
  return {
    roles: len(model.roles), processes: len(model.processes),
    provisions: len(model.provisions), dataClasses: len(model.dataclasses),
    registries: len(model.regs), events: len(model.events),
    gateways: len(model.gateways), references: len(model.refs),
    approvals: len(model.approvals), enums: len(model.enums),
    measurements: len(model.vars), subprocesses: len(model.pages),
    forms: len(model.forms), subforms: len(model.subforms),
    symbols: len(model.symbols), calculations: len(model.calculations),
    stateMachines: len(model.stateMachines), terms: len(model.terms),
    notes: len(model.notes), tables: len(model.tables),
    figures: len(model.figures), links: len(model.links),
    mapProfiles: len(model.mapProfiles), viewProfiles: len(model.viewProfiles),
    root: model.root, namespace: model.meta.namespace ?? '',
  };
}

function extractFlows(model: UnifiedModel): SubprocessFlow[] {
  return model.pages
    .filter((p) => p.childs.length > 0)
    .map((page) => {
      const nodes: FlowNode[] = page.childs
        .filter((c) => c.element)
        .map((c) => ({
          id: c.name,
          label: deriveLabel(c.element, c.name),
          type: classifyElement(c.element),
          x: c.x, y: c.y,
        }));
      const nodeIds = new Set(nodes.map((n) => n.id));
      const edges: FlowEdge[] = page.edges
        .filter((e) => e.from && e.to && nodeIds.has(e.from.name) && nodeIds.has(e.to.name))
        .map((e) => ({ from: e.from!.name, to: e.to!.name, label: e.description }));
      return { id: page.id, nodes, edges };
    });
}

function extractTree(model: UnifiedModel): ModelTree {
  const groups: ModelTreeGroup[] = [];
  const add = <T extends ElementBase>(items: T[], label: string, map: (i: T) => ModelTreeNode) => {
    if (items.length > 0) groups.push({ label, items: items.map(map) });
  };
  add(model.roles, 'Roles', (r) => ({ id: r.id, label: r.name || r.id }));
  add(model.processes, 'Processes', (p) => ({
    id: p.id, label: p.name || p.id,
    detail: p.actor ? `actor: ${p.actor.id}` : undefined,
  }));
  add(model.events, 'Events', (e) => ({ id: e.id, label: e.id, detail: e.eventType }));
  add(model.gateways, 'Gateways', (g) => ({ id: g.id, label: g.label || g.id }));
  add(model.dataclasses, 'Data Classes', (d) => ({ id: d.id, label: d.id }));
  add(model.regs, 'Registries', (r) => ({ id: r.id, label: r.id }));
  add(model.enums, 'Enums', (e) => ({ id: e.id, label: e.id }));
  add(model.provisions, 'Provisions', (p) => ({ id: p.id, label: p.id }));
  add(model.approvals, 'Approvals', (a) => ({ id: a.id, label: a.id }));
  add(model.vars, 'Measurements', (v) => ({ id: v.id, label: v.id }));
  add(model.forms, 'Forms', (f) => ({ id: f.id, label: f.id }));
  add(model.subforms, 'Subforms', (s) => ({ id: s.id, label: s.id }));
  add(model.symbols, 'Symbols', (s) => ({ id: s.id, label: s.id }));
  add(model.calculations, 'Calculations', (c) => ({ id: c.id, label: c.id }));
  add(model.stateMachines, 'State Machines', (s) => ({ id: s.id, label: s.id }));
  add(model.terms, 'Terms', (t) => ({ id: t.id, label: t.id }));
  add(model.refs, 'References', (r) => ({ id: r.id, label: r.id }));
  add(model.mapProfiles, 'Map Profiles', (m) => ({ id: m.id, label: m.id }));
  return {
    title: model.meta.title ?? model.root,
    namespace: model.meta.namespace ?? '',
    version: model.meta.edition ?? '',
    groups,
  };
}

// ── Public API: one parse, three views ──

export function parseModel(publicPath: string): ParsedModel | null {
  const model = resolveModel(publicPath);
  if (!model) return null;
  return {
    stats: extractStats(model),
    flows: extractFlows(model),
    tree: extractTree(model),
  };
}
