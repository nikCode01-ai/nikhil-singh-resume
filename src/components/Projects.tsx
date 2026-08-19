'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, ButtonLink } from '@/components/Button';
import { additionalProjects, person } from '@/lib/resume-data';
import { projectSlugs } from '@/lib/project-slugs';
import type { StrapiProject } from '@/lib/strapi';
import {
  Calendar,
  Code2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  Layers,
  X,
  ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'https://nik-be.onrender.com';

function mapStrapiProject(p: StrapiProject) {
  let imgUrl: string | undefined = undefined;
  if (p.image?.url) {
    imgUrl = p.image.url.startsWith('http')
      ? p.image.url
      : `${STRAPI_URL}${p.image.url}`;
  }
  return {
    name: p.name,
    description: p.description,
    image: imgUrl,
    category: p.category || 'repository',
    tags: (p.tags || []).slice(0, 2),
    url: p.url || person.gitlabUrl,
    href: `/projects/${p.slug}`,
    date: p.date || '',
    tech: (p.tech || []).slice(0, 4),
  };
}

const localProjects = [
  ...projectSlugs.map((project) => ({
    name: project.name,
    description: project.description,
    image: project.image,
    category: project.category,
    tags: project.tags.slice(0, 2),
    url: project.url || person.gitlabUrl,
    href: `/projects/${project.slug}`,
    date: project.date,
    tech: project.tech.slice(0, 4),
  })),
  ...additionalProjects.map((project) => ({
    name: project.name,
    description: project.description,
    image: 'image' in project && project.image ? project.image : undefined,
    category: 'repository',
    tags: [project.role],
    url: person.gitlabUrl,
    date: '',
    tech: [] as string[],
  })),
];

const INITIAL_VISIBLE_PROJECTS = 6;
const categories = [
  'All Projects',
  'App Design',
  'Website Design',
  'Dashboard',
  'Wireframe',
  'Repository',
] as const;

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('All Projects');
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProjects, setAllProjects] = useState(localProjects);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prevShowAllRef = useRef(showAll);

  useEffect(() => {
    fetch(
      `${STRAPI_URL}/api/projects?pagination[pageSize]=100&sort=createdAt:desc&populate=*`
    )
      .then((res) => res.json())
      .then((json: { data?: StrapiProject[] }) => {
        if (json.data && json.data.length > 0) {
          setAllProjects(json.data.map(mapStrapiProject));
        }
      })
      .catch(() => {});
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Projects': allProjects.length,
    };
    categories.forEach((cat) => {
      if (cat !== 'All Projects') {
        const key = cat.toLowerCase().replace(' ', '-');
        counts[cat] = allProjects.filter((p) => p.category === key).length;
      }
    });
    return counts;
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    const filterCategory = activeCategory.toLowerCase().replace(' ', '-');
    return activeCategory === 'All Projects'
      ? allProjects
      : allProjects.filter((project) => project.category === filterCategory);
  }, [activeCategory, allProjects]);

  const searchFilteredProjects = useMemo(() => {
    if (!searchTerm.trim()) return filteredProjects;
    const term = searchTerm.toLowerCase();
    return filteredProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tech.some((tech) => tech.toLowerCase().includes(term))
    );
  }, [filteredProjects, searchTerm]);

  const visibleProjects = showAll
    ? searchFilteredProjects
    : searchFilteredProjects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const canToggle = searchFilteredProjects.length > INITIAL_VISIBLE_PROJECTS;

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 scroll-mt-24 section-padding"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* Background Subtle Gradient Lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-5xl bg-gradient-to-b from-brand-green/10 via-emerald-500/5 to-transparent blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-brand-green dark:text-emerald-400" />
            Curated Portfolio
          </div>
          <h2
            id="projects-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Featured{' '}
            <span className="text-brand-green dark:text-brand-greenLight">
              Work
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Real-world production systems, scalable web applications, real-time
            airline platforms, and modern cloud architectures.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <motion.div
          className="mb-10 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Search Input Box */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, keyword, or tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all text-sm shadow-xs"
              aria-label="Search projects"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Chips */}
          <div className="flex w-full items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                      : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Status Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 max-w-6xl mx-auto px-1">
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-500" />
              Showing{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {visibleProjects.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {searchFilteredProjects.length}
              </span>{' '}
              projects
            </span>
            {searchTerm && <span>Filtered by: &ldquo;{searchTerm}&rdquo;</span>}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1"
              >
                {'href' in project && project.href ? (
                  <Link
                    href={project.href}
                    aria-label={`Open ${project.name} project page`}
                    className="absolute inset-0 z-10 cursor-pointer"
                  >
                    <span className="sr-only">Open {project.name}</span>
                  </Link>
                ) : null}

                <div>
                  {/* Project Image Box */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={`${project.name} — ${project.description.slice(0, 80)}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <Code2 className="w-10 h-10 text-emerald-500/40 mb-2" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 line-clamp-1">
                          {project.name}
                        </p>
                      </div>
                    )}

                    {/* Category Badge on Top Left */}
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span className="inline-flex items-center rounded-full bg-slate-950/75 backdrop-blur-md px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20 capitalize shadow-xs">
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* External Link Button on Top Right */}
                    {project.url && (
                      <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-sm transition-transform hover:scale-110 hover:text-brand-green"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`External link for ${project.name}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    {project.date && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500/70" />
                        <span>{project.date}</span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors group-hover:text-brand-green dark:group-hover:text-brand-greenLight">
                      {project.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    {project.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green dark:text-brand-greenLight group-hover:gap-2.5 transition-all">
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {searchFilteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 max-w-md mx-auto"
          >
            <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Search className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-60" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                No matching projects found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                We couldn&apos;t find any projects matching &ldquo;{searchTerm}
                &rdquo;. Try another keyword or reset filters.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Projects');
                }}
                variant="secondary"
                size="sm"
              >
                Clear Search & Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Show More / Show Less Toggle Button */}
        {canToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <Button
              type="button"
              variant="secondary"
              size="md"
              aria-expanded={showAll}
              onClick={() => setShowAll((prev) => !prev)}
              className="gap-2 shadow-xs"
            >
              {showAll
                ? 'Show Fewer Projects'
                : `Show All ${searchFilteredProjects.length} Projects`}
              {showAll ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </motion.div>
        )}

        {/* Full Directory CTA Button */}
        <motion.div
          className="text-center mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Looking for detailed architecture breakdowns, performance metrics,
            and live demo links?
          </p>
          <ButtonLink
            href="/projects"
            variant="primary"
            size="lg"
            className="shadow-md shadow-brand-green/20"
          >
            Browse Full Project Directory
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
