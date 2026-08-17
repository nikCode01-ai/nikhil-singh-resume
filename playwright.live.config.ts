import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'https://nikhilsingh-eight.vercel.app',
    trace: 'off',
  },
  projects: [
    {
      name: 'msedge',
      use: {
        channel: 'msedge',
      },
    },
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],
});
