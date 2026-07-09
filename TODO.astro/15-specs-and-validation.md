# 15 — Specs and validation

## Goal
Build-time content validation. Every page's frontmatter is schema-validated. Broken links are caught. Content is model-driven.

## Content schema validation

Astro Content Collections with Zod enforce frontmatter at build time:
```ts
// src/content/config.ts
const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    sidebar: z.object({
      section: z.string(),
      order: z.number(),
      label: z.string(),
    }),
  }),
});
```

`astro check` validates all content against schemas. `astro build` fails on violations.

## Link validation

Use `astro-expressive-code` or a custom integration to validate:
- All internal links point to existing pages
- All `.prl`/`.prd`/`.prm`/`.yaml` file links exist in `public/`
- All cross-collection references (pillar ↔ audience) are bidirectional

## Example file metadata

Create a typed registry for example files:

```ts
// src/lib/examples-registry.ts
export interface ExampleFile {
  path: string;       // '/examples/files/01-minimal-model.prl'
  extension: 'prl' | 'prd' | 'prm' | 'pws' | 'yaml';
  title: string;
  description: string;
}

export const EXAMPLE_FILES: ExampleFile[] = [
  { path: '/examples/files/01-minimal-model.prl', extension: 'prl', title: 'Minimal model', ... },
  // ...
];
```

Walkthrough pages reference files by ID, not by raw path — single source of truth for file metadata.

## Primmel language spec pages

The docs section should include formal specification pages (or links to the spec subsite) for:
- `.prl` file format specification
- `.prd` file format specification
- `.prm` mapping format specification
- `.pws` workspace format specification
- Primmel DSL grammar (EBNF)

These are the authoritative references; walkthrough examples demonstrate the spec in action.

## Acceptance criteria
- `astro check` passes with zero errors
- `astro build` fails on broken links
- Every example file has typed metadata
- Spec pages exist or link to the spec subsite