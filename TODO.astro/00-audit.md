# 00 — Audit: current VitePress site and target Astro architecture

## Current state

### Files
- 29 markdown pages across 4 sections (`/`, `/architecture/`, `/examples/`, `/docs/`)
- 3 Vue components (HomePage, Layout, ScrollProgress)
- 1 CSS file (1,473 lines — monolithic)
- 1 config file (125 lines — manual sidebar)
- 11 static example files (.prl, .prd, .prm, .pws YAML directory)
- Logo/favicon assets

### Architecture issues identified

| Issue | Impact |
| --- | --- |
| CSS is one 1,473-line file | Cannot maintain, no encapsulation, no scoping |
| Sidebar hardcoded in config.ts | Violates DRY — content structure duplicated |
| No content type validation | Typos in frontmatter go undetected |
| VitePress build is opaque | Limited output control, no custom build steps |
| Components are global CSS only | No style encapsulation |
| Search is VitePress local search | Limited, no offline |
| No tests | Content links and schema not verified |
| Example files served but not modelled | No metadata, no typed access |

### What Astro 7 fixes

| Fix | How |
| --- | --- |
| Content collections + Zod | Every markdown page has a typed schema; build fails on invalid frontmatter |
| Derived navigation | Sidebar generated from collection structure — single source of truth |
| Component islands | Interactive components (dark mode toggle, scroll progress) hydrate; everything else is static HTML |
| Scoped styles | Each component's CSS is encapsulated |
| Zero JS by default | Better Lighthouse scores |
| Full TypeScript | End-to-end type safety from content to render |
| Modular CSS | Split into tokens / base / components / utilities |
| Content-as-data | Model-driven — content structure drives rendering |

## Target architecture

```
src/
├── content/              ← Content collections (typed markdown)
│   ├── config.ts         ← Zod schemas for each collection
│   ├── docs/             ← Language reference pages
│   ├── architecture/     ← Pillars + audiences
│   └── examples/         ← Example walkthroughs
├── layouts/              ← Page templates (OCP: open for extension)
│   ├── BaseLayout.astro
│   ├── DocLayout.astro
│   └── PageLayout.astro
├── components/           ← Reusable UI (DRY: each concern one place)
│   ├── nav/
│   │   ├── NavBar.astro
│   │   ├── SideBar.astro
│   │   └── Outline.astro
│   ├── ui/
│   │   ├── ScrollProgress.astro
│   │   ├── ThemeToggle.astro
│   │   ├── CodeBlock.astro
│   │   ├── Diagram.astro
│   │   ├── Fleuron.astro
│   │   └── Pager.astro
│   └── home/
│       ├── Hero.astro
│       ├── PillarsList.astro
│       └── FeaturesList.astro
├── styles/               ← Modular CSS (MECE: each file one concern)
│   ├── tokens.css        ← Color, font, spacing variables
│   ├── base.css          ← Reset, body, headings, links
│   ├── code.css          ← Code blocks, Shiki tokens
│   ├── tables.css        ← Table styling
│   ├── components.css    ← Custom blocks, callouts
│   └── print.css         ← Print stylesheet
├── lib/                  ← Business logic (encapsulation)
│   ├── navigation.ts     ← Derive sidebar/outline from collections
│   ├── theme.ts          ← Dark mode logic
│   └── content-utils.ts  ← Collection helpers
├── pages/                ← File-based routes
│   ├── index.astro       ← Home
│   ├── about.astro
│   ├── architecture/[...slug].astro
│   ├── examples/[...slug].astro
│   └── docs/[...slug].astro
└── consts.ts             ← Site-wide constants (single source of truth)
```

## Principles applied

- **OCP**: Layouts extend via slots; components accept props, never modified directly
- **DRY**: Navigation derived from content; theme tokens in one file
- **MECE**: CSS split by concern; content split by collection; components split by function
- **Encapsulation**: Scoped styles; content collections with private schemas
- **Single source of truth**: Site config, navigation, theme all derive from one definition
- **Model-driven**: Content frontmatter IS the model; rendering follows from it