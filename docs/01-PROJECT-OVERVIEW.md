# Project Overview — Nikhil Singh Portfolio

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15.5 (App Router)               |
| Language   | TypeScript 5                            |
| Styling    | Tailwind CSS 4                          |
| Animations | Framer Motion 12                        |
| Icons      | Lucide React                            |
| Fonts      | Inter + Geist Mono (next/font)          |
| Deployment | Vercel                                  |
| AI Backend | Gemini / Groq / OpenAI (priority chain) |
| CMS        | None (hardcoded data in `src/lib/`)     |

---

## Directory Structure

```
portfolio/
├── public/
│   ├── images/          # Project screenshots (PNG)
│   ├── icons/skills/    # Skill SVG icons (13 icons)
│   ├── og-image.svg     # OpenGraph image
│   └── *.svg            # Misc SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, scripts, JSON-LD, GA4)
│   │   ├── page.tsx            # Home page (Hero, Services, About, Skills, Projects, etc.)
│   │   ├── globals.css         # Tailwind config, custom utilities, animations
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   ├── robots.ts           # Robots.txt generation
│   │   ├── not-found.tsx       # 404 page
│   │   ├── error.tsx           # Error boundary
│   │   ├── about/page.tsx      # About page
│   │   ├── services/page.tsx   # Services page
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects listing
│   │   │   ├── [slug]/page.tsx # Individual project page
│   │   │   └── ndcterm/page.tsx# NDC Terminal showcase
│   │   ├── skills/page.tsx     # Skills page
│   │   ├── tools/page.tsx      # Tools page
│   │   ├── blogs/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/page.tsx # Individual blog post
│   │   ├── testimonials/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── price/page.tsx      # Pricing page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── jobs/
│   │   │   ├── page.tsx        # Job listings
│   │   │   └── JobsClient.tsx  # Client-side job filtering
│   │   └── api/
│   │       ├── chat/route.ts       # AI chatbot (Gemini/Groq/OpenAI)
│   │       ├── contact/route.ts    # Contact form submission
│   │       ├── resume/route.ts     # Resume PDF/DOCX generation
│   │       ├── jobs/route.ts       # Jobs API
│   │       ├── avatar/route.ts     # Dynamic avatar generation
│   │       ├── ui-icon/route.ts    # Dynamic UI icon generation
│   │       ├── icon/route.ts       # Dynamic icon generation
│   │       └── placeholder/[w]/[h]/route.ts  # Placeholder images
│   ├── components/
│   │   ├── Hero.tsx             # Hero section with avatar, stats
│   │   ├── About.tsx            # Full about page component
│   │   ├── Services.tsx         # Services section
│   │   ├── Skills.tsx           # Skills display
│   │   ├── Projects.tsx         # Projects grid with search/filter
│   │   ├── Chatbot.tsx          # AI chatbot widget
│   │   ├── Blogs.tsx            # Blog listing
│   │   ├── Testimonials.tsx     # Testimonials carousel
│   │   ├── FAQ.tsx              # FAQ accordion
│   │   ├── Pricing.tsx          # Pricing cards
│   │   ├── ContactForm.tsx      # Contact form
│   │   ├── ContactSection.tsx   # Contact section wrapper
│   │   ├── Footer.tsx           # Main footer
│   │   ├── SiteHeader.tsx       # Inner page header
│   │   ├── HomeHeader.tsx       # Home page header
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Card.tsx             # Card component
│   │   ├── Badge.tsx            # Badge component
│   │   ├── Section.tsx          # Section wrapper
│   │   ├── Container.tsx        # Container wrapper
│   │   ├── PageTransition.tsx   # Page transition animation
│   │   ├── ScrollToTopButton.tsx
│   │   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │   ├── ResumeDownloadButton.tsx
│   │   ├── AnimatedCounter.tsx  # Animated number counter
│   │   ├── ProjectSkeleton.tsx  # Loading skeleton
│   │   ├── IconLink.tsx         # Icon link component
│   │   ├── ApiAvatar.tsx        # API-generated avatar
│   │   ├── ApiUiIcon.tsx        # API-generated UI icon
│   │   ├── LazyChatbot.tsx      # Lazy-loaded chatbot
│   │   ├── LazyProjects.tsx     # Lazy-loaded projects
│   │   └── LazySkills.tsx       # Lazy-loaded skills
│   └── lib/
│       ├── resume-data.ts       # All portfolio data (person, skills, projects, etc.)
│       ├── blog-posts.ts        # Blog post definitions
│       ├── project-slugs.ts     # Project slug mappings
│       ├── github.ts            # GitHub API integration
│       └── utils.ts             # Utility functions (cn helper)
├── prompt.txt                   # Optimization requirements
├── phases.md                    # Development phases tracker
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

---

## Routes (14 Pages + 8 API Routes)

### Page Routes

| Route               | Description                                                          | Type   |
| ------------------- | -------------------------------------------------------------------- | ------ |
| `/`                 | Home (Hero, Services, About, Skills, Projects, Blogs, FAQs, Contact) | Client |
| `/about`            | Full about page                                                      | Server |
| `/services`         | Services listing                                                     | Server |
| `/projects`         | Projects grid with search/filter                                     | Client |
| `/projects/[slug]`  | Individual project details                                           | Server |
| `/projects/ndcterm` | NDC Terminal showcase                                                | Server |
| `/skills`           | Skills display                                                       | Server |
| `/tools`            | Tools listing                                                        | Server |
| `/blogs`            | Blog listing                                                         | Server |
| `/blogs/[slug]`     | Individual blog post                                                 | Server |
| `/testimonials`     | Testimonials                                                         | Server |
| `/faqs`             | FAQ accordion                                                        | Server |
| `/price`            | Pricing page                                                         | Server |
| `/contact`          | Contact form                                                         | Client |
| `/jobs`             | Job listings                                                         | Client |

### API Routes

| Route                      | Method | Purpose                         |
| -------------------------- | ------ | ------------------------------- |
| `/api/chat`                | POST   | AI chatbot (Gemini/Groq/OpenAI) |
| `/api/contact`             | POST   | Contact form submission         |
| `/api/resume`              | GET    | Resume PDF/DOCX download        |
| `/api/jobs`                | GET    | Job listings data               |
| `/api/avatar`              | GET    | Dynamic avatar SVG              |
| `/api/ui-icon`             | GET    | Dynamic UI icon SVG             |
| `/api/icon`                | GET    | Dynamic icon SVG                |
| `/api/placeholder/[w]/[h]` | GET    | Placeholder images              |

---

## Data Flow

```
resume-data.ts ──────────────────────────────────────┐
  ├── person (name, role, contact, socials)          │
  ├── professionalSummary                            │
  ├── technicalSkills (8 categories, 120+ skills)    │
  ├── experience (2 positions)                       │
  ├── featuredProjects (4 projects)                  │
  ├── additionalProjects (12 projects)               │
  ├── services (6 services)                          │
  ├── testimonials (5 testimonials)                  │
  ├── certifications (4 certs)                       │
  ├── publications (3 articles)                      │
  ├── openSourceContributions (5 repos)              │
  ├── keyAchievements (15 items)                     │
  ├── education, languages, softSkills, interests    │
  └── industryExpertise, coreCompetencies            │
                                                     │
blog-posts.ts ───────────────────────────────────────┤
  └── 10 blog posts (title, slug, date, content)     │
                                                     │
project-slugs.ts ────────────────────────────────────┘
  └── 10+ project slugs with metadata
```

---

## Key Features Already Implemented

| Feature                        | Status | Details                                    |
| ------------------------------ | ------ | ------------------------------------------ |
| AI Chatbot (Menu + AI Mode)    | ✅     | Gemini → Groq → OpenAI fallback chain      |
| GitHub Issue Management        | ✅     | Create/list/get issues via AI chat         |
| Resume Download (PDF/DOCX)     | ✅     | 2 templates, PDF & DOCX formats            |
| Contact Form                   | ✅     | API route with validation                  |
| Dark Mode                      | ✅     | Theme toggle with localStorage persistence |
| Responsive Design              | ✅     | Mobile-first, all breakpoints              |
| SEO (sitemap, robots, LD+JSON) | ✅     | Dynamic sitemap, Person/Org/WebSite schema |
| Animated Counters              | ✅     | Intersection Observer based                |
| Project Search/Filter          | ✅     | Client-side search + category filter       |
| Lazy Loading                   | ✅     | Chatbot, Skills, Projects lazy loaded      |
| Skip Navigation                | ✅     | Accessibility skip links                   |
| Framer Motion Animations       | ✅     | Scroll-triggered, page transitions         |

---

## Environment Variables Required

```env
# AI Keys (at least one required for chatbot)
GEMINI_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=

# Optional AI model overrides
GEMINI_MODEL=gemini-2.0-flash
OPENAI_MODEL=gpt-4o-mini
GROQ_MODEL=llama-3.3-70b-versatile

# GitHub (for issue management)
GITHUB_TOKEN=
GITHUB_REPO=owner/repo

# Site
NEXT_PUBLIC_SITE_URL=https://nikhilsingh-eight.vercel.app
SITE_URL=https://nikhilsingh-eight.vercel.app
```
