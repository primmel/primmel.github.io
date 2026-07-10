# Future enhancements

## Completed (live on primmel.org)
- [x] RSS feed via @astrojs/rss → `/rss.xml`
- [x] JSON-LD structured data (WebSite schema)
- [x] CSS containment (contain: layout)
- [x] CONTRIBUTING.md
- [x] Pagefind search (⌘K, lazy-loaded)
- [x] View transitions (ClientRouter)
- [x] Code copy buttons + scroll-spy
- [x] @primmel/primmel parser (ModelSummary cards)
- [x] Dark mode (no-flash init)
- [x] Sitemap + robots.txt

## Remaining — content
- [ ] Reading time estimates on doc pages
- [ ] JSON-LD TechArticle schema per page (not just WebSite)

## Remaining — design
- [ ] Migrate Astro component scoped styles → Tailwind utilities
- [ ] Mobile sidebar drawer pattern (hamburger menu for <768px)
- [ ] OG image generation per page

## Remaining — code quality
- [ ] Visual regression testing (Playwright screenshots)
- [ ] Accessibility audit (axe-core, keyboard nav, ARIA)
- [ ] Performance budget (Lighthouse CI in GitHub Actions)

## Remaining — parser
- [ ] Model-driven process flow SVGs (auto-generate from .prl)
- [ ] Interactive model browser (client-side tree view)
- [ ] Build-time link validation against parsed models

## Remaining — infrastructure
- [ ] Self-host fonts (remove Google Fonts CDN dependency)
- [ ] Image optimization (Astro <Image> component)