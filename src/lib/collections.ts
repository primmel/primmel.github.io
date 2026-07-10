export const COLLECTIONS = {
  architecture: 'architecture',
  examples: 'examples',
  docs: 'docs',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export const COLLECTION_TITLES: Record<CollectionName, string> = {
  architecture: 'Architecture',
  examples: 'Examples',
  docs: 'Docs',
};

export const COLLECTION_PATHS: Record<CollectionName, string> = {
  architecture: '/architecture/',
  examples: '/examples/',
  docs: '/docs/',
};

export function hrefFor(collection: CollectionName, slug?: string): string {
  if (!slug || slug === 'index') return COLLECTION_PATHS[collection];
  return `${COLLECTION_PATHS[collection]}${slug}`;
}
