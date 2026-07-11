import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../../src/lib/collections';

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
