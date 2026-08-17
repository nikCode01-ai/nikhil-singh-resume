---
name: universal-investigate
description: >-
  Universal investigation workflow to deeply analyze, reproduce, and identify root causes for any task (bug, feature, API, UI, database, performance, auth, deployment, configuration) without prematurely altering code or making assumptions.
---

# Universal Investigate Skill

## Purpose

Thoroughly understand any task, inspect current implementation and runtime behavior, reproduce issues, identify root causes, check whether already fixed, and map out affected components and side effects.

## Principles

1. **Source of Truth**: Current code and current runtime behavior are the source of truth, never outdated TODOs or docs.
2. **Read-Only / Non-Destructive**: Do not modify application code during investigation unless required for an isolated reproduction test.
3. **Evidence-Based**: Gather actual errors, network logs, console output, code references, and state transitions.

## Investigation Protocol

1. **Understand Requirement**:
   - Define expected behavior vs actual observed behavior.
   - Clarify scope and acceptance criteria.

2. **Inspect Existing State**:
   - Locate relevant entry points, routes, UI components, backend controllers, models, or configurations.
   - Inspect dependencies, build scripts, environment variables, and active configs.
   - Review recent commits, git status, and existing test suites.

3. **Runtime & Log Inspection**:
   - Check application logs, build outputs, browser console errors, and network payloads.
   - Verify active services, ports, database connections, and API endpoints.

4. **Reproduce & Isolate**:
   - Reproduce the failure or gap using Playwright (UI), curl/fetch (APIs), CLI runs, or unit tests.
   - Pinpoint the exact file, function, line, or configuration causing the discrepancy.

5. **Already-Fixed Detection**:
   - Test if the system is already behaving as requested.
   - If already working, mark as `ALREADY_FIXED` and proceed without code modifications.

6. **Impact & Dependency Analysis**:
   - Map out downstream and upstream dependents.
   - Identify potential regression risks and side effects.

7. **Deliver Investigation Summary**:
   - Root Cause / Implementation Gap.
   - Affected Files & Components.
   - Reproduction / Validation Evidence.
   - Proposed Minimal Fix Plan.
