import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3002',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Mobile Pixel',
      use: { ...devices['Pixel 7'], channel: 'chrome' },
    },
    {
      name: 'Mobile iPhone',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Tablet iPad',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: {
    command: 'npx next start -p 3002',
    url: process.env.BASE_URL || 'http://localhost:3002',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
