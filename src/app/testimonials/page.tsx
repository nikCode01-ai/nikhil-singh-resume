import type { Metadata } from 'next';
import Script from 'next/script';

import { Testimonials } from '@/components/Testimonials';

const testimonialsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Nikhil Singh - Full Stack Developer',
  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/testimonials`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    reviewCount: '50',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Client' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody:
        'Nikhil delivered exceptional work on our airline NDC integration project. His expertise in real-time systems and API architecture is outstanding.',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Testimonials',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/testimonials`,
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <Script
        id="testimonials-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />
      <Testimonials />
    </>
  );
}
