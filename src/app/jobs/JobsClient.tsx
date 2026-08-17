'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Globe,
  IndianRupee,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/Badge';
import { Button, ButtonLink } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

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

type WorkMode = 'Work from office' | 'Hybrid' | 'Remote';

type SortOption = 'recommended' | 'newest' | 'title';

function cleanSpaces(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

function stripTrailingDots(input: string) {
  return input.replace(/\s*\.{3,}\s*$/g, '').trim();
}

function normalizeTitle(raw: string) {
  const t = stripTrailingDots(cleanSpaces(raw));
  const withoutPrefix = t.replace(
    /^\s*(?:hiring|we\s+are\s+hiring)\s*[:\-–—]?\s*/i,
    ''
  );

  const separators = [' | ', ' - ', ' – ', ' — '];
  for (const sep of separators) {
    if (!withoutPrefix.includes(sep)) continue;
    const parts = withoutPrefix
      .split(sep)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length <= 1) continue;

    const first = parts[0];
    const last = parts[parts.length - 1];
    const lastLooksLikeSite =
      /\b(?:com|in|net|org)\b/i.test(last) || /\./.test(last);
    if (lastLooksLikeSite && first.length >= 8) return first;
  }

  return withoutPrefix;
}

function extractJobTitleFromSnippet(snippet: string) {
  const text = cleanSpaces(snippet);
  const m = text.match(
    /\bJob\s*Title\s*:?\s*\*?\s*([^.|•]+?)(?:\s*[.|•]|\s*$)/i
  );
  return m?.[1] ? stripTrailingDots(cleanSpaces(m[1])) : null;
}

function extractLocationFromSnippet(snippet: string) {
  const text = cleanSpaces(snippet);
  const m = text.match(/\bLocation\s*:?\s*\*?\s*([^.|•]+?)(?:\s*[.|•]|\s*$)/i);
  return m?.[1] ? stripTrailingDots(cleanSpaces(m[1])) : null;
}

function normalizeSnippet(raw: string) {
  let text = cleanSpaces(raw);
  text = text.replace(
    /^\s*\d{1,3}\s+(?:minute|minutes|hour|hours|day|days|week|weeks|month|months)\s+ago\s*(?:\.{3}|[•·-])\s*/i,
    ''
  );
  text = text.replace(/\bJob\s*Title\s*:?\s*\*?\s*/gi, '');
  text = text.replace(/\bLocation\s*:?\s*\*?\s*/gi, 'Location: ');
  text = text.replace(/\s*[•·]\s*/g, ' • ');
  text = text.replace(/\s*\.{3,}\s*/g, ' • ');
  return stripTrailingDots(text);
}

function extractSalaryLpa(input: string) {
  const text = cleanSpaces(input).toLowerCase();

  const range = text.match(
    /\b(\d{1,2}(?:\.\d+)?)\s*[-–—to]{1,3}\s*(\d{1,2}(?:\.\d+)?)\s*(lpa|lakhs|lacs)\b/i
  );
  if (range) {
    const hi = Number(range[2]);
    return Number.isFinite(hi) ? hi : null;
  }

  const single = text.match(/\b(\d{1,2}(?:\.\d+)?)\s*(lpa|lakhs|lacs)\b/i);
  if (single) {
    const val = Number(single[1]);
    return Number.isFinite(val) ? val : null;
  }

  return null;
}

function normalizeDomainInput(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const withoutProtocol = trimmed.replace(/^https?:\/\//i, '');
  const withoutPath = withoutProtocol.split('/')[0] || '';
  return withoutPath.replace(/^www\./i, '').trim();
}

function truncateText(input: string, max = 200) {
  const t = input.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

async function getJobsApiErrorMessage(res: Response) {
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = (await res
      .json()
      .catch(() => null)) as JobsApiErrorResponse | null;
    const errorText = typeof payload?.error === 'string' ? payload.error : '';

    if (errorText === 'Google Custom Search is not configured') {
      const missing = payload?.missing;
      const missingKeys =
        missing && typeof missing === 'object'
          ? Object.entries(missing as Record<string, unknown>)
              .filter(([, v]) => Boolean(v))
              .map(([k]) => k)
          : [];

      const keysLine = missingKeys.length
        ? `Missing: ${missingKeys.join(', ')}`
        : 'Missing configuration.';
      return `Jobs search is not configured.\n${keysLine}\nAdd them to your .env.local and restart the dev server.`;
    }

    if (errorText) return errorText;
  }

  const text = await res.text().catch(() => '');
  return text || `Request failed (${res.status})`;
}

function formatIsoDate(dateIso: string) {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function groupLabelForDate(dateIso: string | null) {
  if (!dateIso) return 'Unknown date';
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return 'Unknown date';

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfItem = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor(
    (startOfToday.getTime() - startOfItem.getTime()) / 86_400_000
  );

  if (diffDays <= 0) return 'Today';
  if (diffDays <= 7) return 'Last 7 days';
  if (diffDays <= 30) return 'Last 30 days';
  return 'Older';
}

export function JobsClient() {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('Full Stack Developer');
  const [location, setLocation] = useState('Remote / India');
  const [days, setDays] = useState(30);

  const [sourceDomains, setSourceDomains] = useState<string[]>(['naukri.com']);
  const [customDomain, setCustomDomain] = useState('');
  const [company, setCompany] = useState('');
  const [minSalaryLpa, setMinSalaryLpa] = useState(0);

  const [start, setStart] = useState(1);
  const [pageSize] = useState(10);

  const [workModes, setWorkModes] = useState<WorkMode[]>([]);
  const [experienceYears, setExperienceYears] = useState(0);
  const [departments, setDepartments] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('recommended');
  const [savedLinks, setSavedLinks] = useState<string[]>([]);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<JobsApiResponse | null>(null);

  const initialLoadRef = useRef(true);

  const buildQueryWithFilters = useCallback(
    (base: string) => {
      const normalizedCustomDomain = normalizeDomainInput(customDomain);
      const combinedDomains = Array.from(
        new Set([...sourceDomains, normalizedCustomDomain].filter(Boolean))
      );

      const domainsPart = combinedDomains.length
        ? combinedDomains.length === 1
          ? `site:${combinedDomains[0]}`
          : `(${combinedDomains.map((d) => `site:${d}`).join(' OR ')})`
        : '';

      const workModeTerms = workModes.map((m) => {
        if (m === 'Remote') return 'remote';
        if (m === 'Hybrid') return 'hybrid';
        return 'work from office';
      });
      const experienceTerm =
        experienceYears > 0 ? `${experienceYears}+ years` : '';
      const companyTerm = company.trim();

      return [
        base,
        ...workModeTerms,
        experienceTerm,
        ...departments,
        companyTerm,
        domainsPart,
      ]
        .map((v) => v.trim())
        .filter(Boolean)
        .join(' ');
    },
    [
      company,
      customDomain,
      departments,
      experienceYears,
      sourceDomains,
      workModes,
    ]
  );

  const fetchJobs = async ({
    q,
    role,
    location,
    days,
    start,
    num,
    signal,
  }: {
    q: string;
    role: string;
    location: string;
    days: number;
    start: number;
    num: number;
    signal?: AbortSignal;
  }) => {
    const nextQ = q;
    const nextRole = role;
    const nextLocation = location;
    const nextDays = days;
    const nextStart = start;
    const nextNum = num;

    setStatus('loading');
    setError(null);

    const params = new URLSearchParams();
    if (nextQ.trim()) params.set('q', nextQ.trim());
    if (nextRole.trim()) params.set('role', nextRole.trim());
    if (nextLocation.trim()) params.set('location', nextLocation.trim());
    params.set('days', String(nextDays));
    params.set('start', String(nextStart));
    params.set('num', String(nextNum));

    const res = await fetch(`/api/jobs?${params.toString()}`, {
      cache: 'no-store',
      signal,
    });
    if (!res.ok) {
      const text = await getJobsApiErrorMessage(res);
      setStatus('error');
      setError(text || 'Request failed');
      return;
    }

    const json = (await res.json()) as JobsApiResponse;
    setData(json);
    setStatus('success');
  };

  useEffect(() => {
    const controller = new AbortController();
    const delay = initialLoadRef.current ? 0 : 500;

    const qWithFilters = buildQueryWithFilters(q);

    const t = window.setTimeout(() => {
      initialLoadRef.current = false;

      fetchJobs({
        q: qWithFilters,
        role,
        location,
        days,
        start,
        num: pageSize,
        signal: controller.signal,
      }).catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setStatus('error');
        setError(e instanceof Error ? e.message : 'Something went wrong');
      });
    }, delay);

    return () => {
      controller.abort();
      window.clearTimeout(t);
    };
  }, [q, role, location, days, buildQueryWithFilters, pageSize, start]);

  const itemsSorted = useMemo(() => {
    const items = data?.items ?? [];
    if (sort === 'recommended') return items;

    return [...items].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);

      const aTime = a.date ? new Date(a.date).getTime() : -Infinity;
      const bTime = b.date ? new Date(b.date).getTime() : -Infinity;
      if (aTime !== bTime) return bTime - aTime;
      return a.title.localeCompare(b.title);
    });
  }, [data?.items, sort]);

  const departmentOptions = useMemo(
    () => [
      'Engineering',
      'Frontend',
      'Backend',
      'Full Stack',
      'Data',
      'DevOps',
      'Design',
      'Product',
      'Marketing',
      'Sales',
    ],
    []
  );

  const sourceOptions = useMemo(
    () => [
      { label: 'Naukri', domain: 'naukri.com' },
      { label: 'LinkedIn', domain: 'linkedin.com' },
      { label: 'Indeed', domain: 'indeed.com' },
      { label: 'Foundit', domain: 'foundit.in' },
      { label: 'Hirist', domain: 'hirist.com' },
    ],
    []
  );

  const experienceLabel = useMemo(() => {
    if (experienceYears <= 0) return 'Any';
    return `${experienceYears}+ yrs`;
  }, [experienceYears]);

  const itemsFiltered = useMemo(() => {
    if (minSalaryLpa <= 0) return itemsSorted;

    return itemsSorted.filter((item) => {
      const lpa = item.snippet ? extractSalaryLpa(item.snippet) : null;
      return lpa !== null && lpa >= minSalaryLpa;
    });
  }, [itemsSorted, minSalaryLpa]);

  const grouped = useMemo(() => {
    const order = [
      'Today',
      'Last 7 days',
      'Last 30 days',
      'Older',
      'Unknown date',
    ] as const;
    const map = new Map<string, JobItem[]>();

    for (const item of itemsFiltered) {
      const label = groupLabelForDate(item.date);
      const existing = map.get(label) ?? [];
      existing.push(item);
      map.set(label, existing);
    }

    return order
      .map((label) => ({ label, items: map.get(label) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [itemsFiltered]);

  const activeDomains = useMemo(() => {
    const normalizedCustomDomain = normalizeDomainInput(customDomain);
    return Array.from(
      new Set([...sourceDomains, normalizedCustomDomain].filter(Boolean))
    );
  }, [customDomain, sourceDomains]);

  const hasPrevPage = start > 1;
  const hasNextPage = (data?.items?.length ?? 0) >= pageSize;
  const currentPage = Math.floor((start - 1) / pageSize) + 1;
  const startLabel = data?.items?.length ? start : 0;
  const endLabel = data?.items?.length ? start + data.items.length - 1 : 0;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-brand-green/10 via-brand-cream/30 to-transparent dark:from-brand-greenDark/40"
      />

      <Container className="max-w-7xl">
        <div className="relative py-10 motion-safe:animate-fade-in sm:py-14">
          <header className="space-y-3">
            <p className="text-sm font-semibold text-brand-green dark:text-emerald-400">
              Opportunities
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Jobs
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
              Live vacancies relevant to your profile, fetched in real-time
              using Google Custom Search.
            </p>
          </header>

          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr_320px]">
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <Filter className="h-4 w-4" aria-hidden="true" />
                    All Filters
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setWorkModes([]);
                      setExperienceYears(0);
                      setDepartments([]);
                      setDays(30);
                      setSourceDomains(['naukri.com']);
                      setCustomDomain('');
                      setCompany('');
                      setMinSalaryLpa(0);
                      setStart(1);
                    }}
                    className="text-xs font-semibold text-brand-green hover:text-brand-greenDark dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-5 space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Work mode
                    </div>
                    <div className="space-y-2">
                      {(['Work from office', 'Hybrid', 'Remote'] as const).map(
                        (mode) => {
                          const checked = workModes.includes(mode);
                          return (
                            <label
                              key={mode}
                              className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  setWorkModes((prev) => {
                                    if (e.target.checked)
                                      return [...prev, mode];
                                    return prev.filter((m) => m !== mode);
                                  });
                                  setStart(1);
                                }}
                                className="h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green/30 dark:border-slate-700"
                              />
                              <span>{mode}</span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Source
                    </div>
                    <div className="space-y-2">
                      {sourceOptions.map((s) => {
                        const checked = sourceDomains.includes(s.domain);
                        return (
                          <label
                            key={s.domain}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                setSourceDomains((prev) => {
                                  if (e.target.checked)
                                    return [...prev, s.domain];
                                  return prev.filter((d) => d !== s.domain);
                                });
                                setStart(1);
                              }}
                              className="h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green/30 dark:border-slate-700"
                            />
                            <span className="inline-flex items-center gap-2">
                              <Globe
                                className="h-4 w-4 text-slate-400"
                                aria-hidden="true"
                              />
                              {s.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <label className="block space-y-1">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Custom domain
                      </div>
                      <input
                        value={customDomain}
                        onChange={(e) => {
                          setCustomDomain(e.target.value);
                          setStart(1);
                        }}
                        placeholder="e.g. careers.company.com"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Company
                    </div>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          setStart(1);
                        }}
                        placeholder="e.g. TCS, Infosys"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Min salary (LPA)
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {minSalaryLpa > 0 ? `${minSalaryLpa}+` : 'Any'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={1}
                      value={minSalaryLpa}
                      onChange={(e) => {
                        setMinSalaryLpa(Number(e.target.value));
                        setStart(1);
                      }}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-brand-green dark:bg-slate-800"
                    />
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                      Based on salary text found in listing snippet.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Experience
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {experienceLabel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={experienceYears}
                      onChange={(e) => {
                        setExperienceYears(Number(e.target.value));
                        setStart(1);
                      }}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-brand-green dark:bg-slate-800"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Department
                    </div>
                    <div className="max-h-48 space-y-2 overflow-auto pr-1">
                      {departmentOptions.map((dept) => {
                        const checked = departments.includes(dept);
                        return (
                          <label
                            key={dept}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                setDepartments((prev) => {
                                  if (e.target.checked) return [...prev, dept];
                                  return prev.filter((d) => d !== dept);
                                });
                                setStart(1);
                              }}
                              className="h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green/30 dark:border-slate-700"
                            />
                            <span>{dept}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Date posted
                    </div>
                    <select
                      value={days}
                      onChange={(e) => {
                        setDays(Number(e.target.value));
                        setStart(1);
                      }}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    >
                      <option value={7}>Last 7 days</option>
                      <option value={14}>Last 14 days</option>
                      <option value={30}>Last 30 days</option>
                      <option value={90}>Last 90 days</option>
                    </select>
                  </div>
                </div>
              </Card>
            </aside>

            <div className="space-y-6">
              <Card>
                <form
                  className="grid gap-3 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const qWithFilters = buildQueryWithFilters(q);
                    fetchJobs({
                      q: qWithFilters,
                      role,
                      location,
                      days,
                      start,
                      num: pageSize,
                    }).catch((err: unknown) => {
                      setStatus('error');
                      setError(
                        err instanceof Error
                          ? err.message
                          : 'Something went wrong'
                      );
                    });
                  }}
                >
                  <label className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Keywords
                    </div>
                    <input
                      value={q}
                      onChange={(e) => {
                        setQ(e.target.value);
                        setStart(1);
                      }}
                      placeholder='e.g. "Next.js" "GenAI" "Fastify"'
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>

                  <label className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Role
                    </div>
                    <input
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        setStart(1);
                      }}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>

                  <label className="space-y-1">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Location
                    </div>
                    <input
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setStart(1);
                      }}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </label>

                  <div className="sm:col-span-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {data?.query ? (
                        <span>
                          Using query:{' '}
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {data.query}
                          </span>
                        </span>
                      ) : (
                        <span>
                          Tip: leave Keywords empty to use your profile-based
                          default search.
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <SlidersHorizontal
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        Sort
                        <select
                          value={sort}
                          onChange={(e) =>
                            setSort(e.target.value as SortOption)
                          }
                          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                        >
                          <option value="recommended">Recommended</option>
                          <option value="newest">Newest</option>
                          <option value="title">Title</option>
                        </select>
                      </label>

                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={status === 'loading'}
                      >
                        <Search className="h-4 w-4" aria-hidden="true" />
                        {status === 'loading' ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>

              <Section
                title="Results"
                subtitle={
                  data
                    ? `${startLabel && endLabel ? `${startLabel} - ${endLabel}` : '0'}${data.totalResults ? ` of ${data.totalResults}` : ''} jobs${location ? ` in ${location}` : ''}${minSalaryLpa > 0 ? ` • Salary ${minSalaryLpa}+ LPA` : ''}${data.searchTime ? ` • ${data.searchTime}s` : ''}${data.fetchedAt ? ` • Updated ${new Date(data.fetchedAt).toLocaleString()}` : ''}`
                    : ''
                }
              >
                {status === 'success' && data ? (
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Page {currentPage}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="icon"
                        onClick={() =>
                          setStart((s) => Math.max(1, s - pageSize))
                        }
                        disabled={!hasPrevPage}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="icon"
                        onClick={() => setStart((s) => s + pageSize)}
                        disabled={!hasNextPage}
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                ) : null}

                {status === 'error' ? (
                  <Card>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Could not load jobs
                    </div>
                    <div className="mt-2 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">
                      {error}
                    </div>
                  </Card>
                ) : null}

                {status === 'loading' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="p-0">
                        <div className="h-28 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />
                      </Card>
                    ))}
                  </div>
                ) : null}

                {status === 'success' && grouped.length === 0 ? (
                  <Card>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      No jobs found
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Try different keywords, broaden location, or increase the
                      time range.
                    </div>
                  </Card>
                ) : null}

                {status === 'success' ? (
                  <div className="space-y-8">
                    {grouped.map((group) => (
                      <div key={group.label} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                            {group.label}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {group.items.length}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {group.items.map((item) => {
                            const extractedTitle = item.snippet
                              ? extractJobTitleFromSnippet(item.snippet)
                              : null;
                            const finalTitle = normalizeTitle(
                              extractedTitle || item.title || item.link
                            );

                            const extractedLocation = item.snippet
                              ? extractLocationFromSnippet(item.snippet)
                              : null;

                            let cleanedSnippet = item.snippet
                              ? normalizeSnippet(item.snippet)
                              : '';
                            if (extractedLocation) {
                              cleanedSnippet = cleanedSnippet
                                .replace(/\bLocation:\s*[^•.]+/i, '')
                                .replace(/^\s*[•·]\s*/g, '')
                                .trim();
                            }

                            const isSaved =
                              Boolean(item.link) &&
                              savedLinks.includes(item.link);

                            return (
                              <Card
                                key={item.link || item.title}
                                className="p-4"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-sm font-semibold leading-6 text-slate-900 hover:text-brand-greenDark dark:text-slate-100 dark:hover:text-brand-greenLight"
                                      >
                                        {finalTitle}
                                      </a>

                                      {item.displayLink ? (
                                        <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                          {item.displayLink}
                                        </div>
                                      ) : null}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (!item.link) return;
                                        setSavedLinks((prev) => {
                                          if (prev.includes(item.link))
                                            return prev.filter(
                                              (l) => l !== item.link
                                            );
                                          return [...prev, item.link];
                                        });
                                      }}
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                                      aria-label={
                                        isSaved ? 'Unsave job' : 'Save job'
                                      }
                                      disabled={!item.link}
                                    >
                                      <Bookmark
                                        className={
                                          isSaved
                                            ? 'h-4 w-4 fill-brand-green text-brand-green dark:fill-emerald-400 dark:text-emerald-400'
                                            : 'h-4 w-4 text-slate-600 dark:text-slate-300'
                                        }
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>

                                  {cleanedSnippet ? (
                                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                                      {truncateText(cleanedSnippet, 220)}
                                    </p>
                                  ) : null}

                                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-wrap gap-2">
                                      {extractedLocation ? (
                                        <Badge>{extractedLocation}</Badge>
                                      ) : null}
                                      {item.date ? (
                                        <Badge className="gap-1">
                                          <Calendar
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                          />
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
                                        <ExternalLink
                                          className="h-4 w-4"
                                          aria-hidden="true"
                                        />
                                      </ButtonLink>

                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                                        aria-label="Open job"
                                      >
                                        <ExternalLink
                                          className="h-4 w-4"
                                          aria-hidden="true"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-4">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Insights
                </div>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                    <div className="inline-flex items-center gap-2">
                      <Bookmark className="h-4 w-4" aria-hidden="true" />
                      Saved
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {savedLinks.length}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Active filters
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {location ? (
                      <Badge className="gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {location}
                      </Badge>
                    ) : null}
                    {company.trim() ? <Badge>{company.trim()}</Badge> : null}
                    {workModes.map((m) => (
                      <Badge key={m}>{m}</Badge>
                    ))}
                    {experienceYears > 0 ? (
                      <Badge>{experienceLabel}</Badge>
                    ) : null}
                    {departments.map((d) => (
                      <Badge key={d}>{d}</Badge>
                    ))}
                    {activeDomains.map((d) => (
                      <Badge key={d}>{d}</Badge>
                    ))}
                    {minSalaryLpa > 0 ? (
                      <Badge>{minSalaryLpa}+ LPA</Badge>
                    ) : null}
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
