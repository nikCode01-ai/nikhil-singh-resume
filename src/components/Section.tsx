import { cn } from "@/lib/utils";

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
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-8 sm:py-10", className)}>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
