import type { Metadata } from 'next';
import Script from 'next/script';

import { Services } from '@/components/Services';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Full Stack Web Development',
        description:
          'Complete web application development from concept to deployment using Next.js, React, Node.js, MongoDB, PostgreSQL, AWS.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'Full Stack Web Development',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'NDC API Integration',
        description:
          'Specialized airline booking systems with NDC API integrations for American Airlines, United Airlines, Copa Airlines, and 25+ airlines.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'NDC API Integration',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'GenAI & LLM Solutions',
        description:
          'RAG-powered AI applications, chatbots, and automation using OpenAI, LangChain, Pinecone, and vector databases.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'GenAI & LLM Solutions',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Performance Optimization',
        description:
          'Comprehensive performance audits and optimization for existing applications using Lighthouse, caching, and code splitting.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'Performance Optimization',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Cloud Infrastructure Setup',
        description:
          'AWS cloud architecture design, deployment, and management with CI/CD pipelines and Docker containerization.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'Cloud Infrastructure Setup',
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Technical Consulting',
        description:
          'Architecture reviews, technology stack recommendations, and development best practices guidance.',
        provider: {
          '@type': 'Person',
          name: 'Nikhil Singh',
        },
        areaServed: 'Worldwide',
        serviceType: 'Technical Consulting',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional services by Nikhil Singh: Full Stack Web Development, NDC API Integration for airlines, GenAI/LLM Solutions, Performance Optimization, Cloud Infrastructure Setup. Available for freelance projects worldwide.',
  keywords: [
    'Full Stack Development Services',
    'NDC API Integration Services',
    'Airline Booking System Development',
    'GenAI LLM Development Services',
    'RAG Chatbot Development',
    'Next.js Development Services',
    'React Developer Services',
    'AWS Cloud Services',
    'Real-time Systems Development',
    'Performance Optimization Services',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Services variant="page" />
    </>
  );
}
