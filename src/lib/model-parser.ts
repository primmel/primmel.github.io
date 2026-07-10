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

export type NodeType =
  | 'start'
  | 'end'
  | 'timer'
  | 'process'
  | 'gateway'
  | 'unknown';

export interface ModelTreeNode {
  id: string;
  label: string;
  detail?: string;
}

export interface ModelTree {
  title: string;
  namespace: string;
  version: string;
  groups: { label: string; items: ModelTreeNode[] }[];
}

function classifyElement(element: any): NodeType {
  if (!element) return 'unknown';
  if (element.eventType === 'start') return 'start';
  if (element.eventType === 'end') return 'end';
  if (element.eventType === 'timer' || element.type) return 'timer';
  if ('modality' in element) return 'process';
  if ('label' in element || 'gatewayType' in element) return 'gateway';
  return 'unknown';
}

function deriveLabel(element: any, name: string): string {
  if (!element) return name;
  if (element.label) return element.label;
  if (element.name) return element.name;
  return name;
}

function extractFlow(page: any): SubprocessFlow {
  const nodes: FlowNode[] = (page.childs ?? [])
    .filter((c: any) => c.element)
    .map((c: any) => ({
      id: c.name,
      label: deriveLabel(c.element, c.name),
      type: classifyElement(c.element),
      x: c.x ?? 0,
      y: c.y ?? 0,
    }));

  const nodeIds = new Set(nodes.map(n => n.id));
  const edges: FlowEdge[] = (page.edges ?? [])
    .filter((e: any) => e.from && e.to)
    .filter((e: any) => nodeIds.has(e.from.name) && nodeIds.has(e.to.name))
    .map((e: any) => ({
      from: e.from.name,
      to: e.to.name,
      label: e.description ?? '',
    }));

  return { id: page.id ?? '', nodes, edges };
}

function buildGroup(label: string, items: any[], map: (item: any) => ModelTreeNode) {
  return { label, items: items.map(map) };
}

export async function parseModelTree(publicPath: string): Promise<ModelTree | null> {
  let model: any = null;
  try {
    const dynamicImport = await import('@primmel/primmel');
    const load = dynamicImport.load || dynamicImport.default?.load;
    if (load) {
      const fullPath = resolve('public', publicPath.replace(/^\//, ''));
      const content = readFileSync(fullPath, 'utf8');
      model = load(content);
    }
  } catch {
    model = null;
  }

  if (!model) {
    return parseModelTreeRaw(publicPath);
  }

  return buildModelTree(model);
}

function buildModelTree(model: any): ModelTree {
  const groups: ModelTree['groups'] = [];

  if (model.roles?.length) {
    groups.push(buildGroup('Roles', model.roles, (r) => ({
      id: r.id, label: r.name || r.id,
    })));
  }
  if (model.processes?.length) {
    groups.push(buildGroup('Processes', model.processes, (p) => ({
      id: p.id, label: p.name || p.id, detail: p.actor ? `actor: ${p.actor.id}` : undefined,
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

  return {
    title: model.meta?.title ?? model.root ?? '',
    namespace: model.meta?.namespace ?? '',
    version: model.meta?.edition ?? '',
    groups,
  };
}

async function parseModelTreeRaw(publicPath: string): Promise<ModelTree | null> {
  try {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const parseMod = require('@primmel/primmel/dist/src/ser-des/parse.js');
    const configMod = require('@primmel/primmel/dist/src/ser-des/config/index.js');
    const parse = parseMod.default || parseMod.parse;
    const PARSER_CONFIG = configMod.PARSER_CONFIG || configMod.default?.PARSER_CONFIG;
    if (!parse || !PARSER_CONFIG) return null;

    const fullPath = resolve('public', publicPath.replace(/^\//, ''));
    const content = readFileSync(fullPath, 'utf8');
    const ctx: any = parse(content, PARSER_CONFIG, {});

    const groups: ModelTree['groups'] = [];

    const bucketToGroup = (ctxKey: string, label: string, map: (val: any, id: string) => ModelTreeNode) => {
      const bucket = ctx[ctxKey];
      if (!bucket || Object.keys(bucket).length === 0) return;
      const items = Object.entries(bucket).map(([id, val]) => map(val as any, id));
      groups.push({ label, items });
    };

    bucketToGroup('roles', 'Roles', (r, id) => ({ id, label: r.name || id }));
    bucketToGroup('processes', 'Processes', (p, id) => ({
      id, label: p.name || id,
    }));
    bucketToGroup('events', 'Events', (e, id) => ({
      id, label: id, detail: e.eventType,
    }));
    bucketToGroup('gateways', 'Gateways', (g, id) => ({
      id, label: g.label || id,
    }));
    bucketToGroup('dataClasses', 'Data Classes', (_d, id) => ({ id, label: id }));
    bucketToGroup('registers', 'Registries', (_r, id) => ({ id, label: id }));
    bucketToGroup('enums', 'Enums', (_e, id) => ({ id, label: id }));
    bucketToGroup('provisions', 'Provisions', (_p, id) => ({ id, label: id }));
    bucketToGroup('approvals', 'Approvals', (_a, id) => ({ id, label: id }));
    bucketToGroup('variables', 'Measurements', (_v, id) => ({ id, label: id }));

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
export async function parseModelFile(publicPath: string): Promise<ModelStats | null> {
  try {
    const dynamicImport = await import('@primmel/primmel');
    const load = dynamicImport.load || dynamicImport.default?.load;
    if (!load) return null;

    const fullPath = resolve('public', publicPath.replace(/^\//, ''));
    const content = readFileSync(fullPath, 'utf8');
    const model = load(content);

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
      root: model.root ?? '',
      namespace: model.meta?.namespace ?? '',
    };
  } catch (e) {
    console.warn(`Failed to parse model ${publicPath}:`, (e as Error).message);
    return null;
  }
}

export async function parseModelFlows(publicPath: string): Promise<SubprocessFlow[]> {
  try {
    const dynamicImport = await import('@primmel/primmel');
    const load = dynamicImport.load || dynamicImport.default?.load;
    if (!load) return [];

    const fullPath = resolve('public', publicPath.replace(/^\//, ''));
    const content = readFileSync(fullPath, 'utf8');
    const model = load(content);

    return (model.pages ?? [])
      .filter((p: any) => p.childs?.length > 0)
      .map(extractFlow);
  } catch {
    return parseModelFlowsRaw(publicPath);
  }
}

async function parseModelFlowsRaw(publicPath: string): Promise<SubprocessFlow[]> {
  try {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const parseMod = require('@primmel/primmel/dist/src/ser-des/parse.js');
    const configMod = require('@primmel/primmel/dist/src/ser-des/config/index.js');
    const parse = parseMod.default || parseMod.parse;
    const PARSER_CONFIG = configMod.PARSER_CONFIG || configMod.default?.PARSER_CONFIG;
    if (!parse || !PARSER_CONFIG) return [];

    const fullPath = resolve('public', publicPath.replace(/^\//, ''));
    const content = readFileSync(fullPath, 'utf8');
    const ctx = parse(content, PARSER_CONFIG, {});

    const lookup: Record<string, any> = {};
    for (const key of ['events', 'processes', 'gateways', 'roles']) {
      const bucket = (ctx as any)[key];
      if (!bucket) continue;
      for (const [id, val] of Object.entries(bucket)) {
        lookup[id] = val;
      }
    }

    const pages = (ctx as any).pages ?? {};
    return Object.values(pages)
      .filter((page: any) => page._relations?.childs?.length > 0)
      .map((page: any) => extractRawFlow(page, lookup));
  } catch {
    return [];
  }
}

function extractRawFlow(page: any, lookup: Record<string, any>): SubprocessFlow {
  const rawChilds: any[] = page._relations?.childs ?? [];
  const rawEdges: any[] = page._relations?.edges ?? [];

  const nodes: FlowNode[] = rawChilds.map((c: any) => {
    const element = lookup[c._relations?.element] ?? null;
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
    .filter((e: any) => e._relations?.from && e._relations?.to)
    .filter((e: any) => nodeIds.has(e._relations.from) && nodeIds.has(e._relations.to))
    .map((e: any) => ({
      from: e._relations.from,
      to: e._relations.to,
      label: e.description ?? '',
    }));

  return { id: page.id ?? '', nodes, edges };
}