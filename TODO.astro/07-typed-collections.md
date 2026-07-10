# 07 — Typed collection registry

## Problem

Collection names ('architecture', 'examples', 'docs') are hardcoded
string literals scattered across page routes and components. No
central registry.

## Fix

Create `src/lib/collections.ts`:

```typescript
export const COLLECTIONS = {
  architecture: 'architecture',
  examples: 'examples',
  docs: 'docs',
} as const;

export type CollectionName = keyof typeof COLLECTIONS;

export const COLLECTION_TITLES: Record<CollectionName, string> = {
  architecture: 'Architecture',
  examples: 'Examples',
  docs: 'Docs',
};
```

Replace all hardcoded strings in:
- `src/pages/architecture/[...slug].astro`
- `src/pages/examples/[...slug].astro`
- `src/pages/docs/[...slug].astro`
- `src/layouts/DocLayout.astro`
- `src/components/nav/SideBar.astro`

## Files

- `src/lib/collections.ts` (new)
- All page routes and layouts that reference collection names
