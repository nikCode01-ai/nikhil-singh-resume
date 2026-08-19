'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#f7f5ef] p-4 text-slate-900">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold">Unexpected Server Error</h1>
          <p className="mt-2 text-sm text-slate-600">
            An unexpected error occurred while processing this request. Please
            try refreshing or return to the homepage.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-[#1f4d37] px-4 py-2 text-sm font-semibold text-white hover:bg-[#173a2a]"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
