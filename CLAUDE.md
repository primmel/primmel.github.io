# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working with code in this repository.

## What this repo is

The source content for **[primmel.org](https://www.primmel.org)** — the
public website for **Primmel**, a typed, machine-readable language for
representing SMART standards (ISO, BSI, OIML) as executable programs.
Built with [Astro 7](https://astro.build/).

## Build / develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview  # preview the production build
npm run check    # TypeScript + Astro type checking
```

## Architecture

Astro 7 static site with content collections, typed schemas, derived
navigation, modular CSS, and component-based rendering.

### Directory structure

```
src/
├── content/              Content collections (typed markdown)
│   ├── architecture/     5 pillars + 5 audiences + overview
│   ├── examples/         7 example walkthroughs
│   └── docs/             7 language reference pages
├── content.config.ts     Zod schemas for each collection
├── layouts/              OCP layout hierarchy
│   ├── BaseLayout.astro  Root: head, nav, footer, theme
│   ├── DocLayout.astro   Adds sidebar + outline + pager
│   └── PageLayout.astro  Content-only (home, about, 404)
├── components/           Reusable UI (DRY)
│   ├── nav/              NavBar, SideBar, Outline, Footer
│   ├── ui/               ScrollProgress, ThemeToggle, Pager
│   └── home/             Hero, PillarsList
├── styles/               Modular CSS (MECE)
│   ├── tokens.css        Variables only (colors, fonts, spacing)
│   ├── base.css          Reset + element styles
│   ├── code.css          Code blocks + Shiki tokens
│   ├── tables.css        Table styling
│   ├── components.css    Custom blocks, diagrams
│   ├── print.css         Print stylesheet
│   └── global.css        Imports all above
├── lib/                  Business logic (encapsulation)
│   └── navigation.ts     Derive sidebar/pager from collections
├── pages/                File-based routes
│   ├── index.astro       Home
│   ├── about.md          About (Astro auto-routes .md)
│   ├── 404.astro         Custom 404
│   ├── architecture/     Dynamic [...slug] + index
│   ├── examples/         Dynamic [...slug] + index
│   └── docs/             Dynamic [...slug]
└── consts.ts             Site-wide constants (SSoT)
```

### Key principles

- **Content collections with Zod**: every markdown page has typed
  frontmatter. Build fails on invalid content.
- **Derived navigation**: sidebar generated from collection metadata
  via `deriveSidebar()`. No hardcoded config arrays.
- **OCP layouts**: BaseLayout → DocLayout → PageLayout. Open for
  extension via slots; never modify base layouts directly.
- **MECE CSS**: 6 files split by concern. No overlap. Each selector in
  exactly one file.
- **Single source of truth**: `src/consts.ts` for site config, pillars,
  features. `src/lib/navigation.ts` for all nav logic.

## Deployment

`.github/workflows/deploy-pages.yml` runs `npm run build` on push to
`main`, uploads `dist/` as a GitHub Pages artifact, and deploys it.