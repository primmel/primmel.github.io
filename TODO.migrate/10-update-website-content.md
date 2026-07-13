# 10 — Update website content for canvas + real models

> **Status: DONE** — All website content migrated to use `canvas`
> keyword (PR #32 merged, deployed). Hero code sample, docs, examples,
> architecture pages, model-parser types, and test fixtures all
> updated. No remaining `subprocess` references in source.

## What

After the language changes (canvas keyword, nested processes) and
model migration (private-models repo), the website content needs to
reflect the new reality.

## Pages to update

### Architecture pages
- `architecture/index.mdx` — update flow diagram: labels say "canvas"
  not "subprocess"
- `architecture/define.mdx` — mention canvas keyword
- `architecture/implement.mdx` — mention canvas in implementation context

### Docs pages
- `docs/process-model.mdx` — primary doc for process + canvas syntax
- `docs/data-model.mdx` — update if data model syntax changed
- `docs/first-model.mdx` — quickstart should use `canvas` keyword
- `docs/introduction.mdx` — intro should explain process vs canvas
  distinction clearly

### Example pages
- All example `.prl` files in `public/examples/files/` — rename
  `subprocess` → `canvas`
- Example walkthroughs in `src/content/examples/*.mdx` — update code
  snippets
- The hero code window on the home page — use `canvas` keyword

### Component updates
- `ProcessFlowDiagram.astro` — update aria labels, any references
  to "subprocess" in comments
- `ModelSummary.astro` — label says "subprocesses" → "canvases"
- `ModelBrowser.vue` — group label "Subprocess" → "Canvas"

## Dependency chain

1. TODO 01 (parser supports `canvas`) — MUST be done first
2. TODO 02 (private-models migrated) — source of real examples
3. This TODO — update all website references
