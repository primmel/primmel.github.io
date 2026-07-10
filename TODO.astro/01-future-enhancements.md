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
- [x] Reading time estimates
- [x] Self-hosted fonts (@fontsource)
- [x] Skip-to-content link (accessibility)
- [x] ARIA current-page on sidebar links
- [x] Lighthouse CI config (lighthouserc.json)
- [x] Build-time link validation (scripts/validate-links.mjs)
- [x] Navigation bug fix (index entries → section root)

## Remaining — design
- [ ] Migrate Astro component scoped styles → Tailwind utilities
- [ ] Mobile sidebar drawer pattern (hamburger menu for <768px)
- [ ] OG image generation per page

## Remaining — code quality
- [ ] Visual regression testing (Playwright screenshots)
- [ ] Full accessibility audit (axe-core automated scan)
- [ ] Performance budget (Lighthouse CI — config done, needs LHCI token)

## Remaining — parser
- [ ] Model-driven process flow SVGs (auto-generate from .prl)
- [ ] Interactive model browser (client-side tree view)
- [ ] Build-time link validation against parsed models

## Remaining — infrastructure
- [ ] Image optimization (Astro <Image> component)