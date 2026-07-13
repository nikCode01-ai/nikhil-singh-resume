import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/Badge';
import { ButtonLink } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { flagshipProject } from '@/lib/resume-data';
import { Activity, ArrowLeft, Gauge, Plane, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDC Terminal',
  description:
    'NDC Terminal: a cryptic command-line airline booking system enabling full booking flows in under 30 seconds using short commands.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical:
      'https://nikhilsingh-eight.vercel.app/projects/ndc-terminal-airline-booking-system',
  },
};

export default function NdcTermPage() {
  const highlights = [
    {
      title: '< 30s',
      subtitle: 'Booking flows',
      description:
        'Cryptic commands to complete end-to-end airline bookings fast.',
      Icon: Gauge,
    },
    {
      title: '1000+',
      subtitle: 'Daily bookings',
      description: 'Production usage with high-throughput workflows.',
      Icon: Activity,
    },
    {
      title: '25+',
      subtitle: 'Airlines',
      description: 'Direct NDC + AirGateway aggregator coverage.',
      Icon: Plane,
    },
  ];

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/30"
      />
      <Container>
        <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <ButtonLink href="/projects" variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Projects
            </ButtonLink>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              Flagship System
            </span>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                {flagshipProject.name}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
                {flagshipProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                  NDC Integrations
                </Badge>
                <Badge className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                  Real-time
                </Badge>
                <Badge className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                  WebSockets
                </Badge>
              </div>
            </div>

            {'image' in flagshipProject && flagshipProject.image ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '404 / 260' }}
                >
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
          </div>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

          <Section
            title="Highlights"
            subtitle="At-a-glance performance and coverage."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map(({ title, subtitle, description, Icon }) => (
                <Card key={subtitle} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {title}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {subtitle}
                      </p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-2 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            title="System Details"
            subtitle="Architecture, airline coverage, impact, and tech stack."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="p-6">
                <div className="space-y-4">
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
                      Tech
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {flagshipProject.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4">
                <Card className="p-6">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Supported Airlines
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {flagshipProject.supportedAirlines.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Impact
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {flagshipProject.impact.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
