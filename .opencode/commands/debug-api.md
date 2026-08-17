---
description: Debug API routes, component errors, build failures, and runtime issues
subtask: true
---

Debug an error in the portfolio project. Optional argument: error message, route path, or component name (e.g., /debug-api /api/chat, /debug-api Chatbot, /debug-api "hydration mismatch").

Steps to execute:

1. **Identify the error source:**
   - If $ARGUMENTS is a route path: focus on that API route
   - If $ARGUMENTS is a component name: focus on that component
   - If $ARGUMENTS is an error message: search codebase for matching patterns
   - If $ARGUMENTS is empty: check recent terminal output or ask user

2. **Collect error information:**
   a. Build errors: Run `npm run build`, capture full error output
   b. Runtime errors: Check `src/app/error.tsx`, hydration mismatches, missing `"use client"`
   c. API route errors: Read `src/app/api/<route>/route.ts`, check validation, env vars, external API calls
   d. Strapi/CMS errors: Check `src/lib/strapi.ts`, verify backend at `https://nik-be.onrender.com`

3. **Read relevant source files** and check for common patterns.

4. **Common error patterns:**

   | Error                             | Likely Cause       | Fix                                  |
   | --------------------------------- | ------------------ | ------------------------------------ |
   | "X" is not exported from "Y"      | Wrong import       | Check module exports                 |
   | Hydration mismatch                | Server/client diff | Use `useEffect` for client-only code |
   | fetch failed / ECONNREFUSED       | Backend down       | Check .env SITE_URL                  |
   | MODULE_NOT_FOUND                  | Missing dependency | `npm install`                        |
   | Cannot read property of undefined | No null check      | Optional chaining                    |
   | 429 Too Many Requests             | Rate limited       | Add rate limiting                    |
   | 500 Internal Server Error         | Server crash       | Check server logs                    |

5. **Check environment variables:**
   - `GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENAI_API_KEY` — AI chatbot
   - `RESEND_API_KEY` — email
   - `TWILIO_*` — WhatsApp
   - `GOOGLE_CSE_ID`, `GOOGLE_API_KEY` — job search
   - Strapi URL in `src/lib/strapi.ts`

6. **Present diagnosis:**
   Show error details, root cause, environment check, suggested fix, and verification steps.

Important:

- ALWAYS read actual error output — never guess
- Check .env early — most runtime errors are missing config
- For hydration errors: check `typeof window`, `useEffect`, consistent rendering
- If error is in nik_be/, note it's a separate repo
