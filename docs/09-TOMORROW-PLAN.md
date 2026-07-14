# Tomorrow's Plan — 15 July 2026

---

## Priority Tasks for Tomorrow

### 🔴 Must Do (Before anything else)

| #   | Task                          | Time Est | Depends On |
| --- | ----------------------------- | -------- | ---------- |
| 1   | Run `npm run build` verify    | 5 min    | Nothing    |
| 2   | Fix TASK-002: Caching headers | 30 min   | Nothing    |
| 3   | Fix TASK-005: GA4 conditional | 15 min   | Nothing    |
| 4   | Fix TASK-003: Canonical URLs  | 30 min   | Nothing    |
| 5   | Fix TASK-006: aria-live forms | 15 min   | Nothing    |

### 🟡 Should Do (If time permits)

| #   | Task                            | Time Est | Depends On |
| --- | ------------------------------- | -------- | ---------- |
| 6   | Fix TASK-004: Meta descriptions | 45 min   | Nothing    |
| 7   | Fix TASK-010: Sitemap pages     | 10 min   | Nothing    |
| 8   | Fix TASK-009: Search debounce   | 20 min   | Nothing    |
| 9   | Fix TASK-007: FAQPage schema    | 30 min   | Nothing    |
| 10  | Fix TASK-008: Article schema    | 30 min   | Nothing    |

### 🟢 Nice to Have

| #   | Task                              | Time Est | Depends On |
| --- | --------------------------------- | -------- | ---------- |
| 11  | TASK-001: Image optimization      | 2 hrs    | Nothing    |
| 12  | TASK-011: BreadcrumbList          | 1 hr     | Nothing    |
| 13  | TASK-013: Font subsetting         | 10 min   | Nothing    |
| 14  | TASK-014: framer-motion reduction | 2 hrs    | Nothing    |

---

## Time Schedule

```
Morning (9:00 - 12:00):
  09:00 - 09:05  → Verify build
  09:05 - 09:35  → TASK-002: Caching headers
  09:35 - 09:50  → TASK-005: GA4 conditional
  09:50 - 10:20  → TASK-003: Canonical URLs
  10:20 - 10:35  → TASK-006: aria-live forms
  10:35 - 11:20  → TASK-004: Meta descriptions
  11:20 - 11:30  → TASK-010: Sitemap pages
  11:30 - 11:50  → TASK-009: Search debounce
  11:50 - 12:00  → Build + commit

Afternoon (1:00 - 5:00):
  13:00 - 13:30  → TASK-007: FAQPage schema
  13:30 - 14:00  → TASK-008: Article schema
  14:00 - 14:30  → Run Lighthouse audit
  14:30 - 16:30  → TASK-001: Image optimization
  16:30 - 17:00  → Final build + commit + push
```

---

## Git Commits Plan

```bash
# Morning commits
git commit -m "perf(config): add caching and security headers (closes #2)"
git commit -m "perf(layout): conditional GA4 loading with lazyOnload (closes #8)"
git commit -m "seo(pages): add canonical URLs to all pages (closes #3)"
git commit -m "a11y(contact): add aria-live to form status (closes #7)"
git commit -m "seo(pages): add unique meta descriptions (closes #4)"
git commit -m "seo(sitemap): add missing pages to sitemap (closes #10)"
git commit -m "perf(projects): add search debouncing (closes #9)"

# Afternoon commits
git commit -m "seo(faqs): add FAQPage structured data (closes #5)"
git commit -m "seo(blogs): add Article schema to blog posts (closes #6)"
git commit -m "perf(images): optimize with next/image and WebP (closes #1)"
```

---

## Expected Results After Tomorrow

| Metric          | Before | After (Expected) |
| --------------- | ------ | ---------------- |
| Lighthouse Perf | ~75    | ~90+             |
| Accessibility   | ~85    | ~95+             |
| SEO             | ~90    | ~100             |
| Best Practices  | ~90    | ~100             |
| Issues Closed   | 0/10   | 10/10            |
