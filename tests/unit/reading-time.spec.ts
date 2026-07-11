import { describe, it, expect } from 'vitest';
import { estimateReadingTime, wordCount, makeExcerpt } from '../../src/lib/reading-time';

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

describe('makeExcerpt', () => {
  it('strips markdown syntax characters', () => {
    const md = '# Heading\n\n**bold** and `code` and > quote';
    const excerpt = makeExcerpt(md);
    expect(excerpt).not.toContain('#');
    expect(excerpt).not.toContain('**');
    expect(excerpt).not.toContain('`');
    expect(excerpt).not.toContain('>');
  });

  it('collapses whitespace and newlines', () => {
    const md = 'First\n\n\nparagraph\n\nSecond paragraph';
    const excerpt = makeExcerpt(md);
    expect(excerpt).not.toContain('\n');
    expect(excerpt).toMatch(/First.*paragraph.*Second.*paragraph/);
  });

  it('truncates long text and appends ellipsis', () => {
    const long = Array(300).fill('word').join(' ');
    const excerpt = makeExcerpt(long, 100);
    expect(excerpt.length).toBeLessThanOrEqual(101);
    expect(excerpt).toContain('…');
  });

  it('returns full text when under maxLen', () => {
    const short = 'Short text here.';
    expect(makeExcerpt(short, 200)).toBe('Short text here.');
  });

  it('strips fenced code blocks', () => {
    const md = 'Before\n```js\nconst x = 1;\n```\nAfter';
    const excerpt = makeExcerpt(md);
    expect(excerpt).not.toContain('const');
    expect(excerpt).not.toContain('```');
    expect(excerpt).toContain('Before');
    expect(excerpt).toContain('After');
  });

  it('converts markdown links to text', () => {
    const md = 'See [the docs](/docs) for more';
    const excerpt = makeExcerpt(md);
    expect(excerpt).toContain('the docs');
    expect(excerpt).not.toContain('](/docs)');
  });

  it('handles empty string', () => {
    expect(makeExcerpt('')).toBe('');
  });
});
