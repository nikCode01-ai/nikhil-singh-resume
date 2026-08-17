import { test, expect } from '@playwright/test';

test.describe('Live Deployment Verification', () => {
  const targetUrl =
    process.env.TARGET_URL || 'https://nikhilsingh-eight.vercel.app';

  test.describe.configure({ mode: 'serial', timeout: 90000 });

  test('Homepage loads with expected title and elements', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(targetUrl, {
      waitUntil: 'commit',
      timeout: 60000,
    });
    expect(response?.status()).toBeLessThan(400);

    await expect(page).toHaveTitle(/Nikhil/i, { timeout: 30000 });
    const body = page.locator('body');
    await expect(body).toBeVisible();
    console.log(
      'Homepage verified successfully. Console errors:',
      consoleErrors.length
    );
  });

  test('Blogs page loads and displays blog cards', async ({ page }) => {
    const response = await page.goto(`${targetUrl}/blogs`, {
      waitUntil: 'commit',
      timeout: 60000,
    });
    expect(response?.status()).toBeLessThan(400);

    const heading = page.getByRole('heading', { name: /Latest Insights/i });
    await expect(heading).toBeVisible({ timeout: 30000 });
  });

  test('Projects page loads cleanly', async ({ page }) => {
    const response = await page.goto(`${targetUrl}/projects`, {
      waitUntil: 'commit',
      timeout: 60000,
    });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Chatbot opens and switches between Menu and AI chat modes', async ({
    page,
  }) => {
    await page.goto(targetUrl, { waitUntil: 'commit', timeout: 60000 });

    const chatButton = page.locator('button[aria-label="Open chat"]');
    await chatButton.waitFor({ state: 'visible', timeout: 45000 });
    await expect(chatButton).toBeVisible();
    await chatButton.click();

    const dialog = page.locator('div[role="dialog"][aria-label="Chatbot"]');
    await expect(dialog).toBeVisible({ timeout: 15000 });

    const menuButton = page.getByRole('button', { name: 'Menu', exact: true });
    const aiButton = page.getByRole('button', { name: 'AI Chat', exact: true });
    await expect(menuButton).toBeVisible();
    await expect(aiButton).toBeVisible();

    // Switch to AI Chat
    await aiButton.click();
    const input = page.getByPlaceholder('Ask me anything...');
    await expect(input).toBeVisible();

    // Switch back to Menu
    await menuButton.click();
    await expect(
      page.getByRole('button', { name: 'About / Summary' })
    ).toBeVisible();

    // Close chatbot
    const closeBtn = page.getByRole('button', { name: 'Close chat' });
    await closeBtn.click();
    await expect(chatButton).toBeVisible();
  });
});
