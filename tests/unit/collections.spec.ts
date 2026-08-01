import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../../src/lib/collections';

describe('COLLECTIONS', () => {
  it('has architecture, examples, docs, audiences entries', () => {
    expect(COLLECTIONS.architecture).toBe('architecture');
    expect(COLLECTIONS.examples).toBe('examples');
    expect(COLLECTIONS.docs).toBe('docs');
    expect(COLLECTIONS.audiences).toBe('audiences');
    expect(COLLECTIONS.programs).toBe('programs');
  });

  it('has exactly 5 collections (programs joined at TODO.integration/27)', () => {
    expect(Object.keys(COLLECTIONS)).toHaveLength(5);
  });
});
