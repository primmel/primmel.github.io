# 06 — Navigation

## Goal
Navigation system: NavBar (top), SideBar (left, collection-driven), Outline (right, from headings). All derived from data — no hardcoded nav arrays.

## Components

### `NavBar.astro`
- Logo + site title
- Top-level nav links: Architecture, Examples, Docs, Specification, About
- Search button
- Dark mode toggle
- GitHub social link

```astro
---
import { SITE } from '@consts';
import ThemeToggle from '@components/ui/ThemeToggle.astro';
---
<header class="nav-bar">
  <a href="/" class="nav-title">
    <img src="/primmel-logo-light.svg" class="logo light-only" alt="Primmel" />
    <img src="/primmel-logo-dark.svg" class="logo dark-only" alt="Primmel" />
    <span>{SITE.title}</span>
  </a>
  <nav>
    {SITE.nav.map(item => <a href={item.href}>{item.text}</a>)}
  </nav>
  <div class="nav-actions">
    <SearchButton />
    <ThemeToggle />
    <a href={SITE.github} aria-label="GitHub">...</a>
  </div>
</header>
```

### `SideBar.astro`
- Receives `items` prop (derived from content collection)
- Groups by `sidebar.section`
- Highlights active slug
- Renders nested entries for audiences

```astro
---
interface NavItem {
  label: string;
  href: string;
  order: number;
}
interface NavGroup {
  section: string;
  items: NavItem[];
}
interface Props {
  groups: NavGroup[];
  activeSlug: string;
}
const { groups, activeSlug } = Astro.props;
---
<aside class="sidebar">
  {groups.map(group => (
    <section>
      <h2>{group.section}</h2>
      <ul>
        {group.items
          .sort((a, b) => a.order - b.order)
          .map(item => (
            <li class={item.href === activeSlug ? 'is-active' : ''}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
      </ul>
    </section>
  ))}
</aside>
```

### `Outline.astro`
- Receives `headings` prop (from Astro's `getHeadings()`)
- Renders right-side TOC
- Highlights active heading on scroll (via IntersectionObserver)

### `src/lib/navigation.ts`
```ts
import { getCollection } from 'astro:content';

export async function deriveSidebar(collection: string): Promise<NavGroup[]> {
  const entries = await getCollection(collection);
  // Group by sidebar.section, sort by sidebar.order
  // Single source of truth: the content collection itself
}

export async function getSiblings(collection: string, slug: string) {
  const entries = await getCollection(collection);
  const sorted = entries.sort((a, b) => a.data.sidebar?.order - b.data.sidebar?.order);
  const index = sorted.findIndex(e => e.slug === slug);
  return {
    prev: sorted[index - 1] ?? null,
    next: sorted[index + 1] ?? null,
  };
}
```

## DRY verification
- NavBar links come from `SITE.nav` constant (one definition)
- SideBar items come from content collection (no separate config)
- Outline comes from markdown headings (no separate TOC config)
- Only ONE definition of navigation structure exists

## Acceptance criteria
- Adding a new doc page automatically appears in the sidebar
- Removing a doc page automatically removes it from the sidebar
- Nav bar links are defined once in `consts.ts`
- No hardcoded sidebar arrays anywhere