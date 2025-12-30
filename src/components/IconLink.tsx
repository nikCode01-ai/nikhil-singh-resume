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
        "inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900",
        className,
      )}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <Icon className="h-4 w-4 text-blue-700" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
