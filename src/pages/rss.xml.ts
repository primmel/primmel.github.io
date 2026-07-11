import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { execSync } from 'node:child_process';
import { SITE } from '../consts';
import { COLLECTIONS } from '../lib/collections';
import { makeExcerpt } from '../lib/reading-time';

function getGitDate(collection: string, id: string): Date {
  const filePath = `src/content/${collection}/${id}.md`;
  try {
    const ts = execSync(`git log -1 --format=%ct -- "${filePath}"`).toString().trim();
    const num = parseInt(ts, 10);
    if (!isNaN(num) && num > 0) return new Date(num * 1000);
  } catch {
    // git not available or file untracked — fall through to default
  }
  return new Date('2026-01-01');
}

export async function GET(context: { site: URL }) {
  const docs = await getCollection(COLLECTIONS.docs);
  const arch = await getCollection(COLLECTIONS.architecture);
  const examples = await getCollection(COLLECTIONS.examples);
  const all = [...docs, ...arch, ...examples].filter(e => e.id !== 'index');

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: all.map(entry => ({
      title: entry.data.title,
      description: entry.body ? makeExcerpt(entry.body) : undefined,
      pubDate: getGitDate(entry.collection, entry.id),
      link: `/${entry.collection}/${entry.id}/`,
    })),
  });
}
