import type { Metadata } from 'next';

import { JobsClient } from './JobsClient';

export const metadata: Metadata = {
  title: 'Jobs | Full Stack Developer Job Openings - Remote & India',
  description:
    "Find job vacancies for Full Stack Developers, React Developers, Node.js Developers, and related positions. Check current openings relevant to Nikhil Singh's profile - remote work, India positions, and freelance opportunities.",
  keywords: [
    'Full Stack Developer Jobs',
    'React Developer Jobs',
    'Node.js Developer Jobs',
    'Next.js Jobs',
    'Remote Developer Jobs',
    'Full Stack Jobs India',
    'Web Developer Vacancies',
    'Frontend Developer Jobs',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/jobs`,
  },
};

export default function JobsPage() {
  return <JobsClient />;
}
