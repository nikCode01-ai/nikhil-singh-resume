import { test, expect } from '@playwright/test';

test('homepage loads and animations render without breaking layout', async ({
  page,
}) => {
  // Go to homepage
  await page.goto('/');

  // Wait for the hero section to be visible
  const heroSection = page.locator('section', { hasText: "Hi, I'm" }).first();
  await expect(heroSection).toBeVisible();

  // Scroll down to trigger About section animations
  await page.evaluate(() => window.scrollTo(0, 800));

  // Wait a bit for animations to trigger
  await page.waitForTimeout(1000);

  // Verify About section is visible
  const aboutSection = page.locator('section', { hasText: 'Who is' }).first();
  await expect(aboutSection).toBeVisible();

  // Check that there are no horizontal scrollbars (layout break check)
  const hasHorizontalScrollbar = await page.evaluate(() => {
    return (
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
    );
  });
  expect(hasHorizontalScrollbar).toBeFalsy();

  // Check that no console errors occurred
  const logs: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') logs.push(msg.text());
  });

  // A brief wait to catch async errors
  await page.waitForTimeout(500);
  expect(logs.length).toBe(0);
});
