import { getCollection } from 'astro:content';
import { estimateReadingTime } from './reading-time';
import type { CollectionName } from './collections';

export async function getCollectionSlugs(collection: CollectionName) {
  const entries = await getCollection(collection);
  return entries
    .filter(entry => entry.id !== 'index')
    .map(entry => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

export function computeReadingTime(body: string | undefined): string | undefined {
  return body ? estimateReadingTime(body) : undefined;
}
