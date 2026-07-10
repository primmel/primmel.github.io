# Primmel Website

[![Deploy](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml)

Source for [primmel.org](https://www.primmel.org), built with [Astro 7](https://astro.build/).

## Development

```bash
npm install
npm run dev      # Start development server at localhost:4321
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview the production build
npm run check    # TypeScript + Astro type checking
```

## Project layout

- `src/pages/` — File-based routes (index, about, 404, architecture, examples, docs)
- `src/content/` — Typed markdown content in 3 collections
- `src/layouts/` — BaseLayout, DocLayout, PageLayout (OCP hierarchy)
- `src/components/` — NavBar, SideBar, Outline, Pager, ScrollProgress, ThemeToggle, Hero, PillarsList
- `src/styles/` — Modular CSS: tokens, base, code, tables, components, print
- `src/lib/` — Navigation derivation logic
- `src/consts.ts` — Site-wide constants (single source of truth)
- `public/` — Static assets (logos, favicons, example .prl/.prd/.prm/.pws files)
- `TODO.astro/` — Remaining work items

## Content collections

All content lives in typed Astro Content Collections with Zod schemas:

| Collection | Pages | Schema |
| --- | --- | --- |
| `architecture` | 11 | title, pillar, audience, side, sidebar |
| `examples` | 7 | title, demonstrates, sourceFile, sidebar |
| `docs` | 7 | title, sidebar |

The sidebar is **derived** from collection frontmatter — no hardcoded nav arrays.