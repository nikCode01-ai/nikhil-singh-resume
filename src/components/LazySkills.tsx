'use client';

import dynamic from 'next/dynamic';

const SkillsInner = dynamic(
  () => import('@/components/Skills').then((mod) => mod.Skills),
  { ssr: false }
);

export function LazySkills() {
  return <SkillsInner />;
}
