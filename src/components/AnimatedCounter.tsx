'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type AnimatedCounterProps = {
  to: number;
  from?: number;
  durationMs?: number;
  decimals?: number;
  suffix?: string;
  once?: boolean;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  to,
  from = 0,
  durationMs = 1200,
  decimals = 0,
  suffix = '',
  once = true,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  const formatter = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [decimals]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    let rafId: number | null = null;

    const animate = () => {
      if (prefersReducedMotion) {
        setValue(to);
        setHasAnimated(true);
        return;
      }

      const start = performance.now();
      const delta = to - from;

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(t);
        setValue(from + delta * eased);

        if (t < 1) {
          rafId = window.requestAnimationFrame(tick);
        } else {
          setValue(to);
          setHasAnimated(true);
        }
      };

      rafId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (once && hasAnimated) return;
        animate();
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [durationMs, from, hasAnimated, once, to]);

  return (
    <span ref={ref} aria-live="polite">
      {formatter.format(value)}
      {suffix}
    </span>
  );
}
