import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Skills & Expertise',
  description:
    'Explore skills of Nikhil Singh - Senior Full Stack Developer. Technical expertise: Next.js, React, Node.js, TypeScript, Fastify, MongoDB, PostgreSQL, AWS, WebSockets, NDC APIs, GenAI/LLM, Docker, CI/CD.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SkillsPage() {
  redirect('/tools');
  return null;
}
