import { test, expect } from '@playwright/test';

const ALL_PAGES = [
  '/',
  '/about/',
  '/404/',
  '/architecture/',
  '/architecture/define/',
  '/architecture/reference/',
  '/architecture/implement/',
  '/architecture/operate/',
  '/architecture/audit/',
  '/architecture/platform/',
  '/audiences/',
  '/audiences/publishers/',
  '/audiences/readers/',
  '/audiences/implementers/',
  '/audiences/operators/',
  '/audiences/auditors/',
  '/programs/',
  '/examples/',
  '/examples/minimal-model/',
  '/examples/data-and-registries/',
  '/examples/process-flow/',
  '/examples/compliance-and-measurement/',
  '/examples/approval-workflow/',
  '/examples/implementation-package/',
  '/docs/introduction/',
  '/docs/first-model/',
  '/docs/process-model/',
  '/docs/data-model/',
  '/docs/mapping/',
  '/docs/compliance/',
  '/docs/measurement/',
];

test.describe('Page contracts', () => {
  for (const path of ALL_PAGES) {
    test(`${path} returns 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });

    test(`${path} has title and meta description`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('head title')).not.toBeEmpty();
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
    });

    test(`${path} has og:image meta tag`, async ({ page }) => {
      await page.goto(path);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
      expect(ogImage).toMatch(/^\/og\/.*\.png$/);
    });
  }
});

test.describe('Sidebar contracts', () => {
  test('architecture sidebar has correct active link', async ({ page }) => {
    await page.goto('/architecture/define/');
    const activeLink = page.locator('.sidebar-link[aria-current="page"]');
    await expect(activeLink).toHaveAttribute('href', '/architecture/define');
  });

  test('examples sidebar links resolve', async ({ page }) => {
    await page.goto('/examples/');
    const links = await page.locator('.sidebar-link').all();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/examples/')) {
        const response = await page.request.get(href);
        expect(response.status()).toBe(200);
      }
    }
  });

  test('docs sidebar links resolve', async ({ page }) => {
    await page.goto('/docs/introduction/');
    const links = await page.locator('.sidebar-link').all();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/docs/')) {
        const response = await page.request.get(href);
        expect(response.status()).toBe(200);
      }
    }
  });
});

test.describe('Code block contracts', () => {
  test('code blocks get copy buttons after hydration', async ({ page }) => {
    await page.goto('/docs/introduction/');
    await page.waitForTimeout(2000);
    const copyButtons = await page.locator('.copy-btn').count();
    expect(copyButtons).toBeGreaterThan(0);
  });
});

test.describe('Feed contracts', () => {
  test('RSS feed returns valid XML', async ({ request }) => {
    const response = await request.get('/rss.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<rss');
    expect(body).toContain('<channel');
  });

  test('sitemap returns valid XML', async ({ request }) => {
    const response = await request.get('/sitemap-index.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<sitemapindex');
  });
});

test.describe('404 handling', () => {
  test('unknown URL returns 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/404|not found/i);
  });
});
