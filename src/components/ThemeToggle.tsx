'use client';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/Button';

export function ThemeToggle() {
  return (
    <Button
      type="button"
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';

        try {
          window.localStorage.setItem('theme', next);
        } catch {
          // ignore
        }

        root.classList.toggle('dark', next === 'dark');
      }}
      variant="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
