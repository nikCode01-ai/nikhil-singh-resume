'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type HTMLMotionProps,
} from 'framer-motion';
import type { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'inverse'
  | 'ghost'
  | 'pill'
  | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
}: ButtonStyleProps) {
  const base =
    'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-offset-slate-950 group';

  const variants: Record<ButtonVariant, string> = {
    primary: 'btn-brand',
    secondary: 'btn-brand-secondary',
    accent: 'btn-brand-accent',
    inverse: 'btn-brand-inverse',
    ghost: 'btn-brand-ghost',
    pill: 'btn-brand-pill',
    icon: 'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-white/8 hover:text-slate-900 dark:hover:text-white rounded-xl',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 rounded-xl px-5 text-sm',
    md: 'h-11 rounded-xl px-6 text-sm',
    lg: 'h-12 rounded-xl px-8 text-base',
  };

  const iconSize = 'h-10 w-10 rounded-xl';

  return cn(
    base,
    variant === 'icon' ? iconSize : sizes[size],
    variants[variant],
    fullWidth && 'w-full'
  );
}

type ButtonProps = ButtonStyleProps &
  Omit<
    HTMLMotionProps<'button'>,
    keyof ButtonStyleProps | 'ref' | 'children'
  > & {
    children?: React.ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      className,
      children,
      ...props
    },
    ref
  ) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(buttonClassName({ variant, size, fullWidth }), className)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                100px circle at ${mouseX}px ${mouseY}px,
                rgba(16, 185, 129, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

type ButtonLinkProps = ButtonStyleProps &
  Omit<
    HTMLMotionProps<'a'>,
    keyof ButtonStyleProps | 'ref' | keyof LinkProps | 'children'
  > &
  LinkProps & {
    className?: string;
    children?: React.ReactNode;
  };

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const MotionLink = motion.create(Link);

  return (
    <MotionLink
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(buttonClassName({ variant, size, fullWidth }), className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              100px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MotionLink>
  );
}
