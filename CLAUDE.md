# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working with code in this repository.

## What this repo is

The source content for **[primmel.org](https://www.primmel.org)** — the
public website for **Primmel**, a typed, machine-readable language for
representing SMART standards (ISO, BSI, OIML) as executable programs.
Built with [Astro 7](https://astro.build/) + Vue 3 + Tailwind 4.

## Build / develop

```bash
npm install
npm run dev          # dev server (auto port, usually 4321-4323)
npm run build        # build + pagefind + OG images → dist/
npm run preview      # preview the production build
npm run check        # TypeScript + Astro type checking (0 errors expected)
npm test             # Vitest unit specs (12 tests)
npm run check:links  # validate all internal links (28 pages)
npm run check:a11y   # axe-core WCAG 2 AA audit (28 pages)
npm run test:visual  # Playwright visual regression
```

## Architecture

### Layer hierarchy (OCP)

```
BaseLayout   → head, fonts, nav, footer, theme, OG meta, JSON-LD
  ├── DocLayout    → sidebar + outline + pager + reading time
  └── PageLayout   → content-only (home, about, 404)
```

New layouts extend, never modify existing ones.

### Directory structure

```
src/
├── content/              Content collections (typed markdown, Zod schemas)
│   ├── architecture/     11 pages: overview + 5 pillars + 5 audiences
│   ├── examples/         7 example walkthroughs (6 with .prl models)
│   └── docs/             7 language reference pages
├── content.config.ts     Zod schemas per collection
├── consts.ts             SSoT: SITE config, PILLARS, FEATURES, EXTENSIONS
├── lib/                  Business logic (fully typed, zero `any`)
│   ├── collections.ts    Collection registry + helpers
│   ├── navigation.ts     Derive sidebar/pager from collections
│   ├── model-parser.ts   Parse .prl → stats, flows, tree
│   └── reading-time.ts   Word count + estimate
├── layouts/              OCP layout hierarchy
├── components/
│   ├── nav/              NavBar, SideBar, Outline, Footer
│   ├── ui/               Vue islands + Astro UI components
│   ├── home/             Hero, PillarsList
│   └── diagrams/         ProcessFlowDiagram (model-driven SVG)
├── styles/
│   └── app.css           Single CSS entry: Tailwind 4 @theme + global styles
└── pages/                File-based routes (static + dynamic [...slug])
```

### Key principles

- **Content collections with Zod**: typed frontmatter; build fails on invalid content.
- **Derived navigation**: sidebar generated from collection metadata via `deriveSidebar()`.
- **Model-driven rendering**: `.prl` files parsed at build time → process flow SVGs, model trees, stats.
- **OCP layouts**: BaseLayout → DocLayout/PageLayout. Extend via slots.
- **MECE CSS**: single `app.css` with clear sections (tokens, base, code, tables, a11y, drawer).
- **Single source of truth**:
  - `consts.ts` — site config, pillars, features, extensions
  - `collections.ts` — collection names, paths, titles
  - `navigation.ts` — all sidebar/pager logic
  - `app.css` — all design tokens via Tailwind @theme
- **Zero-JS static**: Astro components ship HTML+CSS only; Vue islands hydrate on demand.
- **Type safety**: zero `any` types in `src/lib/`. All parser output typed via interfaces.

### Vue hydration strategy

| Component | Directive | Why |
|---|---|---|
| ScrollProgress | `client:load` | Above-fold, visible immediately |
| ThemeToggle | `client:load` | Critical for UX |
| SearchButton | `client:idle` | Non-critical, lazy |
| CodeEnhancements | `client:idle` | Copy buttons + scroll-spy |
| ModelBrowser | `client:visible` | Only on example pages with models |

All Vue components use `defineOptions({ inheritAttrs: false })` to prevent
Astro scoped-style `data-astro-cid-*` attributes from leaking into Vue props.

### Performance budget

- CSS: < 50KB gzipped (Tailwind purges unused utilities)
- JS: < 30KB gzipped per page (Vue islands hydrate selectively)
- Fonts: < 100KB total (woff2, self-hosted via @fontsource)
- Images: SVG inline, OG PNGs generated at build time

## Testing strategy

| Layer | Tool | Coverage |
|---|---|---|
| Unit | Vitest | `model-parser.ts` (12 tests) |
| Contract | Playwright | 28 pages × 3 checks (status, title, OG) |
| Accessibility | axe-core | 28 pages, WCAG 2 AA compliant |
| Link integrity | Custom script | All internal links validated |
| Visual regression | Playwright | 10 pages × light/dark baselines |

## Parser layer

The `@primmel/primmel` npm package parses `.prl` files. Some models with
multiple subprocesses trigger an upstream resolver bug; the parser falls
back to raw parsing (bypassing resolution) for these cases. See
`src/lib/model-parser.ts` → `parseModelFlowsRaw`, `parseModelTreeRaw`.

## Deployment

`.github/workflows/deploy-pages.yml` runs `npm run build` on push to
`main`, uploads `dist/` as a GitHub Pages artifact, and deploys it.
