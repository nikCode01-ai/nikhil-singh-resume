import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-emerald-600 dark:text-emerald-400">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm transition-all"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
