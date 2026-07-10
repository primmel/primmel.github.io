import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/about/', name: 'about' },
  { path: '/architecture/', name: 'architecture' },
  { path: '/architecture/define/', name: 'architecture-define' },
  { path: '/architecture/implement/', name: 'architecture-implement' },
  { path: '/architecture/audiences/auditors/', name: 'architecture-audiences-auditors' },
  { path: '/examples/', name: 'examples' },
  { path: '/examples/minimal-model/', name: 'examples-minimal-model' },
  { path: '/examples/process-flow/', name: 'examples-process-flow' },
  { path: '/docs/', name: 'docs' },
];

for (const page of PAGES) {
  test(`${page.name} visual check`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'light',
    });
    const p = await context.newPage();
    await p.goto(page.path);
    await p.waitForLoadState('networkidle');
    await expect(p).toHaveScreenshot(`${page.name}.png`, {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
    await context.close();
  });

  test(`${page.name} dark mode visual check`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'dark',
    });
    const p = await context.newPage();
    await p.goto(page.path);
    await p.waitForLoadState('networkidle');
    await p.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await expect(p).toHaveScreenshot(`${page.name}-dark.png`, {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
    await context.close();
  });
}

test('mobile sidebar drawer opens on architecture page', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto('/architecture/define/');
  await page.waitForLoadState('networkidle');

  const hamburger = page.locator('#hamburger');
  await hamburger.click();
  await page.waitForTimeout(300);

  const sidebar = page.locator('.sidebar');
  await expect(sidebar).toBeVisible();
  await expect(page.locator('body')).toHaveClass(/sidebar-open/);

  await context.close();
});
