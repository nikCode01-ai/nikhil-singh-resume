---
description: Run pre-deployment checks and merge to main for production deployment
subtask: true
---

Run pre-deployment checks and merge branch to main. Optional argument: branch name (defaults to current branch).

Steps to execute:

1. **Preconditions:**
   - Working tree is clean or confirm with user to stash
   - No `.env` or `.env.local` staged for commit
   - `main` branch is up to date with remote

2. **Stage 1: Code Quality Gates** (ALL must pass):
   a. Lint: `npm run lint`
   b. TypeScript: `npx tsc --noEmit`
   c. Build: `npm run build` (skip if only env vars missing, not code errors)

   Show results table. If ANY check fails → stop, do not merge.

3. **Stage 2: Security Check:**
   - Verify `.env` is in `.gitignore`
   - Check no API keys in staged files

4. **Stage 3: Present Summary:**
   Show branch, commits to merge, files changed, checks passed. Wait for user confirmation.

5. **Stage 4: Merge to Main:**

   ```
   git checkout main
   git pull origin main
   git merge --no-ff <branch> -m "merge: <branch> into main"
   git push origin main
   ```

6. **Stage 5: Deployment:**
   - Frontend (Vercel): Auto-deploys from main push. Check with `gh api repos/nikCode01-ai/nikhil-singh-resume/deployments`
   - Backend (Render): Separate repo `nik_be/` — note if backend changes included

7. **Stage 6: Post-merge:**
   - Delete merged branch: `git branch -d <branch>`
   - Ask user about remote branch deletion

Important:

- NEVER merge if lint/typecheck/build fails
- NEVER merge .env or secret files
- Vercel auto-deploys on push to main (1-3 min)
- Render free tier takes 5-10 min (cold start)
- If conflicts: merge main into feature branch first, resolve, re-run checks
