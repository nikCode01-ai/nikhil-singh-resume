'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RealTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Avoid tracking in admin pages
    if (pathname.startsWith('/admin')) return;

    let sessionId = sessionStorage.getItem('portfolio_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('portfolio_session_id', sessionId);
    }

    // 1. Track Pageview
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        path: pathname,
        sessionId,
        details: { referrer: document.referrer || 'direct' },
      }),
    }).catch(() => {});

    // Heartbeat for active session (every 45s)
    const interval = setInterval(() => {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          path: pathname,
        }),
      }).catch(() => {});
    }, 45000);

    // 2. Global Click Tracker for Resume, GitHub, LinkedIn
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim() || '';

      if (
        href.includes('/resume') ||
        href.endsWith('.pdf') ||
        text.toLowerCase().includes('resume') ||
        text.toLowerCase().includes('cv')
      ) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'resume_download',
            path: pathname,
            sessionId,
            details: { label: text, target: href },
          }),
        }).catch(() => {});
      } else if (href.includes('github.com') || href.includes('gitlab.com')) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'social_click',
            path: pathname,
            sessionId,
            details: { platform: 'GitHub/GitLab', url: href },
          }),
        }).catch(() => {});
      } else if (href.includes('linkedin.com')) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'social_click',
            path: pathname,
            sessionId,
            details: { platform: 'LinkedIn', url: href },
          }),
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  return null;
}
