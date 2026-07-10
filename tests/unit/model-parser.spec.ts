import { describe, it, expect } from 'vitest';
import { parseModel } from '../../src/lib/model-parser';

const MINIMAL = '/examples/files/01-minimal-model.prl';
const DATA_REG = '/examples/files/02-data-and-registries.prl';
const PROCESS_FLOW = '/examples/files/03-process-flow.prl';

describe('parseModel', () => {
  it('returns null for a non-existent file', () => {
    const result = parseModel('/examples/files/nonexistent.prl');
    expect(result).toBeNull();
  });

  describe('stats', () => {
    it('returns correct counts for the minimal model', () => {
      const result = parseModel(MINIMAL);
      expect(result).not.toBeNull();
      expect(result!.stats.roles).toBe(2);
      expect(result!.stats.processes).toBe(1);
      expect(result!.stats.subprocesses).toBe(1);
      expect(result!.stats.namespace).toBe('HelloWorld');
    });

    it('counts data classes and registries in the data model', () => {
      const result = parseModel(DATA_REG);
      expect(result).not.toBeNull();
      expect(result!.stats.dataClasses).toBeGreaterThan(0);
      expect(result!.stats.registries).toBeGreaterThan(0);
    });

    it('counts gateways and events via raw fallback', () => {
      const result = parseModel(PROCESS_FLOW);
      expect(result).not.toBeNull();
      expect(result!.stats.gateways).toBe(2);
      expect(result!.stats.events).toBe(6);
    });
  });

  describe('flows', () => {
    it('extracts nodes with coordinates from the minimal model', () => {
      const result = parseModel(MINIMAL);
      expect(result!.flows).toHaveLength(1);
      const flow = result!.flows[0];
      expect(flow.nodes).toHaveLength(3);
      expect(flow.edges).toHaveLength(2);
      expect(flow.nodes[0].id).toBe('Start1');
      expect(flow.nodes[0].x).toBe(0);
      expect(flow.nodes[0].y).toBe(0);
    });

    it('classifies start and end events correctly', () => {
      const flow = parseModel(MINIMAL)!.flows[0];
      expect(flow.nodes.find(n => n.id === 'Start1')!.type).toBe('start');
      expect(flow.nodes.find(n => n.id === 'End1')!.type).toBe('end');
    });

    it('classifies processes correctly', () => {
      const flow = parseModel(MINIMAL)!.flows[0];
      expect(flow.nodes.find(n => n.id === 'Greet')!.type).toBe('process');
    });

    it('extracts edge labels from the process flow model', () => {
      const flows = parseModel(PROCESS_FLOW)!.flows;
      const orderFlow = flows.find(f => f.id === 'OrderFlow');
      expect(orderFlow).toBeDefined();
      const stockEdge = orderFlow!.edges.find(e => e.label === 'Item is in stock');
      expect(stockEdge).toBeDefined();
    });
  });

  describe('tree', () => {
    it('builds groups from the minimal model', () => {
      const tree = parseModel(MINIMAL)!.tree;
      expect(tree.title).toBe('Minimal Primmel model');
      const roleGroup = tree.groups.find(g => g.label === 'Roles');
      expect(roleGroup).toBeDefined();
      expect(roleGroup!.items.length).toBe(2);
    });

    it('includes process details with actor info', () => {
      const tree = parseModel(MINIMAL)!.tree;
      const procGroup = tree.groups.find(g => g.label === 'Processes');
      const greet = procGroup!.items.find(p => p.id === 'Greet');
      expect(greet!.detail).toContain('Greeter');
    });
  });
});
