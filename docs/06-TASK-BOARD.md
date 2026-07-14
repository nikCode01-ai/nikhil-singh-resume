# Task Board — Active Tasks

---

## 🔴 HIGH PRIORITY

### TASK-001: Image Optimization

- **Issue:** ISSUE-001
- **Files:** `Hero.tsx`, `next.config.ts`, `public/images/*`
- **Steps:**
  1. Convert PNG images to WebP using sharp
  2. Replace ApiAvatar with next/image in Hero.tsx
  3. Add image config in next.config.ts
  4. Add placeholder blur data URLs
- **Estimated:** 2 hours

### TASK-002: Caching & Security Headers

- **Issue:** ISSUE-002
- **File:** `next.config.ts`
- **Steps:**
  1. Add headers() function to next.config.ts
  2. Add Cache-Control for /images/, /icons/, SVGs
  3. Add security headers (X-Content-Type-Options, X-Frame-Options, etc.)
  4. Test with curl -I
- **Estimated:** 30 minutes

### TASK-003: Canonical URLs

- **Issue:** ISSUE-003
- **Files:** All 11 page.tsx files
- **Steps:**
  1. Add `export const metadata` with `alternates.canonical` to each page
  2. Use `process.env.NEXT_PUBLIC_SITE_URL` as base
- **Estimated:** 30 minutes

### TASK-004: Unique Meta Descriptions

- **Issue:** ISSUE-004
- **Files:** All 11 page.tsx files
- **Steps:**
  1. Add unique `title` and `description` to each page metadata
  2. Add openGraph and twitter overrides
- **Estimated:** 45 minutes

### TASK-005: GA4 Conditional Loading

- **Issue:** ISSUE-008
- **File:** `src/app/layout.tsx`
- **Steps:**
  1. Wrap GA4 scripts in `{process.env.NEXT_PUBLIC_GA4_ID && (...)}`
  2. Change strategy from `afterInteractive` to `lazyOnload`
- **Estimated:** 15 minutes

### TASK-006: Accessibility - aria-live on forms

- **Issue:** ISSUE-007
- **File:** `src/components/ContactForm.tsx`
- **Steps:**
  1. Add `role="alert"` and `aria-live="assertive"` to status div
  2. Add `aria-describedby` to form inputs for error descriptions
- **Estimated:** 15 minutes

---

## 🟡 MEDIUM PRIORITY

### TASK-007: FAQPage Schema

- **Issue:** ISSUE-005
- **File:** `src/app/faqs/page.tsx`
- **Steps:**
  1. Create JSON-LD FAQPage schema object
  2. Add Script tag in component
  3. Validate with Google Rich Results Test
- **Estimated:** 30 minutes

### TASK-008: Article Schema for Blogs

- **Issue:** ISSUE-006
- **File:** `src/app/blogs/[slug]/page.tsx`
- **Steps:**
  1. Add Article JSON-LD schema per blog post
  2. Include headline, author, datePublished, image
- **Estimated:** 30 minutes

### TASK-009: Search Debouncing

- **Issue:** ISSUE-009
- **File:** `src/components/Projects.tsx`
- **Steps:**
  1. Import `useDeferredValue` from React
  2. Wrap searchTerm with useDeferredValue
  3. Memoize filtered results with useMemo
- **Estimated:** 20 minutes

### TASK-010: Missing Sitemap Pages

- **Issue:** ISSUE-010
- **File:** `src/app/sitemap.ts`
- **Steps:**
  1. Add `/skills` with priority 0.7
  2. Add `/projects/ndcterm` with priority 0.7
- **Estimated:** 10 minutes

---

## 🟢 LOW PRIORITY

### TASK-011: BreadcrumbList Schema

- **Files:** Various page.tsx files
- **Steps:** Add BreadcrumbList JSON-LD to all inner pages
- **Estimated:** 1 hour

### TASK-012: Related Blog Posts

- **File:** `src/app/blogs/[slug]/page.tsx`
- **Steps:** Show 3 related posts based on tags
- **Estimated:** 1 hour

### TASK-013: Font Weight Subsetting

- **File:** `src/app/layout.tsx`
- **Steps:** Specify only needed weights for Inter and Geist Mono
- **Estimated:** 10 minutes

### TASK-014: framer-motion Bundle Reduction

- **Files:** Various components
- **Steps:** Replace simple animations with CSS, keep motion only for layout
- **Estimated:** 2 hours

---

## 📋 Task Status Legend

| Status         | Meaning              |
| -------------- | -------------------- |
| ⬜ Pending     | Not started          |
| 🔵 In Progress | Currently working on |
| 🟡 In Review   | Waiting for review   |
| ✅ Done        | Completed            |
| ❌ Blocked     | Cannot proceed       |

---

## Current Task Status

| Task     | Status | Assignee | Started | Completed |
| -------- | ------ | -------- | ------- | --------- |
| TASK-001 | ⬜     | AI       | -       | -         |
| TASK-002 | ⬜     | AI       | -       | -         |
| TASK-003 | ⬜     | AI       | -       | -         |
| TASK-004 | ⬜     | AI       | -       | -         |
| TASK-005 | ⬜     | AI       | -       | -         |
| TASK-006 | ⬜     | AI       | -       | -         |
| TASK-007 | ⬜     | AI       | -       | -         |
| TASK-008 | ⬜     | AI       | -       | -         |
| TASK-009 | ⬜     | AI       | -       | -         |
| TASK-010 | ⬜     | AI       | -       | -         |
| TASK-011 | ⬜     | AI       | -       | -         |
| TASK-012 | ⬜     | AI       | -       | -         |
| TASK-013 | ⬜     | AI       | -       | -         |
| TASK-014 | ⬜     | AI       | -       | -         |

---

## Time Estimates

| Priority  | Tasks  | Total Time |
| --------- | ------ | ---------- |
| 🔴 High   | 6      | ~2.5 hrs   |
| 🟡 Medium | 4      | ~1.5 hrs   |
| 🟢 Low    | 4      | ~4 hrs     |
| **Total** | **14** | **~8 hrs** |
