"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, ExternalLink, Search } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button, ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

type JobItem = {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  date: string | null;
};

type JobsApiResponse = {
  query: string;
  totalResults: string | null;
  searchTime: number | null;
  fetchedAt: string;
  items: JobItem[];
};

type JobsApiErrorResponse = {
  error?: unknown;
  missing?: unknown;
  status?: unknown;
  body?: unknown;
};

async function getJobsApiErrorMessage(res: Response) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await res.json().catch(() => null)) as JobsApiErrorResponse | null;
    const errorText = typeof payload?.error === "string" ? payload.error : "";

    if (errorText === "Google Custom Search is not configured") {
      const missing = payload?.missing;
      const missingKeys =
        missing && typeof missing === "object"
          ? Object.entries(missing as Record<string, unknown>)
              .filter(([, v]) => Boolean(v))
              .map(([k]) => k)
          : [];

      const keysLine = missingKeys.length ? `Missing: ${missingKeys.join(", ")}` : "Missing configuration.";
      return `Jobs search is not configured.\n${keysLine}\nAdd them to your .env.local and restart the dev server.`;
    }

    if (errorText) return errorText;
  }

  const text = await res.text().catch(() => "");
  return text || `Request failed (${res.status})`;
}

function formatIsoDate(dateIso: string) {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function groupLabelForDate(dateIso: string | null) {
  if (!dateIso) return "Unknown date";
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "Unknown date";

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfItem = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor((startOfToday.getTime() - startOfItem.getTime()) / 86_400_000);

  if (diffDays <= 0) return "Today";
  if (diffDays <= 7) return "Last 7 days";
  if (diffDays <= 30) return "Last 30 days";
  return "Older";
}

export function JobsClient() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("Full Stack Developer");
  const [location, setLocation] = useState("Remote / India");
  const [days, setDays] = useState(30);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<JobsApiResponse | null>(null);

  const fetchJobs = async ({ q, role, location, days }: { q: string; role: string; location: string; days: number }) => {
    const nextQ = q;
    const nextRole = role;
    const nextLocation = location;
    const nextDays = days;

    setStatus("loading");
    setError(null);

    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextRole.trim()) params.set("role", nextRole.trim());
    if (nextLocation.trim()) params.set("location", nextLocation.trim());
    params.set("days", String(nextDays));

    const res = await fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) {
      const text = await getJobsApiErrorMessage(res);
      setStatus("error");
      setError(text || "Request failed");
      return;
    }

    const json = (await res.json()) as JobsApiResponse;
    setData(json);
    setStatus("success");
  };

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setStatus("loading");
      setError(null);
    });

    const params = new URLSearchParams();
    params.set("role", "Full Stack Developer");
    params.set("location", "Remote / India");
    params.set("days", String(30));

    fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await getJobsApiErrorMessage(res);
          throw new Error(text || "Request failed");
        }
        return (await res.json()) as JobsApiResponse;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setStatus("success");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : "Something went wrong");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const itemsSorted = useMemo(() => {
    const items = data?.items ?? [];
    return [...items].sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : -Infinity;
      const bTime = b.date ? new Date(b.date).getTime() : -Infinity;
      if (aTime !== bTime) return bTime - aTime;
      return a.title.localeCompare(b.title);
    });
  }, [data?.items]);

  const grouped = useMemo(() => {
    const order = ["Today", "Last 7 days", "Last 30 days", "Older", "Unknown date"] as const;
    const map = new Map<string, JobItem[]>();

    for (const item of itemsSorted) {
      const label = groupLabelForDate(item.date);
      const existing = map.get(label) ?? [];
      existing.push(item);
      map.set(label, existing);
    }

    return order
      .map((label) => ({ label, items: map.get(label) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [itemsSorted]);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-brand-yellow/10 via-brand-cream to-transparent dark:from-brand-greenDark/40"
      />

      <Container>
        <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
          <header className="space-y-3">
            <p className="text-sm font-semibold text-brand-green dark:text-brand-yellow">Opportunities</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Jobs
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
              Live vacancies relevant to your profile, fetched in real-time using Google Custom Search.
            </p>
          </header>

          <div className="mt-8">
            <Card>
              <form
                className="grid gap-3 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchJobs({ q, role, location, days }).catch((err: unknown) => {
                    setStatus("error");
                    setError(err instanceof Error ? err.message : "Something went wrong");
                  });
                }}
              >
                <label className="space-y-1">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Keywords</div>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder='e.g. "Next.js" "GenAI" "Fastify"'
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Role</div>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Location</div>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Time range</div>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value={7}>Last 7 days</option>
                    <option value={14}>Last 14 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                  </select>
                </label>

                <div className="sm:col-span-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {data?.query ? (
                      <span>
                        Using query: <span className="font-semibold text-slate-700 dark:text-slate-200">{data.query}</span>
                      </span>
                    ) : (
                      <span>Tip: leave Keywords empty to use your profile-based default search.</span>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="sm" disabled={status === "loading"}>
                    <Search className="h-4 w-4" aria-hidden="true" />
                    {status === "loading" ? "Searching..." : "Search"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-800" />

          <Section
            title="Results"
            subtitle={
              data
                ? `${itemsSorted.length} results${data.searchTime ? ` • ${data.searchTime}s` : ""}${data.fetchedAt ? ` • Updated ${new Date(data.fetchedAt).toLocaleString()}` : ""}`
                : ""
            }
          >
            {status === "error" ? (
              <Card>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Could not load jobs</div>
                <div className="mt-2 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">{error}</div>
              </Card>
            ) : null}

            {status === "loading" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-0">
                    <div className="h-28 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
                  </Card>
                ))}
              </div>
            ) : null}

            {status === "success" && grouped.length === 0 ? (
              <Card>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">No jobs found</div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Try different keywords, broaden location, or increase the time range.
                </div>
              </Card>
            ) : null}

            {status === "success" ? (
              <div className="space-y-8">
                {grouped.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {group.label}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{group.items.length}</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {group.items.map((item) => (
                        <Card key={item.link || item.title} className="p-4">
                          <div className="min-w-0">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm font-semibold leading-6 text-slate-900 hover:text-brand-greenDark dark:text-slate-100 dark:hover:text-brand-yellow"
                            >
                              {item.title || item.link}
                            </a>

                            {item.snippet ? (
                              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.snippet}</p>
                            ) : null}

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex flex-wrap gap-2">
                                {item.displayLink ? <Badge>{item.displayLink}</Badge> : null}
                                {item.date ? (
                                  <Badge className="gap-1">
                                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                    {formatIsoDate(item.date)}
                                  </Badge>
                                ) : null}
                              </div>

                              <div className="flex items-center gap-2">
                                <ButtonLink
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="primary"
                                  size="sm"
                                >
                                  Apply
                                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                </ButtonLink>

                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                                  aria-label="Open job"
                                >
                                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Section>
        </div>
      </Container>
    </div>
  );
}
