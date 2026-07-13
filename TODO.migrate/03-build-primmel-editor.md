# 03 — Build primmel/editor: browser-based model editor/viewer

> **Status: MVP COMPLETE** — `primmel/editor` has a functional browser
> editor with visual SVG process canvas, model tree, code editor,
> element inspector, and compliance panel. Builds to 43KB JS gzipped.
>
> **Remaining for full Paneron parity:**
> - Monaco Editor integration (syntax highlighting, autocomplete)
> - Data registry CRUD (add/edit/delete .pws records)
> - Mapping view (visual .prm editor)
> - Two-way sync (drag element → code updates)
> - Deploy to a public URL (editor.primmel.org or embedded)

## What

A browser-based editor/viewer that replaces the Paneron SMART
extension. Runs entirely in the browser — no server, no Electron.
Loads `.prl` files, renders visual process flow diagrams, provides
form-based editing for data registries, and shows compliance
dashboards.

This is the interactive tool that makes Primmel useful. A visitor
lands on primmel.org, clicks "Try it", and can immediately open a
model, navigate its process flow, inspect provisions, and view
evidence — all in the browser.

## Architecture

```
primmel/editor/
├── package.json
├── vite.config.ts                Vite + Vue 3 + Tailwind
├── index.html
├── src/
│   ├── main.ts                   App entry
│   ├── App.vue                   Root layout
│   ├── stores/                   Pinia stores
│   │   ├── model.ts              Current model state (parsed Standard)
│   │   ├── selection.ts          Selected element
│   │   └── editor.ts             Edit mode, dirty state
│   ├── components/
│   │   ├── ModelTree.vue         Left sidebar: tree of all model elements
│   │   ├── ProcessCanvas.vue     Center: SVG canvas with drag-pan-zoom
│   │   ├── ElementInspector.vue  Right panel: properties of selected element
│   │   ├── CodeEditor.vue        Monaco/CodeMirror .prl text editor
│   │   ├── CompliancePanel.vue   Provisions + modality + reference view
│   │   ├── DataRegistry.vue      CRUD for .pws records
│   │   ├── MappingView.vue       Visual .prm mapping editor
│   │   └── Toolbar.vue           File ops: open, save, export SVG
│   ├── lib/
│   │   ├── parser.ts             Wrapper around @primmel/primmel
│   │   ├── layout.ts             Auto-layout algorithm for canvas
│   │   ├── render.ts             SVG generation from parsed model
│   │   └── serialize.ts          Model → .prl text (dump)
│   └── styles/
│       └── theme.css             Match primmel.org design tokens
```

## Core features (MVP)

### 1. Model viewer (read-only first)
- Open `.prl` file via drag-drop or file picker
- Parse with `@primmel/primmel` (runs in browser)
- Render process flow as interactive SVG (like ProcessFlowDiagram but zoomable/pannable)
- Click an element → show properties in inspector panel
- Navigate model tree (roles, processes, provisions, data classes)

### 2. Process canvas (visual editing)
- SVG canvas with pan (drag) and zoom (scroll)
- Elements rendered as shapes: circle (events), rect (processes), diamond (gateways)
- Edges rendered as bezier curves with arrowheads
- Click element to select, drag to reposition
- Auto-layout button (dagre or similar)
- Export canvas as SVG/PNG

### 3. Code editor (text editing)
- Monaco Editor (VS Code's editor) with Primmel syntax highlighting
- Real-time parse on change — errors shown inline
- Two-way sync: edit text → canvas updates, drag element → text updates
- Auto-format (dump/load round-trip)

### 4. Compliance dashboard
- List all provisions with modality (SHALL/SHOULD/MAY)
- Group by process
- Show reference clause for each provision
- Filter by satisfied/unsatisfied

### 5. Data registry browser
- List registries
- Show records as form (from data class fields)
- Add/edit/delete records (future: save as .pws YAML)

## Technology choices

- **Vue 3 + Pinia** — consistent with primmel.org, reactive state
- **Monaco Editor** — battle-proof code editor, syntax highlighting
  via custom language definition
- **SVG rendering** — for the process canvas (not canvas2d — SVG is
  inspectable, accessible, exportable)
- **@primmel/primmel** — the parser, runs in browser via bundler
- **Tailwind 4** — consistent styling with primmel.org
- **Vite** — fast dev server, optimized build

## Deployment

- Deploy as a static site (no server needed)
- Can be embedded in primmel.org via iframe or integrated as a route
- Models loaded from local files (drag-drop) or URL params (fetch .prl)
- Future: integrate with GitHub repos (open models from primmel/private-models)

## Paneron feature parity checklist

| Paneron feature | Editor equivalent | Priority |
|---|---|---|
| Repository view | ModelTree.vue | MVP |
| Process flow view | ProcessCanvas.vue | MVP |
| Element properties | ElementInspector.vue | MVP |
| Source document view | Read .prd in code panel | P1 |
| Data registry CRUD | DataRegistry.vue | P1 |
| Mapping view | MappingView.vue | P2 |
| Compliance dashboard | CompliancePanel.vue | P1 |
| Multi-model diff | TBD | P3 |
| Form validation | TBD | P3 |

## Dependencies

- TODO 01 (canvas keyword) — editor should use new syntax
- `@primmel/primmel` must work in browser (ESM bundle, no Node deps)
