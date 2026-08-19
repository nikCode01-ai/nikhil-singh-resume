import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function svgResponse(svg: string, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'image/svg+xml; charset=utf-8');
  if (!headers.has('Cache-Control')) {
    headers.set(
      'Cache-Control',
      'public, max-age=604800, stale-while-revalidate=86400'
    );
  }
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(svg, {
    ...init,
    headers,
  });
}

function clampInt(value: number, min: number, max: number) {
  return Math.min(Math.max(Math.floor(value), min), max);
}

function escapeXml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ width: string; height: string }> }
) {
  const params = await context.params;
  const wRaw = Number(params.width);
  const hRaw = Number(params.height);
  const w = clampInt(Number.isFinite(wRaw) ? wRaw : 400, 1, 2000);
  const h = clampInt(Number.isFinite(hRaw) ? hRaw : 300, 1, 2000);

  const url = new URL(request.url);
  const text = (url.searchParams.get('text') || '').trim();

  const label = text ? escapeXml(text.replace(/\+/g, ' ')) : `${w}×${h}`;

  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">\n` +
    `  <defs>\n` +
    `    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">\n` +
    `      <stop offset="0" stop-color="#f7f5ef"/>\n` +
    `      <stop offset="1" stop-color="#f4b400" stop-opacity="0.22"/>\n` +
    `    </linearGradient>\n` +
    `    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">\n` +
    `      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1f4d37" stroke-opacity="0.08" stroke-width="1"/>\n` +
    `    </pattern>\n` +
    `  </defs>\n` +
    `  <rect width="100%" height="100%" fill="url(#bg)"/>\n` +
    `  <rect width="100%" height="100%" fill="url(#grid)"/>\n` +
    `  <rect x="12" y="12" width="${Math.max(w - 24, 0)}" height="${Math.max(h - 24, 0)}" rx="18" fill="none" stroke="#1f4d37" stroke-opacity="0.14"/>\n` +
    `  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="${Math.max(Math.min(Math.floor(Math.min(w, h) / 10), 34), 14)}" font-weight="700" fill="#1f4d37" fill-opacity="0.85">${label}</text>\n` +
    `</svg>`;

  return svgResponse(svg);
}
