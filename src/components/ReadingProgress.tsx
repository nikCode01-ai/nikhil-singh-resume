'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-emerald-500 to-teal-400 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300 origin-left z-[100] shadow-[0_0_8px_rgba(16,185,129,0.5)]"
      aria-hidden="true"
    />
  );
}
