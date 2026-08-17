---
name: universal-verify
description: >-
  Universal verification and regression testing workflow to prove actual runtime behavior across UI, APIs, backend, databases, deployments, and CLIs using real testing methods (Playwright, API tests, CLI execution, database queries).
---

# Universal Verify Skill

## Purpose

Rigorously prove that any change, fix, or feature works in real runtime environments and that no regressions have been introduced.

## Principles

1. **Real Behavior Over Source Inspection**: Code existing or building is not proof of working software. Actual runtime execution is mandatory.
2. **Context-Appropriate Verification**:
   - **UI / Frontend / Responsive / Navigation / Forms**: Real browser testing with Playwright (inspect console, network calls, element state).
   - **APIs / Endpoints**: Real HTTP requests, payload validation, status codes, error handling.
   - **Backend / Services**: Execute server processes, verify logs, assert operational state.
   - **Database**: Assert real database records, schema migrations, query performance, transactions.
   - **CLI / Tools**: Run actual commands, check exit codes, inspect stdout/stderr.
   - **Deployment**: Verify live/staged endpoints, health checks, environment configs.
3. **Zero False Positives**: Never mark a task `VERIFIED_PASS` without empirical evidence.

## Verification Protocol

1. **Target Verification**:
   - Execute verification script or tool against the specific feature/bug fix.
   - Capture real stdout, response JSON, DOM state, or Playwright screenshots/logs.

2. **Regression Check**:
   - Run end-to-end user flows adjacent to the modified code.
   - Check browser console for errors/warnings.
   - Check server/network logs for 4xx/5xx responses or unhandled rejections.

3. **Failure Loop**:
   - If verification fails (`VERIFIED_FAIL`):
     1. Analyze failure logs and state.
     2. Identify remaining root causes or unintended regressions.
     3. Re-engage `universal-investigate` -> `universal-fix` -> `universal-verify`.
     4. Repeat until clean `VERIFIED_PASS` or documented genuine external blocker.

4. **Outcome Classification**:
   - `VERIFIED_PASS`: Empirically validated with zero regressions.
   - `ALREADY_FIXED`: Existing implementation tested and confirmed working as expected without changes.
   - `BLOCKED`: Genuine external dependency missing (missing credentials, down external service, missing hardware).
