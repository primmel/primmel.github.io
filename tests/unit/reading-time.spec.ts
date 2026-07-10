import { describe, it, expect } from 'vitest';
import { estimateReadingTime, wordCount } from '../../src/lib/reading-time';

describe('wordCount', () => {
  it('counts words in a simple string', () => {
    expect(wordCount('hello world')).toBe(2);
  });

  it('returns 0 for empty string', () => {
    expect(wordCount('')).toBe(0);
  });

  it('returns 0 for whitespace-only string', () => {
    expect(wordCount('   ')).toBe(0);
  });

  it('handles single word', () => {
    expect(wordCount('Primmel')).toBe(1);
  });

  it('handles newlines and tabs', () => {
    expect(wordCount('hello\nworld\tfoo')).toBe(3);
  });

  it('counts markdown text', () => {
    const md = '# Title\n\nThis is a paragraph with **bold** text.';
    expect(wordCount(md)).toBe(9);
  });
});

describe('estimateReadingTime', () => {
  it('returns at least 1 min for short text', () => {
    expect(estimateReadingTime('hello')).toBe('1 min read');
  });

  it('returns 1 min for ~200 words', () => {
    const text = Array(200).fill('word').join(' ');
    expect(estimateReadingTime(text)).toBe('1 min read');
  });

  it('returns 5 min for ~1000 words', () => {
    const text = Array(1000).fill('word').join(' ');
    expect(estimateReadingTime(text)).toBe('5 min read');
  });

  it('rounds up for partial minutes', () => {
    const text = Array(250).fill('word').join(' ');
    expect(estimateReadingTime(text)).toBe('1 min read');
  });

  it('handles empty string', () => {
    expect(estimateReadingTime('')).toBe('1 min read');
  });

  it('format is always "N min read"', () => {
    const text = Array(5000).fill('word').join(' ');
    expect(estimateReadingTime(text)).toMatch(/^\d+ min read$/);
  });
});
