import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const SMART = process.env.SMART_REPO ?? resolve(ROOT, '..', '..', 'oimlsmart', 'smart');

/**
 * The diagram pipeline's drift gate (TODO.integration/27): the site's
 * public/diagrams/shared/ ≡ the smart repo's sources, byte-clean
 * (scripts/sync-diagrams.mjs --check is the single proof command).
 *
 * Skip-loud when the (private) smart checkout is absent — the same
 * skip-guard pattern as the smart repo's own freshness suite: CI for
 * this public repo cannot see the SSOT, so the gate runs wherever the
 * sources are present and warns visibly where they are not.
 */
const HAS_SOURCES = existsSync(join(SMART, 'docs', 'architecture', 'diagrams'));
if (!HAS_SOURCES) {
  console.warn(
    `diagram-sync gate SKIPPED: no diagram sources under ${SMART} ` +
      '(check out oimlsmart/smart beside this repo, or set SMART_REPO)',
  );
}

describe.skipIf(!HAS_SOURCES)('the shared diagram set (the pipeline)', () => {
  it('the site\'s shared diagrams are byte-identical to the sources', () => {
    const out = execFileSync('node', [join(ROOT, 'scripts/sync-diagrams.mjs'), '--check'], {
      encoding: 'utf-8',
      cwd: ROOT,
    });
    expect(out).toContain('≡ the sources');
  });
});
