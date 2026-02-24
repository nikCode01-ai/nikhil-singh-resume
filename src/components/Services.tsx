import { Button, ButtonLink } from "@/components/Button";
import { ApiUiIcon } from "@/components/ApiUiIcon";
import { coreCompetencies, services } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const getIconForService = (serviceName: string): string => {
  const serviceLower = serviceName.toLowerCase();
  if (serviceLower.includes("full stack") || serviceLower.includes("web development")) return "Code";
  if (serviceLower.includes("ndc") || serviceLower.includes("api")) return "Globe";
  if (serviceLower.includes("genai") || serviceLower.includes("llm") || serviceLower.includes("ai")) return "Bot";
  if (serviceLower.includes("performance")) return "Target";
  if (serviceLower.includes("cloud") || serviceLower.includes("infrastructure")) return "Cloud";
  return "Settings";
};

type ServicesVariant = "section" | "page";

type ServicesProps = {
  variant?: ServicesVariant;
};

const heroHighlights = [
  {
    icon: "Code",
    title: "End-to-end delivery",
    description: "Frontend, backend, and data layers built together for speed and cohesion.",
  },
  {
    icon: "Globe",
    title: "Real-time integrations",
    description: "NDC, REST, SOAP, and event-driven flows designed for reliability.",
  },
  {
    icon: "Bot",
    title: "GenAI enablement",
    description: "RAG pipelines, automation, and tooling that fit production workflows.",
  },
];

const impactStats = [
  { value: "30+", label: "Production systems delivered", icon: "Code" },
  { value: "99.9%", label: "Uptime mindset", icon: "Target" },
  { value: "4+", label: "Years in full-stack", icon: "Users" },
  { value: "25+", label: "Industries covered", icon: "Building2" },
];

const deliverySteps = [
  {
    title: "Discovery & scope",
    description: "Clarify goals, users, constraints, and measurable success metrics.",
  },
  {
    title: "Architecture & plan",
    description: "Define domains, data flows, and the integration strategy.",
  },
  {
    title: "Build & integrate",
    description: "Ship features with APIs, real-time workflows, and tests.",
  },
  {
    title: "Launch & optimize",
    description: "Observability, performance tuning, and iteration after launch.",
  },
];

const engagementModels = [
  {
    title: "Project delivery",
    description: "Milestone-based build with a scoped roadmap and release plan.",
    icon: "Bookmark",
  },
  {
    title: "Product retainer",
    description: "Ongoing enhancements, monitoring, and roadmap execution.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Technical advisory",
    description: "Architecture reviews, audits, and team enablement.",
    icon: "Users",
  },
];

export function Services({ variant = "section" }: ServicesProps) {
  const isPage = variant === "page";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-white dark:bg-slate-950",
        isPage ? "py-24 sm:py-28" : "py-20",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-brand-yellow/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={cn("text-center", isPage ? "mb-16" : "mb-14")}>
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-5 bg-brand-yellow" />
            <span className="text-brand-green dark:text-brand-yellow">Services</span>
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            {isPage ? (
              "Engineering services for real-time, API-first products"
            ) : (
              <>
                <span className="text-brand-yellow">Services</span> I Provide
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {isPage
              ? "From discovery to production, I build systems that prioritize speed, reliability, and measurable outcomes."
              : "Comprehensive development solutions from frontend to backend, with expertise in modern technologies and best practices."}
          </p>

          {isPage ? (
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="primary" size="sm">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/price" variant="secondary" size="sm">
                View Pricing
              </ButtonLink>
            </div>
          ) : (
            <div className="mt-7 flex justify-center">
              <ButtonLink href="/services" variant="primary" size="sm">
                View All Services
              </ButtonLink>
            </div>
          )}
        </div>

        {isPage ? (
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/60 dark:ring-white/10">
              <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">Specialized focus</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                Built for high-stakes systems
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Product-ready engineering for teams that need resilience, real-time performance, and clean architecture.
              </p>

              <div className="mt-6 space-y-4">
                {heroHighlights.map((highlight) => (
                  <div key={highlight.title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cream ring-1 ring-slate-900/5 dark:bg-slate-800/60 dark:ring-white/10">
                      <ApiUiIcon
                        name={highlight.icon}
                        size={20}
                        color="brand-green"
                        darkColor="brand-yellow"
                        className="h-5 w-5"
                        decorative
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{highlight.title}</p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {coreCompetencies.map((competency) => (
                  <span
                    key={competency}
                    className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-green ring-1 ring-brand-green/10 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-white/10"
                  >
                    {competency}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-brand-green to-brand-greenDark p-8 text-white shadow-lg">
              <p className="text-sm font-semibold text-brand-yellow">Delivery proof</p>
              <h3 className="mt-2 text-2xl font-bold">Measured outcomes for modern teams</h3>
              <p className="mt-3 text-sm text-white/80">
                Focused on stability, speed, and business impact across complex integrations.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <ApiUiIcon name={stat.icon} size={18} color="brand-yellow" className="h-4 w-4" decorative />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-yellow">{stat.value}</div>
                        <div className="text-xs text-white/80">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs text-white/80">
                Typically returning a scoped plan within 24-48 hours after discovery.
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/60 dark:ring-white/10"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-yellow/70 via-brand-green/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream ring-1 ring-slate-900/5 transition-colors group-hover:bg-brand-yellow/25 dark:bg-slate-800/60 dark:ring-white/10 dark:group-hover:bg-brand-yellow/20">
                <ApiUiIcon name={getIconForService(service.name)} size={28} className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{service.name}</h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-green ring-1 ring-brand-green/10 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-7"
              >
                Learn more
                <ApiUiIcon
                  name="ArrowRight"
                  size={16}
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </div>
          ))}
        </div>

        {isPage ? (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/60 dark:ring-white/10 lg:col-span-2">
              <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">Delivery</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">How projects move</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Transparent milestones and tight feedback loops keep delivery predictable.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {deliverySteps.map((step, stepIndex) => (
                  <div key={step.title} className="rounded-2xl bg-white/80 p-5 ring-1 ring-slate-900/5 dark:bg-slate-900/70 dark:ring-white/10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-sm font-semibold text-brand-green dark:bg-slate-800 dark:text-brand-yellow">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{step.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-brand-cream/90 p-8 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900/60 dark:ring-white/10">
              <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">Engagement</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Ways to work together</h3>
              <div className="mt-5 space-y-4">
                {engagementModels.map((model) => (
                  <div key={model.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-900/5 dark:bg-slate-800/60 dark:ring-white/10">
                      <ApiUiIcon name={model.icon} size={18} color="brand-green" darkColor="brand-yellow" className="h-4 w-4" decorative />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{model.title}</p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary" size="sm">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/price" variant="secondary" size="sm">
                  Pricing
                </ButtonLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
