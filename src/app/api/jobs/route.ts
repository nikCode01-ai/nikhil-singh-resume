import { person, technicalSkills } from '@/lib/resume-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  if (!headers.has('Cache-Control')) headers.set('Cache-Control', 'no-store');

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

type CseItem = {
  title?: string;
  link?: string;
  displayLink?: string;
  snippet?: string;
  pagemap?: {
    metatags?: Array<Record<string, string>>;
  };
};

type CseResponse = {
  items?: CseItem[];
  searchInformation?: {
    formattedTotalResults?: string;
    searchTime?: number;
  };
};

function buildDefaultQuery() {
  const keySkills = [
    ...(technicalSkills.Frontend?.slice(0, 5) ?? []),
    ...(technicalSkills.Backend?.slice(0, 5) ?? []),
  ].filter(Boolean);

  const base = `${person.role} jobs`;
  const skillsPart = keySkills.length ? ` (${keySkills.join(' OR ')})` : '';
  return `${base}${skillsPart} India remote`;
}

function parseDateFromSnippet(snippet: string) {
  const text = snippet.trim();

  const rel = text.match(
    /\b(\d{1,3})\s+(minute|minutes|hour|hours|day|days|week|weeks|month|months)\s+ago\b/i
  );
  if (rel) {
    const amount = Number(rel[1]);
    const unit = rel[2].toLowerCase();
    const now = new Date();

    const msByUnit: Record<string, number> = {
      minute: 60_000,
      minutes: 60_000,
      hour: 3_600_000,
      hours: 3_600_000,
      day: 86_400_000,
      days: 86_400_000,
      week: 604_800_000,
      weeks: 604_800_000,
      month: 2_592_000_000,
      months: 2_592_000_000,
    };

    const ms = msByUnit[unit];
    if (ms) return new Date(now.getTime() - amount * ms);
  }

  const iso = text.match(/\b(\d{4}-\d{2}-\d{2})(?:[T\s]\d{2}:\d{2}(:\d{2})?)?/);
  if (iso) {
    const d = new Date(iso[1]);
    if (!Number.isNaN(d.getTime())) return d;
  }

  const dmy = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})\b/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    const year = Number(dmy[3]);
    if (month >= 1 && month <= 12) {
      const d = new Date(Date.UTC(year, month - 1, day));
      if (!Number.isNaN(d.getTime())) return d;
    }
  }

  const monthName = text.match(
    /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})(?:,)?\s+(\d{4})\b/i
  );
  if (monthName) {
    const d = new Date(`${monthName[1]} ${monthName[2]}, ${monthName[3]}`);
    if (!Number.isNaN(d.getTime())) return d;
  }

  return null;
}

function parseDateFromMetatags(
  metatags: Array<Record<string, string>> | undefined
) {
  const tag = metatags?.[0];
  if (!tag) return null;

  const candidates = [
    'article:published_time',
    'article:modified_time',
    'og:updated_time',
    'date',
    'pubdate',
    'publishdate',
    'datepublished',
    'dc.date',
    'dc.date.issued',
    'last-modified',
    'lastmodified',
    'modified',
    'updated_time',
  ];

  for (const key of candidates) {
    const value = tag[key];
    if (!value) continue;
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }

  return null;
}

function toIsoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_CX;

  if (!apiKey || !cx) {
    return json(
      {
        error: 'Google Custom Search is not configured',
        missing: {
          GOOGLE_CSE_API_KEY: !apiKey,
          GOOGLE_CSE_CX: !cx,
        },
      },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();
  const location = (url.searchParams.get('location') || '').trim();
  const role = (url.searchParams.get('role') || '').trim();
  const days = Math.min(
    Math.max(Number(url.searchParams.get('days') || '30'), 1),
    365
  );

  const num = Math.min(
    Math.max(Number(url.searchParams.get('num') || '10'), 1),
    10
  );
  const start = Math.min(
    Math.max(Number(url.searchParams.get('start') || '1'), 1),
    91
  );

  const baseQuery = q || buildDefaultQuery();
  const assembled = [baseQuery, role, location].filter(Boolean).join(' ');
  const finalQuery = `${assembled} vacancy OR hiring OR opening`;

  const upstreamUrl = new URL('https://www.googleapis.com/customsearch/v1');
  upstreamUrl.searchParams.set('key', apiKey);
  upstreamUrl.searchParams.set('cx', cx);
  upstreamUrl.searchParams.set('q', finalQuery);
  upstreamUrl.searchParams.set('num', String(num));
  upstreamUrl.searchParams.set('start', String(start));
  upstreamUrl.searchParams.set('hl', 'en');
  upstreamUrl.searchParams.set('gl', 'in');
  upstreamUrl.searchParams.set('dateRestrict', `d${days}`);

  const upstream = await fetch(upstreamUrl.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '');
    return json(
      {
        error: 'Google Custom Search request failed',
        status: upstream.status,
        body: text.slice(0, 2000),
      },
      { status: 502 }
    );
  }

  let data: CseResponse;
  try {
    data = (await upstream.json()) as CseResponse;
  } catch {
    return json(
      { error: 'Google Custom Search returned invalid JSON' },
      { status: 502 }
    );
  }

  const items = (data.items ?? []).map((item) => {
    const title = typeof item.title === 'string' ? item.title : '';
    const link = typeof item.link === 'string' ? item.link : '';
    const displayLink =
      typeof item.displayLink === 'string' ? item.displayLink : '';
    const snippet = typeof item.snippet === 'string' ? item.snippet : '';

    const fromMeta = parseDateFromMetatags(item.pagemap?.metatags);
    const fromSnippet = snippet ? parseDateFromSnippet(snippet) : null;
    const date = fromMeta ?? fromSnippet;

    return {
      title,
      link,
      displayLink,
      snippet,
      date: date ? toIsoDate(date) : null,
    };
  });

  return json({
    query: finalQuery,
    totalResults: data.searchInformation?.formattedTotalResults ?? null,
    searchTime: data.searchInformation?.searchTime ?? null,
    fetchedAt: new Date().toISOString(),
    items,
  });
}
