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
    <div>
      <Container>
        <div className="py-10 sm:py-14">
          <header className="space-y-4">
            <p className="text-sm font-semibold text-blue-800">Resume</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {person.name}
            </h1>
            <p className="text-base font-medium text-slate-700 sm:text-lg">
              {person.role}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <div className="inline-flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="h-4 w-4 text-blue-700" aria-hidden="true" />
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

            <p className="max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              {professionalSummary}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact
              </Link>
            </div>
          </header>

          <div className="mt-10 border-t border-slate-200" />

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
                  <p className="text-sm font-semibold text-slate-900">Highlights</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                    {keyAchievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <Trophy className="h-5 w-5 text-blue-700" aria-hidden="true" />
              </div>
            </Card>
          </Section>

          <Section title="Technical Skills" subtitle="Tools and technologies used in production.">
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(technicalSkills).map(([category, skills]) => (
                <Card key={category}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {category}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {skills.join(", ")}
                      </p>
                    </div>
                    <Code className="h-5 w-5 text-blue-700" aria-hidden="true" />
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
                      <p className="text-base font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-sm text-slate-600">
                        {job.start} – {job.end}
                      </p>
                    </div>
                    <Briefcase className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
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
                  <p className="text-base font-semibold text-slate-900">
                    {flagshipProject.name}
                  </p>
                  <p className="text-sm leading-6 text-slate-700">
                    {flagshipProject.description}
                  </p>
                </div>
                <Trophy className="h-5 w-5 text-blue-700" aria-hidden="true" />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Architecture</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {flagshipProject.architecture}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Supported Airlines</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                    {flagshipProject.supportedAirlines.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">Tech</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {flagshipProject.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">Impact</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
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
                      <p className="text-sm font-semibold text-slate-900">{e.degree}</p>
                      <p className="text-sm text-slate-600">{e.school}</p>
                    </div>
                    <GraduationCap className="h-5 w-5 text-blue-700" aria-hidden="true" />
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
                <p className="text-sm font-semibold text-slate-900">Projects</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Explore flagship work, live launches, and additional repositories.
                </p>
                <Link
                  href="/projects"
                  className="mt-3 inline-flex text-sm font-semibold text-blue-800 hover:text-blue-900"
                >
                  View projects
                </Link>
              </Card>
              <Card>
                <p className="text-sm font-semibold text-slate-900">Contact</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Email, LinkedIn, GitLab, and a quick email form.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex text-sm font-semibold text-blue-800 hover:text-blue-900"
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
