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
