# 01 — Rename `subprocess` → `canvas` in primmel-ts parser

## What

The keyword `subprocess` implies "a process within a process" — a
semantic hierarchy. But it's actually a 2D coordinate canvas for
placing elements and drawing flow edges. `canvas` says exactly what
it is.

## Files to change (primmel-ts)

- `packages/primmel/src/ser-des/config/flow.ts` — rename keyword
  `subprocess` → `canvas`, keep `subprocess` as an alias for
  backward compatibility
- `packages/primmel/src/types/flow.ts` — rename `Subprocess` type
  → `Canvas` (keep `Subprocess` as type alias)
- `packages/primmel/test/subprocess.test.ts` — update keyword in
  test models, add `canvas` keyword tests
- `packages/primmel/test/round-trip*.ts` — update if any test uses
  `subprocess` keyword

## Design decisions

- Keep `subprocess` as a **deprecated alias** so old `.mmel` files
  still parse
- `canvas` is the primary keyword going forward
- The parser emits `canvas` on dump (serialization), not `subprocess`
- Internal type names can use `Canvas` with `Subprocess = Canvas`
  type alias for gradual migration

## Verification

- `npm test` in primmel-ts passes (122+ tests)
- Both `subprocess Root { }` and `canvas Root { }` parse correctly
- `dump(load(content))` outputs `canvas`, not `subprocess`
