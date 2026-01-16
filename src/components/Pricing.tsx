import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { featuredProjects, flagshipProject } from "@/lib/resume-data";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const plans = [
  {
    name: "Hourly",
    price: "₹3,500",
    cadence: "/ Hour",
    emphasized: false,
    features: [
      { label: "Bug fixes & urgent production issues", enabled: true },
      { label: "Next.js / React feature tweaks", enabled: true },
      { label: "API debugging (Fastify/Node.js)", enabled: true },
      { label: "Performance review + quick wins", enabled: true },
      { label: "WebSockets / SSE deep-dive", enabled: false },
      { label: "NDC API integration work", enabled: false },
    ],
  },
  {
    name: "Monthly",
    price: "₹2,40,000",
    cadence: "/ Month",
    emphasized: true,
    features: [
      { label: "Dedicated delivery (approx. 80 hrs/month)", enabled: true },
      { label: "Next.js 16 (App Router) + TypeScript", enabled: true },
      { label: "Real-time systems (WebSockets / SSE)", enabled: true },
      { label: "AWS + deployments (PM2, Nginx)", enabled: true },
      { label: "API integrations (REST/SOAP, NDC)", enabled: true },
      { label: "Weekly progress + roadmap planning", enabled: true },
    ],
  },
  {
    name: "Quarterly",
    price: "₹6,90,000",
    cadence: "/ Quarter",
    emphasized: false,
    features: [
      { label: "End-to-end feature delivery + refactors", enabled: true },
      { label: "Architecture + DB optimization (Postgres/Mongo)", enabled: true },
      { label: "NDC integrations (airline/aggregator)", enabled: true },
      { label: "Caching + performance (target up to 50%)", enabled: true },
      { label: "CI/CD + monitoring baseline", enabled: true },
      { label: "Stability focus (99.9% uptime mindset)", enabled: true },
    ],
  },
] as const;

export function Pricing() {
  return (
    <div className="relative overflow-hidden bg-brand-green text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(900px_circle_at_20%_10%,rgba(244,180,0,0.35),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
      <Container>
        <div className="relative py-12 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide text-white/80">Pricing Table</p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                My <span className="text-brand-yellow">Pricing</span> Model
              </h1>
            </div>

            <ButtonLink
              href="/contact"
              variant="primary"
              size="sm"
              className="h-10 gap-2 rounded-full bg-brand-yellow px-6 text-brand-green hover:bg-brand-yellow/90"
            >
              Get Started
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-brand-yellow">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.emphasized
                    ? "relative rounded-3xl bg-brand-yellow p-7 text-brand-green shadow-2xl ring-1 ring-black/10"
                    : "relative rounded-3xl bg-white/5 p-7 text-white shadow-xl ring-1 ring-white/10"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={plan.emphasized ? "text-base font-semibold" : "text-base font-semibold text-white"}>
                      {plan.name}
                    </p>
                    <div className="mt-2 flex items-end gap-2">
                      <div className={plan.emphasized ? "text-4xl font-extrabold" : "text-4xl font-extrabold text-brand-yellow"}>
                        {plan.price}
                      </div>
                      <div className={plan.emphasized ? "pb-1 text-sm font-medium text-brand-green/80" : "pb-1 text-sm font-medium text-white/70"}>
                        {plan.cadence}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      plan.emphasized
                        ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-brand-yellow"
                        : "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-brand-green"
                    }
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className={
                        f.enabled
                          ? plan.emphasized
                            ? "flex items-start gap-3 text-sm"
                            : "flex items-start gap-3 text-sm text-white/90"
                          : "flex items-start gap-3 text-sm text-white/35"
                      }
                    >
                      <span
                        className={
                          f.enabled
                            ? plan.emphasized
                              ? "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-brand-yellow"
                              : "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-brand-green"
                            : "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/35"
                        }
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-6">{f.label}</span>
                    </li>
                  ))}
                </ul>

                {plan.emphasized ? (
                  <div className="pointer-events-none absolute inset-x-6 -bottom-6 h-10 rounded-3xl bg-black/10 blur-xl" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white/80">Aligned to my work</p>
                <h2 className="text-xl font-semibold tracking-tight text-white">Recent production examples</h2>
                <p className="max-w-3xl text-sm leading-6 text-white/70">
                  Pricing is based on real delivery across Next.js platforms, real-time systems (WebSockets/SSE), and airline NDC
                  integrations.
                </p>
              </div>
              <ButtonLink href="/projects" variant="inverse" size="sm" className="h-10">
                View Projects
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-black/10 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">{flagshipProject.name}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{flagshipProject.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {flagshipProject.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {featuredProjects[0] ? (
                <div className="rounded-2xl bg-black/10 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">{featuredProjects[0].name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{featuredProjects[0].description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredProjects[0].tech.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
