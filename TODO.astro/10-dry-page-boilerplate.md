# 10 — DRY: extract page route boilerplate

## Problem

All three `[...slug].astro` pages (architecture, examples, docs) repeat
the same 15-line boilerplate:

```typescript
export async function getStaticPaths() {
  const entries = await getCollection(COLLECTIONS.xxx);
  return entries.filter(...).map(...);
}
const { entry } = Astro.props;
const { Content, headings } = await render(entry);
const readingTime = entry.body ? estimateReadingTime(entry.body) : undefined;
```

## Fix

Create `src/lib/page-helpers.ts`:

```typescript
export async function getCollectionEntries(collection: CollectionName) { ... }
export async function renderEntry(entry) {
  const { Content, headings } = await render(entry);
  const readingTime = entry.body ? estimateReadingTime(entry.body) : undefined;
  return { Content, headings, readingTime };
}
```

### Content config DRY

Extract the shared sidebar schema:

```typescript
const sidebarSchema = z.object({
  section: z.string(),
  order: z.number(),
  label: z.string(),
}).optional();
```

## Files

- `src/lib/page-helpers.ts` (new)
- `src/content.config.ts` — extract sidebarSchema
- `src/pages/architecture/[...slug].astro`
- `src/pages/examples/[...slug].astro`
- `src/pages/docs/[...slug].astro`
