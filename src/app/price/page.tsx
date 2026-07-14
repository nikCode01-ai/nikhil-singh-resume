import type { Metadata } from 'next';
import Script from 'next/script';

import { Pricing } from '@/components/Pricing';

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Nikhil Singh - Full Stack Development Services',
  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/price`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Full Stack Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hourly Development',
          description:
            'Bug fixes, feature tweaks, API debugging, performance review',
        },
        price: '500',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '500',
          priceCurrency: 'INR',
          unitText: 'HOUR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Monthly Retainer',
          description:
            'Dedicated delivery, Next.js/TypeScript, real-time systems, API integrations',
        },
        price: '45000',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '45000',
          priceCurrency: 'INR',
          unitText: 'MONTH',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Quarterly Package',
          description:
            'End-to-end delivery, architecture, NDC integrations, CI/CD',
        },
        price: '115000',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '115000',
          priceCurrency: 'INR',
          unitText: 'QUARTER',
        },
      },
    ],
  },
};

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
  return (
    <>
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <Pricing />
    </>
  );
}
