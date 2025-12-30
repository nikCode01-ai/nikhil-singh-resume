"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.contains("dark");
        const next = isDark ? "light" : "dark";

        try {
          window.localStorage.setItem("theme", next);
        } catch {
          // ignore
        }

        root.classList.toggle("dark", next === "dark");
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
