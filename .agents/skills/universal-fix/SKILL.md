---
name: universal-fix
description: >-
  Universal implementation and fix workflow to apply minimal, safe, architectural, and regression-free code/configuration modifications to solve any engineering task.
---

# Universal Fix Skill

## Purpose

Apply correct, minimal, and surgical code/config changes addressing the root cause identified during investigation without unnecessary rewrites, side effects, or regressions.

## Principles

1. **Root Cause Targeting**: Fix the underlying problem, not just symptoms.
2. **Minimal Safe Delta**: Keep changes concise, clean, and tightly scoped to what is necessary.
3. **Architectural Consistency**: Respect existing coding standards, patterns, type systems, and directory conventions.
4. **Reuse & Maintainability**: Reuse existing components, hooks, utilities, and helper functions where possible.
5. **Preservation**: Preserve existing comments, functionality, and working code paths unless explicitly intended to replace.
6. **Robust Error Handling**: Provide graceful error boundaries, fallbacks, defensive validations, and clear error logs.

## Fix Protocol

1. **Review Investigation Findings**:
   - Confirm root cause, target files, and dependency graph before writing code.

2. **Execute Surgical Changes**:
   - Make precise edits using standard file modification tools.
   - Avoid indiscriminate whole-file overwrites or ad-hoc refactors.

3. **Check Code Integrity**:
   - Run type checks (`tsc`, `mypy`, etc.).
   - Run linters and formatters.
   - Verify build commands execute without syntax or dependency errors.

4. **Verify Boundary Conditions**:
   - Ensure null/undefined, network timeouts, invalid inputs, edge cases, and unexpected states are gracefully handled.

5. **Document Specific Changes**:
   - Record exact files modified, functions altered, and rationale for the fix.
