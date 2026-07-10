# Audit — Astro 7 migration: complete, remaining work

## Status: MIGRATED

The VitePress → Astro 7 migration is complete. 28 pages build in <1s.
All old VitePress files removed. The site is live at primmel.org.

## What's done

- ✅ Astro 7 project with content collections (architecture, examples, docs)
- ✅ Zod schemas for typed frontmatter validation
- ✅ Derived navigation (sidebar from collection metadata — no hardcoded config)
- ✅ OCP layout hierarchy (BaseLayout → DocLayout → PageLayout)
- ✅ Modular CSS (6 files: tokens, base, code, tables, components, print)
- ✅ 10 Astro components with scoped styles
- ✅ Home page with hero + lifecycle SVG + pillars list + features list
- ✅ 11 architecture pages (overview + 5 pillars + 5 audiences)
- ✅ 7 example walkthroughs
- ✅ 7 docs/language-reference pages
- ✅ About page + custom 404
- ✅ Dark mode (no-flash theme init + ThemeToggle)
- ✅ Scroll progress bar
- ✅ GitHub Pages deployment workflow
- ✅ Sitemap generation
- ✅ Old VitePress files fully removed

## What remains

See the other TODO files in this directory:

- `13-search.md` — Pagefind static search integration
- `15-specs-and-validation.md` — Content link validation, build-time checks
- `16-architecture-improvements.md` — Typed Primmel model, model-driven diagrams, accessibility, performance, RSS, JSON-LD