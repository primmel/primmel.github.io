# Primmel Website

[![Deploy Pages](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/primmel/primmel.github.io/actions/workflows/deploy-pages.yml)

Source for [primmel.org](https://www.primmel.org), built with [VitePress](https://vitepress.dev/).

## Development

```bash
npm install     # Install dependencies
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Project layout

- `index.md` — home page (renders `<HomePage />` from the theme)
- `about.md` — about page, name & logo breakdown
- `docs/`
  - `introduction.md` — overview of the four pillars and file types
  - `first-model.md` — line-by-line walkthrough of the minimal model
  - `examples/` — the curated example corpus
    - `index.md` — overview, reading order, pattern catalogue
    - `minimal-model.md`, `data-and-registries.md`, `process-flow.md`,
      `compliance-and-measurement.md`, `approval-workflow.md` — one
      per example file
    - `implementation-package.md` — the showcase
    - `files/` — the raw `.prl`, `.prd`, `.prm`, `.pws`, and
      `.yaml` files (and the `.pws/` workspace directories), served as static assets
  - `data-model.md`, `process-model.md`, `compliance.md`,
    `measurement.md`, `mapping.md` — topical reference for each
    pillar
- `public/` — static assets (logos, favicon, manifest)
- `.vitepress/config.ts` — site config, navigation, sidebar
- `.vitepress/theme/custom.css` — brand styles (Primmel palette)
- `.vitepress/theme/components/HomePage.vue` — home page component
- `.vitepress/theme/index.ts` — theme entry, registers HomePage

## Brand assets

The Primmel logo set lives in `public/`:

| File | Purpose |
| --- | --- |
| `primmel-logo.svg` | Source logo (600×600, greyscale designer original) |
| `primmel-logo-light.svg` | Light-mode tint (deep indigo on white) |
| `primmel-logo-dark.svg` | Dark-mode tint (sky indigo on slate) |
| `primmel-logo.pdf` | PDF version of the source logo |
| `favicon.svg` | Favicon, scales to 16×16 |
| `site.webmanifest` | PWA manifest |

The mark is a custom-drawn Primmel monogram with tonal shading;
the light and dark variants are tinted toward indigo for theme
adaptation. See [About Primmel](/about) for the full breakdown.