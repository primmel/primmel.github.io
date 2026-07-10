# 17 — Add navigation specs with astro:content mock

## Problem

`navigation.ts` has no unit specs because it imports `astro:content`
(a virtual module unavailable in Vitest).

## Fix

Mock `astro:content` in vitest config or per-test:

```typescript
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));
```

Test cases:
- `deriveSidebar('architecture')` returns groups sorted by order
- `deriveSidebar` skips entries without sidebar frontmatter
- `getSiblings` returns correct prev/next
- Index entry href is `/<collection>/` not `/<collection>/index`
- Empty collection returns empty array

## Files

- `tests/unit/navigation.spec.ts` (new)
