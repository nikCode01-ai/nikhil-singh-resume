/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  darkColor?: string;
  fill?: string;
  darkFill?: string;
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function ApiUiIcon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'brand-green',
  darkColor,
  fill,
  darkFill,
  className,
  title,
  decorative = true,
}: Props) {
  const buildSrc = (opts: { color?: string; fill?: string }) => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('size', String(size));
    params.set('strokeWidth', String(strokeWidth));
    if (opts.color) params.set('color', opts.color);
    if (opts.fill) params.set('fill', opts.fill);
    return `/api/ui-icon?${params.toString()}`;
  };

  const lightSrc = buildSrc({ color, fill });
  const darkSrc =
    darkColor || darkFill
      ? buildSrc({ color: darkColor ?? color, fill: darkFill ?? fill })
      : null;

  const alt = decorative ? '' : title || name;
  const ariaHidden = decorative ? true : undefined;

  if (!darkSrc) {
    return (
      <img
        src={lightSrc}
        width={size}
        height={size}
        className={cn('inline-block', className)}
        alt={alt}
        aria-hidden={ariaHidden}
      />
    );
  }

  return (
    <>
      <img
        src={lightSrc}
        width={size}
        height={size}
        className={cn('inline-block dark:hidden', className)}
        alt={alt}
        aria-hidden={ariaHidden}
      />
      <img
        src={darkSrc}
        width={size}
        height={size}
        className={cn('hidden dark:inline-block', className)}
        alt={alt}
        aria-hidden={ariaHidden}
      />
    </>
  );
}
