# Audit — final state

## Stack

Astro 7 + Vue 3 + Tailwind 4 + Vite 8 + Pagefind + @primmel/primmel

## What's implemented

### Architecture
- ✅ Content collections (3) with Zod schemas — typed frontmatter
- ✅ Derived navigation — sidebar from collection metadata (DRY)
- ✅ OCP layouts — BaseLayout → DocLayout → PageLayout
- ✅ Single CSS entry — app.css with Tailwind 4 @theme tokens
- ✅ Single source of truth — consts.ts, navigation.ts, app.css

### Interactive (Vue islands)
- ✅ ScrollProgress.vue (client:load)
- ✅ ThemeToggle.vue (client:load)
- ✅ SearchButton.vue (client:idle) — Pagefind + ⌘K
- ✅ CodeEnhancements.vue (client:idle) — copy buttons + scroll-spy

### Static (Astro, zero JS)
- ✅ NavBar, SideBar, Outline, Footer, Pager
- ✅ Hero (with lifecycle SVG), PillarsList
- ✅ ModelSummary (parser-driven)

### Features
- ✅ View transitions (ClientRouter)
- ✅ Pagefind search (1,592 words indexed)
- ✅ Dark mode (no-flash init)
- ✅ Edit-on-GitHub links
- ✅ Prev/next pager
- ✅ Sitemap + robots.txt
- ✅ 404 page
- ✅ @primmel/primmel parser integration

### Content (25 pages + 3 special)
- ✅ Home, About, 404
- ✅ Architecture: 11 pages (overview + 5 pillars + 5 audiences)
- ✅ Examples: 7 pages (overview + 6 walkthroughs)
- ✅ Docs: 7 pages (2 getting started + 5 language reference)

## Dead code removed
- ✅ 6 old CSS files (base, code, tables, components, print, tokens)
- ✅ AboutLayout.astro (unused)
- ✅ 4 stale TODO files

## What remains

See TODO.astro/ files for future enhancement ideas.