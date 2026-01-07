import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import {
  additionalProjects,
  featuredProjects,
  flagshipProject,
  person,
} from "@/lib/resume-data";
import { ExternalLink, Gitlab, Layers, Trophy } from "lucide-react";

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

        <Section title="Behance" subtitle="Selected design work.">
          <Card>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="relative w-full" style={{ aspectRatio: "404 / 316" }}>
                <iframe
                  title="Behance project embed"
                  src="https://www.behance.net/embed/project/199733791?ilo0=1"
                  className="absolute inset-0 h-full w-full"
                  allow="clipboard-write"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </Card>
        </Section>

        <Section title="Flagship" subtitle="Primary production system and business impact.">
          <Card>
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

        <Section title="Featured" subtitle="Notable launches and platforms.">
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((p) => (
              <Card key={p.name}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {p.name}
                    </p>
                    {"url" in p && p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span>Live site</span>
                      </a>
                    ) : null}
                    {"date" in p && p.date ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Event date: {p.date}
                      </p>
                    ) : null}
                  </div>
                  <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {p.description}
                </p>

                {"features" in p && p.features?.length ? (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Features
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {"tech" in p && p.tech?.length ? (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tech</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>

        <Section
          title="Additional Repositories"
          subtitle="A broader list of active work and maintained codebases (GitLab)."
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              GitLab profile: <span className="font-semibold">{person.gitlabHandle}</span>
            </p>
            <a
              href={person.gitlabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
            >
              <Gitlab className="h-4 w-4" aria-hidden="true" />
              <span>Open GitLab</span>
            </a>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additionalProjects.map((p) => (
              <Card key={p.name} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {p.name}
                    </p>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                      {p.role}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400" aria-hidden="true">
                    •
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {p.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold !text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:!bg-white dark:!text-slate-900 dark:hover:bg-slate-50 dark:focus:ring-slate-400"
            >
              Discuss a project
            </Link>
          </div>
        </Section>
        </div>
      </Container>
    </div>
  );
}
