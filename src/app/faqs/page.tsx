import type { Metadata } from 'next';
import Script from 'next/script';

import { FAQ } from '@/components/FAQ';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What industries have you worked in as a full-stack developer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I have worked across multiple industries including aviation, travel, e-commerce, hospitality, content platforms, and real estate. My experience spans from building airline booking systems using NDC APIs to creating e-commerce solutions and event management platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you available for freelance development work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I am available for freelance projects. I typically work on projects that require full-stack development, API integrations, real-time systems, and cloud infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I specialize in React, Next.js, Node.js, TypeScript for full-stack development; Fastify, Express for backend; MongoDB, PostgreSQL for databases; AWS for cloud; and NDC APIs for airline integrations. I also have expertise in GenAI/LLM solutions using LangChain, OpenAI, and vector databases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your experience with NDC API integrations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I have extensive experience integrating NDC APIs including direct integrations with American Airlines, United Airlines, and Copa Airlines, plus 25+ airlines via AirGateway aggregator.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide GenAI/LLM integration services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! I provide RAG-powered AI solutions, chatbot development, and workflow automation using modern LLM technologies.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'FAQs | Frequently Asked Questions - Full Stack Developer',
  description:
    'Frequently asked questions about services, process, and engagements with Nikhil Singh - Senior Full Stack Developer. Learn about NDC API integration, GenAI solutions, pricing, timeline, and freelance work availability.',
  keywords: [
    'Full Stack Developer FAQ',
    'NDC API FAQ',
    'GenAI Developer FAQ',
    'Freelance Developer FAQ',
    'Next.js Developer FAQ',
    'Web Development FAQ',
    'Pricing FAQ',
    'Hiring Developer FAQ',
  ],
  alternates: {
    canonical: 'https://nikhilsingh-eight.vercel.app/faqs',
  },
};

export default function FAQsPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQ />
    </>
  );
}
