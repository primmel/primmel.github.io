# 03 — Eliminate `any` types in lib layer

## Problem

28 `any` types across `src/lib/`. The parser layer especially uses
untyped `any` for the upstream `@primmel/primmel` model structure.

## Fix

1. `navigation.ts`: type the collection parameter as a union of
   collection names, not `string`.
2. `model-parser.ts`: import types from `@primmel/primmel` and use them
   instead of `any`. Create local interfaces for the raw parse context
   (`_relations`, `childs`, `edges`).

## Files

- `src/lib/navigation.ts` — 2 any types
- `src/lib/model-parser.ts` — 26 any types
