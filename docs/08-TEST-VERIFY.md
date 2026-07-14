# Test & Verify — After Every Change

---

## Quick Verification (Run After Every Fix)

```bash
# 1. Type Check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build
npm run build
```

If all 3 pass → ✅ Change is safe to commit.

---

## Full Verification (Run After Batch of Changes)

### Step 1: Code Quality

```bash
npx tsc --noEmit          # TypeScript errors
npm run lint              # ESLint errors
npm run format            # Prettier formatting
```

### Step 2: Build

```bash
npm run build             # Full production build
```

### Step 3: Local Server Test

```bash
npm run start             # Start production server
# Open http://localhost:3000
```

### Step 4: Manual Checks

| Check                | How to Test                   | Pass? |
| -------------------- | ----------------------------- | ----- |
| Home page loads      | Open `/`                      | ⬜    |
| Navigation works     | Click all nav links           | ⬜    |
| Dark mode toggle     | Toggle theme, check all pages | ⬜    |
| Chatbot opens        | Click chat button             | ⬜    |
| Chatbot menu mode    | Click menu options            | ⬜    |
| Chatbot AI mode      | Switch to AI, type a message  | ⬜    |
| Contact form submits | Fill form, click Send         | ⬜    |
| Resume downloads     | Click Download Resume button  | ⬜    |
| Projects search      | Type in search box            | ⬜    |
| Projects filter      | Click category buttons        | ⬜    |
| Blog listing         | Navigate to /blogs            | ⬜    |
| Blog post opens      | Click a blog post             | ⬜    |
| 404 page             | Navigate to /nonexistent      | ⬜    |
| Scroll to top button | Scroll down, click button     | ⬜    |
| Mobile responsive    | Resize to 375px width         | ⬜    |
| Keyboard navigation  | Tab through entire page       | ⬜    |

---

## Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run on each key page
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-home.html
lighthouse http://localhost:3000/about --output html --output-path ./lighthouse-about.html
lighthouse http://localhost:3000/projects --output html --output-path ./lighthouse-projects.html
lighthouse http://localhost:3000/blogs --output html --output-path ./lighthouse-blogs.html
lighthouse http://localhost:3000/contact --output html --output-path ./lighthouse-contact.html
```

### Lighthouse Targets

| Category       | Target |
| -------------- | ------ |
| Performance    | 100    |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | 100    |

---

## Automated Tests (Future)

```bash
# If tests are added later:
npm test                    # Run unit tests
npm run test:e2e            # Run E2E tests
npm run test:a11y           # Run accessibility tests
```

---

## Regression Checklist

After any change, verify these still work:

| Feature                | Status |
| ---------------------- | ------ |
| Dark mode persistence  | ⬜     |
| Theme toggle icon      | ⬜     |
| Responsive breakpoints | ⬜     |
| Skip navigation link   | ⬜     |
| Focus indicators       | ⬜     |
| Reduced motion support | ⬜     |
| OG image renders       | ⬜     |
| Sitemap generates      | ⬜     |
| Robots.txt serves      | ⬜     |
| API routes respond     | ⬜     |

---

## Common Build Errors & Fixes

| Error                        | Fix                                       |
| ---------------------------- | ----------------------------------------- |
| `Type 'X' is not assignable` | Check TypeScript types, add proper typing |
| `Cannot find module`         | Check import path, run `npm install`      |
| `Hydration mismatch`         | Check `suppressHydrationWarning` or SSR   |
| `Image not found`            | Check public/ path and next/image src     |
| `Duplicate export`           | Remove duplicate exports from same file   |
| `Unused variable`            | Remove or use the variable                |

---

## Verification Status

| Date       | Build | Lint | TypeScript | Lighthouse | Notes         |
| ---------- | ----- | ---- | ---------- | ---------- | ------------- |
| 2026-07-14 | ⬜    | ⬜   | ⬜         | ⬜         | Initial audit |
