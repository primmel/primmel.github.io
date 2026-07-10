import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const DIST = resolve('dist');
const PREVIEW_PORT = 4329;
const URLS = [];

function findAllHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'og' || entry === 'pagefind') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findAllHtml(fullPath));
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function buildUrlList() {
  const htmlFiles = findAllHtml(DIST);
  for (const file of htmlFiles) {
    const relative = file.replace(DIST, '').replace('/index.html', '').replace('.html', '');
    const url = relative === '' ? '/' : relative;
    URLS.push(url);
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function startPreviewServer() {
  const proc = spawn('npx', ['astro', 'preview', '--port', String(PREVIEW_PORT)], {
    stdio: 'pipe',
    cwd: process.cwd(),
  });
  for (let i = 0; i < 30; i++) {
    try {
      const resp = await fetch(`http://localhost:${PREVIEW_PORT}/`);
      if (resp.ok) return proc;
    } catch {
      await sleep(500);
    }
  }
  throw new Error('Preview server did not start');
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  buildUrlList();

  console.log(`Starting preview server on port ${PREVIEW_PORT}...`);
  const preview = await startPreviewServer();

  const browser = await chromium.launch();

  let totalViolations = 0;
  const results = [];

  for (const url of URLS) {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(`http://localhost:${PREVIEW_PORT}${url}`, { waitUntil: 'networkidle' });
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const violations = result.violations;
      const count = violations.reduce((sum, v) => sum + v.nodes.length, 0);
      totalViolations += count;

      if (count > 0) {
        results.push({ url, count, violations });
      }
    } catch (e) {
      console.error(`Failed to audit ${url}: ${e.message}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();
  preview.kill('SIGTERM');

  if (results.length === 0) {
    console.log(`\n✓ All ${URLS.length} pages passed accessibility audit.`);
    process.exit(0);
  }

  console.log(`\n✗ Found ${totalViolations} violations across ${results.length} pages:\n`);
  for (const { url, count, violations } of results) {
    console.log(`  ${url} — ${count} violation(s)`);
    for (const v of violations) {
      console.log(`    [${v.id}] ${v.description} (${v.nodes.length} nodes)`);
      console.log(`       Help: ${v.helpUrl}`);
      for (const node of v.nodes.slice(0, 2)) {
        console.log(`       Target: ${node.target.join(' ')}`);
        if (node.failureSummary) console.log(`       Reason: ${node.failureSummary.replace(/\n/g, ' | ')}`);
      }
    }
    console.log();
  }

  process.exit(1);
}

main().catch((e) => {
  console.error('Accessibility audit failed:', e);
  process.exit(1);
});
