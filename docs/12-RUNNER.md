# Runner — Sab Files & Commands Jo Chahiye

---

## Quick Start

```bash
# Sabse pehle install dependencies
npm install

# Dev server start
npm run dev

# Build production
npm run build

# Production server
npm run start
```

---

## Essential Commands

### Development

| Command          | Purpose                      |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start dev server (port 3000) |
| `npm run build`  | Production build             |
| `npm run start`  | Start production server      |
| `npm run lint`   | Run ESLint                   |
| `npm run format` | Format with Prettier         |

### TypeScript

| Command            | Purpose                     |
| ------------------ | --------------------------- |
| `npx tsc --noEmit` | Type check without emitting |
| `npx tsc --watch`  | Watch mode type checking    |

### Git

| Command               | Purpose             |
| --------------------- | ------------------- |
| `git status`          | Check changes       |
| `git diff`            | See what changed    |
| `git add -A`          | Stage all changes   |
| `git commit -m "msg"` | Commit with message |
| `git push`            | Push to remote      |
| `git pull`            | Pull from remote    |

### GitHub (gh CLI)

| Command            | Purpose             |
| ------------------ | ------------------- |
| `gh issue list`    | List all issues     |
| `gh issue create`  | Create new issue    |
| `gh issue close N` | Close issue #N      |
| `gh pr list`       | List pull requests  |
| `gh pr create`     | Create pull request |

---

## Files That Need To Run/Work

### Config Files (Must be correct)

| File                 | Check                                         |
| -------------------- | --------------------------------------------- |
| `package.json`       | Dependencies installed                        |
| `next.config.ts`     | Image config, headers, serverExternalPackages |
| `tsconfig.json`      | Path aliases, compiler options                |
| `tailwind.config.ts` | Theme extensions                              |
| `postcss.config.mjs` | PostCSS plugins                               |
| `eslint.config.mjs`  | ESLint rules                                  |
| `.env.local`         | API keys configured                           |

### Source Files (Must build without errors)

| File                       | Purpose                               |
| -------------------------- | ------------------------------------- |
| `src/app/layout.tsx`       | Root layout — fonts, scripts, JSON-LD |
| `src/app/page.tsx`         | Home page                             |
| `src/app/globals.css`      | Tailwind + custom styles              |
| `src/app/sitemap.ts`       | Dynamic sitemap                       |
| `src/app/robots.ts`        | Robots.txt                            |
| `src/lib/resume-data.ts`   | All portfolio data                    |
| `src/lib/blog-posts.ts`    | Blog post data                        |
| `src/lib/project-slugs.ts` | Project slug data                     |
| `src/lib/utils.ts`         | cn() utility                          |
| `src/lib/github.ts`        | GitHub API                            |

### Component Files (Must render correctly)

| File              | Critical? | Notes                 |
| ----------------- | --------- | --------------------- |
| `Hero.tsx`        | ✅        | First thing users see |
| `Chatbot.tsx`     | ✅        | AI integration        |
| `SiteHeader.tsx`  | ✅        | Navigation            |
| `Footer.tsx`      | ✅        | Site footer           |
| `Projects.tsx`    | ✅        | Project showcase      |
| `ContactForm.tsx` | ✅        | Form submission       |
| `About.tsx`       | ✅        | About page            |
| `Services.tsx`    | ✅        | Services listing      |
| `Skills.tsx`      | ✅        | Skills display        |
| `Blogs.tsx`       | ✅        | Blog listing          |

### API Routes (Must respond correctly)

| Route                      | Method | Test                                                                                                                                      |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/chat`                | POST   | `curl -X POST localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"hello"}'`                                       |
| `/api/contact`             | POST   | `curl -X POST localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"test","email":"test@test.com","message":"hi"}'` |
| `/api/resume`              | GET    | Open in browser — should download PDF                                                                                                     |
| `/api/jobs`                | GET    | Open in browser — should return JSON                                                                                                      |
| `/api/avatar`              | GET    | `curl localhost:3000/api/avatar?name=Nikhil`                                                                                              |
| `/api/ui-icon`             | GET    | `curl localhost:3000/api/ui-icon?name=Code`                                                                                               |
| `/api/icon`                | GET    | `curl localhost:3000/api/icon?name=star`                                                                                                  |
| `/api/placeholder/400/300` | GET    | Open in browser — should show placeholder                                                                                                 |

---

## Full Test Script

Save as `test.sh` and run:

```bash
#!/bin/bash
echo "=== 1. Installing dependencies ==="
npm install

echo "=== 2. TypeScript check ==="
npx tsc --noEmit
if [ $? -ne 0 ]; then echo "❌ TypeScript errors found"; exit 1; fi
echo "✅ TypeScript OK"

echo "=== 3. Lint check ==="
npm run lint
if [ $? -ne 0 ]; then echo "❌ Lint errors found"; exit 1; fi
echo "✅ Lint OK"

echo "=== 4. Build ==="
npm run build
if [ $? -ne 0 ]; then echo "❌ Build failed"; exit 1; fi
echo "✅ Build OK"

echo "=== 5. Starting server for manual test ==="
npm run start &
SERVER_PID=$!
sleep 3

echo "=== 6. Testing API routes ==="
curl -s http://localhost:3000/api/jobs > /dev/null && echo "✅ /api/jobs OK" || echo "❌ /api/jobs FAIL"
curl -s http://localhost:3000/api/icon?name=star > /dev/null && echo "✅ /api/icon OK" || echo "❌ /api/icon FAIL"
curl -s http://localhost:3000/api/placeholder/400/300 > /dev/null && echo "✅ /api/placeholder OK" || echo "❌ /api/placeholder FAIL"

echo "=== 7. Testing pages ==="
curl -s http://localhost:3000 > /dev/null && echo "✅ / OK" || echo "❌ / FAIL"
curl -s http://localhost:3000/about > /dev/null && echo "✅ /about OK" || echo "❌ /about FAIL"
curl -s http://localhost:3000/projects > /dev/null && echo "✅ /projects OK" || echo "❌ /projects FAIL"
curl -s http://localhost:3000/blogs > /dev/null && echo "✅ /blogs OK" || echo "❌ /blogs FAIL"
curl -s http://localhost:3000/contact > /dev/null && echo "✅ /contact OK" || echo "❌ /contact FAIL"
curl -s http://localhost:3000/sitemap.xml > /dev/null && echo "✅ /sitemap.xml OK" || echo "❌ /sitemap.xml FAIL"
curl -s http://localhost:3000/robots.txt > /dev/null && echo "✅ /robots.txt OK" || echo "❌ /robots.txt FAIL"

kill $SERVER_PID
echo "=== ALL TESTS COMPLETE ==="
```

---

## Environment Variables (.env.local)

```env
# AI Keys (at least one for chatbot)
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here

# GitHub (for issue management via chatbot)
GITHUB_TOKEN=your_token_here
GITHUB_REPO=owner/repo

# Site URL
NEXT_PUBLIC_SITE_URL=https://nikhilsingh-eight.vercel.app
SITE_URL=https://nikhilsingh-eight.vercel.app

# Optional: GA4 (only load when set)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

## Node Version

```bash
# Check current version
node -v

# Recommended: Node.js 18+ or 20+
# If using nvm:
nvm use 20
```
