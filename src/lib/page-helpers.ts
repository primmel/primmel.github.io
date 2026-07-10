import { getCollection, render } from 'astro:content';
import { estimateReadingTime } from './reading-time';
import type { CollectionName } from './collections';

export interface RenderedEntry {
  Content: any;
  headings: any[];
  readingTime: string | undefined;
}

interface BaseEntry {
  id: string;
  body?: string;
  data: Record<string, unknown>;
}

export async function getCollectionSlugs(collection: CollectionName) {
  const entries = await getCollection(collection);
  return entries
    .filter(entry => entry.id !== 'index')
    .map(entry => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

export async function renderEntry(entry: BaseEntry): Promise<RenderedEntry> {
  const { Content, headings } = await render(entry as any);
  const readingTime = entry.body ? estimateReadingTime(entry.body) : undefined;
  return { Content, headings, readingTime };
}
