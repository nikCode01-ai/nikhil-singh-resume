---
description: Scan project for bugs, security, performance, SEO, accessibility issues and create GitHub issues
subtask: true
---

Scan the portfolio project for bugs, security issues, performance problems, accessibility gaps, SEO issues, and code quality concerns. Then create GitHub issues with full context. Optional argument: specific area to scan (e.g., "security", "performance", "seo", "accessibility", "api", "code-quality", "all").

Steps to execute:

1. **Determine scan scope:**
   - If $ARGUMENTS is provided and matches a known area (security, performance, seo, accessibility, api, code-quality, broken-links), scan only that area
   - If $ARGUMENTS is "all" or empty, perform a full scan across all areas
   - If $ARGUMENTS is a specific file or component name, focus on that file only

2. **Run automated checks:**
   - Run `npm run lint` to catch ESLint errors and warnings
   - Run `npx tsc --noEmit` to catch TypeScript type errors
   - Check for any `.env` or `.env.local` files being committed (security risk)

3. **Scan for security issues:**
   - Check `src/app/api/` routes for missing input validation
   - Check for exposed API keys or secrets in source code (grep for `sk-`, `api_key`, `secret`, `token` in non-env files)
   - Check for missing rate limiting on API routes (`/api/chat`, `/api/contact`, `/api/resume`, `/api/jobs`)
   - Check `next.config.ts` security headers
   - Verify `.env` is in `.gitignore`

4. **Scan for performance issues:**
   - Check for unnecessary client components (missing or extra `"use client"`)
   - Check for large bundle imports
   - Check image optimization (using `next/image` vs raw `<img>`)
   - Check for missing dynamic imports on heavy components (Chatbot, etc.)
   - Check API route caching headers

5. **Scan for accessibility issues:**
   - Check for missing `alt` attributes on images
   - Check for missing `aria-label` on interactive elements
   - Check proper heading hierarchy (h1 -> h2 -> h3)

6. **Scan for SEO issues:**
   - Check `layout.tsx` metadata exports
   - Check `generateMetadata` on dynamic pages (`[slug]` routes)
   - Check `sitemap.ts` and `robots.ts` completeness
   - Check JSON-LD structured data

7. **Scan for code quality:**
   - Check for TODO/FIXME/HACK comments
   - Check for console.log in production code
   - Check error handling in API routes
   - Check for missing error boundaries

8. **Check existing issues:**
   - Run `gh issue list --repo nikCode01-ai/nikhil-singh-resume --search "<keywords>" --state open`
   - Skip duplicates

9. **Present findings to user:**
   Show a summary table and wait for confirmation before creating any issues.

10. **Create GitHub issues:**
    Use `gh issue create --repo nikCode01-ai/nikhil-singh-resume` with proper labels:
    - `bug`, `security`, `performance`, `accessibility`, `seo`, `code-quality`, `enhancement`

Important: NEVER auto-create issues. ALWAYS wait for user confirmation. Skip Strapi backend issues (separate repo nik_be/).
