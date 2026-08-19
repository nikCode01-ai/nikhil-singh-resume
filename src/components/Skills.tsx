'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/Button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ApiUiIcon } from '@/components/ApiUiIcon';
import { technicalSkills } from '@/lib/resume-data';
import { motion } from 'framer-motion';

const skillProficiency: Record<string, number> = {
  HTML5: 95,
  CSS3: 90,
  'JavaScript (ES6+)': 92,
  TypeScript: 88,
  React: 94,
  'Next.js 16 (App Router)': 90,
  'Tailwind CSS': 85,
  Bootstrap: 80,
  jQuery: 75,
  PWA: 82,
  SSE: 85,
  'Framer Motion': 78,
  'React Query': 80,
  Zustand: 75,
  'Redux Toolkit': 75,
  'Node.js': 90,
  Fastify: 85,
  Express: 88,
  'Strapi CMS': 80,
  'REST APIs': 92,
  'SOAP/XML': 85,
  GraphQL: 78,
  Microservices: 82,
  WebSockets: 88,
  'Server-Sent Events (SSE)': 85,
  'Authentication & Authorization': 82,
  JWT: 85,
  'OAuth 2.0': 75,
  MongoDB: 85,
  PostgreSQL: 82,
  MySQL: 80,
  BigQuery: 70,
  Redis: 78,
  'Query Optimization': 85,
  'Database Design': 80,
  'Data Modeling': 78,
  Migrations: 80,
  'ACID Compliance': 75,
  'GenAI/LLM Integration': 82,
  'RAG (Retrieval Augmented Generation)': 78,
  'Vector Databases (Pinecone, Weaviate)': 75,
  'OpenAI API': 85,
  LangChain: 78,
  'Prompt Engineering': 80,
  'Fine-tuning': 70,
  'Machine Learning Basics': 65,
  'Data Preprocessing': 70,
  'Natural Language Processing': 68,
  'AWS (EC2, S3, RDS, Lambda)': 80,
  'AWS CloudWatch': 70,
  PM2: 85,
  Docker: 75,
  'Docker Compose': 72,
  Git: 92,
  'GitLab CI/CD': 82,
  'GitHub Actions': 78,
  'Linux Administration': 75,
  Nginx: 80,
  Apache: 75,
  Plesk: 70,
  WHM: 72,
  Hostinger: 85,
  HostGator: 80,
  'SSL/TLS Management': 78,
  'Load Balancing': 72,
  'CDN Configuration': 75,
  'NDC APIs': 90,
  'American Airlines': 85,
  'United Airlines': 85,
  'Copa Airlines': 80,
  'AirGateway (25+ airlines)': 88,
  'GDS systems': 82,
  'Flight Booking Engine': 85,
  'Fare Management': 78,
  'Ticket Issuance': 82,
  GA4: 75,
  'Google Ads': 80,
  GTM: 78,
  'Looker Studio': 72,
  'Amazon PA-API': 70,
  SEO: 85,
  'Google Apps Script': 80,
  'Data Visualization': 75,
  'A/B Testing': 70,
  'Conversion Rate Optimization': 72,
  Jest: 82,
  'React Testing Library': 85,
  Cypress: 78,
  Mocha: 72,
  Chai: 70,
  'Unit Testing': 85,
  'Integration Testing': 80,
  'E2E Testing': 75,
  'VS Code': 90,
  Postman: 88,
  Insomnia: 82,
  'MongoDB Compass': 80,
  pgAdmin: 75,
  'Docker Desktop': 78,
  'Chrome DevTools': 90,
  'Swagger/OpenAPI': 82,
};

const skillLogoSrcMap: Record<string, string> = {
  HTML5: '/icons/skills/html5.svg',
  CSS3: '/icons/skills/css3.svg',
  'JavaScript (ES6+)': '/icons/skills/javascript.svg',
  TypeScript: '/icons/skills/typescript.svg',
  React: '/icons/skills/react.svg',
  'Next.js 16 (App Router)': '/icons/skills/nextjs.svg',
  'Tailwind CSS': '/icons/skills/tailwindcss.svg',
  Bootstrap: '/icons/skills/bootstrap.svg',
  'Node.js': '/icons/skills/nodejs.svg',
  Fastify: '/icons/skills/fastify.svg',
  Express: '/icons/skills/express.svg',
  MongoDB: '/icons/skills/mongodb.svg',
  PostgreSQL: '/icons/skills/postgresql.svg',
  MySQL: '/icons/skills/mysql.svg',
  Redis: '/icons/skills/redis.svg',
  Docker: '/icons/skills/docker.svg',
  Git: '/icons/skills/git.svg',
  'AWS (EC2, S3, RDS, Lambda)': '/icons/skills/aws.svg',
};

function fallbackIconNameFromCategory(category: string) {
  const map: Record<string, string> = {
    Frontend: 'Code',
    Backend: 'Layers',
    Databases: 'Database',
    'Cloud & DevOps': 'Cloud',
    'Travel & Aviation': 'Globe',
    'Analytics & Marketing': 'Target',
    'AI & Machine Learning': 'Bot',
    Testing: 'Check',
    'Development Tools': 'Settings',
  };
  return map[category] || 'Code';
}

const getToolsByCategory = () => {
  const tools: Array<{ name: string; category: string; proficiency: number }> =
    [];
  Object.entries(technicalSkills).forEach(([category, skills]) => {
    skills.forEach((skill) => {
      tools.push({
        name: skill,
        category,
        proficiency: skillProficiency[skill] || 75,
      });
    });
  });
  return tools;
};

const INITIAL_VISIBLE_TOOLS = 12;

export function Skills() {
  const tools = useMemo(() => getToolsByCategory(), []);
  const categories = useMemo(() => Object.keys(technicalSkills), []);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prevShowAllRef = useRef(showAll);

  useEffect(() => {
    const wasExpanded = prevShowAllRef.current;
    prevShowAllRef.current = showAll;
    if (wasExpanded && !showAll) {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showAll]);

  const filteredTools = useMemo(() => {
    const list =
      activeCategory === 'All'
        ? tools
        : tools.filter((t) => t.category === activeCategory);
    return [...list].sort((a, b) => b.proficiency - a.proficiency);
  }, [activeCategory, tools]);

  const visibleTools = useMemo(
    () =>
      showAll ? filteredTools : filteredTools.slice(0, INITIAL_VISIBLE_TOOLS),
    [filteredTools, showAll]
  );

  const canToggle = filteredTools.length > INITIAL_VISIBLE_TOOLS;

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-slate-950 scroll-mt-24 section-padding"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
            <span className="text-brand-green dark:text-emerald-400">
              Skills
            </span>
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technical Skills & Tools
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Core technologies I use to build modern products, with proficiency
            levels based on real project experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-full max-w-5xl">
            <div className="flex w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/8 bg-white/80 dark:bg-white/3 p-2 shadow-xs backdrop-blur-sm scrollbar-hide sm:flex-wrap sm:justify-center">
              <Button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setShowAll(false);
                }}
                variant={activeCategory === 'All' ? 'primary' : 'pill'}
                size="sm"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  type="button"
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                  variant={activeCategory === category ? 'primary' : 'pill'}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {visibleTools.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredTools.length}
            </span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 justify-items-center gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visibleTools.map((tool, index) => {
            const key = `${tool.category}:${tool.name}`;
            const logoSrc = skillLogoSrcMap[tool.name];
            const fallbackIconName = fallbackIconNameFromCategory(
              tool.category
            );

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.03, 0.3),
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex w-full max-w-[190px] flex-col card-premium p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 ring-1 ring-slate-200/50 dark:ring-white/8 transition-all duration-300 group-hover:scale-110 group-hover:ring-brand-green/20 dark:group-hover:ring-emerald-500/30">
                    {logoSrc ? (
                      <Image
                        src={logoSrc}
                        alt={tool.name}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    ) : (
                      <ApiUiIcon
                        name={fallbackIconName}
                        size={22}
                        color="brand-green"
                        darkColor="brand-greenLight"
                        className="h-[22px] w-[22px]"
                        decorative
                      />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {tool.proficiency}%
                  </span>
                </div>

                <div className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {tool.name}
                </div>
                {activeCategory === 'All' && (
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-white/6 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                      {tool.category}
                    </span>
                  </div>
                )}

                <div
                  className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/6"
                  role="progressbar"
                  aria-label={`${tool.name} proficiency`}
                  aria-valuenow={tool.proficiency}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-green to-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${tool.proficiency}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {canToggle && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-expanded={showAll}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show less' : 'Show more'}
              {showAll ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        )}

        {/* Key Skills Summary */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {[
            {
              icon: 'Code',
              value: 50,
              suffix: '+',
              label: 'Technologies Mastered',
            },
            {
              icon: 'Settings',
              value: 30,
              suffix: '+',
              label: 'Production Systems',
            },
            { icon: 'Award', value: 4, suffix: '+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/8 dark:bg-emerald-500/10">
                <ApiUiIcon
                  name={stat.icon}
                  size={22}
                  color="brand-green"
                  darkColor="brand-greenLight"
                  className="h-5 w-5"
                  decorative
                />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-green dark:text-brand-greenLight">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
