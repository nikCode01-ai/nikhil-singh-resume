# Issue Tracker — GitHub Issues

## How to Use

1. Create issues on GitHub using `gh issue create` or chatbot
2. Update this file with issue details
3. Track status: Open → In Progress → In Review → Closed
4. Link PRs to issues

---

## Open Issues

### ISSUE-001: Replace API-generated avatars with next/image

- **Label:** `performance`, `enhancement`
- **Priority:** High
- **File:** `src/components/Hero.tsx`, `src/components/ApiAvatar.tsx`
- **Description:** Hero section uses `ApiAvatar` component which calls `/api/avatar` to generate SVG. Replace with `next/image` for better caching, WebP/AVIF support, and reduced server load.
- **Acceptance Criteria:**
  - [ ] Convert avatar PNG to WebP format
  - [ ] Replace `ApiAvatar` with `next/image` in Hero.tsx
  - [ ] Add `priority` prop for LCP optimization
  - [ ] Add `placeholder="blur"` with blurDataURL
  - [ ] Add responsive `sizes` attribute
- **Created:** 2026-07-14

---

### ISSUE-002: Add caching headers in next.config.ts

- **Label:** `performance`
- **Priority:** High
- **File:** `next.config.ts`
- **Description:** No Cache-Control headers configured for static assets or API routes. Add immutable caching for images/icons and stale-while-revalidate for API routes.
- **Acceptance Criteria:**
  - [ ] Add `Cache-Control: public, max-age=31536000, immutable` for `/images/` and `/icons/`
  - [ ] Add `Cache-Control: public, max-age=86400` for SVGs
  - [ ] Add `Cache-Control: public, max-age=300` for `/api/jobs`
  - [ ] Add security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- **Created:** 2026-07-14

---

### ISSUE-003: Add canonical URLs to all pages

- **Label:** `seo`
- **Priority:** High
- **Files:** All `page.tsx` files in `src/app/`
- **Description:** Only home page has canonical URL. Add `alternates.canonical` to all 11 inner pages.
- **Acceptance Criteria:**
  - [ ] `/about` has canonical
  - [ ] `/services` has canonical
  - [ ] `/projects` has canonical
  - [ ] `/blogs` has canonical
  - [ ] `/contact` has canonical
  - [ ] `/skills` has canonical
  - [ ] `/tools` has canonical
  - [ ] `/price` has canonical
  - [ ] `/faqs` has canonical
  - [ ] `/testimonials` has canonical
  - [ ] `/jobs` has canonical
- **Created:** 2026-07-14

---

### ISSUE-004: Add unique meta descriptions per page

- **Label:** `seo`
- **Priority:** High
- **Files:** All `page.tsx` files
- **Description:** Inner pages rely on default metadata template. Each page should have unique title and description.
- **Acceptance Criteria:**
  - [ ] Each page has unique `title` in metadata
  - [ ] Each page has unique `description` (150-160 chars)
  - [ ] Each page has `openGraph` overrides
  - [ ] Each page has `twitter` overrides
- **Created:** 2026-07-14

---

### ISSUE-005: Add FAQPage structured data

- **Label:** `seo`, `enhancement`
- **Priority:** Medium
- **File:** `src/app/faqs/page.tsx`
- **Description:** Add FAQPage JSON-LD schema for rich results in Google Search.
- **Acceptance Criteria:**
  - [ ] FAQPage schema added to faqs page
  - [ ] Schema validates in Google Rich Results Test
  - [ ] All FAQ questions and answers included
- **Created:** 2026-07-14

---

### ISSUE-006: Add Article schema to blog posts

- **Label:** `seo`
- **Priority:** Medium
- **File:** `src/app/blogs/[slug]/page.tsx`
- **Description:** Each blog post should have Article structured data for Google rich results.
- **Acceptance Criteria:**
  - [ ] Article schema with headline, author, datePublished
  - [ ] Schema validates in Google Rich Results Test
  - [ ] Each blog post page has the schema
- **Created:** 2026-07-14

---

### ISSUE-007: Add aria-live to contact form status messages

- **Label:** `accessibility`
- **Priority:** High
- **File:** `src/components/ContactForm.tsx`
- **Description:** Success/error messages in contact form are not announced to screen readers. Add `role="alert"` and `aria-live="assertive"`.
- **Acceptance Criteria:**
  - [ ] Status div has `role="alert"`
  - [ ] Status div has `aria-live="assertive"`
  - [ ] Screen reader announces form submission result
- **Created:** 2026-07-14

---

### ISSUE-008: Conditional GA4 loading

- **Label:** `performance`, `best-practice`
- **Priority:** High
- **File:** `src/app/layout.tsx`
- **Description:** Google Analytics loads with placeholder measurement ID `GA4_MEASUREMENT_ID`. Should only load when real ID is configured, and use `lazyOnload` strategy.
- **Acceptance Criteria:**
  - [ ] GA4 scripts only load when `NEXT_PUBLIC_GA4_ID` env is set
  - [ ] GA4 uses `lazyOnload` strategy instead of `afterInteractive`
  - [ ] No console errors from invalid measurement ID
- **Created:** 2026-07-14

---

### ISSUE-009: Debounce search input in Projects

- **Label:** `performance`, `enhancement`
- **Priority:** Medium
- **File:** `src/components/Projects.tsx`
- **Description:** Search input re-renders entire project list on every keystroke. Add debouncing with `useDeferredValue` or debounce hook.
- **Acceptance Criteria:**
  - [ ] Search uses `useDeferredValue` or debounce
  - [ ] No visible lag on fast typing
  - [ ] Project list doesn't re-render on every keystroke
- **Created:** 2026-07-14

---

### ISSUE-010: Add missing pages to sitemap

- **Label:** `seo`
- **Priority:** Medium
- **File:** `src/app/sitemap.ts`
- **Description:** Skills and NDC Terminal pages are missing from sitemap.
- **Acceptance Criteria:**
  - [ ] `/skills` added with priority 0.7
  - [ ] `/projects/ndcterm` added with priority 0.7
- **Created:** 2026-07-14

---

## In Progress

_No issues currently in progress._

---

## In Review

_No issues currently in review._

---

## Closed Issues

_No issues closed yet._

---

## Issue Labels

| Label           | Color | Description                |
| --------------- | ----- | -------------------------- |
| `performance`   | 🔴    | Performance optimization   |
| `seo`           | 🟢    | Search engine optimization |
| `accessibility` | 🔵    | Accessibility improvements |
| `enhancement`   | 🟡    | Feature enhancement        |
| `bug`           | 🟠    | Bug fix                    |
| `best-practice` | 🟣    | Best practice compliance   |
| `documentation` | ⚪    | Documentation update       |
| `ai-generated`  | 🔵    | Created by AI assistant    |

---

## Commands

```bash
# Create new issue
gh issue create --title "Issue title" --label "performance,enhancement" --body "Description"

# List open issues
gh issue list --state open

# List issues by label
gh issue list --label "performance"

# Close issue
gh issue close ISSUE_NUMBER --comment "Fixed in PR #N"

# Link issue to PR
# In PR description, add: "Closes #ISSUE_NUMBER"
```
