import type { Metadata } from 'next';

import { Services } from '@/components/Services';

export const metadata: Metadata = {
  title:
    'Services | Full Stack Development, NDC API Integration, GenAI Solutions',
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
};

export default function ServicesPage() {
  return <Services variant="page" />;
}
