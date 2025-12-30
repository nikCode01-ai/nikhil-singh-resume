import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { IconLink } from "@/components/IconLink";
import { Section } from "@/components/Section";
import { person } from "@/lib/resume-data";
import { Gitlab, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nikhil Singh — Senior Full Stack Developer & Cloud Infrastructure Specialist.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <header className="space-y-3">
          <p className="text-sm font-semibold text-blue-800">Contact</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Get in touch
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Reach out for full-stack engineering, real-time systems, NDC
            integrations, performance optimization, or infrastructure work.
          </p>
        </header>

        <div className="mt-10 border-t border-slate-200" />

        <Section title="Direct" subtitle="Quick links.">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <div className="space-y-3">
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
            </Card>

            <Card>
              <p className="text-sm font-semibold text-slate-900">Preferred</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Email is best for detailed requirements. For quick introductions,
                LinkedIn works well.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Include:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                <li>Project type and goals</li>
                <li>Timeline</li>
                <li>Stack and constraints</li>
                <li>Any relevant links or docs</li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section title="Message" subtitle="This opens your email client (no backend required).">
          <Card>
            <ContactForm toEmail={person.email} />
          </Card>
        </Section>
      </div>
    </Container>
  );
}
