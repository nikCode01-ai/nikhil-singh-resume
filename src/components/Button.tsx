"use client";

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
    primary: "btn-brand",
    secondary: "btn-brand-secondary",
    accent: "btn-brand",
    inverse: "btn-brand-inverse",
    ghost: "btn-brand-ghost",
    pill: "btn-brand-pill",
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
