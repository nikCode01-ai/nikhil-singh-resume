import type { Metadata } from 'next';

import { Skills } from '@/components/Skills';

export const metadata: Metadata = {
  title: 'Tools & Technologies | Senior Full Stack Developer Tech Stack',
  description:
    'View tools and technologies used by Nikhil Singh. Tech stack: Next.js 16, React, TypeScript, Node.js, Fastify, PostgreSQL, MongoDB, AWS, Docker, Git, Postman, VS Code. Full development toolchain.',
  keywords: [
    'Full Stack Developer Tools',
    'Tech Stack',
    'Development Tools',
    'Next.js Tech Stack',
    'React Developer Tools',
    'AWS Development Tools',
    'Database Tools',
    'DevOps Tools',
    'Development Environment',
  ],
  alternates: {
    canonical: 'https://nikhilsingh-eight.vercel.app/tools',
  },
};

export default function ToolsPage() {
  return <Skills />;
}
