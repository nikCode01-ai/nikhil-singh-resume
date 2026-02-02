import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { flagshipProject } from "@/lib/resume-data";
import { projectSlugs } from "@/lib/project-slugs";
import { ExternalLink, Gitlab, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Nikhil Singh: real-time systems, NDC integrations, Next.js platforms, and production deployments.",
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/30"
      />
      <Container>
        <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
          <header className="space-y-3">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              Portfolio
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Projects
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
              A selection of production work across aviation, travel, real-time
              booking, and content platforms.
            </p>
          </header>

        <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

        <Section title="Flagship" subtitle="Primary production system and business impact.">
          <Card>
            {"image" in flagshipProject && flagshipProject.image ? (
              <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="relative w-full" style={{ aspectRatio: "404 / 260" }}>
                  <Image
                    src={flagshipProject.image}
                    alt={flagshipProject.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {flagshipProject.name}
                </p>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {flagshipProject.description}
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Architecture:
                  </span>{" "}
                  {flagshipProject.architecture}
                </p>
              </div>
              <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Supported Airlines
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {flagshipProject.supportedAirlines.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Impact</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {flagshipProject.impact.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tech</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {flagshipProject.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </Section>

        <Section title="Featured Projects" subtitle="Detailed case studies and implementations.">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSlugs.slice(0, 3).map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                {"image" in project && project.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                    {project.date && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">{project.date}</span>
                    )}
                  </div>
                   
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-greenDark dark:text-brand-yellow dark:hover:text-brand-yellow/80 transition-colors"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="All Projects" subtitle="Complete portfolio of work.">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSlugs.slice(3).map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                {"image" in project && project.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-sm font-medium text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                    {project.date && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">{project.date}</span>
                    )}
                  </div>
                   
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-green dark:group-hover:text-brand-yellow transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-greenDark dark:text-brand-yellow dark:hover:text-brand-yellow/80 transition-colors"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
        </div>
      </Container>
    </div>
  );
}
