# TODO Checklist - Nikhil Singh Resume Portfolio

## 🚨 IMMEDIATE - Today

### Security Issues (CRITICAL)

- [ ] **ROTATE API KEYS** - GitHub Token & Google CSE API key exposed
- [ ] Run: `git rm --cached .env` to remove from git tracking
- [ ] Add `.env` to `.gitignore` if not present
- [ ] Rotate exposed tokens immediately:
  - GitHub: Go to Settings → Developer settings → Personal access tokens → Regenerate
  - Google: Go to Google Cloud Console → APIs → Credentials → Create new key
- [ ] Set environment variables in Vercel/ deployment platform

### Production Blockers

- [ ] Add rate limiting to `/api/chat` route
- [ ] Add rate limiting to `/api/resume` route

---

## 🔴 HIGH PRIORITY - This Week

### Code Quality

- [ ] Create `src/config/navigation.ts` - single source of truth for nav items
- [ ] Install clsx & tailwind-merge: `npm install clsx tailwind-merge`
- [ ] Update utils.ts to use tailwind-merge
- [ ] Remove duplicate headers - consolidate HomeHeader & SiteHeader
- [ ] Extract Chatbot types to `src/types/chat.ts`
- [ ] Create `src/config/constants.ts` for magic numbers

### Error Handling

- [ ] Add error boundary component
- [ ] Wrap main sections in error boundaries
- [ ] Add error state to Chatbot UI

### SEO

- [ ] Create `src/app/sitemap.ts`
- [ ] Create `src/app/robots.ts`
- [ ] Add JSON-LD structured data (Person schema) in layout.tsx
- [ ] Add Open Graph images to metadata

---

## 🟡 MEDIUM PRIORITY - This Month

### Performance

- [ ] Add dynamic imports for PDF generation
- [ ] Lazy load Chatbot component
- [ ] Add priority to hero images
- [ ] Configure AVIF/WebP in next.config.ts
- [ ] Run bundle analyzer: `npm install @next/bundle-analyzer`

### Accessibility

- [ ] Check prefers-reduced-motion support
- [ ] Improve skip link visibility
- [ ] Add status icons (not just colors) for project status

### UI/UX

- [ ] Fix dark mode for HomeHeader
- [ ] Add system preference detection to ThemeToggle
- [ ] Create consistent typography scale in tailwind.config.ts
- [ ] Reduce animation complexity in Projects grid

### Type Safety

- [ ] Install Zod: `npm install zod`
- [ ] Add runtime validation to API routes
- [ ] Add proper types to Button component props

---

## 🟢 LOW PRIORITY - Backlog

### Features

- [ ] Add Google Analytics 4 or Vercel Analytics
- [ ] Add contact form backend (Resend/SendGrid)
- [ ] Add site search (Fuse.js or Algolia)
- [ ] Add newsletter signup

### Architecture

- [ ] Split `resume-data.ts` into:
  - `src/data/personal.ts`
  - `src/data/projects.ts`
  - `src/data/skills.ts`
- [ ] Restructure folder structure:
  - `src/components/ui/` (reusable)
  - `src/components/features/` (feature-specific)
- [ ] Add proper API response helpers

### Refactoring

- [ ] Split Chatbot into sub-components
- [ ] Extract project filter logic to custom hook
- [ ] Replace artificial loading with real states
- [ ] Consider Satori for PDF generation

### Testing & DevOps

- [ ] Add unit tests
- [ ] Add E2E tests with Playwright
- [ ] Set up CI/CD pipeline
- [ ] Add service worker for offline support

---

## 📋 REMOVE/REVIEW

- [ ] Review `/price` page - needed or remove?
- [ ] Review `/tools` page - clarify purpose or remove
- [ ] Simplify AI chatbot - too complex?
- [ ] Remove duplicate lock files (bun.lock / package-lock.json)

---

## Installation Commands

```bash
# Immediate installs
npm install clsx tailwind-merge zod

# Optional but recommended
npm install @next/bundle-analyzer @vercel/analytics
npm install react-hook-form @hookform/resolvers

# For better PDF generation (future)
npm install satori
```

---

## Quick Wins (< 30 min each)

1. ✅ Install clsx + tailwind-merge
2. ✅ Create sitemap.ts
3. ✅ Create robots.ts
4. ✅ Add error boundary
5. ✅ Fix dark mode header
6. ✅ Add priority to hero image
7. ✅ Create navigation config

---

Last Updated: Feb 26, 2026
