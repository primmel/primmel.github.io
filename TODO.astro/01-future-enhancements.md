# Future enhancements

Items not yet implemented. Each is a standalone PR.

## Content
- [ ] Reading time estimates on doc pages
- [ ] JSON-LD structured data (TechArticle, BreadcrumbList)
- [ ] RSS feed via @astrojs/rss

## Design
- [ ] Migrate Astro component scoped styles → Tailwind utilities
- [ ] Mobile sidebar drawer pattern (hamburger menu)
- [ ] OG image generation per page

## Code quality
- [ ] CONTRIBUTING.md (how to add pages, modify content)
- [ ] Visual regression testing (Playwright screenshots)
- [ ] Accessibility audit (axe-core, keyboard nav, ARIA)
- [ ] Performance budget (Lighthouse CI in GitHub Actions)

## Parser
- [ ] Model-driven process flow SVGs (auto-generate from .prl subprocesses)
- [ ] Interactive model browser (client-side tree view)
- [ ] Build-time link validation against parsed models

## Infrastructure
- [ ] Self-host fonts (remove Google Fonts CDN dependency)
- [ ] CSS containment (contain: layout) for render performance
- [ ] Image optimization (Astro <Image> component)