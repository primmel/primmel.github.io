import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

const DIST = resolve('dist');
const OG_DIR = resolve('dist', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

const BG_INDIGO = '#1e3a8a';
const BG_INDIGO_MID = '#3b6ee6';
const ACCENT_BURGUNDY = '#7d2a2a';
const ACCENT_OCHRE = '#c89020';
const TEXT_LIGHT = '#f7f2e7';

function escapeXml(s) {
  return s.replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[c]);
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
    } else {
      line += ' ' + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function buildSvg(title, subtitle) {
  const titleLines = wrapText(title, 32).slice(0, 3);
  const titleFontSize = titleLines.length > 2 ? 40 : titleLines.length > 1 ? 52 : 60;
  const titleStartY = 315 - ((titleLines.length - 1) * titleFontSize * 0.6);
  const titleTspans = titleLines.map((line, i) =>
    `<text x="80" y="${titleStartY + i * titleFontSize * 1.2}" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="${titleFontSize}" font-weight="700" fill="${TEXT_LIGHT}" letter-spacing="-1.5">${escapeXml(line)}</text>`
  ).join('\n');

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_INDIGO}"/>
      <stop offset="100%" stop-color="${BG_INDIGO_MID}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="${HEIGHT}" fill="${ACCENT_BURGUNDY}"/>
  <circle cx="1080" cy="120" r="60" fill="${ACCENT_OCHRE}" opacity="0.15"/>
  <circle cx="1100" cy="100" r="30" fill="${ACCENT_OCHRE}" opacity="0.25"/>
  <text x="80" y="100" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="28" font-weight="600" fill="${ACCENT_OCHRE}" letter-spacing="2">PRIMMEL</text>
  <text x="80" y="135" font-family="'Spline Sans Mono', monospace" font-size="16" fill="${TEXT_LIGHT}" opacity="0.7">Executable standards modelling</text>
  ${titleTspans}
  ${subtitle ? `<text x="80" y="540" font-family="'Spline Sans Mono', monospace" font-size="18" fill="${TEXT_LIGHT}" opacity="0.6">${escapeXml(subtitle)}</text>` : ''}
  <text x="80" y="580" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="16" font-weight="500" fill="${TEXT_LIGHT}" opacity="0.5">www.primmel.org</text>
</svg>`;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return null;
  let title = match[1].trim();
  title = title.replace(/\s*\|\s*Primmel\s*$/, '');
  return title;
}

function extractPath(htmlPath) {
  return htmlPath
    .replace(DIST + '/', '')
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '');
}

async function generateForHtml(htmlFile) {
  const html = readFileSync(htmlFile, 'utf8');
  const title = extractTitle(html) || 'Primmel';

  const pagePath = extractPath(htmlFile);
  const slug = pagePath || 'index';
  const outputPath = join(OG_DIR, `${slug.replace(/\//g, '-')}.png`);

  const displayTitle = title === 'Primmel' ? 'Executable Standards Modelling' : title;
  const subtitle = title === 'Primmel' ? 'primmel.org' : (pagePath ? pagePath.replace(/\//g, ' · ') : '');
  const svg = buildSvg(displayTitle, subtitle);

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  return { slug, outputPath, pagePath };
}

async function findAllHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...await findAllHtml(fullPath));
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  if (!existsSync(OG_DIR)) {
    const { mkdirSync } = await import('node:fs');
    mkdirSync(OG_DIR, { recursive: true });
  }

  const htmlFiles = await findAllHtml(DIST);
  const pages = htmlFiles.filter(f => !f.includes('/og/'));

  let count = 0;
  for (const htmlFile of pages) {
    const result = await generateForHtml(htmlFile);
    if (result) {
      count++;
    }
  }

  console.log(`Generated ${count} OG images in ${OG_DIR}`);
}

main().catch((e) => {
  console.error('OG generation failed:', e);
  process.exit(1);
});
