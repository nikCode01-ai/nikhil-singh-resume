"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { ApiUiIcon } from "@/components/ApiUiIcon";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-cream px-4 py-16 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl rounded-3xl bg-white/90 p-10 text-center shadow-xl ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/70 dark:ring-white/10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream ring-1 ring-brand-green/10 dark:bg-slate-800/60 dark:ring-white/10">
          <ApiUiIcon name="X" size={26} color="brand-green" darkColor="brand-yellow" className="h-6 w-6" decorative />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">Something went wrong</h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          The page hit an unexpected issue. Please try again or return to a safe route.
        </p>

        {error.digest ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Error ID: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="secondary" size="sm" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="primary" size="sm">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="sm">
            Contact me
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
