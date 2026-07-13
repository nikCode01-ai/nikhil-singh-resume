'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, ButtonLink } from '@/components/Button';
import { ProjectGridSkeleton } from '@/components/ProjectSkeleton';
import { additionalProjects, person } from '@/lib/resume-data';
import { projectSlugs } from '@/lib/project-slugs';
import {
  ExternalLink,
  Calendar,
  Code,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const allProjects = [
  ...projectSlugs.map((project) => ({
    name: project.name,
    description: project.description,
    image: project.image,
    category: project.category,
    tags: project.tags.slice(0, 2),
    url: project.url || person.gitlabUrl,
    href: `/projects/${project.slug}`,
    date: project.date,
    tech: project.tech.slice(0, 3),
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prevShowAllRef = useRef(showAll);

  const filterCategory = activeCategory.toLowerCase().replace(' ', '-');
  const filteredProjects =
    activeCategory === 'All Projects'
      ? allProjects
      : allProjects.filter((project) => project.category === filterCategory);
  const searchFilteredProjects = searchTerm
    ? filteredProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : filteredProjects;

  const visibleProjects = showAll
    ? searchFilteredProjects
    : searchFilteredProjects.slice(0, INITIAL_VISIBLE_PROJECTS);
  const canToggle = searchFilteredProjects.length > INITIAL_VISIBLE_PROJECTS;

  useEffect(() => {
    if (searchTerm || activeCategory !== 'All Projects') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, activeCategory]);

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
      className="bg-white dark:bg-slate-950 scroll-mt-24 section-padding"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-brand-green/20 dark:bg-brand-yellow/20" />
            <span className="text-brand-green dark:text-brand-yellow">
              Projects
            </span>
            <span className="h-px w-8 bg-brand-green/20 dark:bg-brand-yellow/20" />
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured Work
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore my recent work across different industries and technologies.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-white/3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-yellow/20 focus:border-brand-green dark:focus:border-brand-yellow transition-all duration-200 text-sm"
                aria-label="Search projects"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label="Clear search"
                >
                  <span className="text-lg">&times;</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="secondary"
              size="sm"
              className="mb-4"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-wrap justify-center gap-2"
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        onClick={() => {
                          setActiveCategory(category);
                          setShowAll(false);
                        }}
                        variant={
                          category === activeCategory ? 'primary' : 'pill'
                        }
                        size="sm"
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isFilterOpen && (
            <div className="text-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Category:{' '}
                <span className="font-semibold text-brand-green dark:text-brand-yellow">
                  {activeCategory}
                </span>
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          layout
        >
          {isLoading ? (
            <ProjectGridSkeleton count={visibleProjects.length || 6} />
          ) : (
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.name}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative card-premium overflow-hidden"
                >
                  {'href' in project && project.href ? (
                    <Link
                      href={project.href}
                      aria-label={`Open ${project.name} project page`}
                      className="absolute inset-0 z-10 cursor-pointer"
                    >
                      <span className="sr-only">Open project</span>
                    </Link>
                  ) : null}

                  {/* Project Image - 16:9 */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Code className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {project.name}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-brand-green/8 dark:bg-brand-yellow/8 px-3 py-1 text-xs font-semibold text-brand-green dark:text-brand-yellow capitalize">
                        {project.category.replace('-', ' ')}
                      </span>
                      {project.date && (
                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs">{project.date}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-slate-100 dark:bg-white/6 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      {'href' in project && project.href ? (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow group-hover:gap-3 transition-all">
                          View Project
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      ) : (
                        <a
                          href={project.url}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green dark:text-brand-yellow hover:underline transition-colors"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {searchFilteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-slate-400 dark:text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
            <Button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All Projects');
              }}
              variant="secondary"
              size="sm"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {canToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
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
          </motion.div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ButtonLink href="/projects" variant="primary" size="lg">
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
