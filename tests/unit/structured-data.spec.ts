import { describe, it, expect } from 'vitest';
import { buildSeoData } from '../../src/lib/structured-data';

function makeUrl(pathname: string): URL {
  return new URL(`https://www.primmel.org${pathname}`);
}

describe('buildSeoData — title', () => {
  it('uses bare title when it matches SITE.title', () => {
    const seo = buildSeoData({
      title: 'Primmel',
      description: 'desc',
      url: makeUrl('/'),
      schemaType: 'website',
    });
    expect(seo.fullTitle).toBe('Primmel');
  });

  it('appends site name for subpages', () => {
    const seo = buildSeoData({
      title: 'Define',
      description: 'desc',
      url: makeUrl('/architecture/define/'),
      schemaType: 'article',
    });
    expect(seo.fullTitle).toBe('Define | Primmel');
  });
});

describe('buildSeoData — canonical URL', () => {
  it('preserves the full URL', () => {
    const seo = buildSeoData({
      title: 'Test',
      description: 'd',
      url: makeUrl('/docs/introduction/'),
      schemaType: 'article',
    });
    expect(seo.canonicalUrl).toBe('https://www.primmel.org/docs/introduction/');
  });
});

describe('buildSeoData — OG image', () => {
  it('uses index.png for home page', () => {
    const seo = buildSeoData({
      title: 'Primmel',
      description: 'd',
      url: makeUrl('/'),
      schemaType: 'website',
    });
    expect(seo.ogImage).toBe('/og/index.png');
  });

  it('derives path from URL pathname', () => {
    const seo = buildSeoData({
      title: 'Define',
      description: 'd',
      url: makeUrl('/architecture/define/'),
      schemaType: 'article',
    });
    expect(seo.ogImage).toBe('/og/architecture-define.png');
  });

  it('handles nested paths', () => {
    const seo = buildSeoData({
      title: 'Auditors',
      description: 'd',
      url: makeUrl('/architecture/audiences/auditors/'),
      schemaType: 'article',
    });
    expect(seo.ogImage).toBe('/og/architecture-audiences-auditors.png');
  });
});

describe('buildSeoData — JSON-LD', () => {
  it('includes WebSite schema for home page', () => {
    const seo = buildSeoData({
      title: 'Primmel',
      description: 'd',
      url: makeUrl('/'),
      schemaType: 'website',
    });
    const types = seo.jsonLdScripts.map(s => (s as { '@type': string })['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('Organization');
  });

  it('includes TechArticle schema for doc pages', () => {
    const seo = buildSeoData({
      title: 'Define',
      description: 'd',
      url: makeUrl('/architecture/define/'),
      schemaType: 'article',
    });
    const types = seo.jsonLdScripts.map(s => (s as { '@type': string })['@type']);
    expect(types).toContain('TechArticle');
  });

  it('includes BreadcrumbList for subpages', () => {
    const seo = buildSeoData({
      title: 'Define',
      description: 'd',
      url: makeUrl('/architecture/define/'),
      schemaType: 'article',
    });
    const types = seo.jsonLdScripts.map(s => (s as { '@type': string })['@type']);
    expect(types).toContain('BreadcrumbList');
  });

  it('omits BreadcrumbList for home page', () => {
    const seo = buildSeoData({
      title: 'Primmel',
      description: 'd',
      url: makeUrl('/'),
      schemaType: 'website',
    });
    const types = seo.jsonLdScripts.map(s => (s as { '@type': string })['@type']);
    expect(types).not.toContain('BreadcrumbList');
  });

  it('always includes Organization schema', () => {
    for (const schemaType of ['website', 'article'] as const) {
      const seo = buildSeoData({
        title: 'T',
        description: 'd',
        url: makeUrl('/architecture/define/'),
        schemaType,
      });
      const types = seo.jsonLdScripts.map(s => (s as { '@type': string })['@type']);
      expect(types).toContain('Organization');
    }
  });

  it('TechArticle carries headline and description', () => {
    const seo = buildSeoData({
      title: 'My Title',
      description: 'My description',
      url: makeUrl('/docs/intro/'),
      schemaType: 'article',
    });
    const article = seo.jsonLdScripts.find(
      s => (s as { '@type': string })['@type'] === 'TechArticle',
    ) as { headline: string; description: string };
    expect(article.headline).toBe('My Title');
    expect(article.description).toBe('My description');
  });
});
