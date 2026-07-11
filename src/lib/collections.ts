export const COLLECTIONS = {
  architecture: 'architecture',
  examples: 'examples',
  docs: 'docs',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
