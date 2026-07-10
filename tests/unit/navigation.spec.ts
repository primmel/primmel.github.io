import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

import { getCollection } from 'astro:content';
import { deriveSidebar, getSiblings } from '../../src/lib/navigation';

const mockedGetCollection = vi.mocked(getCollection);

interface MockEntry {
  id: string;
  data: {
    title: string;
    sidebar?: { section: string; order: number; label: string };
  };
}

function makeEntries(items: MockEntry[]) {
  return items.map(item => ({
    ...item,
    body: '',
    collection: 'test' as const,
    render: async () => ({ Content: () => {}, headings: [] }),
  }));
}

beforeEach(() => {
  mockedGetCollection.mockReset();
});

describe('deriveSidebar', () => {
  it('groups entries by section', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'intro', data: { title: 'Intro', sidebar: { section: 'Getting Started', order: 1, label: 'Introduction' } } },
      { id: 'advanced', data: { title: 'Advanced', sidebar: { section: 'Advanced', order: 1, label: 'Advanced Topics' } } },
      { id: 'install', data: { title: 'Install', sidebar: { section: 'Getting Started', order: 0, label: 'Installation' } } },
    ]) as never);

    const groups = await deriveSidebar('architecture');
    expect(groups).toHaveLength(2);
    const gettingStarted = groups.find(g => g.section === 'Getting Started');
    expect(gettingStarted).toBeDefined();
    expect(gettingStarted!.items).toHaveLength(2);
  });

  it('sorts items within a group by order', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'z-last', data: { title: 'Z', sidebar: { section: 'S', order: 3, label: 'Z' } } },
      { id: 'a-first', data: { title: 'A', sidebar: { section: 'S', order: 1, label: 'A' } } },
      { id: 'm-mid', data: { title: 'M', sidebar: { section: 'S', order: 2, label: 'M' } } },
    ]) as never);

    const groups = await deriveSidebar('architecture');
    expect(groups[0].items.map(i => i.label)).toEqual(['A', 'M', 'Z']);
  });

  it('skips entries without sidebar metadata', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'has-sidebar', data: { title: 'A', sidebar: { section: 'S', order: 1, label: 'A' } } },
      { id: 'no-sidebar', data: { title: 'B' } },
    ]) as never);

    const groups = await deriveSidebar('architecture');
    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(1);
  });

  it('maps index entry to collection root href', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'index', data: { title: 'Index', sidebar: { section: 'Overview', order: 0, label: 'Overview' } } },
      { id: 'page1', data: { title: 'P1', sidebar: { section: 'Overview', order: 1, label: 'Page 1' } } },
    ]) as never);

    const groups = await deriveSidebar('architecture');
    const indexItem = groups[0].items.find(i => i.label === 'Overview');
    expect(indexItem!.href).toBe('/architecture/');
    const page1Item = groups[0].items.find(i => i.label === 'Page 1');
    expect(page1Item!.href).toBe('/architecture/page1');
  });

  it('returns empty array for empty collection', async () => {
    mockedGetCollection.mockResolvedValue([] as never);
    const groups = await deriveSidebar('architecture');
    expect(groups).toEqual([]);
  });
});

describe('getSiblings', () => {
  it('returns prev and next for a middle entry', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'first', data: { title: 'F', sidebar: { section: 'S', order: 0, label: 'First' } } },
      { id: 'middle', data: { title: 'M', sidebar: { section: 'S', order: 1, label: 'Middle' } } },
      { id: 'last', data: { title: 'L', sidebar: { section: 'S', order: 2, label: 'Last' } } },
    ]) as never);

    const { prev, next } = await getSiblings('architecture', 'middle');
    expect(prev?.label).toBe('First');
    expect(next?.label).toBe('Last');
  });

  it('returns null prev for the first entry', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'a', data: { title: 'A', sidebar: { section: 'S', order: 0, label: 'A' } } },
      { id: 'b', data: { title: 'B', sidebar: { section: 'S', order: 1, label: 'B' } } },
    ]) as never);

    const { prev, next } = await getSiblings('architecture', 'a');
    expect(prev).toBeNull();
    expect(next?.label).toBe('B');
  });

  it('returns null next for the last entry', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'a', data: { title: 'A', sidebar: { section: 'S', order: 0, label: 'A' } } },
      { id: 'b', data: { title: 'B', sidebar: { section: 'S', order: 1, label: 'B' } } },
    ]) as never);

    const { prev, next } = await getSiblings('architecture', 'b');
    expect(prev?.label).toBe('A');
    expect(next).toBeNull();
  });

  it('returns both null for a slug not found', async () => {
    mockedGetCollection.mockResolvedValue(makeEntries([
      { id: 'a', data: { title: 'A', sidebar: { section: 'S', order: 0, label: 'A' } } },
    ]) as never);

    const { prev, next } = await getSiblings('architecture', 'nonexistent');
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});
