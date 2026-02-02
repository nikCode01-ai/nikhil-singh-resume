


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

const INITIAL_VISIBLE_TOOLS = 12;

export function Skills() {
  const tools = useMemo(() => getToolsByCategory(), []);

  // Get unique categories for filtering
  const categories = useMemo(() => Object.keys(technicalSkills), []);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const prevShowAllRef = useRef(showAll);

  useEffect(() => {
    const wasExpanded = prevShowAllRef.current;
    prevShowAllRef.current = showAll;

    if (wasExpanded && !showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

  const filteredTools = useMemo(() => {
    const list =
      activeCategory === "All"
        ? tools
        : tools.filter((t) => t.category === activeCategory);
    return [...list].sort((a, b) => b.proficiency - a.proficiency);
  }, [activeCategory, tools]);

  const visibleTools = useMemo(
    () => (showAll ? filteredTools : filteredTools.slice(0, INITIAL_VISIBLE_TOOLS)),
    [filteredTools, showAll],
  );

  const canToggle = filteredTools.length > INITIAL_VISIBLE_TOOLS;

  return (
    <section ref={sectionRef} className="bg-brand-cream scroll-mt-24 py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-5 bg-brand-yellow" />
            <span className="text-brand-green dark:text-brand-yellow">Skills</span>
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Technical Skills & Tools
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Core technologies I use to build modern products, with proficiency levels based on real project experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-full max-w-5xl">
            <div className="flex w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 sm:flex-wrap sm:justify-center">
              <Button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setShowAll(false);
                }}
                variant={activeCategory === "All" ? "primary" : "pill"}
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
                  variant={activeCategory === category ? "primary" : "pill"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{visibleTools.length}</span> of{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredTools.length}</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visibleTools.map((tool) => {
            const key = `${tool.category}:${tool.name}`;
            const logoSrc = skillLogoSrcMap[tool.name];
            const fallbackIconName = fallbackIconNameFromCategory(tool.category);

            return (
              <div
                key={key}
                className="group flex w-full max-w-[190px] flex-col rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none dark:bg-slate-900/40 dark:ring-white/10 dark:hover:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/15 to-brand-yellow/25 ring-1 ring-slate-900/5 dark:from-brand-green/10 dark:to-brand-yellow/10 dark:ring-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-900/5">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={tool.name}
                          className="h-6 w-6"
                          loading="lazy"
                        />
                      ) : (
                        <ApiUiIcon
                          name={fallbackIconName}
                          size={24}
                          color="brand-green"
                          darkColor="brand-yellow"
                          className="h-6 w-6"
                          decorative
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{tool.proficiency}%</div>
                </div>

                <div className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{tool.name}</div>
                {activeCategory === "All" ? (
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-brand-cream px-2.5 py-1 text-[10px] font-semibold text-brand-green ring-1 ring-brand-green/10 dark:bg-slate-950 dark:text-slate-200 dark:ring-white/10">
                      {tool.category}
                    </span>
                  </div>
                ) : null}

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label={`${tool.name} proficiency`} aria-valuenow={tool.proficiency} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-yellow"
                    style={{ width: `${tool.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {canToggle ? (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-expanded={showAll}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show less" : "Show more"}
              {showAll ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        ) : null}

        
        {/* Key Skills Summary */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/40 dark:ring-white/10">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream ring-1 ring-brand-green/10 dark:bg-slate-950 dark:ring-white/10">
              <ApiUiIcon name="Code" size={22} color="brand-green" darkColor="brand-yellow" className="h-5 w-5" decorative />
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-brand-green dark:text-brand-yellow">
              <AnimatedCounter to={50} suffix="+" />
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Technologies Mastered</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/40 dark:ring-white/10">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream ring-1 ring-brand-green/10 dark:bg-slate-950 dark:ring-white/10">
              <ApiUiIcon name="Settings" size={22} color="brand-green" darkColor="brand-yellow" className="h-5 w-5" decorative />
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-brand-green dark:text-brand-yellow">
              <AnimatedCounter to={30} suffix="+" />
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Production Systems</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/40 dark:ring-white/10">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream ring-1 ring-brand-green/10 dark:bg-slate-950 dark:ring-white/10">
              <ApiUiIcon name="Award" size={22} color="brand-green" darkColor="brand-yellow" className="h-5 w-5" decorative />
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-brand-green dark:text-brand-yellow">
              <AnimatedCounter to={4} suffix="+" />
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
