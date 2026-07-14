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
      name: 'Can I download your resume/CV for information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You can download my CV directly from the website. I have a comprehensive resume that details my experience, skills, projects, and achievements. The download button is available in the Hero section and About section of my portfolio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you available for freelance development work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I am available for freelance projects. I typically work on projects that require full-stack development, API integrations, real-time systems, and cloud infrastructure. Feel free to reach out through the contact form with your project details.',
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
        text: 'I have extensive experience integrating NDC APIs including direct integrations with American Airlines, United Airlines, and Copa Airlines, plus 25+ airlines via AirGateway aggregator. I have built systems that reduce booking time from 5-10 minutes to under 30 seconds using real-time architectures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide GenAI/LLM integration services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! I provide RAG-powered AI solutions, chatbot development, and workflow automation using modern LLM technologies. My services include knowledge base integration, real-time sentiment analysis, and human handoff capabilities for customer support systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What cloud infrastructure services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I provide AWS cloud architecture design, deployment automation, and server management services. This includes EC2, S3, RDS, Lambda setup, Docker containerization, CI/CD pipelines, and monitoring with 99.9% uptime focus.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I navigate through your portfolio projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can navigate through my projects using the Projects section which showcases my latest work. Each project card displays the project name, description, technologies used, and category. You can filter projects by category and click on individual projects to see more details.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your typical project timeline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary based on complexity and scope. A typical web application takes 4-8 weeks, while complex systems with integrations may take 8-16 weeks. I provide detailed timelines during the initial consultation phase.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support after project completion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I offer ongoing support and maintenance services. This includes bug fixes, performance optimization, feature updates, and technical support. Support packages can be customized based on your needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your pricing structure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'My pricing is project-based and depends on scope, complexity, and timeline. I offer flexible pricing models including hourly rates (₹500/hr), monthly retainers (₹45000 per month), and quarterly packages (₹1,15,000/quarter). Contact me with your project details for a personalized quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have certifications in your field?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I hold several certifications including AWS Certified Developer – Associate, Advanced React Patterns, Node.js Application Security, and MongoDB Developer Certification. These validate my expertise in cloud infrastructure, frontend development, backend security, and database management.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help with performance optimization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Performance optimization is one of my core services. I have achieved 50% performance improvements on multiple applications through code optimization, caching strategies, database query tuning, and modern image loading techniques.',
      },
    },
    {
      '@type': 'Question',
      name: 'What real-time technologies do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I specialize in building real-time applications using WebSockets and Server-Sent Events (SSE). I have built systems with sub-500ms response times for airline booking, live dashboards, and collaborative platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you contribute to open source projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I am an active contributor to open source with 31+ repositories on GitLab. My contributions include NDC client libraries, real-time notification systems, Strapi plugins, and various developer tools. Check my GitLab profile for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'What database systems are you proficient in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I am proficient in MongoDB, PostgreSQL, MySQL, BigQuery, and Redis. I have expertise in database design, query optimization, indexing strategies, and implementing caching layers for improved performance.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'FAQs',
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhilsingh-eight.vercel.app'}/faqs`,
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
