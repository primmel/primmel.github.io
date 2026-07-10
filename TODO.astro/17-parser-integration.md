# 17 — Integrate @primmel/primmel parser

## Goal
Use the TypeScript Primmel parser at `../primmel-ts/` to power
model-driven features: parsed model display, automatic diagram
generation, content validation, and interactive examples.

## Parser overview

The parser lives at `/Users/mulgogi/src/primmel/primmel-ts/` and
exports:
```ts
import { load, dump, loadFile } from '@primmel/primmel'

// Parse a .prl string
const model = load(prlString)

// Serialize back
const out = dump(model)

// Load from file path
const model = loadFile('./path/to/model.prl')
```

It returns a typed object with all Primmel constructs: roles,
processes, provisions, data classes, registries, subprocesses,
measurements, etc.

## Integration tasks

### 1. Build-time model parsing (Astro build step)
- [ ] Import `@primmel/primmel` in Astro components
- [ ] Parse each `.prl` file in `public/examples/files/` at build time
- [ ] Generate typed model metadata for display on example pages
- [ ] Validate example files structurally (catch broken models)

### 2. Model-driven diagramming
- [ ] Create `ProcessFlowDiagram.astro` that takes a parsed subprocess
      and renders an SVG flowchart automatically
- [ ] Create `ModelSummary.astro` that shows element counts (roles,
      processes, provisions, data classes) per example
- [ ] Replace hand-drawn ASCII process diagrams in example walkthroughs
      with auto-generated SVGs

### 3. Interactive model browser (stretch)
- [ ] Client-side model viewer that loads a `.prl` file via fetch
- [ ] Tree view of elements (provisions, processes, data classes)
- [ ] Cross-reference navigation (follow `validate_provision` links)
- [ ] Gateway evaluation (run `condition` expressions against inputs)

### 4. Content validation
- [ ] Cross-check example file references in markdown against actual
      `.prl` file contents
- [ ] Verify that code snippets in docs match real Primmel syntax
- [ ] Validate `Namespace#ElementID` references in implementation
      examples against the corresponding reference model

## Implementation notes

The parser is a monorepo workspace package (`@primmel/primmel`). To
use it from the website:

**Option A: Local workspace link**
```json
// package.json
{
  "dependencies": {
    "@primmel/primmel": "file:../primmel-ts/packages/primmel"
  }
}
```

**Option B: Build and copy**
```bash
cd ../primmel-ts && yarn build
cp -r packages/primmel/build ../primmel.github.io/node_modules/@primmel/primmel
```

**Option C: Publish to npm and install normally** (future, when package
is published)

Option A is cleanest for development; it links the local source so
parser changes are immediately available.

## Acceptance criteria
- [ ] Example pages show parsed model metadata (element counts)
- [ ] At least one auto-generated process flow SVG replaces an ASCII diagram
- [ ] Build validates that all example `.prl` files parse without errors