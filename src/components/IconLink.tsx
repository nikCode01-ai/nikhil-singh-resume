import { cn } from '@/lib/utils';

import { ApiUiIcon } from '@/components/ApiUiIcon';
import type { ReactNode } from 'react';

export function IconLink({
  href,
  iconName,
  children,
  className,
}: {
  href: string;
  iconName: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100',
        className
      )}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <ApiUiIcon
        name={iconName}
        size={16}
        color="amber-500"
        darkColor="amber-400"
        className="h-4 w-4"
      />
      <span>{children}</span>
    </a>
  );
}
