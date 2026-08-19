'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { FadeIn } from '@/components/FadeIn';
import { motion } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: 'What industries have you worked in as a full-stack developer?',
    answer:
      'I have worked across multiple industries including aviation, travel, e-commerce, hospitality, content platforms, and real estate. My experience spans from building airline booking systems using NDC APIs to creating e-commerce solutions and event management platforms.',
  },
  {
    id: 2,
    question: 'Can I download your resume/CV for information?',
    answer:
      'Yes! You can download my CV directly from the website. I have a comprehensive resume that details my experience, skills, projects, and achievements. The download button is available in the Hero section and About section of my portfolio.',
  },
  {
    id: 3,
    question: 'Are you available for freelance development work?',
    answer:
      'Yes, I am available for freelance projects. I typically work on projects that require full-stack development, API integrations, real-time systems, and cloud infrastructure. Feel free to reach out through the contact form with your project details.',
  },
  {
    id: 4,
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in React, Next.js, Node.js, TypeScript for full-stack development; Fastify, Express for backend; MongoDB, PostgreSQL for databases; AWS for cloud; and NDC APIs for airline integrations. I also have expertise in GenAI/LLM solutions using LangChain, OpenAI, and vector databases.',
  },
  {
    id: 5,
    question: 'What is your experience with NDC API integrations?',
    answer:
      "I have extensive experience integrating NDC APIs including direct integrations with American Airlines, United Airlines, and Copa Airlines, plus 25+ airlines via AirGateway aggregator. I've built systems that reduce booking time from 5-10 minutes to under 30 seconds using real-time architectures.",
  },
  {
    id: 6,
    question: 'Do you provide GenAI/LLM integration services?',
    answer:
      'Yes! I provide RAG-powered AI solutions, chatbot development, and workflow automation using modern LLM technologies. My services include knowledge base integration, real-time sentiment analysis, and human handoff capabilities for customer support systems.',
  },
  {
    id: 7,
    question: 'What cloud infrastructure services do you offer?',
    answer:
      'I provide AWS cloud architecture design, deployment automation, and server management services. This includes EC2, S3, RDS, Lambda setup, Docker containerization, CI/CD pipelines, and monitoring with 99.9% uptime focus.',
  },
  {
    id: 8,
    question: 'How do I navigate through your portfolio projects?',
    answer:
      'You can navigate through my projects using the Projects section which showcases my latest work. Each project card displays the project name, description, technologies used, and category. You can filter projects by category and click on individual projects to see more details.',
  },
  {
    id: 9,
    question: 'What is your typical project timeline?',
    answer:
      'Project timelines vary based on complexity and scope. A typical web application takes 4-8 weeks, while complex systems with integrations may take 8-16 weeks. I provide detailed timelines during the initial consultation phase.',
  },
  {
    id: 10,
    question: 'Do you provide ongoing support after project completion?',
    answer:
      'Yes, I offer ongoing support and maintenance services. This includes bug fixes, performance optimization, feature updates, and technical support. Support packages can be customized based on your needs.',
  },
  {
    id: 11,
    question: 'What is your pricing structure?',
    answer:
      'My pricing is project-based and depends on scope, complexity, and timeline. I offer flexible pricing models including hourly rates (₹500/hr), monthly retainers (₹45000 per month), and quarterly packages (₹1,15,000/quarter). Contact me with your project details for a personalized quote.',
  },
  {
    id: 12,
    question: 'Do you have certifications in your field?',
    answer:
      'Yes, I hold several certifications including AWS Certified Developer – Associate, Advanced React Patterns, Node.js Application Security, and MongoDB Developer Certification. These validate my expertise in cloud infrastructure, frontend development, backend security, and database management.',
  },
  {
    id: 13,
    question: 'Can you help with performance optimization?',
    answer:
      "Absolutely! Performance optimization is one of my core services. I've achieved 50% performance improvements on multiple applications through code optimization, caching strategies, database query tuning, and modern image loading techniques.",
  },
  {
    id: 14,
    question: 'What real-time technologies do you work with?',
    answer:
      "I specialize in building real-time applications using WebSockets and Server-Sent Events (SSE). I've built systems with sub-500ms response times for airline booking, live dashboards, and collaborative platforms.",
  },
  {
    id: 15,
    question: 'Do you contribute to open source projects?',
    answer:
      "Yes, I'm an active contributor to open source with 31+ repositories on GitLab. My contributions include NDC client libraries, real-time notification systems, Strapi plugins, and various developer tools. Check my GitLab profile for details.",
  },
  {
    id: 16,
    question: 'What database systems are you proficient in?',
    answer:
      "I'm proficient in MongoDB, PostgreSQL, MySQL, BigQuery, and Redis. I have expertise in database design, query optimization, indexing strategies, and implementing caching layers for improved performance.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(2);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className="bg-white dark:bg-slate-950 section-padding relative overflow-hidden scroll-mt-24"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-14">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
            <span className="text-brand-green dark:text-emerald-400">FAQ</span>
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
          </p>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Questions?{' '}
            <span className="text-brand-green dark:text-brand-greenLight">
              Look here.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Find answers to commonly asked questions about my services,
            experience, and work process.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-2.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  className="card-premium overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: 'easeOut' },
                    },
                  }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 transition-all duration-200 hover:bg-slate-50/50 dark:hover:bg-white/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 rounded-xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white pr-2">
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                  </button>

                  <div
                    ref={(el) => {
                      contentRefs.current[faq.id] = el;
                    }}
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-12 text-center card-premium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
              Can&apos;t find the answer you&apos;re looking for? Feel free to
              reach out directly.
            </p>
            <ButtonLink href="/contact" variant="primary" size="lg">
              Let&apos;s Discuss Your Project
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
