'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/Button';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 400);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-6"
      role="navigation"
      aria-label="Back to top"
    >
      <div className="relative">
        <svg
          className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand-green dark:text-brand-yellow"
            strokeDasharray={`${scrollProgress * 1.256} 125.6`}
            strokeLinecap="round"
            transform="rotate(-90 24 24)"
            style={{ transition: 'stroke-dasharray 0.1s ease' }}
          />
        </svg>
        <Button
          type="button"
          variant="icon"
          className="h-10 w-10 rounded-full border-0 bg-white dark:bg-slate-800 shadow-elevated hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUp
            className="h-4 w-4 text-brand-green dark:text-brand-yellow"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
