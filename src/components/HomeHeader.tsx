'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { Button, ButtonLink } from '@/components/Button';
import { cn } from '@/lib/utils';
import { person } from '@/lib/resume-data';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/price', label: 'Price' },
  { href: '/tools', label: 'Tools' },
  { href: '/projects', label: 'Projects' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faqs', label: 'FAQs' },
];

export function HomeHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const initials = useMemo(() => {
    return person.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join('');
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full" role="banner">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <nav
          className={cn(
            'rounded-2xl transition-all duration-500 ease-out',
            scrolled
              ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-navbar-scrolled ring-1 ring-black/5 dark:ring-white/8'
              : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md ring-1 ring-black/3 dark:ring-white/5'
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label={`${person.name} - Home`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-glow-green group-hover:scale-105">
                <Image
                  src="/images/nik_profile.jpeg"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  alt={person.name}
                />
              </div>
              <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-brand-green dark:group-hover:text-brand-yellow">
                {person.name.split(' ')[0]}
              </div>
            </Link>

            <nav
              className="hidden items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex"
              aria-label="Desktop navigation"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3 py-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green dark:focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950',
                      active
                        ? 'text-brand-green dark:text-brand-yellow font-semibold bg-brand-green/8 dark:bg-brand-yellow/10'
                        : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/6'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-brand-green dark:bg-brand-yellow"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href="/contact"
                variant="primary"
                size="sm"
                className="hidden lg:inline-flex text-sm"
              >
                Let&apos;s Talk
              </ButtonLink>

              <Button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                variant="icon"
                className="lg:hidden h-10 w-10 rounded-xl border-0 bg-slate-100/80 dark:bg-white/8 text-slate-700 dark:text-slate-200 shadow-none hover:bg-slate-200/80 dark:hover:bg-white/12 transition-all duration-200"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span
                    className={cn(
                      'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                      open ? 'rotate-45' : '-translate-y-1.5'
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                      open ? 'opacity-0' : 'opacity-100'
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                      open ? '-rotate-45' : 'translate-y-1.5'
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm focus-visible:outline-none"
          />

          <div className="absolute right-3 top-16 w-[calc(100%-24px)] max-w-sm overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 animate-fade-down">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/8 px-5 py-4">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Navigation
              </div>
              <Button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                variant="icon"
                className="h-9 w-9 rounded-xl border-0 bg-slate-100 dark:bg-white/8 text-slate-600 dark:text-slate-300 shadow-none hover:bg-slate-200 dark:hover:bg-white/12"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="px-3 py-2" aria-label="Mobile navigation">
              {navItems.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-brand-green/8 dark:bg-brand-yellow/10 text-brand-green dark:text-brand-yellow font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/6'
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="h-2 w-2 rounded-full bg-brand-green dark:bg-brand-yellow"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}

              <div className="mt-3 px-1 pb-2">
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Let&apos;s Talk
                </ButtonLink>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
