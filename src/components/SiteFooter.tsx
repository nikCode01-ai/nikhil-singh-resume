import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {year} Nikhil Singh. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-slate-900" href="/projects">
            Projects
          </Link>
          <Link className="hover:text-slate-900" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
