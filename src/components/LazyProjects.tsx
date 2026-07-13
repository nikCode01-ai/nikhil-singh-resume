'use client';

import dynamic from 'next/dynamic';

const ProjectsInner = dynamic(
  () => import('@/components/Projects').then((mod) => mod.Projects),
  { ssr: false }
);

export function LazyProjects() {
  return <ProjectsInner />;
}
