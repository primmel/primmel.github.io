# 14 — Eliminate remaining `any` in page-helpers

## Problem

`src/lib/page-helpers.ts` has 3 `any` types:

```typescript
export interface RenderedEntry {
  Content: any;       // ← should be Astro component type
  headings: any[];    // ← should be MarkdownHeading[]
}

export async function renderEntry(entry: BaseEntry): Promise<RenderedEntry> {
  const { Content, headings } = await render(entry as any);  // ← cast
  ...
}
```

## Fix

Import types from Astro:

```typescript
import type { ComponentType, MarkdownHeading } from 'astro';
import type { CollectionEntry } from 'astro:content';

export interface RenderedEntry {
  Content: ComponentType;
  headings: MarkdownHeading[];
  readingTime: string | undefined;
}
```

Use `CollectionEntry<keyof typeof COLLECTIONS>` for the entry parameter.
