# 16 — Architecture improvements

## Status: NOT STARTED

## Goal
Beyond the migration, these improvements make the codebase cleaner, faster, and more maintainable.

## 1. Typed Primmel model (high impact)
Create TypeScript interfaces that model the Primmel language itself:
```ts
// src/lib/primmel-model.ts
export type PrlFile = {
  kind: 'prl';
  root: string;
  version: string;
  namespace: string;
  roles: Role[];
  processes: Process[];
  provisions: Provision[];
  // ...
};
```
These types drive content validation, example file parsing, diagram generation.

## 2. Model-driven diagramming (high impact)
Instead of hand-drawing SVGs, create a `ProcessFlowDiagram.astro` that takes a parsed `.prl` subprocess and renders an SVG automatically:
```astro
<ProcessFlowDiagram elements={model.subprocesses[0].elements} edges={model.subprocesses[0].edges} />
```

## 3. Font loading optimization
- Currently loading via Google Fonts `<link>` (blocking render)
- Self-host fonts or use `font-display: swap` + `preload`
- Consider subsetting to Latin-only for smaller payload

## 4. CSS containment for render performance
- Add `contain: layout` to `.doc-main` and `.sidebar` 
- Prevents style recalculation from cascading

## 5. Accessibility audit
- [ ] Run `axe-core` on every page
- [ ] Verify keyboard navigation (tab order, focus visible)
- [ ] Add ARIA labels to interactive components
- [ ] Check color contrast ratios (WCAG AA minimum)
- [ ] Test screen reader flow

## 6. Performance budget
- [ ] Add Lighthouse CI to GitHub Actions
- [ ] Fail PR if Lighthouse score drops below threshold (90+ performance)
- [ ] Monitor bundle size (should be <10KB JS for most pages)

## 7. RSS feed
- [ ] Install `@astrojs/rss`
- [ ] Generate feed from content collections
- [ ] Link from NavBar or Footer

## 8. CONTRIBUTING.md
Document:
- How to add a new doc page (create .md in collection, add frontmatter)
- How the content collection schema works
- How navigation is derived (no manual config needed)
- How to add a new diagram component
- CSS architecture (tokens → base → code → tables → components → print)

## 9. Visual regression testing
- [ ] Install Playwright
- [ ] Screenshot key pages on each PR
- [ ] Compare against baseline
- [ ] Catches CSS regressions automatically

## 10. Image optimization
- [ ] Use Astro's `<Image />` component for any raster images
- [ ] Generate `srcset` for responsive images
- [ ] Convert logos to AVIF/WebP with SVG fallback

## Prioritisation

| Item | Impact | Effort | Priority |
| --- | --- | --- | --- |
| Typed Primmel model | High | High | Phase 2 |
| Model-driven diagrams | High | High | Phase 2 |
| Font loading | Medium | Low | Phase 1 |
| CSS containment | Low | Low | Phase 1 |
| Accessibility audit | High | Medium | Phase 1 |
| Performance budget | Medium | Low | Phase 1 |
| RSS | Low | Low | Phase 1 |
| CONTRIBUTING.md | Medium | Low | Phase 1 |
| Visual regression | High | Medium | Phase 2 |
| Image optimization | Low | Low | Phase 2 |