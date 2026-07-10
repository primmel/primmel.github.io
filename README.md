# Primmel Website

[![Deploy](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml)

Source for **[primmel.org](https://www.primmel.org)** — the public website
for **Primmel**, a typed, machine-readable language for representing SMART
standards (ISO, BSI, OIML) as executable programs.

Built with [Astro 7](https://astro.build/) + Vue 3 + Tailwind 4.

## Quick start

```bash
npm install
npm run dev          # dev server (auto port)
npm run build        # build + pagefind + OG images → dist/
npm run preview      # preview production build
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Build site + search index + OG images |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript + Astro type checking (0 errors) |
| `npm test` | Vitest unit specs (33 tests) |
| `npm run check:links` | Validate all internal links (28 pages) |
| `npm run check:a11y` | axe-core WCAG 2 AA accessibility audit |
| `npm run test:visual` | Playwright visual regression tests |

## Architecture

- **Static site** — Astro 7 with content collections (Zod schemas)
- **Vue islands** — ScrollProgress, ThemeToggle, SearchButton, CodeEnhancements, ModelBrowser
- **Tailwind 4** — CSS-first @theme tokens, single `app.css` entry point
- **Model-driven** — `.prl` files parsed at build time → process flow SVGs, model trees
- **Zero-JS by default** — Vue islands hydrate selectively (`client:load`, `client:idle`, `client:visible`)

See **[CLAUDE.md](CLAUDE.md)** for the full architecture guide.

## Content

Three typed collections with derived navigation (no hardcoded sidebar config):

| Collection | Pages | Content |
| --- | --- | --- |
| `architecture` | 11 | Overview + 5 pillars + 5 audiences |
| `examples` | 7 | 6 model walkthroughs + index |
| `docs` | 7 | Language reference |

## Project layout

```
src/
├── content/          Typed markdown collections
├── layouts/          BaseLayout → DocLayout / PageLayout (OCP)
├── components/       nav/, ui/, home/, diagrams/
├── lib/              collections, navigation, model-parser, page-helpers, reading-time
├── styles/           app.css (single entry: Tailwind + global styles)
├── pages/            File-based routes
└── consts.ts         Site-wide config (SSoT)
```

## Testing

| Layer | Tool | Coverage |
|---|---|---|
| Unit | Vitest | model-parser, reading-time, collections (33 tests) |
| Type safety | astro check | 0 errors, 0 warnings, 0 hints |
| Accessibility | axe-core | 28 pages pass WCAG 2 AA |
| Link integrity | Custom script | All internal links validated |
| Contract | Playwright | 28 pages × status/title/OG checks |
| Visual | Playwright | 10 pages × light/dark baselines |

## Deployment

Push to `main` triggers `.github/workflows/deploy-pages.yml`:

1. **verify** — type check + unit specs + build
2. **build** — Astro build → GitHub Pages artifact
3. **deploy** — publish to `primmel.org`

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for how to add pages, customize
theming, and use Vue islands.

## License

Copyright © Ribose. All rights reserved.
