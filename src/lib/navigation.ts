import { getCollection } from 'astro:content';

export interface NavItem {
  label: string;
  href: string;
  order: number;
}

export interface NavGroup {
  section: string;
  items: NavItem[];
}

export async function deriveSidebar(collection: string): Promise<NavGroup[]> {
  const entries = await getCollection(collection as any);
  const groups: Record<string, NavItem[]> = {};

  for (const entry of entries) {
    const sb = (entry.data as any).sidebar;
    if (!sb) continue;
    if (!groups[sb.section]) groups[sb.section] = [];
    groups[sb.section].push({
      label: sb.label,
      href: entry.id === 'index' ? `/${collection}/` : `/${collection}/${entry.id}`,
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
  collection: string,
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