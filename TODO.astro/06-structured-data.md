# 06 — Per-page structured data (JSON-LD)

## Problem

Only `WebSite` schema is present on every page. No page-specific
structured data for articles, breadcrumbs, or tech articles.

## Fix

### BaseLayout
Pass `type` prop to select schema. Generate JSON-LD per page type:

- **Article** (doc/example pages): `@type: "TechArticle"` with
  `headline`, `author`, `datePublished`
- **Breadcrumb** (all non-home pages): `BreadcrumbList` with
  collection > page
- **WebPage** (home): keep current `WebSite` schema

### Pages
Add structured data via `defineProps` in each page route:

```astro
<DocLayout
  title={entry.data.title}
  collection="examples"
  slug={entry.id}
  schema="TechArticle"
  headings={headings}
/>
```

## Files

- `src/layouts/BaseLayout.astro` — add schema type prop
- `src/layouts/DocLayout.astro` — pass schema through
- `src/pages/examples/[...slug].astro` — TechArticle
- `src/pages/docs/[...slug].astro` — TechArticle
- `src/pages/architecture/[...slug].astro` — TechArticle
