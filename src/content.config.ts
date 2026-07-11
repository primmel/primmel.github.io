import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const sidebarSchema = z.object({
  section: z.string(),
  order: z.number(),
  label: z.string(),
}).optional();

const architecture = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/architecture' }),
  schema: z.object({
    title: z.string(),
    pillar: z.enum(['define', 'reference', 'implement', 'operate', 'audit']).optional(),
    audience: z.enum(['publishers', 'readers', 'implementers', 'operators', 'auditors']).optional(),
    side: z.enum(['reference', 'application']).optional(),
    summary: z.string().optional(),
    sidebar: sidebarSchema,
  }),
});

const examples = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/examples' }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    demonstrates: z.array(z.string()).nullish().default([]),
    sourceFile: z.string().optional(),
    sidebar: sidebarSchema,
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    sidebar: sidebarSchema,
  }),
});

const audiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/audiences' }),
  schema: z.object({
    title: z.string(),
    audience: z.enum(['publishers', 'readers', 'implementers', 'operators', 'auditors']).optional(),
    sidebar: sidebarSchema,
  }),
});

export const collections = { architecture, examples, docs, audiences };
