import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { IconLink } from "@/components/IconLink";
import { Section } from "@/components/Section";
import {
  coreCompetencies,
  education,
  experience,
  flagshipProject,
  keyAchievements,
  person,
  professionalSummary,
  technicalSkills,
} from "@/lib/resume-data";
import {
  Briefcase,
  Code,
  Gitlab,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Trophy,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/30"
      />
      <Container>
        <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
          <header className="space-y-4">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              Resume
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              {person.name}
            </h1>
            <p className="text-base font-medium text-slate-700 dark:text-slate-300 sm:text-lg">
              {person.role}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <div className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>{person.location}</span>
              </div>
              <IconLink href={`tel:${person.phone.replace(/\s/g, "")}`} icon={Phone}>
                {person.phone}
              </IconLink>
              <IconLink href={`mailto:${person.email}`} icon={Mail}>
                {person.email}
              </IconLink>
              <IconLink href={person.linkedinUrl} icon={Linkedin}>
                LinkedIn
              </IconLink>
              <IconLink href={person.gitlabUrl} icon={Gitlab}>
                GitLab {person.gitlabHandle}
              </IconLink>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
              {professionalSummary}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Contact
              </Link>
            </div>
          </header>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

          <Section title="Core Competencies" subtitle="Focus areas and strengths.">
            <div className="flex flex-wrap gap-2">
              {coreCompetencies.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Section>

          <Section title="Key Achievements" subtitle="Measurable outcomes and impact.">
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Highlights
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {keyAchievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>
            </Card>
          </Section>

          <Section title="Technical Skills" subtitle="Tools and technologies used in production.">
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(technicalSkills).map(([category, skills]) => (
                <Card key={category}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {category}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {skills.join(", ")}
                      </p>
                    </div>
                    <Code className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Professional Experience" subtitle="Recent role and responsibilities.">
            <div className="space-y-4">
              {experience.map((job) => (
                <Card key={`${job.company}-${job.title}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {job.title}
                      </p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {job.start} – {job.end}
                      </p>
                    </div>
                    <Briefcase className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Flagship Project" subtitle="Primary production system and measurable impact.">
            <Card>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {flagshipProject.name}
                  </p>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {flagshipProject.description}
                  </p>
                </div>
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Architecture
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {flagshipProject.architecture}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Supported Airlines
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {flagshipProject.supportedAirlines.map((a) => (
                      <li key={a}>{a}</li>
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

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Impact
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {flagshipProject.impact.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Section>

          <Section title="Education" subtitle="Academic background.">
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((e) => (
                <Card key={e.degree}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {e.degree}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {e.school}
                      </p>
                    </div>
                    <GraduationCap
                      className="h-5 w-5 text-amber-600 dark:text-amber-400"
                      aria-hidden="true"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            title="More"
            subtitle="Browse project work or get in touch."
            className="pb-0"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Projects
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Explore flagship work, live launches, and additional repositories.
                </p>
                <Link
                  href="/projects"
                  className="mt-3 inline-flex text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  View projects
                </Link>
              </Card>
              <Card>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Contact
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Email, LinkedIn, GitLab, and a quick email form.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  Contact
                </Link>
              </Card>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
