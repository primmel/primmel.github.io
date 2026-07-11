import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../../src/lib/collections';

describe('COLLECTIONS', () => {
  it('has architecture, examples, docs, audiences entries', () => {
    expect(COLLECTIONS.architecture).toBe('architecture');
    expect(COLLECTIONS.examples).toBe('examples');
    expect(COLLECTIONS.docs).toBe('docs');
    expect(COLLECTIONS.audiences).toBe('audiences');
  });

  it('has exactly 4 collections', () => {
    expect(Object.keys(COLLECTIONS)).toHaveLength(4);
  });
});
