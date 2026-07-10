import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context: { site: URL }) {
  const docs = await getCollection('docs');
  const arch = await getCollection('architecture');
  const examples = await getCollection('examples');
  const all = [...docs, ...arch, ...examples].filter(e => e.id !== 'index');

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: all.map(entry => ({
      title: entry.data.title,
      pubDate: new Date(),
      link: `/${entry.collection}/${entry.id}/`,
    })),
  });
}