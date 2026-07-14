# SEO Optimization — Target: 100/100

## Current Score (Estimated): ~90/100

---

## 1. STRUCTURED DATA (JSON-LD)

### Already Implemented ✅

| Schema Type           | Location     | Status |
| --------------------- | ------------ | ------ |
| `Person`              | `layout.tsx` | ✅     |
| `ProfessionalService` | `layout.tsx` | ✅     |
| `WebSite`             | `layout.tsx` | ✅     |

### Missing Schemas 🔴

| Schema Type      | Location                | Fix                                       |
| ---------------- | ----------------------- | ----------------------------------------- |
| `FAQPage`        | `faqs/page.tsx`         | Add FAQ structured data for all questions |
| `Article`        | `blogs/[slug]/page.tsx` | Add article schema for each blog post     |
| `BreadcrumbList` | All inner pages         | Add breadcrumb navigation schema          |
| `ItemList`       | `projects/page.tsx`     | Add item list schema for projects         |

**Fix — FAQPage Schema:**

```tsx
// src/app/faqs/page.tsx — Add JSON-LD
import { faqs } from '@/lib/resume-data'; // Need to export this

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// In component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>;
```

**Fix — Article Schema:**

```tsx
// src/app/blogs/[slug]/page.tsx
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  author: {
    '@type': 'Person',
    name: 'Nikhil Singh',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  publisher: {
    '@type': 'Person',
    name: 'Nikhil Singh',
  },
  datePublished: post.date,
  dateModified: post.date,
  image: post.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.svg`,
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${post.slug}`,
};
```

**Fix — BreadcrumbList Schema:**

```tsx
// Component for all inner pages
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: `${baseUrl}/projects`,
    },
    { '@type': 'ListItem', position: 3, name: project.name },
  ],
};
```

---

## 2. CANONICAL URLS

### Already Implemented ✅

| Page   | Canonical URL                         | Status |
| ------ | ------------------------------------- | ------ |
| Home   | ✅ `alternates.canonical` in page.tsx | ✅     |
| Others | 🔴 Missing on all inner pages         | Fix    |

**Fix — Add to every page:**

```tsx
// Each page.tsx should have:
export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/page-path`,
  },
};
```

| Page            | Missing Canonical             |
| --------------- | ----------------------------- |
| `/about`        | 🔴 `${BASE_URL}/about`        |
| `/services`     | 🔴 `${BASE_URL}/services`     |
| `/projects`     | 🔴 `${BASE_URL}/projects`     |
| `/blogs`        | 🔴 `${BASE_URL}/blogs`        |
| `/contact`      | 🔴 `${BASE_URL}/contact`      |
| `/skills`       | 🔴 `${BASE_URL}/skills`       |
| `/tools`        | 🔴 `${BASE_URL}/tools`        |
| `/price`        | 🔴 `${BASE_URL}/price`        |
| `/faqs`         | 🔴 `${BASE_URL}/faqs`         |
| `/testimonials` | 🔴 `${BASE_URL}/testimonials` |
| `/jobs`         | 🔴 `${BASE_URL}/jobs`         |

---

## 3. OPENCARD & TWITTER CARDS

### Already Implemented ✅

| Property            | Location     | Status |
| ------------------- | ------------ | ------ |
| og:title            | `layout.tsx` | ✅     |
| og:description      | `layout.tsx` | ✅     |
| og:image            | `layout.tsx` | ✅     |
| og:url              | `layout.tsx` | ✅     |
| og:type             | `layout.tsx` | ✅     |
| og:locale           | `layout.tsx` | ✅     |
| og:siteName         | `layout.tsx` | ✅     |
| twitter:card        | `layout.tsx` | ✅     |
| twitter:title       | `layout.tsx` | ✅     |
| twitter:description | `layout.tsx` | ✅     |
| twitter:images      | `layout.tsx` | ✅     |
| twitter:creator     | `layout.tsx` | ✅     |

### Missing 🔴

| Property          | Fix                                          |
| ----------------- | -------------------------------------------- |
| Per-page og:title | Each page should override with its own title |
| Per-page og:image | Each page should have specific OG image      |
| twitter:site      | Add twitter:site handle                      |

**Fix — Per-page metadata:**

```tsx
// src/app/projects/page.tsx
export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my recent work across different industries...',
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: 'Projects | Nikhil Singh',
    description: 'Explore my recent work...',
    url: `${BASE_URL}/projects`,
  },
  twitter: {
    title: 'Projects | Nikhil Singh',
    description: 'Explore my recent work...',
  },
};
```

---

## 4. ROBOTS.TXT

### Already Implemented ✅

```typescript
// robots.ts
rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }
sitemap: `${BASE_URL}/sitemap.xml`
```

---

## 5. SITEMAP

### Already Implemented ✅

| Page Type     | Included | Priority | Status |
| ------------- | -------- | -------- | ------ |
| Home          | ✅       | 1.0      | ✅     |
| About         | ✅       | 0.9      | ✅     |
| Projects      | ✅       | 0.9      | ✅     |
| Services      | ✅       | 0.8      | ✅     |
| Blogs         | ✅       | 0.8      | ✅     |
| Contact       | ✅       | 0.7      | ✅     |
| Tools         | ✅       | 0.7      | ✅     |
| Price         | ✅       | 0.6      | ✅     |
| Jobs          | ✅       | 0.6      | ✅     |
| Testimonials  | ✅       | 0.6      | ✅     |
| FAQs          | ✅       | 0.5      | ✅     |
| Project slugs | ✅       | 0.7      | ✅     |
| Blog slugs    | ✅       | 0.7      | ✅     |

### Missing 🔴

| Page         | Fix                                 |
| ------------ | ----------------------------------- |
| Skills       | 🔴 Add to sitemap with priority 0.7 |
| NDC Terminal | 🔴 Add to sitemap with priority 0.7 |

---

## 6. META DESCRIPTIONS

### Already Implemented ✅

| Page   | Meta Description         | Status |
| ------ | ------------------------ | ------ |
| Home   | ✅ In layout.tsx default | ✅     |
| Others | 🔴 Relying on template   | Fix    |

**Fix — Add unique descriptions per page:**

| Page            | Suggested Meta Description                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/about`        | "Learn about Nikhil Singh - 4+ years of full-stack development experience across aviation, travel, and e-commerce." |
| `/services`     | "Full stack web development, NDC API integration, GenAI/LLM solutions, and cloud infrastructure services."          |
| `/projects`     | "Explore 30+ production systems built across travel, aviation, hospitality, and e-commerce industries."             |
| `/blogs`        | "Technical articles about Next.js, NDC APIs, GenAI, and full-stack development by Nikhil Singh."                    |
| `/contact`      | "Get in touch with Nikhil Singh for full-stack development projects, NDC API integration, and consulting."          |
| `/skills`       | "Technical skills: Next.js, React, Node.js, TypeScript, AWS, MongoDB, PostgreSQL, Docker, and more."                |
| `/price`        | "Transparent pricing for full-stack development, API integration, and consulting services."                         |
| `/faqs`         | "Frequently asked questions about services, pricing, timelines, and technical expertise."                           |
| `/testimonials` | "What clients say about working with Nikhil Singh for web development projects."                                    |
| `/jobs`         | "Current job opportunities and career openings."                                                                    |
| `/tools`        | "Development tools and resources used in my projects."                                                              |

---

## 7. HREFLANG (Multi-Language)

**Current:** Not implemented
**Content:** English only (no multi-language content)
**Action:** Not needed unless adding Hindi/Spanish pages

---

## 8. INTERNAL LINKING

| From Page  | Links To                                        | Status |
| ---------- | ----------------------------------------------- | ------ |
| Home       | About, Services, Projects, Blogs, Contact, FAQs | ✅     |
| About      | Contact, Resume Download                        | ✅     |
| Services   | Contact, Pricing                                | ✅     |
| Projects   | Individual project pages                        | ✅     |
| Blog posts | Other blog posts (related)                      | 🔴     |
| Footer     | All main pages                                  | ✅     |

**Fix — Add related posts to blog:**

```tsx
// src/app/blogs/[slug]/page.tsx — Add related posts section
// Show 3 related posts based on tags/category
```

---

## 9. IMAGE ALT TEXT

| Image Location         | Current Alt Text                                  | Status |
| ---------------------- | ------------------------------------------------- | ------ |
| Hero avatar            | ✅ `${person.name} - ${person.role}`              | ✅     |
| Project images         | ✅ `{project.name}`                               | ✅     |
| OG image               | ✅ "Nikhil Singh - Senior Full Stack Developer"   | ✅     |
| Skill icons            | 🔴 Some may be decorative (should have empty alt) | 🟡     |
| About section initials | N/A (text, not image)                             | ✅     |

---

## 10. GOOGLE SEARCH CONSOLE

| Item                       | Status                                  |
| -------------------------- | --------------------------------------- |
| Verification meta tag      | ✅ `google965e9543cc274a9b`             |
| Verification HTML file     | ✅ `public/google965e9543cc274a9b.html` |
| Sitemap submitted          | 🔴 Submit to GSC after deploy           |
| robots.txt allows crawling | ✅                                      |

---

## Priority Fixes

| Priority | Fix                              | Impact | Pages Affected |
| -------- | -------------------------------- | ------ | -------------- |
| 1        | Add canonical URLs to all pages  | High   | 11 pages       |
| 2        | Add unique meta descriptions     | High   | 11 pages       |
| 3        | Add FAQPage schema               | High   | 1 page         |
| 4        | Add Article schema to blog posts | Medium | 10 pages       |
| 5        | Add missing pages to sitemap     | Medium | 2 pages        |
| 6        | Add BreadcrumbList schema        | Low    | All pages      |
| 7        | Add related blog posts           | Low    | 10 pages       |
| 8        | Add twitter:site to metadata     | Low    | 1 file         |
