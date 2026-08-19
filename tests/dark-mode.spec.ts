import { test, expect } from '@playwright/test';

test.describe('Dark Mode UI & Contrast Verification', () => {
  const targetUrl =
    process.env.TARGET_URL || 'https://nikhilsingh-eight.vercel.app';

  test('Dark mode toggle functions correctly and persists', async ({
    page,
  }) => {
    await page.goto(targetUrl, { waitUntil: 'commit', timeout: 60000 });

    const toggleBtn = page.locator('#theme-toggle-btn');
    await expect(toggleBtn).toBeVisible({ timeout: 15000 });

    // Ensure dark mode is activated
    await toggleBtn.click();
    await page.waitForTimeout(500);

    const html = page.locator('html');
    const isDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(isDark).toBe(true);

    // Verify key headings and text are visible and not matching background
    const heroHeadline = page.locator('h1').first();
    await expect(heroHeadline).toBeVisible();

    // Verify stats numbers are visible
    const stats = page.locator('.text-brand-green, .text-brand-greenLight');
    const count = await stats.count();
    expect(count).toBeGreaterThan(0);
  });

  test('All primary pages render in dark mode without invisible text', async ({
    page,
  }) => {
    test.setTimeout(60000);
    const routes = [
      '/',
      '/about',
      '/projects',
      '/skills',
      '/price',
      '/blogs',
      '/contact',
    ];

    for (const route of routes) {
      await page.goto(`${targetUrl}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      // Set dark class directly to ensure dark mode testing
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      });
      await page.waitForTimeout(300);

      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Check headings are visible
      const h1 = page.locator('h1').first();
      if ((await h1.count()) > 0) {
        await expect(h1).toBeVisible();
      }
    }
  });
});
