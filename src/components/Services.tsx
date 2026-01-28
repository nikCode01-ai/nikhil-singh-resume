import { Button, ButtonLink } from "@/components/Button";

import { ApiUiIcon } from "@/components/ApiUiIcon";

const services = [
  {
    iconName: "Code",
    title: "Full Stack Development",
    description: "End-to-end web application development using modern frameworks like React, Next.js, Node.js, and TypeScript",
    features: ["React/Next.js", "Node.js/Fastify", "TypeScript"]
  },
  {
    iconName: "Database",
    title: "Database Design & Optimization",
    description: "Efficient database architecture, query optimization, and data management solutions",
    features: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Query Optimization"]
  },
  {
    iconName: "Cloud",
    title: "Cloud & DevOps",
    description: "Cloud infrastructure setup, deployment automation, and server management",
    features: ["AWS Services", "Docker", "CI/CD", "Server Management", "99.9% Uptime"]
  },
  {
    iconName: "Globe",
    title: "API Integration",
    description: "Third-party API integrations, NDC/GDS systems, and custom API development",
    features: ["REST/SOAP APIs", "NDC APIs", "GraphQL", "WebSockets", "SSE"]
  },
  {
    iconName: "Smartphone",
    title: "Real-Time Systems",
    description: "Building real-time applications with WebSockets and Server-Sent Events",
    features: ["WebSockets", "SSE", "Live Updates", "Sub-500ms Response"]
  },
  {
    iconName: "Settings",
    title: "Performance Optimization",
    description: "Application performance tuning and optimization for better user experience",
    features: ["50% Faster Load", "Caching Strategies", "Code Optimization", "Monitoring"]
  }
];

export function Services() {
  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-5 bg-brand-yellow" />
            <span className="text-brand-green dark:text-brand-yellow">Services</span>
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            <span className="text-brand-yellow">Services</span> I Provide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Comprehensive development solutions from frontend to backend, with expertise in modern technologies and best practices.
          </p>

          <div className="mt-7 flex justify-center">
            <ButtonLink href="/contact" variant="primary" size="sm">
              View All Services
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/60 dark:ring-white/10"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream ring-1 ring-slate-900/5 transition-colors group-hover:bg-brand-yellow/25 dark:bg-slate-800/60 dark:ring-white/10 dark:group-hover:bg-brand-yellow/20">
                <ApiUiIcon name={service.iconName} size={28} className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{service.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-green ring-1 ring-brand-green/10 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-7"
              >
                Learn more
                <ApiUiIcon
                  name="ArrowRight"
                  size={16}
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
