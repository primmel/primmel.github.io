import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';
const broken = [];

function getHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...getHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
const knownPaths = new Set();

for (const file of htmlFiles) {
  let p = file.replace(distDir, '').replace('/index.html', '/').replace('.html', '/');
  knownPaths.add(p);
  knownPaths.add(p.replace(/\/$/, ''));
}

for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (href.startsWith('//') || href.startsWith('#')) continue;
    const basePath = href.split('#')[0];
    if (href.match(/\.(css|js|png|jpg|svg|ico|webmanifest|xml|prl|prd|prm|yaml)$/)) continue;

    const norm = basePath.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
    const noSlash = norm.replace(/\/$/, '');

    if (!knownPaths.has(norm) && !knownPaths.has(noSlash) && !knownPaths.has(href)) {
      broken.push(`${file.replace(distDir + '/', '')} → ${href}`);
    }
  }
}

if (broken.length > 0) {
  console.error(`\n❌ ${broken.length} broken link(s):\n`);
  broken.forEach(b => console.error(`  ${b}`));
  process.exit(1);
} else {
  console.log(`\n✅ All internal links valid across ${htmlFiles.length} pages.`);
}