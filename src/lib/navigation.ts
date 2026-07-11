import { getCollection } from 'astro:content';
import type { CollectionName } from './collections';

export interface NavItem {
  label: string;
  href: string;
  order: number;
}

export interface NavGroup {
  section: string;
  items: NavItem[];
}

interface SidebarMeta {
  section: string;
  order: number;
  label: string;
}

interface CollectionEntryData {
  sidebar?: SidebarMeta;
}

export async function deriveSidebar(collection: CollectionName): Promise<NavGroup[]> {
  const entries = await getCollection(collection);
  const groups: Record<string, NavItem[]> = {};

  for (const entry of entries) {
    const sb = (entry.data as CollectionEntryData).sidebar;
    if (!sb) continue;
    if (!groups[sb.section]) groups[sb.section] = [];
    const href = entry.id === 'index'
      ? `/${collection}/`
      : `/${collection}/${entry.id}`;
    groups[sb.section].push({
      label: sb.label,
      href,
      order: sb.order,
    });
  }

  return Object.entries(groups)
    .map(([section, items]) => ({
      section,
      items: items.sort((a, b) => a.order - b.order),
    }));
}

export async function getSiblings(
  collection: CollectionName,
  slug: string
): Promise<{ prev: NavItem | null; next: NavItem | null }> {
  const groups = await deriveSidebar(collection);
  const all: NavItem[] = groups.flatMap(g => g.items);
  const index = all.findIndex(item => item.href === `/${collection}/${slug}`);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

export async function getCollectionSlugs(collection: CollectionName) {
  const entries = await getCollection(collection);
  return entries
    .filter(entry => entry.id !== 'index')
    .map(entry => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

export async function getCollectionIndexEntry(collection: CollectionName) {
  const entries = await getCollection(collection);
  const entry = entries.find(e => e.id === 'index');
  if (!entry) throw new Error(`${collection}/index.md not found`);
  return entry;
}

export interface PillarInfo {
  num: string;
  name: string;
  href: string;
  desc: string;
}

export async function derivePillars(): Promise<PillarInfo[]> {
  const entries = await getCollection('architecture');
  return entries
    .filter((entry): entry is typeof entry & { data: { pillar: string; summary: string; sidebar: { order: number; label: string } } } =>
      entry.data.pillar !== undefined && entry.data.summary !== undefined && entry.data.sidebar !== undefined)
    .sort((a, b) => a.data.sidebar.order - b.data.sidebar.order)
    .map((entry) => ({
      num: String(entry.data.sidebar.order).padStart(2, '0'),
      name: entry.data.sidebar.label,
      href: `/architecture/${entry.id}`,
      desc: entry.data.summary,
    }));
}
