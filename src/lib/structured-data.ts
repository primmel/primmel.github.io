import { SITE } from '../consts';

export type SchemaType = 'website' | 'article';

export interface PageMeta {
  title: string;
  description: string;
  url: URL;
  schemaType: SchemaType;
}

export interface SeoData {
  fullTitle: string;
  canonicalUrl: string;
  ogImage: string;
  jsonLdScripts: object[];
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.author,
    url: 'https://www.ribose.com',
    logo: `${SITE.url}/primmel-logo-light.svg`,
  };
}

function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: SITE.url,
    description: SITE.description,
    publisher: { '@type': 'Organization', name: SITE.author },
  };
}

function buildArticleSchema(meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: meta.title,
    description: meta.description,
    url: meta.url.toString(),
    publisher: { '@type': 'Organization', name: SITE.author },
  };
}

function buildBreadcrumbSchema(meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: meta.title, item: meta.url.toString() },
    ],
  };
}

function deriveOgImage(pathname: string): string {
  const pagePath = pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');
  return pagePath ? `/og/${pagePath}.png` : '/og/index.png';
}

export function buildSeoData(meta: PageMeta): SeoData {
  const fullTitle = meta.title === SITE.title ? meta.title : `${meta.title} | ${SITE.title}`;
  const canonicalUrl = meta.url.toString();
  const ogImage = deriveOgImage(meta.url.pathname);
  const isHome = meta.url.pathname === '/';

  const primarySchema = meta.schemaType === 'article'
    ? buildArticleSchema(meta)
    : buildWebsiteSchema();

  const jsonLdScripts: object[] = [primarySchema, buildOrganizationSchema()];
  if (!isHome) jsonLdScripts.push(buildBreadcrumbSchema(meta));

  return { fullTitle, canonicalUrl, ogImage, jsonLdScripts };
}
