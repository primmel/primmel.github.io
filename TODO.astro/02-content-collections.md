# 02 — Content collections

## Goal
Replace untyped markdown with Astro Content Collections backed by Zod schemas. Every page gets typed frontmatter. Build fails on invalid content.

## Collections

### `architecture` collection

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const architecture = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pillar: z.enum(['define', 'reference', 'implement', 'operate', 'audit']).optional(),
    audience: z.enum(['publishers', 'readers', 'implementers', 'operators', 'auditors']).optional(),
    side: z.enum(['reference', 'application']).optional(),
    sidebar: z.object({
      section: z.string(),
      order: z.number(),
      label: z.string(),
    }).optional(),
  }),
});
```

### `examples` collection
```ts
const examples = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    demonstrates: z.array(z.string()),
    sourceFile: z.string().optional(), // link to .prl file
    sidebar: z.object({ label: z.string(), order: z.number() }).optional(),
  }),
});
```

### `docs` collection
```ts
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sidebar: z.object({ section: z.string(), order: z.number(), label: z.string() }).optional(),
  }),
});
```

## File layout

```
src/content/
├── config.ts             ← Zod schemas (single source of truth for content typing)
├── architecture/
│   ├── index.md
│   ├── define.md
│   ├── reference.md
│   ├── implement.md
│   ├── operate.md
│   ├── audit.md
│   └── audiences/
│       ├── publishers.md
│       ├── readers.md
│       ├── implementers.md
│       ├── operators.md
│       └── auditors.md
├── examples/
│   ├── index.md
│   ├── minimal-model.md
│   ├── data-and-registries.md
│   ├── process-flow.md
│   ├── compliance-and-measurement.md
│   ├── approval-workflow.md
│   └── implementation-package.md
└── docs/
    ├── introduction.md
    ├── first-model.md
    ├── data-model.md
    ├── process-model.md
    ├── compliance.md
    ├── measurement.md
    └── mapping.md
```

## Sidebar derivation (DRY)

```ts
// src/lib/navigation.ts
export function deriveSidebar(section: string) {
  // Read collection entries, filter by section, sort by sidebar.order
  // Returns the nav tree — no hardcoded config needed
}
```

## Acceptance criteria
- All 29 markdown pages migrated to content collections
- Frontmatter validates against Zod schemas
- `astro build` fails on schema violations
- Sidebar derived from collection metadata, not hardcoded