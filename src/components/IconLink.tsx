import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function IconLink({
  href,
  icon: Icon,
  children,
  className,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100",
        className,
      )}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <Icon className="h-4 w-4 text-amber-500 dark:text-amber-400" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
