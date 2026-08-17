---
description: Fix a specific GitHub issue with code changes, lint, and typecheck verification
subtask: true
---

Fix a specific GitHub issue in the portfolio project. Argument: issue number (e.g., /fix-issue 42).

Steps to execute:

1. **Fetch the issue:**
   - Run `gh issue view $ARGUMENTS --repo nikCode01-ai/nikhil-singh-resume --json title,body,labels,comments`
   - If $ARGUMENTS is empty: list recent open issues with `gh issue list --repo nikCode01-ai/nikhil-singh-resume --state open` and ask user which one

2. **Understand the issue:**
   - Identify affected files from the issue description
   - Read the relevant source files
   - Understand current behavior vs expected behavior

3. **Explore codebase context:**
   - Read surrounding code in affected files
   - Check imports, dependencies, related components
   - For API routes: check handler, validation, response format
   - For components: check props, state, event handlers

4. **Implement the fix:**
   - Make code changes using Edit/Write tools
   - Follow conventions: TypeScript, Tailwind CSS, single quotes, 2-space indent
   - Keep changes focused — don't refactor unrelated code
   - Add proper error handling where missing

5. **Verify the fix:**
   - Run `npm run lint`
   - Run `npx tsc --noEmit`
   - If lint or tsc fails, fix errors and re-run

6. **Present the fix to user:**
   Show summary with root cause, changes made, and verification results. Wait for confirmation.

7. **Commit the fix:**

   ```
   git add <changed-files>
   git commit -m "fix: <description> (closes #$ARGUMENTS)"
   ```

8. **Update the issue:**
   ```
   gh issue comment $ARGUMENTS --repo nikCode01-ai/nikhil-singh-resume --body "Fixed in commit <sha>. Changes: <summary>"
   ```

Project conventions:

- TypeScript: proper types, avoid `any`
- Styling: Tailwind CSS, check `globals.css` for custom utilities
- Components: Functional components, `"use client"` directive
- API routes: Input validation, error handling, proper HTTP status codes
- Images: `next/image` with `alt` text
- Data: Strapi CMS (`src/lib/strapi.ts`) or hardcoded (`src/lib/blog-posts.ts`, `src/lib/project-slugs.ts`)
- Formatting: Prettier — single quotes, semicolons, 80 char width

Important: Keep fixes minimal. Never commit .env files. If issue is about Strapi backend (nik_be/), inform user it's a separate repo.
