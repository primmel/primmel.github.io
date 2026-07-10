# 04 — Unit specs for lib layer

## Problem

No unit tests exist for `navigation.ts` or `model-parser.ts`. These
are the core business logic modules.

## Fix

Install Vitest. Create spec files that test against real `.prl` model
files in `public/examples/files/`.

### navigation.ts specs
- `deriveSidebar('architecture')` returns groups sorted by order
- `deriveSidebar('examples')` includes index entry
- `getSiblings('architecture', 'define')` returns correct prev/next
- Index entries map to `/<collection>/` not `/<collection>/index`

### model-parser.ts specs
- `parseModelFile('/examples/files/01-minimal-model.prl')` returns
  correct counts (1 process, 2 roles, 1 subprocess)
- `parseModelFlows` extracts nodes with correct (x, y) coordinates
- `parseModelFlows` falls back to raw parser for multi-subprocess models
- `parseModelTree` groups elements by type
- `classifyElement` correctly identifies start/end/timer/process/gateway

## Files

- `vitest.config.ts`
- `tests/unit/navigation.spec.ts`
- `tests/unit/model-parser.spec.ts`
