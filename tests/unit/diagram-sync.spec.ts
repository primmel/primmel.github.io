import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

/**
 * The diagram pipeline's drift gate (TODO.integration/27): the site's
 * public/diagrams/shared/ ≡ the smart repo's sources, byte-clean
 * (scripts/sync-diagrams.mjs --check is the single proof command).
 */
describe('the shared diagram set (the pipeline)', () => {
  it('the site\'s shared diagrams are byte-identical to the sources', () => {
    const out = execFileSync('node', [join(__dirname, '../../scripts/sync-diagrams.mjs'), '--check'], {
      encoding: 'utf-8',
      cwd: join(__dirname, '../..'),
    });
    expect(out).toContain('≡ the sources');
  });
});
