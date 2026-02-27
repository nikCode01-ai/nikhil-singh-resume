import type { Metadata } from 'next';
import { Card } from '@/components/Card';
import { ContactForm } from '@/components/ContactForm';
import { Container } from '@/components/Container';
import { IconLink } from '@/components/IconLink';
import { Section } from '@/components/Section';
import { ApiUiIcon } from '@/components/ApiUiIcon';
import { person } from '@/lib/resume-data';

export const metadata: Metadata = {
  title: 'Contact | Hire Senior Full Stack Developer - Nikhil Singh',
  description:
    'Contact Nikhil Singh - Senior Full Stack Developer for freelance projects, NDC API integration, GenAI solutions, or full-stack development work. Based in Agra, India. Available worldwide. Email: nikhilcool974@gmail.com',
  keywords: [
    'Hire Full Stack Developer',
    'Hire Next.js Developer',
    'Hire React Developer',
    'NDC API Developer Hire',
    'Freelance Developer Contact',
    'GenAI Developer Hire',
    'Full Stack Developer India',
    'Web Developer Contact',
    'Book Freelance Developer',
  ],
};

export default function ContactPage() {
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
              Contact
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Get in touch
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
              Reach out for full-stack engineering, real-time systems, NDC
              integrations, performance optimization, or infrastructure work.
            </p>
          </header>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

          <Section title="Direct" subtitle="Quick links.">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <div className="space-y-3">
                  {person.location ? (
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <ApiUiIcon
                        name="MapPin"
                        size={16}
                        color="amber-500"
                        darkColor="amber-400"
                        className="h-4 w-4"
                      />
                      <span>{person.location}</span>
                    </div>
                  ) : null}
                  {person.timezone ? (
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <ApiUiIcon
                        name="Clock"
                        size={16}
                        color="amber-500"
                        darkColor="amber-400"
                        className="h-4 w-4"
                      />
                      <span>{person.timezone}</span>
                    </div>
                  ) : null}
                  <IconLink
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    iconName="Phone"
                  >
                    {person.phone}
                  </IconLink>
                  <IconLink href={`mailto:${person.email}`} iconName="Mail">
                    {person.email}
                  </IconLink>
                  <IconLink href={person.linkedinUrl} iconName="Linkedin">
                    LinkedIn Profile
                  </IconLink>
                  <IconLink href={person.gitlabUrl} iconName="Gitlab">
                    GitLab {person.gitlabHandle}
                  </IconLink>
                  {person.githubUrl ? (
                    <IconLink href={person.githubUrl} iconName="Github">
                      GitHub Profile
                    </IconLink>
                  ) : null}
                  {person.twitterUrl ? (
                    <IconLink href={person.twitterUrl} iconName="Twitter">
                      Twitter/X
                    </IconLink>
                  ) : null}
                  {person.websiteUrl ? (
                    <IconLink href={person.websiteUrl} iconName="Globe">
                      Website
                    </IconLink>
                  ) : null}
                </div>
              </Card>

              <Card>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Preferred
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Email is best for detailed requirements. For quick
                  introductions, LinkedIn works well.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Include:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <li>Project type and goals</li>
                  <li>Timeline</li>
                  <li>Stack and constraints</li>
                  <li>Any relevant links or docs</li>
                </ul>
              </Card>
            </div>
          </Section>

          <Section
            title="Message"
            subtitle="Send me a message and I'll get back to you within 24 hours."
          >
            <Card>
              <ContactForm toEmail={person.email} />
            </Card>
          </Section>
        </div>
      </Container>
    </div>
  );
}
