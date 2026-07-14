# Code Cleanup — Clean, Deduplicate, Fix Syntax, Commit

---

## Current Code Issues Found

### 1. Duplicate Imports

| File           | Issue                                        | Fix              |
| -------------- | -------------------------------------------- | ---------------- |
| `About.tsx:29` | `Award as Trophy` imported alongside `Award` | Remove duplicate |
| `Footer.tsx`   | Multiple Lucide icons, some unused           | Audit usage      |
| `Projects.tsx` | Multiple Lucide icons, some unused           | Audit usage      |

### 2. Unused Variables / Imports

| File              | Issue                                                       | Fix           |
| ----------------- | ----------------------------------------------------------- | ------------- |
| `Hero.tsx:19`     | `sectionRef` assigned but not used for logic                | Remove or use |
| `Chatbot.tsx`     | `featuredProjects`, `person` imported but used only in menu | ✅ OK         |
| `Projects.tsx:63` | `prevShowAllRef` — used, OK                                 | ✅ OK         |

### 3. Syntax / Style Issues

| File                 | Issue                                       | Fix                |
| -------------------- | ------------------------------------------- | ------------------ |
| `globals.css:249`    | `.section-padding` hard-coded px values     | Use Tailwind utils |
| `ContactForm.tsx:61` | Template literal with backticks for classes | ✅ OK (Tailwind)   |
| `Footer.tsx:198`     | `&bull;` HTML entity in JSX                 | Use `·` or `•`     |

### 4. Console Statements

| File                    | Issue                                       | Fix                |
| ----------------------- | ------------------------------------------- | ------------------ |
| `api/chat/route.ts:516` | `console.error('Chat API error:', error)`   | Keep (server-only) |
| `github.ts:80`          | `console.warn("Failed to create AI label")` | Keep (server-only) |

### 5. Hardcoded Values

| File                | Value                                    | Fix              |
| ------------------- | ---------------------------------------- | ---------------- |
| `layout.tsx:27`     | `'https://nikhilsingh-eight.vercel.app'` | Use env var      |
| `resume-data.ts:12` | `'https://nikhil-singh.dev'`             | Verify URL       |
| `layout.tsx:142`    | `GA4_MEASUREMENT_ID` placeholder         | Make conditional |

---

## Cleanup Checklist

### Step 1: Remove Duplicate/Unused Imports

```bash
# Find unused imports
npx tsc --noEmit 2>&1 | grep "is declared but its value is never read"
```

**About.tsx fix:**

```diff
- import { Award, ..., Award as Trophy } from 'lucide-react';
+ import { Award, ..., Award as Trophy } from 'lucide-react';
// Trophy is used as alias for clarity, keep it
// But remove if Award is used directly for same purpose
```

**Check each file for:**

- [ ] Imports that are never used
- [ ] Variables declared but never read
- [ ] Functions defined but never called
- [ ] Types imported but never referenced

### Step 2: Fix Syntax Issues

```bash
# Auto-fix with ESLint
npm run lint --fix

# Auto-fix with Prettier
npm run format
```

### Step 3: Remove Console Logs (Client-side only)

```bash
# Find client-side console statements
grep -r "console\." src/components/
grep -r "console\." src/app/ --include="*.tsx"
```

**Keep:** Server-side console.error in API routes (for debugging)
**Remove:** Any console.log in client components

### Step 4: Verify Build

```bash
npx tsc --noEmit
npm run lint
npm run build
```

### Step 5: Commit

```bash
git add .
git commit -m "chore: clean up code, remove duplicates, fix syntax

- Remove unused imports across components
- Fix duplicate Award import in About.tsx
- Auto-format with Prettier
- Fix ESLint warnings
- Clean up hardcoded values where possible

Closes #cleanup-round-1"
```

---

## Files to Audit

| File                          | Priority | Issues Found                    |
| ----------------------------- | -------- | ------------------------------- |
| `src/components/About.tsx`    | High     | Duplicate Award import          |
| `src/components/Footer.tsx`   | Medium   | HTML entities in JSX            |
| `src/components/Projects.tsx` | Medium   | Complex filter logic            |
| `src/components/Hero.tsx`     | Low      | sectionRef unused               |
| `src/components/Chatbot.tsx`  | Low      | Large component, consider split |
| `src/app/layout.tsx`          | High     | Hardcoded GA4 ID                |
| `src/app/globals.css`         | Low      | Hardcoded px in section-padding |
| `src/app/api/chat/route.ts`   | Low      | 529 lines, consider refactor    |
| `next.config.ts`              | High     | Missing headers config          |

---

## Auto-Fix Commands

```bash
# 1. Format all files
npm run format

# 2. Lint fix
npm run lint -- --fix

# 3. Check TypeScript
npx tsc --noEmit

# 4. Build
npm run build

# 5. Stage and commit
git add -A
git commit -m "chore: auto-fix formatting and linting"
```
