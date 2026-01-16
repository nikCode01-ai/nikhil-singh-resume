import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "inverse" | "ghost" | "pill" | "icon";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

function buttonClassName({ variant = "primary", size = "md", fullWidth }: ButtonStyleProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-offset-slate-950";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "border border-brand-yellow/50 bg-brand-green text-brand-yellow shadow-sm hover:bg-brand-greenDark hover:border-brand-yellow/70",
    secondary:
      "border border-brand-green/30 bg-white text-brand-green shadow-sm hover:border-brand-yellow/40 hover:bg-brand-yellow/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900",
    accent: "bg-brand-yellow text-brand-green shadow-sm hover:brightness-95",
    inverse: "border border-white/25 bg-transparent text-white hover:bg-white/10",
    ghost: "bg-transparent text-brand-green hover:bg-brand-cream dark:text-slate-100 dark:hover:bg-slate-900",
    pill:
      "border border-brand-green/20 bg-white text-brand-green hover:bg-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900",
    icon: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-slate-100",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 rounded-full px-5 text-sm",
    md: "h-11 rounded-full px-6 text-sm",
    lg: "h-12 rounded-full px-8 text-base",
  };

  const iconSize = "h-9 w-9 rounded-lg";

  return cn(
    base,
    variant === "icon" ? iconSize : sizes[size],
    variants[variant],
    fullWidth && "w-full",
  );
}

type ButtonProps = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonStyleProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonClassName({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
});

type ButtonLinkProps = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonStyleProps | "className"> & {
    className?: string;
  };

export function ButtonLink({ variant = "primary", size = "md", fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClassName({ variant, size, fullWidth }), className)} {...props} />;
}
