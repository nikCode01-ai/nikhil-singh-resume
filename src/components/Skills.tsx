"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ApiUiIcon } from "@/components/ApiUiIcon";
import { technicalSkills } from "@/lib/resume-data";

const skillProficiency = {
  "HTML5": 95,
  "CSS3": 90,
  "JavaScript (ES6+)": 92,
  "TypeScript": 88,
  "React": 94,
  "Next.js 16 (App Router)": 90,
  "Tailwind CSS": 85,
  "Bootstrap": 80,
  "jQuery": 75,
  "PWA": 82,
  "SSE": 85,
  "Node.js": 90,
  "Fastify": 85,
  "Express": 88,
  "Strapi CMS": 80,
  "REST APIs": 92,
  "SOAP/XML": 85,
  "GraphQL": 78,
  "Microservices": 82,
  "WebSockets": 88,
  "MongoDB": 85,
  "PostgreSQL": 82,
  "MySQL": 80,
  "BigQuery": 70,
  "Redis": 78,
  "Query Optimization": 85,
  "AWS (EC2, S3, RDS, Lambda)": 80,
  "PM2": 85,
  "Docker": 75,
  "Git": 92,
  "GitLab CI/CD": 82,
  "Linux": 78,
  "Nginx": 80,
  "Apache": 75,
  "Plesk": 70,
  "WHM": 72,
  "Hostinger": 85,
  "HostGator": 80,
  "NDC APIs": 90,
  "American Airlines": 85,
  "United Airlines": 85,
  "Copa Airlines": 80,
  "AirGateway (25+ airlines)": 88,
  "GDS systems": 82,
  "GA4": 75,
  "Google Ads": 80,
  "GTM": 78,
  "Looker Studio": 72,
  "Amazon PA-API": 70,
  "SEO": 85,
  "Google Apps Script": 80,
};

const skillLogoSrcMap: Record<string, string> = {
  "HTML5": "/icons/skills/html5.svg",
  "CSS3": "/icons/skills/css3.svg",
  "JavaScript (ES6+)": "/icons/skills/javascript.svg",
  "TypeScript": "/icons/skills/typescript.svg",
  "React": "/icons/skills/react.svg",
  "Next.js 16 (App Router)": "/icons/skills/nextjs.svg",
  "Tailwind CSS": "/icons/skills/tailwindcss.svg",
  "Node.js": "/icons/skills/nodejs.svg",
  "Fastify": "/icons/skills/fastify.svg",
  "Express": "/icons/skills/express.svg",
  "MongoDB": "/icons/skills/mongodb.svg",
  "Docker": "/icons/skills/docker.svg",
  "Git": "/icons/skills/git.svg",
};

function fallbackIconNameFromCategory(category: string) {
  switch (category) {
    case "Frontend":
      return "Code";
    case "Backend":
      return "Layers";
    case "Databases":
      return "Database";
    case "Cloud & DevOps":
      return "Cloud";
    case "Travel & Aviation":
      return "Globe";
    case "Analytics & Marketing":
      return "Target";
    default:
      return "Code";
  }
}

const getToolsByCategory = () => {
  const tools: Array<{
    name: string;
    category: string;
    proficiency: number;
  }> = [];
  Object.entries(technicalSkills).forEach(([category, skills]) => {
    skills.forEach(skill => {
      tools.push({
        name: skill,
        category,
        proficiency: (skillProficiency as Record<string, number>)[skill] || 75
      });
    });
  });
  return tools;
};

export function Skills() {
  const tools = useMemo(() => getToolsByCategory(), []);

  // Get unique categories for filtering
  const categories = useMemo(() => Object.keys(technicalSkills), []);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredTools = useMemo(() => {
    const list =
      activeCategory === "All"
        ? tools
        : tools.filter((t) => t.category === activeCategory);
    return [...list].sort((a, b) => b.proficiency - a.proficiency);
  }, [activeCategory, tools]);

  return (
    <section className="bg-brand-cream py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">My Favorite Tools</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            <span className="text-brand-yellow">Exploring the Tools</span>
            <br />
            Behind My Designs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-slate-300">
            Technologies and tools I work with daily, with proficiency levels based on real project experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
            <Button
              type="button"
              onClick={() => setActiveCategory("All")}
              variant={activeCategory === "All" ? "primary" : "pill"}
              size="sm"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "primary" : "pill"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredTools.length}</span> of{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{tools.length}</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredTools.map((tool) => {
            const key = `${tool.category}:${tool.name}`;
            const logoSrc = skillLogoSrcMap[tool.name];
            const fallbackIconName = fallbackIconNameFromCategory(tool.category);

            return (
              <div
                key={key}
                className="group flex w-full max-w-[170px] flex-col items-center rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900/60 dark:ring-white/10"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-green/20 to-brand-yellow/20 ring-8 ring-white shadow-sm transition-transform duration-200 group-hover:scale-[1.03] dark:from-brand-green/10 dark:to-brand-yellow/10 dark:ring-slate-950">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-sm">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={tool.name}
                        className="h-10 w-10"
                        loading="lazy"
                      />
                    ) : (
                      <ApiUiIcon
                        name={fallbackIconName}
                        size={40}
                        color="brand-green"
                        className="h-10 w-10"
                        decorative
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-slate-100">{tool.proficiency}%</div>
                <div className="mt-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300">{tool.name}</div>
              </div>
            );
          })}
        </div>

        
        {/* Key Skills Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">
              <AnimatedCounter to={50} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-slate-300">Technologies Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">
              <AnimatedCounter to={30} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-slate-300">Production Systems</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">
              <AnimatedCounter to={4} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-slate-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
