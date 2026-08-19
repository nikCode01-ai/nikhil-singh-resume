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

function initialsFromName(name: string) {
  const parts = name
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const letters = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');

  return letters || name.trim().slice(0, 2).toUpperCase() || 'NA';
}

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickPalette(seed: number) {
  const palettes = [
    { bg1: '#1f4d37', bg2: '#173a2a', fg: '#f7f5ef' },
    { bg1: '#f4b400', bg2: '#1f4d37', fg: '#173a2a' },
    { bg1: '#173a2a', bg2: '#f4b400', fg: '#f7f5ef' },
    { bg1: '#f7f5ef', bg2: '#f4b400', fg: '#1f4d37' },
  ];

  return palettes[seed % palettes.length] ?? palettes[0];
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  const name = (url.searchParams.get('name') || '').trim();
  const sizeRaw = Number(url.searchParams.get('size') || '96');

  const size = clampInt(Number.isFinite(sizeRaw) ? sizeRaw : 96, 24, 512);

  const safeName = name || 'Anonymous';
  const initials = initialsFromName(safeName);

  const seed = hashString(safeName.toLowerCase());
  const palette = pickPalette(seed);

  const fontSize = clampInt(Math.floor(size * 0.34), 10, 120);
  const label = escapeXml(safeName);

  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}">\n` +
    `  <defs>\n` +
    `    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">\n` +
    `      <stop offset="0" stop-color="${palette.bg1}"/>\n` +
    `      <stop offset="1" stop-color="${palette.bg2}"/>\n` +
    `    </linearGradient>\n` +
    `  </defs>\n` +
    `  <rect width="100%" height="100%" rx="${Math.floor(size / 2)}" fill="url(#g)"/>\n` +
    `  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="${fontSize}" font-weight="800" fill="${palette.fg}">${escapeXml(initials)}</text>\n` +
    `</svg>`;

  return svgResponse(svg);
}
