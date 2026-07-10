# 11 — Add reading-time + collections specs

## Problem

Unit specs exist only for model-parser. No coverage for:
- `src/lib/reading-time.ts` (estimateReadingTime, wordCount)
- `src/lib/collections.ts` (COLLECTIONS, COLLECTION_TITLES, hrefFor)

## Fix

### tests/unit/reading-time.spec.ts
- `wordCount('hello world')` → 2
- `wordCount('')` → 0
- `wordCount` handles markdown (strips code blocks)
- `estimateReadingTime` returns "~N min" format
- Long text (>200 words) rounds up correctly

### tests/unit/collections.spec.ts
- `COLLECTIONS.architecture` === 'architecture'
- `COLLECTION_TITLES` has entry for each collection
- `hrefFor('architecture')` === '/architecture/'
- `hrefFor('architecture', 'define')` === '/architecture/define'
- `hrefFor('architecture', 'index')` === '/architecture/'
- TypeScript: CollectionName only accepts valid keys

## Files

- `tests/unit/reading-time.spec.ts` (new)
- `tests/unit/collections.spec.ts` (new)
