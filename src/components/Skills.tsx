"use client";

import { useMemo, useState } from "react";

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
  "PHP 7/8": 75,
  "Laravel": 70,
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
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-green">My Favorite Tools</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
            <span className="text-brand-yellow">Exploring the Tools</span>
            <br />
            Behind My Designs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies and tools I work with daily, with proficiency levels based on real project experience.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={
                activeCategory === "All"
                  ? "rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow"
                  : "rounded-full px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              }
            >
              All
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white shadow"
                    : "rounded-full px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                }
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredTools.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{tools.length}</span>
          </div>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-slate-950">{tool.name}</h4>
                  <p className="text-sm text-gray-500">{tool.category}</p>
                </div>
                <div className="rounded-full bg-brand-cream px-3 py-1 text-sm font-bold text-brand-green ring-1 ring-slate-900/5">
                  {tool.proficiency}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full rounded-full bg-slate-200/70 h-2">
                <div
                  className="h-2 rounded-full bg-brand-yellow transition-all duration-700 ease-out"
                  style={{ width: `${tool.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Key Skills Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">50+</div>
            <div className="text-gray-600">Technologies Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">30+</div>
            <div className="text-gray-600">Production Systems</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">4+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
