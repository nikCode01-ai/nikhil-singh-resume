# Project Phases — Portfolio Tasks

## Phase 1: Chatbot AI Integration

**Goal**: Chatbot frontend ko `/api/chat` API se connect karna — real AI chat experience.

### Current State

- `Chatbot.tsx` sirf menu-driven hai (pre-scripted responses)
- `/api/chat` route ready hai (Gemini → Groq → OpenAI priority)
- AI functionality server pe kaam karti hai, frontend use nahi kar raha

### Plan

| Step | File                         | Change                                                           |
| ---- | ---------------------------- | ---------------------------------------------------------------- |
| 1    | `src/components/Chatbot.tsx` | Text input + send button add karo menu buttons ke neeche         |
| 2    | `src/components/Chatbot.tsx` | `sendMessage()` function — user message `/api/chat` pe POST kare |
| 3    | `src/components/Chatbot.tsx` | Loading state (typing indicator) + error handling                |
| 4    | `src/components/Chatbot.tsx` | Mode toggle: Menu / AI Chat buttons                              |

### UX Flow

- Menu buttons quick access ke liye (About, Skills, Projects, Contact, Resume)
- Text input mein user freely type kar sakta hai
- AI response chat bubbles mein dikhega
- Loading mein typing indicator

### Status: ✅ Done

---

## Phase 2: Auto Blog Generator

**Goal**: `/admin/blogs` page — AI se blog generate karo, preview karo, approve karo.

### Current State

- Blog posts manually `blog-posts.ts` mein hardcoded hain (10 posts)
- No CMS, no admin panel, no auto-generation
- Blog format: structured blocks (heading, paragraph, list, image, links)

### Plan

| Step | File                                  | Change                                                                |
| ---- | ------------------------------------- | --------------------------------------------------------------------- |
| 1    | `src/lib/generated-blogs.json`        | Naya file — generated blogs store karega                              |
| 2    | `src/lib/blog-posts.ts`               | Generated blogs ko import + merge karo hardcoded posts ke saath       |
| 3    | `src/app/api/blogs/generate/route.ts` | POST endpoint — AI se blog content generate karo, JSON mein save karo |
| 4    | `src/app/admin/layout.tsx`            | Admin layout (simple wrapper)                                         |
| 5    | `src/app/admin/blogs/page.tsx`        | Admin UI — topic form, generate, preview, approve                     |

### UX Flow

1. User `/admin/blogs` pe jaata hai
2. Topic + category type karta hai
3. "Generate" → AI se blog content generate hota hai
4. Preview mein poora blog dikhta hai (title, excerpt, body, tags)
5. "Approve & Save" → `generated-blogs.json` mein save
6. `/blogs` page pe naya blog automatically dikhta hai

### AI se Generate Hoga

- `title`, `excerpt`, `category`, `tags`, `readingTime`
- `body` blocks — headings, paragraphs, lists (existing format match)

### Status: ✅ Done

---

## Phase 3: Hindi Docx → English MD Conversion

**Goal**: `docs/कार्यकारी सारांश.docx` ko English markdown mein convert karna — bina data skip kiye.

### Current State

- Hindi docx file `docs/` folder mein hai
- python-docx se content extract hua
- English mein convert hua with all citations

### Plan

| Step | Task                                               | Status     |
| ---- | -------------------------------------------------- | ---------- |
| 1    | Read Hindi docx content (97 paragraphs + 2 tables) | ✅ Done    |
| 2    | Convert to English markdown (zero skips)           | ✅ Done    |
| 3    | Add missing citation references (15 restored)      | ✅ Done    |
| 4    | Restructure to match existing MD conventions       | ✅ Done    |
| 5    | Verify & finalize (user approval)                  | ⏳ Pending |

### Conventions Applied

- Title: `# Title — Subtitle` format
- Separators: `---` between sections
- Tables: Structured data in tables
- Priority: 🔴🟡🟢 markers
- Code blocks: Language tags
- File paths: Backtick formatting
- Verification section at bottom

### Output File

- `docs/13-EXECUTIVE-SUMMARY.md` (final)
- `docs/DASHBOARD.md` (live tracker)

### Status: ⏳ Phase 5 Pending (Verification)
