import { test, expect } from '@playwright/test';

test.describe('UI Final QA Regression', () => {
  test('Home page sections (Services, FAQ, Contact) load and animations do not block interactions', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check Services section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();

    // Check FAQ section
    const faqSection = page.locator('#faqs');
    await expect(faqSection).toBeVisible();

    // Check Contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Ensure contact form inputs are usable
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
    await nameInput.click(); // ensure it's clickable and not blocked by pointer-events: none
    await nameInput.fill('QA Tester');

    // Click a service card or something
    // (Assuming there's a button or link we can interact with to ensure interactivity)
  });

  test('Pricing page loads and animations do not block interactions', async ({
    page,
  }) => {
    await page.goto('/price', { waitUntil: 'domcontentloaded' });

    // Wait for the pricing section to load
    const pricingHeading = page.getByRole('heading', {
      name: /Pricing Model/i,
    });
    await expect(pricingHeading).toBeVisible();

    // Check a plan element and ensure it's interactive
    const hourlyPlan = page.locator('text=Hourly').first();
    await expect(hourlyPlan).toBeVisible();
    await hourlyPlan.click();
  });
});
