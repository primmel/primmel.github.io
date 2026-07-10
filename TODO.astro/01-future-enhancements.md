# Future enhancements — final state

## Completed (live on primmel.org)

### Core
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

### Design
- [x] Mobile sidebar drawer pattern (hamburger + slide-in panel, <768px)
- [x] OG image generation per page (sharp, 1200×630, indigo gradient)
- [x] CSS variable naming fix (--c-* → --color-*, --dur-fast added)
- [x] WCAG 2 AA color contrast (text-3 lightened in both modes)
- [x] Link underline styling (distinguishes links without color reliance)
- [x] Shiki/astro-code token palette override

### Code quality
- [x] Visual regression testing (Playwright config + 10 pages × 2 modes)
- [x] Full accessibility audit (axe-core — all 28 pages pass WCAG 2 AA)
- [x] SSR safety: `window.addEventListener` inside `onMounted` (SearchButton)

### Parser
- [x] Model-driven process flow SVGs (auto-generated from .prl subprocesses)
- [x] Interactive model browser (ModelBrowser.vue — collapsible tree)
- [x] Fallback raw parser for multi-subprocess models (03-process-flow)
- [x] parseModelTree / parseModelFlows APIs

### Infrastructure
- [x] Playwright config (chromium desktop + mobile, port 4328)
- [x] Accessibility audit script (axe-core, port 4329)
- [x] OG image generation script (build-time)

## Deferred (requires design pass or upstream fix)

- **Tailwind migration for scoped styles** — current scoped CSS works; migration is cosmetic
- **Lighthouse CI token** — config in place (`lighthouserc.json`), needs `LHCI_GITHUB_APP_TOKEN`
- **Astro `<Image>` component** — current images are hand-optimized, no need yet
- **Per-audience diagrams** in audience pages — one small SVG each (follow-up)
- **Reference-side examples** — all 6 examples are Application-side; a Read & evaluate example would be valuable
- **Upstream parser fix** for `03-process-flow.prl` resolver bug (we work around it with raw-parse fallback)

## Architecture invariants maintained

- **OCP** — new components register via `client:visible`/`client:idle`, no layout changes
- **DRY** — single `app.css` token source, shared parser functions
- **MECE** — AppLayout > DocLayout > PageLayout; no cross-cutting concerns
- **Single source of truth** — `consts.ts` for site config, `navigation.ts` for sidebar, `app.css` for design tokens
- **Model-driven** — flow diagrams, model browser, process flows all parse `.prl` at build time
- **Zero-JS static** — Vue islands hydrate; Astro components ship HTML+CSS only
- **Encapsulation** — scoped styles per component, global only for cross-component drawer/layering
