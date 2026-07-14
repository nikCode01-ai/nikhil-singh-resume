# Performance Audit — Optimization Checklist

## Target Metrics

| Metric      | Target  | Current (Estimated) | Status |
| ----------- | ------- | ------------------- | ------ |
| Performance | 100     | ~70-80              | 🔴     |
| LCP         | < 2.5s  | ~3-4s               | 🔴     |
| CLS         | < 0.1   | ~0.05               | ✅     |
| INP         | < 200ms | ~250-350ms          | 🔴     |
| TBT         | < 150ms | ~300-500ms          | 🔴     |
| FCP         | < 1.5s  | ~2s                 | 🟡     |
| Speed Index | < 2s    | ~3s                 | 🔴     |
| TTFB        | < 800ms | ~600ms              | ✅     |

---

## 1. IMAGE OPTIMIZATION (High Impact)

### Issue: API-generated placeholder images instead of next/image

**Current Problem:**

- `ApiAvatar.tsx`, `ApiUiIcon.tsx` generate SVGs via API routes
- `public/images/` has 12+ PNG screenshots without optimization
- No AVIF/WebP format conversion
- No responsive srcset for project images

**Files to Fix:**

| File                           | Change                                              |
| ------------------------------ | --------------------------------------------------- |
| `src/components/Hero.tsx`      | Replace `ApiAvatar` with `next/image` for avatar    |
| `src/components/ApiAvatar.tsx` | Deprecate or add next/image fallback                |
| `src/components/ApiUiIcon.tsx` | Replace with direct Lucide icons (already imported) |
| `src/components/Projects.tsx`  | Add quality/format/placeholder props to Image       |
| `next.config.ts`               | Configure image formats, sizes, device sizes        |

**Fix Steps:**

```typescript
// next.config.ts — Add image optimization
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  serverExternalPackages: ['pdfkit'],
};
```

```tsx
// Hero.tsx — Replace ApiAvatar with next/image
import Image from 'next/image';

<Image
  src="/images/avatar.jpg" // Convert PNG to WebP first
  alt={`${person.name} - ${person.role}`}
  width={380}
  height={380}
  priority
  placeholder="blur"
  blurDataURL={blurPlaceholder}
  className="h-full w-full rounded-full object-cover"
  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 380px"
/>;
```

```tsx
// Projects.tsx — Optimize project images
<Image
  src={project.image}
  alt={project.name}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-700"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={85}
  placeholder="blur"
  blurDataURL={blurPlaceholder}
/>
```

**Convert PNG to WebP:**

```bash
# Install sharp for conversion
npm install -D sharp

# Create a script to convert all project images
node scripts/convert-images.js
```

---

## 2. RENDER-BLOCKING RESOURCES (High Impact)

### Issue: Google Analytics loaded without real measurement ID

**Current Problem:**

```tsx
// layout.tsx — GA4 loaded with placeholder ID
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA4_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

- GA4 script loads even with invalid ID
- Adds ~50-80ms to main thread
- Third-party script without proper loading strategy

**Fix:**

```tsx
// layout.tsx — Conditionally load GA4
{
  process.env.NEXT_PUBLIC_GA4_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');`}
      </Script>
    </>
  );
}
```

---

## 3. CACHING & HEADERS (High Impact)

### Issue: No cache headers configured

**Current Problem:**

- `next.config.ts` has no `headers()` configuration
- Static assets not cached with immutable headers
- No Cache-Control for API routes

**Fix — next.config.ts:**

```typescript
const nextConfig: NextConfig = {
  images: {
    /* ... */
  },
  serverExternalPackages: ['pdfkit'],
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/icons/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/:path*.{svg,png,jpg,jpeg,webp,avif}',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/api/resume',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
    {
      source: '/api/jobs',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=300, stale-while-revalidate=600',
        },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],
};
```

---

## 4. BUNDLE OPTIMIZATION (Medium Impact)

### Issue: framer-motion is a heavy dependency

**Current Problem:**

- `framer-motion` adds ~40-60KB to bundle (gzipped)
- Used in `Projects.tsx`, `LazyProjects.tsx`, `PageTransition.tsx`, `Testimonials.tsx`
- Many components import it even for simple animations

**Fix Steps:**

| Step | Action                                                                   |
| ---- | ------------------------------------------------------------------------ |
| 1    | Replace simple CSS animations with Tailwind/CSS (already have keyframes) |
| 2    | Use `motion` only where layout animation is truly needed                 |
| 3    | Import only `motion` and `AnimatePresence` from `framer-motion`          |
| 4    | Consider `framer-motion/m` for lighter bundle                            |

**Replace where possible:**

```tsx
// Instead of framer-motion for simple fade-in, use CSS:
<div className="animate-fade-up">...</div>;

// Only use motion for layout animations:
import { motion, AnimatePresence } from 'framer-motion';
// Keep in: Projects.tsx (layout), LazyProjects.tsx
```

---

## 5. THIRD-PARTY SCRIPTS (Medium Impact)

### Issue: Multiple external resources loaded eagerly

**Current Problem:**

- Google Analytics loaded on every page
- Google Search Console verification HTML in public/
- No DNS prefetch for external domains

**Fix — layout.tsx:**

```tsx
<head>
  {/* Preconnect to external origins */}
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
</head>
```

---

## 6. FONT OPTIMIZATION (Low Impact — Already Good)

### Current State: ✅ Mostly Optimized

- Using `next/font/google` with `display: 'swap'`
- Inter + Geist Mono loaded with subsets: ['latin']
- CSS variables for font families

**Minor Improvements:**

```tsx
// layout.tsx — Add weight subsetting
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800'], // Only needed weights
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500'], // Only needed weights
});
```

---

## 7. COMPONENT LAZY LOADING (Low Impact — Already Good)

### Current State: ✅ Already Implemented

| Component      | Lazy Loading Method                          |
| -------------- | -------------------------------------------- |
| `LazyChatbot`  | `dynamic(() => import(...), { ssr: false })` |
| `LazyProjects` | `dynamic(() => import(...), { ssr: false })` |
| `LazySkills`   | `dynamic(() => import(...), { ssr: false })` |

**Additional Candidates:**

```tsx
// Lazy load heavy sections on home page
const LazyTestimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
});
const LazyBlogs = dynamic(() => import('@/components/Blogs'), { ssr: false });
```

---

## 8. MAIN THREAD OPTIMIZATION (Medium Impact)

### Issue: Large React renders and long tasks

**Fix Steps:**

| Fix                                        | File             | Impact |
| ------------------------------------------ | ---------------- | ------ |
| Reduce project list rendering (virtualize) | `Projects.tsx`   | High   |
| Memoize expensive computations             | `resume-data.ts` | Low    |
| Reduce Framer Motion animation complexity  | `Projects.tsx`   | Medium |
| Use `useDeferredValue` for search input    | `Projects.tsx`   | Medium |
| Debounce search input                      | `Projects.tsx`   | Medium |

```tsx
// Projects.tsx — Add search debouncing
import { useDeferredValue, useMemo } from 'react';

const deferredSearch = useDeferredValue(searchTerm);
const searchFilteredProjects = useMemo(() => {
  if (!deferredSearch) return filteredProjects;
  return filteredProjects.filter(/* ... */);
}, [deferredSearch, filteredProjects]);
```

---

## Implementation Priority

| Priority | Task                              | Impact | Effort |
| -------- | --------------------------------- | ------ | ------ |
| 1        | Image optimization (WebP/AVIF)    | High   | Medium |
| 2        | Caching headers in next.config.ts | High   | Low    |
| 3        | Conditional GA4 loading           | High   | Low    |
| 4        | Security headers                  | Medium | Low    |
| 5        | Font weight subsetting            | Low    | Low    |
| 6        | Search debouncing                 | Medium | Low    |
| 7        | framer-motion bundle reduction    | Medium | High   |
| 8        | Component lazy loading expansion  | Low    | Low    |

---

## Verification Commands

```bash
# Build and check for errors
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Bundle analysis (install first)
npx @next/bundle-analyzer
```
