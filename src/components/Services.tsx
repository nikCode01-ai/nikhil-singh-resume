import Link from "next/link";

import { Code, Database, Cloud, Globe, Smartphone, Settings } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "End-to-end web application development using modern frameworks like React, Next.js, Node.js, and TypeScript",
    features: ["React/Next.js", "Node.js/Fastify", "TypeScript"]
  },
  {
    icon: Database,
    title: "Database Design & Optimization",
    description: "Efficient database architecture, query optimization, and data management solutions",
    features: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Query Optimization"]
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Cloud infrastructure setup, deployment automation, and server management",
    features: ["AWS Services", "Docker", "CI/CD", "Server Management", "99.9% Uptime"]
  },
  {
    icon: Globe,
    title: "API Integration",
    description: "Third-party API integrations, NDC/GDS systems, and custom API development",
    features: ["REST/SOAP APIs", "NDC APIs", "GraphQL", "WebSockets", "SSE"]
  },
  {
    icon: Smartphone,
    title: "Real-Time Systems",
    description: "Building real-time applications with WebSockets and Server-Sent Events",
    features: ["WebSockets", "SSE", "Live Updates", "Sub-500ms Response"]
  },
  {
    icon: Settings,
    title: "Performance Optimization",
    description: "Application performance tuning and optimization for better user experience",
    features: ["50% Faster Load", "Caching Strategies", "Code Optimization", "Monitoring"]
  }
];

export function Services() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-green">Services</p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
              <span className="text-brand-yellow">Services</span> I Provide
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Comprehensive development solutions from frontend to backend, with expertise in modern technologies and best practices.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-greenDark"
          >
            View All Services
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-green">
              +
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream ring-1 ring-brand-green/10 transition-colors group-hover:bg-brand-yellow">
                <service.icon className="h-7 w-7 text-brand-green" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-brand-green"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 flex items-center gap-2 font-semibold text-brand-green transition-colors hover:text-brand-greenDark">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
