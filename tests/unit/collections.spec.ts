import { describe, it, expect } from 'vitest';
import {
  COLLECTIONS,
  COLLECTION_TITLES,
  COLLECTION_PATHS,
  hrefFor,
} from '../../src/lib/collections';

describe('COLLECTIONS', () => {
  it('has architecture, examples, docs entries', () => {
    expect(COLLECTIONS.architecture).toBe('architecture');
    expect(COLLECTIONS.examples).toBe('examples');
    expect(COLLECTIONS.docs).toBe('docs');
  });

  it('has exactly 3 collections', () => {
    expect(Object.keys(COLLECTIONS)).toHaveLength(3);
  });
});

describe('COLLECTION_TITLES', () => {
  it('has a title for each collection', () => {
    for (const name of Object.keys(COLLECTIONS) as Array<keyof typeof COLLECTIONS>) {
      expect(COLLECTION_TITLES[name]).toBeTruthy();
    }
  });

  it('titles are capitalized', () => {
    expect(COLLECTION_TITLES.architecture).toBe('Architecture');
    expect(COLLECTION_TITLES.examples).toBe('Examples');
    expect(COLLECTION_TITLES.docs).toBe('Docs');
  });
});

describe('COLLECTION_PATHS', () => {
  it('returns root paths with trailing slash', () => {
    expect(COLLECTION_PATHS.architecture).toBe('/architecture/');
    expect(COLLECTION_PATHS.examples).toBe('/examples/');
    expect(COLLECTION_PATHS.docs).toBe('/docs/');
  });
});

describe('hrefFor', () => {
  it('returns collection root when no slug', () => {
    expect(hrefFor('architecture')).toBe('/architecture/');
  });

  it('returns collection root for index slug', () => {
    expect(hrefFor('architecture', 'index')).toBe('/architecture/');
  });

  it('returns full path for named slug', () => {
    expect(hrefFor('architecture', 'define')).toBe('/architecture/define');
  });

  it('handles nested slugs', () => {
    expect(hrefFor('architecture', 'audiences/auditors')).toBe('/architecture/audiences/auditors');
  });
});
