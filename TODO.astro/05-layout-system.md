# 05 — Layout system

## Goal
OCP-compliant layout hierarchy: BaseLayout (slots for extension), DocLayout (adds sidebar/outline), PageLayout (content-only). Each layout is closed for modification, open for extension via named slots.

## Layouts

### `BaseLayout.astro`
The root layout every page uses. Provides:
- `<html>`, `<head>` (fonts, favicons, meta)
- `<ScrollProgress />`
- `<NavBar />`
- `<slot />` (page content)
- `<Footer />`
- Theme init script (dark mode, runs before paint)

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  {description && <meta name="description" content={description} />}
  <!-- Fonts -->
  <!-- Favicons -->
  <!-- Theme init (runs before paint to prevent flash) -->
</head>
<body>
  <ScrollProgress />
  <NavBar />
  <slot />
  <Footer />
</body>
</html>
```

### `DocLayout.astro`
Extends BaseLayout. Adds:
- Left sidebar (derived from content collection)
- Right outline (from page headings)
- Prev/next pager
- Edit-on-GitHub link
- Last updated

```astro
---
import BaseLayout from './BaseLayout.astro';
import SideBar from '@components/nav/SideBar.astro';
import Outline from '@components/nav/Outline.astro';
import Pager from '@components/ui/Pager.astro';

interface Props {
  title: string;
  description?: string;
  collection: string;  // 'architecture' | 'examples' | 'docs'
  slug: string;
}
const { collection, slug, ...rest } = Astro.props;
const sidebar = deriveSidebar(collection);
const siblings = getSiblings(collection, slug);
---
<BaseLayout {...rest}>
  <div class="doc-layout">
    <SideBar items={sidebar} activeSlug={slug} />
    <main class="doc-main">
      <slot />
      <Pager prev={siblings.prev} next={siblings.next} />
    </main>
    <Outline headings={Astro.locals.headings} />
  </div>
</BaseLayout>
```

### `PageLayout.astro`
Extends BaseLayout. Content-only (no sidebar). Used for home, about, 404.

```astro
---
import BaseLayout from './BaseLayout.astro';
interface Props { title: string; description?: string; }
---
<BaseLayout {...Astro.props}>
  <main class="page-main">
    <slot />
  </main>
</BaseLayout>
```

## OCP verification
- Adding a new page type? Extend BaseLayout via a new layout, don't modify BaseLayout.
- Adding a new sidebar section? Add to content collection, don't modify SideBar component.
- Adding a new outline style? Slot in a different Outline variant.

## Acceptance criteria
- BaseLayout has zero hardcoded section logic
- DocLayout derives sidebar from collection (not hardcoded)
- PageLayout has no sidebar/outline
- All three layouts pass TypeScript strict