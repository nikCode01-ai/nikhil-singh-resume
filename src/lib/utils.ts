export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
