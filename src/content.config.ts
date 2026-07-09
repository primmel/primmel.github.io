import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const architecture = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/architecture' }),
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

const examples = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/examples' }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    demonstrates: z.array(z.string()).nullish().default([]),
    sourceFile: z.string().optional(),
    sidebar: z.object({
      section: z.string(),
      order: z.number(),
      label: z.string(),
    }).optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    sidebar: z.object({
      section: z.string(),
      order: z.number(),
      label: z.string(),
    }).optional(),
  }),
});

export const collections = { architecture, examples, docs };