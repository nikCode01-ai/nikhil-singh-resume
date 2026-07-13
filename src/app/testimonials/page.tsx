import type { Metadata } from 'next';

import { Testimonials } from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Testimonials | Client Reviews - Senior Full Stack Developer',
  description:
    'Read client testimonials for Nikhil Singh - Senior Full Stack Developer. Reviews from TravelTech Solutions, Fresh Kosher Cruises, Invitation Street, Business Matters, Dreamy Invites. Known for NDC API integration, GenAI solutions, performance optimization.',
  keywords: [
    'Full Stack Developer Testimonials',
    'Client Reviews',
    'NDC API Developer Review',
    'Freelance Developer Testimonials',
    'React Developer Review',
    'GenAI Developer Testimonials',
    'Web Developer Feedback',
    'Client Recommendations',
  ],
  alternates: {
    canonical: 'https://nikhilsingh-eight.vercel.app/testimonials',
  },
};

export default function TestimonialsPage() {
  return <Testimonials />;
}
