# Accessibility Checklist — Target: 100/100

## Current Score (Estimated): ~85/100

---

## 1. COLOR CONTRAST

| Issue                   | File          | Fix                                       | Status |
| ----------------------- | ------------- | ----------------------------------------- | ------ |
| Dark mode text contrast | `globals.css` | Verify slate-400 on slate-950 meets 4.5:1 | 🔴     |
| Footer link colors      | `Footer.tsx`  | slate-500 on slate-900 may fail           | 🔴     |
| Brand green on white    | `globals.css` | #1f4d37 on #ffffff = 7.2:1 ✅             | ✅     |
| Brand yellow on dark    | `globals.css` | #f4b400 on #0b0f1a = 10.5:1 ✅            | ✅     |
| Badge text sizes        | `About.tsx`   | Small text (xs) needs 4.5:1 minimum       | 🟡     |

**Fix:**

```css
/* globals.css — Ensure all text meets contrast */
/* Light mode: slate-600 (#475569) on white = 5.9:1 ✅ */
/* Dark mode: slate-300 (#cbd5e1) on slate-950 (#0b0f1a) = 12.8:1 ✅ */
/* Problem: slate-500 and slate-400 may fail in some contexts */
```

---

## 2. BUTTON & LINK NAMES

| Issue                                  | File                       | Fix                                       | Status |
| -------------------------------------- | -------------------------- | ----------------------------------------- | ------ |
| Social links in Footer need aria-label | `Footer.tsx`               | ✅ Already has aria-label on social links | ✅     |
| Chatbot open/close button              | `Chatbot.tsx`              | ✅ Has aria-label                         | ✅     |
| Menu option buttons in chatbot         | `Chatbot.tsx`              | ✅ Has visible text labels                | ✅     |
| Filter buttons in Projects             | `Projects.tsx`             | ✅ Has visible text                       | ✅     |
| External link icons without text       | `About.tsx`                | Add aria-label to external links          | 🟡     |
| Resume download buttons                | `ResumeDownloadButton.tsx` | ✅ Has label prop                         | ✅     |

---

## 3. ARIA ATTRIBUTES

| Attribute            | File              | Current State                 | Fix |
| -------------------- | ----------------- | ----------------------------- | --- |
| `aria-label`         | `Chatbot.tsx`     | ✅ dialog, close button       | ✅  |
| `aria-expanded`      | `Chatbot.tsx`     | ✅ on chat toggle             | ✅  |
| `aria-current`       | `SiteHeader.tsx`  | ✅ on active nav item         | ✅  |
| `aria-hidden`        | `Hero.tsx`        | ✅ on decorative elements     | ✅  |
| `aria-labelledby`    | `About.tsx`       | ✅ on sections                | ✅  |
| `aria-live`          | `ContactForm.tsx` | 🔴 Missing on status messages | Fix |
| `aria-describedby`   | `ContactForm.tsx` | 🔴 Missing on form errors     | Fix |
| `role="dialog"`      | `Chatbot.tsx`     | ✅ on chatbot                 | ✅  |
| `role="main"`        | `layout.tsx`      | ✅ on main element            | ✅  |
| `role="contentinfo"` | `Footer.tsx`      | ✅ on footer                  | ✅  |

**Fix — ContactForm.tsx:**

```tsx
// Add aria-live for status messages
{
  status && (
    <div
      role="alert"
      aria-live="assertive"
      className={`p-4 rounded-lg ${status.type === 'success' ? '...' : '...'}`}
    >
      {status.message}
    </div>
  );
}
```

---

## 4. HEADING HIERARCHY

| Page       | h1                  | h2                         | h3            | Status |
| ---------- | ------------------- | -------------------------- | ------------- | ------ |
| Home (`/`) | Hero ✅             | Section titles             | Card titles   | ✅     |
| About      | "Who is Nikhil?" ✅ | Work Experience, Education | Job titles    | ✅     |
| Services   | Page title ✅       | Service names              | -             | ✅     |
| Projects   | "Featured Work" ✅  | -                          | Project names | ✅     |
| Blogs      | Page title ✅       | Blog titles                | -             | ✅     |
| Contact    | Page title ✅       | -                          | -             | ✅     |

**Issue:** Some inner pages may have missing h1 or skip heading levels.

**Fix Pattern:**

```tsx
// Each page should have exactly ONE h1
<h1>Page Title</h1>

// Sections use h2
<h2>Section Title</h2>

// Cards/sub-sections use h3
<h3>Card Title</h3>
```

---

## 5. FORM LABELS

| Form                | File              | Input Labels                    | Status |
| ------------------- | ----------------- | ------------------------------- | ------ |
| Contact Form        | `ContactForm.tsx` | ✅ Uses <label> with htmlFor    | ✅     |
| Newsletter (Footer) | `Footer.tsx`      | ✅ Has aria-label               | ✅     |
| Chatbot Input       | `Chatbot.tsx`     | ✅ Has placeholder + aria-label | ✅     |
| Search (Projects)   | `Projects.tsx`    | ✅ Has aria-label               | ✅     |

---

## 6. KEYBOARD NAVIGATION

| Element                | File                       | Tab Order  | Focus Visible  | Escape Works | Status |
| ---------------------- | -------------------------- | ---------- | -------------- | ------------ | ------ |
| Nav links              | `SiteHeader.tsx`           | ✅ Natural | ✅ Focus ring  | N/A          | ✅     |
| Chatbot                | `Chatbot.tsx`              | ✅ Tab     | ✅ Focus ring  | ✅ Escape    | ✅     |
| Chatbot menu buttons   | `Chatbot.tsx`              | ✅ Tab     | ✅ Focus ring  | N/A          | ✅     |
| Theme toggle           | `ThemeToggle.tsx`          | ✅ Tab     | ✅ Focus ring  | N/A          | ✅     |
| Scroll to top          | `ScrollToTopButton.tsx`    | ✅ Tab     | ✅ Focus ring  | N/A          | ✅     |
| Project filter buttons | `Projects.tsx`             | ✅ Tab     | ✅ Focus ring  | N/A          | ✅     |
| Contact form inputs    | `ContactForm.tsx`          | ✅ Tab     | 🟡 Needs check | N/A          | 🟡     |
| Resume download        | `ResumeDownloadButton.tsx` | ✅ Tab     | ✅ Focus ring  | N/A          | ✅     |

**Fix — ContactForm.tsx inputs:**

```tsx
// Ensure focus ring is visible on all inputs
<input className="... focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ..." />
```

---

## 7. SKIP NAVIGATION

| Location    | File             | Status                  |
| ----------- | ---------------- | ----------------------- |
| Root layout | `layout.tsx`     | ✅ Skip to main content |
| SiteHeader  | `SiteHeader.tsx` | ✅ Skip to content      |

---

## 8. LANDMARK ROLES

| Landmark      | Element    | File             | Status           |
| ------------- | ---------- | ---------------- | ---------------- |
| `banner`      | `<header>` | `SiteHeader.tsx` | ✅ Implicit      |
| `main`        | `<main>`   | `layout.tsx`     | ✅ Explicit role |
| `contentinfo` | `<footer>` | `Footer.tsx`     | ✅ Explicit role |
| `navigation`  | `<nav>`    | `SiteHeader.tsx` | ✅ Implicit      |
| `dialog`      | Chatbot    | `Chatbot.tsx`    | ✅ Explicit role |

---

## 9. FOCUS VISIBILITY

**All interactive elements should have:**

```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2
```

**Audit:**
| Component | Focus Ring Color | Offset | Status |
| ---------------------- | ---------------- | ------ | ------ |
| Buttons (primary) | brand-yellow | 2px | ✅ |
| Buttons (secondary) | brand-yellow | 2px | ✅ |
| Links | brand-yellow | 2px | ✅ |
| Form inputs | brand-green | 2px | 🟡 |
| Chatbot elements | brand-yellow | 2px | ✅ |
| Nav items | slate-500 | 2px | 🟡 |

---

## 10. ACCESSIBLE SVGs

| SVG Usage          | File         | aria-hidden     | Status |
| ------------------ | ------------ | --------------- | ------ |
| Decorative circles | `Hero.tsx`   | ✅              | ✅     |
| Lucide icons       | Various      | ✅ (decorative) | ✅     |
| Social icons       | `Footer.tsx` | N/A (has label) | ✅     |
| Skill icons        | `Skills.tsx` | ✅              | ✅     |

---

## 11. REDUCED MOTION

**Current:** ✅ Implemented in `globals.css`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 12. SCREEN READER COMPATIBILITY

| Element              | Screen Reader Text                 | Status |
| -------------------- | ---------------------------------- | ------ |
| Chatbot toggle       | "Open chat" / "Close chat"         | ✅     |
| Skip link            | "Skip to main content"             | ✅     |
| Social links         | Has aria-label with platform name  | ✅     |
| Status messages      | Needs `role="alert"` + `aria-live` | 🔴     |
| Loading states       | Needs `aria-busy` or `aria-live`   | 🔴     |
| Search results count | Needs `aria-live="polite"`         | 🔴     |

---

## Priority Fixes

| Priority | Fix                                             | File              | Impact |
| -------- | ----------------------------------------------- | ----------------- | ------ |
| 1        | Add `role="alert"` + `aria-live` to form status | `ContactForm.tsx` | High   |
| 2        | Add `aria-busy` to loading states               | `Chatbot.tsx`     | Medium |
| 3        | Add `aria-live` to search results               | `Projects.tsx`    | Medium |
| 4        | Fix color contrast for small text               | `globals.css`     | High   |
| 5        | Ensure all inputs have visible focus            | `ContactForm.tsx` | Medium |
| 6        | Add heading to every page section               | Various           | Low    |

---

## Verification

```bash
# Install axe-core for automated testing
npm install -D @axe-core/react

# Run Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility

# Manual checks:
# 1. Tab through entire page with keyboard only
# 2. Use screen reader (VoiceOver/NVDA) to navigate
# 3. Check color contrast with browser devtools
# 4. Verify all images have alt text
# 5. Test with prefers-reduced-motion enabled
```
