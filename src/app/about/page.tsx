import type { Metadata } from 'next';

import { About } from '@/components/About';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn about Nikhil Singh - Senior Full Stack Developer with 4+ years experience in Next.js, React, Node.js, NDC API Integration, GenAI/LLM solutions, and AWS cloud infrastructure. Based in Agra, India.',
  keywords: [
    'Senior Full Stack Developer About',
    'Nikhil Singh Background',
    'Full Stack Developer Experience',
    'Next.js Developer India',
    'React Node.js Developer',
    'NDC API Expert',
    'GenAI LLM Developer',
    'AWS Developer Agra',
    'Freelance Web Developer',
  ],
  alternates: {
    canonical: 'https://nikhilsingh-eight.vercel.app/about',
  },
};

export default function AboutPage() {
  return <About />;
}
