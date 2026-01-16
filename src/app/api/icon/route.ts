export const runtime = "nodejs";

type CseItem = {
  link?: string;
};

type CseResponse = {
  items?: CseItem[];
};

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("Cache-Control")) headers.set("Cache-Control", "no-store");

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

function svgResponse(svg: string, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
  }
  headers.set("X-Content-Type-Options", "nosniff");

  return new Response(svg, {
    ...init,
    headers,
  });
}

const memoryCache = new Map<string, string>();

async function fetchSvgText(url: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const text = await res.text();

    if (contentType.includes("image/svg+xml")) return text;

    const idx = text.toLowerCase().indexOf("<svg");
    if (idx === -1) return null;

    return text.slice(idx);
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_CX;

  if (!apiKey || !cx) {
    return json(
      {
        error: "Google Custom Search is not configured",
        missing: {
          GOOGLE_CSE_API_KEY: !apiKey,
          GOOGLE_CSE_CX: !cx,
        },
      },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const name = (url.searchParams.get("name") || "").trim();

  if (!name) {
    return json({ error: "Missing name" }, { status: 400 });
  }

  const cacheKey = name.toLowerCase();
  const cached = memoryCache.get(cacheKey);
  if (cached) return svgResponse(cached);

  const upstreamUrl = new URL("https://www.googleapis.com/customsearch/v1");
  upstreamUrl.searchParams.set("key", apiKey);
  upstreamUrl.searchParams.set("cx", cx);
  upstreamUrl.searchParams.set("q", `${name} logo svg`);
  upstreamUrl.searchParams.set("searchType", "image");
  upstreamUrl.searchParams.set("num", "5");
  upstreamUrl.searchParams.set("fileType", "svg");
  upstreamUrl.searchParams.set("hl", "en");
  upstreamUrl.searchParams.set("gl", "in");

  const upstream = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return json(
      {
        error: "Google Custom Search request failed",
        status: upstream.status,
        body: text.slice(0, 2000),
      },
      { status: 502 },
    );
  }

  let data: CseResponse;
  try {
    data = (await upstream.json()) as CseResponse;
  } catch {
    return json({ error: "Google Custom Search returned invalid JSON" }, { status: 502 });
  }

  const links = (data.items ?? [])
    .map((i) => (typeof i.link === "string" ? i.link : ""))
    .filter(Boolean);

  for (const link of links) {
    if (!/\.svg(\?|#|$)/i.test(link)) continue;
    const svg = await fetchSvgText(link);
    if (!svg) continue;

    memoryCache.set(cacheKey, svg);
    return svgResponse(svg);
  }

  for (const link of links) {
    const svg = await fetchSvgText(link);
    if (!svg) continue;

    memoryCache.set(cacheKey, svg);
    return svgResponse(svg);
  }

  return json({ error: "Icon not found" }, { status: 404 });
}
