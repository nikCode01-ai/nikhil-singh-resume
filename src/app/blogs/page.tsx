import type { Metadata } from 'next';

import { Blogs } from '@/components/Blogs';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read technical articles and tutorials by Nikhil Singh on Next.js, React, NDC API Integration, GenAI/LLM, WebSockets, performance optimization, and full-stack development best practices.',
  keywords: [
    'Full Stack Developer Blog',
    'Next.js Tutorials',
    'NDC API Tutorial',
    'GenAI Development Blog',
    'React Tutorials',
    'WebSocket Tutorial',
    'Performance Optimization Guide',
    'AWS Development Articles',
    'Real-time Systems Tutorial',
    'Full Stack Development Tips',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/blogs`,
  },
};

export default function BlogsPage() {
  return <Blogs />;
}
