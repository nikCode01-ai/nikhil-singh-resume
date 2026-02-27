import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title:
    'Skills & Expertise | Senior Full Stack Developer - Next.js, React, AWS',
  description:
    'Explore skills of Nikhil Singh - Senior Full Stack Developer. Technical expertise: Next.js, React, Node.js, TypeScript, Fastify, MongoDB, PostgreSQL, AWS, WebSockets, NDC APIs, GenAI/LLM, Docker, CI/CD.',
  keywords: [
    'Full Stack Developer Skills',
    'Next.js Skills',
    'React Skills',
    'Node.js Skills',
    'AWS Skills',
    'NDC API Skills',
    'GenAI Skills',
    'WebSocket Skills',
    'TypeScript Skills',
    'Full Stack Developer Expertise',
  ],
};

export default function SkillsPage() {
  redirect('/tools');
  return null;
}
