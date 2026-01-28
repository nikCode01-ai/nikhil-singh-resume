"use client";

import { useEffect, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/Button";
import { additionalProjects, featuredProjects, flagshipProject, person } from "@/lib/resume-data";
import { ExternalLink, Calendar, Code, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projectImages = [
  "/images/flightbooking.png",
  "/images/panamakosherfest.png",
  "/images/freshkosher.png",
  "/api/placeholder/400/300?text=Travel+Platform",
  "/api/placeholder/400/300?text=E-commerce+Solution",
  "/api/placeholder/400/300?text=Event+Management"
];

const allProjects = [
  {
    name: flagshipProject.name,
    description: flagshipProject.description,
    image: ("image" in flagshipProject && flagshipProject.image) ? flagshipProject.image : projectImages[0],
    category: "Application Design",
    tags: ["UI/UX Design", "App Design", "Backend"],
    url: "/projects/ndcterm",
    href: "/projects/ndcterm",
    date: "2024",
    tech: flagshipProject.tech.slice(0, 3)
  },
  ...featuredProjects.map((project, index) => ({
    name: project.name,
    description: project.description,
    image: ("image" in project && project.image) ? project.image : projectImages[index + 1],
    category: index === 0 ? "Website Design" : index === 1 ? "Dashboard" : "Wireframe",
    tags: (project.features ?? []).slice(0, 2).map((f) => f.split(" ")[0]),
    url: project.url || "#",
    date: project.date,
    tech: project.tech.slice(0, 3)
  })),
  ...additionalProjects.map((project) => ({
    name: project.name,
    description: project.description,
    image: ("image" in project && project.image) ? project.image : undefined,
    category: "Repository",
    tags: [project.role],
    url: person.gitlabUrl,
    date: "",
    tech: [] as string[]
  }))
];

const INITIAL_VISIBLE_PROJECTS = 6;

const categories = ["All Projects", "App Design", "Website Design", "Dashboard", "Wireframe", "Repository"] as const;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All Projects");
  const [showAll, setShowAll] = useState(false);

  const filterCategory = activeCategory === "App Design" ? "Application Design" : activeCategory;
  const filteredProjects =
    activeCategory === "All Projects" ? allProjects : allProjects.filter((project) => project.category === filterCategory);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const canToggle = filteredProjects.length > INITIAL_VISIBLE_PROJECTS;

  const sectionRef = useRef<HTMLElement | null>(null);
  const prevShowAllRef = useRef(showAll);

  useEffect(() => {
    const wasExpanded = prevShowAllRef.current;
    prevShowAllRef.current = showAll;

    if (wasExpanded && !showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

  return (
    <section ref={sectionRef} className="bg-brand-cream scroll-mt-24 py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-slate-100">
            My Latest Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-slate-300">
            Explore my recent work across different industries and technologies.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              type="button"
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              variant={category === activeCategory ? "primary" : "pill"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-slate-900/60 dark:ring-1 dark:ring-white/10"
            >
              {"href" in project && project.href ? (
                <Link
                  href={project.href}
                  aria-label={`Open ${project.name} project page`}
                  className="absolute inset-0 z-10 cursor-pointer"
                >
                  <span className="sr-only">Open project</span>
                </Link>
              ) : null}
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/40 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Code className="w-12 h-12 text-brand-green mx-auto mb-2 dark:text-brand-yellow" />
                      <p className="text-brand-green font-medium dark:text-brand-yellow">{project.name}</p>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"></div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow">
                    {project.category}
                  </span>
                  {project.date ? (
                    <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                  ) : null}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors dark:text-slate-100 dark:group-hover:text-brand-yellow">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2 dark:text-slate-300">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded bg-brand-yellow/25 px-2 py-1 text-xs text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* View Project Link */}
                {"href" in project && project.href ? (
                  <span className="inline-flex items-center gap-2 text-brand-green font-semibold dark:text-brand-yellow">
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <a
                    href={project.url}
                    className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-greenDark transition-colors dark:text-brand-yellow dark:hover:text-brand-yellow/80"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
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
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <ButtonLink href="/projects" variant="primary" size="lg">
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
