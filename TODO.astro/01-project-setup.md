# 01 — Project setup

## Goal
Scaffold an Astro 7 project alongside the existing VitePress site. Both can coexist during migration; final step removes VitePress.

## Steps

- [ ] Run `npm create astro@latest` with TypeScript strict, empty template
- [ ] Install integrations:
  - `@astrojs/vue` (for any remaining Vue components during migration)
  - `@astrojs/sitemap`
  - `@astrojs/mdx` (if MDX needed)
- [ ] Install tooling:
  - `shiki` (syntax highlighting — comes with Astro)
  - `pagefind` (static search)
  - `reading-time` (doc page reading estimates)
- [ ] Configure `astro.config.mjs`:
  - Site URL: `https://www.primmel.org`
  - Markdown: Shiki theme integration
  - Vue integration (transitional)
  - Sitemap integration
- [ ] Configure `tsconfig.json` strict mode with path aliases:
  - `@/*` → `src/*`
  - `@components/*` → `src/components/*`
  - `@layouts/*` → `src/layouts/*`
  - `@lib/*` → `src/lib/*`
  - `@styles/*` → `src/styles/*`
- [ ] Set up `public/` with all existing static assets (logos, favicons, example files)
- [ ] Create `.github/workflows/deploy-astro.yml` for GitHub Pages

## Acceptance criteria
- `npm run dev` starts Astro dev server
- `npm run build` produces `.dist/` output
- TypeScript strict passes with zero errors
- Path aliases resolve