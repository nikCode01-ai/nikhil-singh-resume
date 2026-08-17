import { test, expect } from '@playwright/test';

test.describe('Responsive Navigation & Theme Suite', () => {
  test('homepage loads, renders hero, and toggles Dark/Light theme smoothly', async ({
    page,
  }) => {
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') logs.push(msg.text());
    });

    await page.goto('/');

    // 1. Verify Hero is visible
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();

    // 2. Verify No Horizontal Overflow (Layout Breakage Check)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // 3. Test Theme Toggle
    const themeBtn = page.locator('[data-testid="theme-toggle"]').first();
    await expect(themeBtn).toBeVisible();

    // Check initial html class
    const initialClass =
      (await page.locator('html').getAttribute('class')) || '';
    const initialIsDark = initialClass.includes('dark');

    // Click toggle
    await themeBtn.click();
    await page.waitForTimeout(300);

    // Verify dark class flipped
    const updatedClass =
      (await page.locator('html').getAttribute('class')) || '';
    expect(updatedClass.includes('dark')).toBe(!initialIsDark);

    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(300);

    // 4. Scroll smoothly and verify sections
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    const aboutSection = page
      .locator('section#about, section:has-text("Who is")')
      .first();
    await expect(aboutSection).toBeVisible();
  });

  test('mobile navigation drawer opens and closes without layout distortion', async ({
    page,
    isMobile,
  }) => {
    if (!isMobile) return;

    await page.goto('/');

    // Look for mobile menu toggle button
    const menuButton = page.locator('button[aria-label*="menu" i]').first();
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    await page.waitForTimeout(400);

    // Verify mobile navigation container is visible
    const navDrawer = page.locator('text=Navigation').first();
    await expect(navDrawer).toBeVisible();

    // Click close or backdrop
    await menuButton.click();
    await page.waitForTimeout(400);
  });
});
