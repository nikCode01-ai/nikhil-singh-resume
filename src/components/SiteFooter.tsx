import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-slate-600 dark:text-slate-400">
          © {year} Nikhil Singh. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" href="/projects">
            Projects
          </Link>
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
