import type { Metadata } from 'next';

import { Pricing } from '@/components/Pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'View pricing for full-stack development services by Nikhil Singh. Hourly rate: ₹500/hr, Monthly retainer: ₹45,000/month, Quarterly packages available. Services: Next.js, React, Node.js, NDC API Integration, GenAI Solutions.',
  keywords: [
    'Full Stack Developer Pricing',
    'Freelance Developer Rates',
    'Web Development Cost',
    'Next.js Developer Rate',
    'NDC API Development Cost',
    'GenAI Developer Pricing',
    'Freelance Web Developer India',
    'Hourly Rate Developer',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/price`,
  },
};

export default function PricePage() {
  return <Pricing />;
}
