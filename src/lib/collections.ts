export const COLLECTIONS = {
  architecture: 'architecture',
  examples: 'examples',
  docs: 'docs',
  audiences: 'audiences',
  programs: 'programs',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
