import type { Metadata } from 'next';
import { ButtonLink } from '@/components/Button';
import { Home, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-brand-cream px-4 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-brand-green dark:text-emerald-400">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary" size="lg">
            View Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
