# Review & Close Issues — Workflow

---

## Review Process

### Step 1: Code Review Checklist

Before closing any issue, verify:

- [ ] Code changes are minimal and focused on the issue
- [ ] No unrelated changes included
- [ ] No console.log statements left in code
- [ ] No hardcoded values (use env vars or constants)
- [ ] TypeScript types are correct (no `any`)
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No lint errors (`npm run lint`)

### Step 2: Functional Review

- [ ] Feature works as described in issue acceptance criteria
- [ ] No existing functionality broken
- [ ] Responsive design maintained
- [ ] Dark mode works correctly
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

### Step 3: Performance Review

- [ ] No new large dependencies added
- [ ] Images optimized (WebP/AVIF, next/image)
- [ ] No unnecessary re-renders
- [ ] Bundle size not significantly increased

---

## Issue Review Status

| Issue     | Title                 | Review Status | Can Close? |
| --------- | --------------------- | ------------- | ---------- |
| ISSUE-001 | Replace API avatars   | ⬜ Pending    | -          |
| ISSUE-002 | Caching headers       | ⬜ Pending    | -          |
| ISSUE-003 | Canonical URLs        | ⬜ Pending    | -          |
| ISSUE-004 | Meta descriptions     | ⬜ Pending    | -          |
| ISSUE-005 | FAQPage schema        | ⬜ Pending    | -          |
| ISSUE-006 | Article schema        | ⬜ Pending    | -          |
| ISSUE-007 | aria-live forms       | ⬜ Pending    | -          |
| ISSUE-008 | GA4 conditional       | ⬜ Pending    | -          |
| ISSUE-009 | Search debouncing     | ⬜ Pending    | -          |
| ISSUE-010 | Missing sitemap pages | ⬜ Pending    | -          |

---

## Close Issue Command

```bash
# Close single issue with comment
gh issue close <number> --comment "Fixed in commit <hash>. Verified: build passes, no regressions."

# Close with PR reference
gh issue close <number> --comment "Closes #<number>. Resolved in PR #<PR_number>."

# Close multiple issues at once
gh issue close 1 2 3 4 --comment "Batch close: performance and SEO optimizations completed."
```

---

## Post-Close Verification

After closing an issue, run:

```bash
# 1. Verify build
npm run build

# 2. Verify no TypeScript errors
npx tsc --noEmit

# 3. Verify lint
npm run lint

# 4. Check git status
git status

# 5. Create commit
git add .
git commit -m "fix: <issue title> (closes #<number>)"
```

---

## Commit Message Format

```
<type>(<scope>): <description>

Closes #<issue_number>
```

### Types

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `fix`      | Bug fix or issue resolution              |
| `feat`     | New feature                              |
| `perf`     | Performance improvement                  |
| `seo`      | SEO optimization                         |
| `a11y`     | Accessibility improvement                |
| `refactor` | Code refactoring without behavior change |
| `chore`    | Maintenance, config, dependencies        |
| `docs`     | Documentation only                       |
| `style`    | Code style (formatting, no logic change) |

### Examples

```
fix(projects): replace ApiAvatar with next/image (closes #1)
perf(config): add caching and security headers (closes #2)
seo(pages): add canonical URLs to all pages (closes #3)
a11y(contact): add aria-live to form status messages (closes #7)
```

---

## Review Checklist Per Issue Type

### Performance Issues

- [ ] Lighthouse score improved
- [ ] Bundle size decreased or unchanged
- [ ] No new render-blocking resources
- [ ] Images use next/image with WebP/AVIF

### SEO Issues

- [ ] Google Rich Results Test passes
- [ ] Canonical URL accessible
- [ ] Meta description under 160 chars
- [ ] Structured data validates

### Accessibility Issues

- [ ] axe-core shows no violations
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast passes

### Best Practice Issues

- [ ] No console errors or warnings
- [ ] No deprecated APIs used
- [ ] Security headers present
- [ ] CSP not violated
