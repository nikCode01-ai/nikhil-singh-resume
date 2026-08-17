---
description: Look up HTTP, Next.js, Strapi, TypeScript, and deployment error codes
subtask: true
---

Look up an error code or search error descriptions. Argument: error code, keyword, or technology (e.g., /error-lookup 429, /error-lookup hydration, /error-lookup Next.js).

Steps to execute:

1. **Determine lookup type from $ARGUMENTS:**
   - HTTP status code (400, 404, 429, 500, etc.) → HTTP error lookup
   - Next.js error ("hydration", "metadata", "not-found") → Next.js lookup
   - Strapi/CMS error → Strapi lookup
   - TypeScript error code ("TS2322") → TypeScript lookup
   - Deployment error (Vercel/Render) → Deployment lookup
   - Empty → summary of all categories

2. **Present results:**

### HTTP Status Codes

| Code | Category              | Portfolio Context                                            |
| ---- | --------------------- | ------------------------------------------------------------ |
| 400  | Bad Request           | Invalid form data on `/api/contact`, bad JSON on `/api/chat` |
| 401  | Unauthorized          | Missing/invalid API key                                      |
| 403  | Forbidden             | CORS issue, Strapi permissions                               |
| 404  | Not Found             | Wrong URL slug, missing page route                           |
| 405  | Method Not Allowed    | Wrong HTTP method on route                                   |
| 408  | Request Timeout       | Strapi cold start on Render, slow AI response                |
| 429  | Too Many Requests     | AI API quota exceeded, no rate limiting                      |
| 500  | Internal Server Error | Unhandled exception, Strapi down                             |
| 502  | Bad Gateway           | Render free tier cold start                                  |
| 503  | Service Unavailable   | Vercel/Render deployment in progress                         |

### Next.js Errors

| Error                     | Fix                                                          |
| ------------------------- | ------------------------------------------------------------ |
| Hydration mismatch        | `useEffect` for client-only code, `suppressHydrationWarning` |
| Missing "use client"      | Add directive at top of file                                 |
| Invalid generateMetadata  | Check layout.tsx exports                                     |
| Module not found          | `npm install`, check import paths                            |
| Dynamic server usage      | Add `export const dynamic = 'force-dynamic'`                 |
| Image optimization failed | Check next.config.ts image domains                           |

### Strapi Errors

| Error         | Fix                                    |
| ------------- | -------------------------------------- |
| ECONNREFUSED  | Backend down, free tier cold start     |
| 403 Forbidden | Check Strapi admin Roles → Permissions |
| Not Found     | Verify content type schema             |
| JWT expired   | Re-authenticate, check JWT_SECRET      |

### TypeScript Errors

| Code   | Description             | Fix                 |
| ------ | ----------------------- | ------------------- |
| TS2322 | Type not assignable     | Fix type mismatch   |
| TS2304 | Cannot find name        | Missing import      |
| TS2339 | Property does not exist | Check types         |
| TS2531 | Object is possibly null | Add null check      |
| TS7006 | Implicit 'any'          | Add type annotation |

### Vercel Errors

| Error            | Fix                     |
| ---------------- | ----------------------- |
| Build failed     | Fix lint/type errors    |
| Function timeout | Optimize code           |
| Missing env var  | Add in Vercel dashboard |

### Render Errors

| Error               | Fix                                       |
| ------------------- | ----------------------------------------- |
| Application error   | Check logs, env vars, CodeMirror versions |
| Service unavailable | Normal cold start (30-60s)                |
| Deploy failed       | Check build logs                          |

3. **If no match found:**
   - Suggest `npm run build 2>&1` for build errors
   - Suggest `/debug-api` for full diagnostic
   - Point to Next.js docs: https://nextjs.org/docs/error-reference

Important: Always check actual error message. For HTTP errors: 4xx = fix client code, 5xx = fix server/backend. Render cold starts are normal, not bugs.
