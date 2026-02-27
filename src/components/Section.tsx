import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-12 sm:py-16 md:py-20', className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="space-y-2 mb-8">
        <h2
          id={id ? `${id}-heading` : undefined}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
