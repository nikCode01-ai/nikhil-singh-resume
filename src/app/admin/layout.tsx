import { Metadata } from 'next';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import AdminAuthGuard, { AdminLogoutButton } from '@/components/AdminAuthGuard';
import {
  ExternalLink,
  LayoutDashboard,
  Sparkles,
  Database,
  Activity,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Control Center | Portfolio',
  description: 'Manage portfolio content, AI blog generator, and system status',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 dark:text-white group"
            >
              <div className="h-8 w-8 rounded-lg bg-brand-green flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span>
                Portfolio{' '}
                <span className="text-brand-green dark:text-emerald-400">
                  Admin
                </span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/moniter"
                className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Activity className="h-3.5 w-3.5 text-emerald-500" />
                Live Monitor
              </Link>
              <Link
                href="/admin/blogs"
                className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-green dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                AI Blog Studio
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              <Database className="h-3.5 w-3.5" />
              Strapi CMS
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              View Live Site
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>

            <ThemeToggle />
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Portfolio Control Center • Next.js 15 App Router & Groq AI Powered
      </footer>
    </div>
  );
}
