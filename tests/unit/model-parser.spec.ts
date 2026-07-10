import { describe, it, expect } from 'vitest';
import {
  parseModelFile,
  parseModelFlows,
  parseModelTree,
} from '../../src/lib/model-parser';

const MINIMAL = '/examples/files/01-minimal-model.prl';
const DATA_REG = '/examples/files/02-data-and-registries.prl';
const PROCESS_FLOW = '/examples/files/03-process-flow.prl';

describe('parseModelFile', () => {
  it('returns correct counts for the minimal model', async () => {
    const stats = await parseModelFile(MINIMAL);
    expect(stats).not.toBeNull();
    expect(stats!.roles).toBe(2);
    expect(stats!.processes).toBe(1);
    expect(stats!.subprocesses).toBe(1);
    expect(stats!.namespace).toBe('HelloWorld');
  });

  it('counts data classes and registries in the data model', async () => {
    const stats = await parseModelFile(DATA_REG);
    expect(stats).not.toBeNull();
    expect(stats!.dataClasses).toBeGreaterThan(0);
    expect(stats!.registries).toBeGreaterThan(0);
  });

  it('returns null for process-flow model due to upstream resolver bug', async () => {
    const stats = await parseModelFile(PROCESS_FLOW);
    expect(stats).toBeNull();
  });

  it('returns null for a non-existent file', async () => {
    const stats = await parseModelFile('/examples/files/nonexistent.prl');
    expect(stats).toBeNull();
  });
});

describe('parseModelFlows', () => {
  it('extracts nodes with coordinates from the minimal model', async () => {
    const flows = await parseModelFlows(MINIMAL);
    expect(flows).toHaveLength(1);
    const flow = flows[0];
    expect(flow.nodes).toHaveLength(3);
    expect(flow.edges).toHaveLength(2);
    expect(flow.nodes[0].id).toBe('Start1');
    expect(flow.nodes[0].x).toBe(0);
    expect(flow.nodes[0].y).toBe(0);
  });

  it('classifies start and end events correctly', async () => {
    const flows = await parseModelFlows(MINIMAL);
    const flow = flows[0];
    const startNode = flow.nodes.find(n => n.id === 'Start1');
    const endNode = flow.nodes.find(n => n.id === 'End1');
    expect(startNode!.type).toBe('start');
    expect(endNode!.type).toBe('end');
  });

  it('classifies processes correctly', async () => {
    const flows = await parseModelFlows(MINIMAL);
    const flow = flows[0];
    const procNode = flow.nodes.find(n => n.id === 'Greet');
    expect(procNode!.type).toBe('process');
  });

  it('extracts edge labels from the process flow model', async () => {
    const flows = await parseModelFlows(PROCESS_FLOW);
    expect(flows.length).toBeGreaterThanOrEqual(1);
    const orderFlow = flows.find(f => f.id === 'OrderFlow');
    expect(orderFlow).toBeDefined();
    const stockEdge = orderFlow!.edges.find(e => e.label === 'Item is in stock');
    expect(stockEdge).toBeDefined();
  });

  it('returns empty array for a non-existent file', async () => {
    const flows = await parseModelFlows('/examples/files/nonexistent.prl');
    expect(flows).toEqual([]);
  });
});

describe('parseModelTree', () => {
  it('builds groups from the minimal model', async () => {
    const tree = await parseModelTree(MINIMAL);
    expect(tree).not.toBeNull();
    expect(tree!.title).toBe('Minimal Primmel model');
    const roleGroup = tree!.groups.find(g => g.label === 'Roles');
    expect(roleGroup).toBeDefined();
    expect(roleGroup!.items.length).toBe(2);
  });

  it('includes process details with actor info', async () => {
    const tree = await parseModelTree(MINIMAL);
    const procGroup = tree!.groups.find(g => g.label === 'Processes');
    expect(procGroup).toBeDefined();
    const greet = procGroup!.items.find(p => p.id === 'Greet');
    expect(greet).toBeDefined();
    expect(greet!.detail).toContain('Greeter');
  });

  it('returns null for a non-existent file', async () => {
    const tree = await parseModelTree('/examples/files/nonexistent.prl');
    expect(tree).toBeNull();
  });
});
