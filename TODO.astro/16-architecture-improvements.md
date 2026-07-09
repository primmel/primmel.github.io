# 16 — Architecture improvements beyond migration

## Goal
Beyond the VitePress → Astro migration, these improvements make the codebase cleaner, more maintainable, and architecturally sound.

## 1. Typed Primmel model objects

Currently the site talks about Primmel models in prose. Create TypeScript types that model the Primmel language itself:

```ts
// src/lib/primmel-model.ts
export type PrimmelFile = PrlFile | PrdFile | PrmFile | PwsDirectory;

export interface PrlFile {
  kind: 'prl';
  root: string;
  version: string;
  namespace: string;
  roles: Role[];
  processes: Process[];
  provisions: Provision[];
  dataRegistries: DataRegistry[];
  // ...
}
```

These types drive: content validation, example file parsing, diagram generation, spec pages.

## 2. Model-driven diagramming

Instead of hand-drawing SVGs for every process flow, create a `ProcessFlowDiagram` component that takes a parsed `.prl` subprocess and renders an SVG automatically:

```astro
---
import { parsePrl, renderSubprocess } from '@lib/primmel-renderer';
const model = parsePrl(entry.data.sourceFile);
---
<ProcessFlowDiagram elements={model.subprocesses[0].elements} edges={model.subprocesses[0].edges} />
```

This is model-driven: the diagram IS the model, not a separate artifact.

## 3. Reading time estimates

Use `reading-time` to add estimated read times to doc pages. Pure build-time computation, no runtime cost.

## 4. Structured data (JSON-LD)

Add schema.org JSON-LD to each page for SEO:
- `TechArticle` for docs pages
- `SoftwareSourceCode` for example files
- `BreadcrumbList` for navigation context

## 5. RSS feed

`@astrojs/rss` generates a feed for content updates. Useful for tracking new example additions or spec changes.

## 6. Content linting

Markdown lint rules enforced at build time:
- Maximum line length (120 chars)
- No trailing whitespace
- Heading hierarchy (no skipping levels)
- Required frontmatter fields

## 7. Visual regression testing

Use Playwright to screenshot key pages on each PR. Compare against baseline. Catches CSS regressions.

## 8. Accessibility audit

Automated `axe-core` checks as part of the build. Manual keyboard navigation test per page.

## 9. Performance budget

Lighthouse CI on each PR. Fail if Lighthouse score drops below threshold.

## 10. Documentation for the codebase itself

A `CONTRIBUTING.md` that documents:
- How to add a new doc page
- How to add a new example file
- How the content collection schema works
- How navigation is derived
- How to add a new diagram component

## Prioritisation

| Item | Impact | Effort | Priority |
| --- | --- | --- | --- |
| Typed Primmel model | High | High | Phase 2 |
| Model-driven diagrams | High | High | Phase 2 |
| Reading time | Low | Low | Phase 1 |
| JSON-LD | Medium | Low | Phase 1 |
| RSS | Low | Low | Phase 1 |
| Content linting | Medium | Low | Phase 1 |
| Visual regression | High | Medium | Phase 2 |
| Accessibility | High | Low | Phase 1 |
| Performance budget | Medium | Low | Phase 1 |
| CONTRIBUTING.md | Medium | Low | Phase 1 |

## Acceptance criteria
- Each item is tracked as a separate issue or TODO
- Phase 1 items completed within the initial migration
- Phase 2 items planned for post-migration enhancement