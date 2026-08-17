'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveRepoStats({
  url,
  fallbackStars,
}: {
  url: string;
  fallbackStars: number;
}) {
  const [stars, setStars] = useState(fallbackStars);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `/api/repo-stats?url=${encodeURIComponent(url)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (typeof data.stars === 'number') {
            setStars(data.stars);
          }
        }
      } catch {
        // Fallback silently
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [url]);

  return (
    <div className="mt-2 flex items-center gap-2">
      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
        {stars} stars
        {loading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs"
          >
            ...
          </motion.span>
        )}
      </span>
    </div>
  );
}
