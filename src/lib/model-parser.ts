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