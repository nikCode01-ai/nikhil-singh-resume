"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ButtonLink } from "@/components/Button";

const faqs = [
  {
    id: 1,
    question: "What industries have you worked in as a full-stack developer?",
    answer: "I have worked across multiple industries including aviation, travel, e-commerce, hospitality, content platforms, and real estate. My experience spans from building airline booking systems using NDC APIs to creating e-commerce solutions and event management platforms."
  },
  {
    id: 2,
    question: "Can I download your resume/CV for information?",
    answer: "Yes! You can download my CV directly from the website. I have a comprehensive resume that details my experience, skills, projects, and achievements. The download button is available in the Hero section and About section of my portfolio."
  },
  {
    id: 3,
    question: "Are you available for freelance development work?",
    answer: "Yes, I am available for freelance projects. I typically work on projects that require full-stack development, API integrations, real-time systems, and cloud infrastructure. Feel free to reach out through the contact form with your project details."
  },
  {
    id: 4,
    question: "What technologies do you specialize in?",
    answer: "I specialize in React, Next.js, Node.js, TypeScript for full-stack development; Fastify, Express for backend; MongoDB, PostgreSQL for databases; AWS for cloud; and NDC APIs for airline integrations. I also have expertise in GenAI/LLM solutions using LangChain, OpenAI, and vector databases."
  },
  {
    id: 5,
    question: "What is your experience with NDC API integrations?",
    answer: "I have extensive experience integrating NDC APIs including direct integrations with American Airlines, United Airlines, and Copa Airlines, plus 25+ airlines via AirGateway aggregator. I've built systems that reduce booking time from 5-10 minutes to under 30 seconds using real-time architectures."
  },
  {
    id: 6,
    question: "Do you provide GenAI/LLM integration services?",
    answer: "Yes! I provide RAG-powered AI solutions, chatbot development, and workflow automation using modern LLM technologies. My services include knowledge base integration, real-time sentiment analysis, and human handoff capabilities for customer support systems."
  },
  {
    id: 7,
    question: "What cloud infrastructure services do you offer?",
    answer: "I provide AWS cloud architecture design, deployment automation, and server management services. This includes EC2, S3, RDS, Lambda setup, Docker containerization, CI/CD pipelines, and monitoring with 99.9% uptime focus."
  },
  {
    id: 8,
    question: "How do I navigate through your portfolio projects?",
    answer: "You can navigate through my projects using the Projects section which showcases my latest work. Each project card displays the project name, description, technologies used, and category. You can filter projects by category and click on individual projects to see more details."
  },
  {
    id: 9,
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on complexity and scope. A typical web application takes 4-8 weeks, while complex systems with integrations may take 8-16 weeks. I provide detailed timelines during the initial consultation phase."
  },
  {
    id: 10,
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, I offer ongoing support and maintenance services. This includes bug fixes, performance optimization, feature updates, and technical support. Support packages can be customized based on your needs."
  },
  {
    id: 11,
    question: "What is your pricing structure?",
    answer: "My pricing is project-based and depends on scope, complexity, and timeline. I offer flexible pricing models including hourly rates (₹3,500/hr), monthly retainers (₹2,40,000/month), and quarterly packages. Contact me with your project details for a personalized quote."
  },
  {
    id: 12,
    question: "Do you have certifications in your field?",
    answer: "Yes, I hold several certifications including AWS Certified Developer – Associate, Advanced React Patterns, Node.js Application Security, and MongoDB Developer Certification. These validate my expertise in cloud infrastructure, frontend development, backend security, and database management."
  },
  {
    id: 13,
    question: "Can you help with performance optimization?",
    answer: "Absolutely! Performance optimization is one of my core services. I've achieved 50% performance improvements on multiple applications through code optimization, caching strategies, database query tuning, and modern image loading techniques."
  },
  {
    id: 14,
    question: "What real-time technologies do you work with?",
    answer: "I specialize in building real-time applications using WebSockets and Server-Sent Events (SSE). I've built systems with sub-500ms response times for airline booking, live dashboards, and collaborative platforms."
  },
  {
    id: 15,
    question: "Do you contribute to open source projects?",
    answer: "Yes, I'm an active contributor to open source with 31+ repositories on GitLab. My contributions include NDC client libraries, real-time notification systems, Strapi plugins, and various developer tools. Check my GitLab profile for details."
  },
  {
    id: 16,
    question: "What database systems are you proficient in?",
    answer: "I'm proficient in MongoDB, PostgreSQL, MySQL, BigQuery, and Redis. I have expertise in database design, query optimization, indexing strategies, and implementing caching layers for improved performance."
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([2]); // FAQ 2 is open by default

  const toggleItem = (id: number) => {
    setOpenItems((prev: number[]) =>
      prev.includes(id)
        ? prev.filter((item: number) => item !== id)
        : [...prev, id],
    );
  };

  return (
    <section className="bg-brand-green py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Questions? <span className="text-brand-yellow">Look here.</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to commonly asked questions about my services, 
            experience, and work process.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 ring-1 ring-white/10 ${
                  openItems.includes(faq.id) ? "bg-brand-yellow" : "bg-white/5"
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                    openItems.includes(faq.id)
                      ? "text-brand-green"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  <h3 className={`text-lg font-semibold pr-4 ${openItems.includes(faq.id) ? "text-brand-green" : "text-white"}`}>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-brand-green" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.includes(faq.id) ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className={`${openItems.includes(faq.id) ? "text-brand-green" : "text-white/80"} leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Help Section */}
          <div className="mt-12 text-center rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/80 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to reach out 
              directly through the contact form or email.
            </p>
            <ButtonLink href="/contact" variant="accent" size="lg" className="focus-visible:!ring-offset-brand-green">
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
