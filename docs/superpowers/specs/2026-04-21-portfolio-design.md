# Portfolio Website Design Spec

**Date:** 2026-04-21 (revised 2026-04-22)
**Owner:** Arsalan Ahmad Khan
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

---

## Overview

A single-page personal portfolio website for Arsalan Ahmad Khan, Senior Frontend Engineer / Frontend Lead with 8+ years of experience. Goals: attract recruiters for senior/lead roles **and** showcase projects. Deployed on Vercel.

**Design philosophy:** Portfolio, not a resume. Projects are the centrepiece. Experience provides context. Personality comes through in copy. The resume data is the source of truth for content — it is not copied verbatim onto the page.

---

## Visual Design

- **Style:** Gradient Bold — dark purple/blue gradient background (`#0f0c29 → #302b63 → #24243e`), white text, vibrant purple/blue/green gradient accents (`#a78bfa`, `#60a5fa`, `#34d399`)
- **Typography:** System font stack; headings bold/black weight with tight letter-spacing (`-1.5px` to `-2px`); section labels in small uppercase (`10px`, `3–4px` letter-spacing, `#a78bfa`)
- **Skill pills:** Three accent colors (purple, blue, green); curated ~8–10 core tools, not exhaustive
- **Animations:** Framer Motion scroll-triggered fade-up on every section; staggered children on skill pills and project cards; glassmorphism sticky nav

---

## Page Structure (single-page, top → bottom)

1. **Sticky Nav** — glassmorphism blur backdrop (`backdrop-blur-md`), "AAK" gradient logo, smooth-scroll links: Work · About · Stack · Contact
2. **Hero** — personality-first headline ("I build fast, beautiful web experiences"), first-person intro sentence, two CTAs: See My Work / Get In Touch
3. **Featured Work** — projects centrepiece (see Projects section below)
4. **About** — 2–3 sentences in personal voice, current role + company, location + open to relocation
5. **Stack** — curated pill grid of ~10 primary tools, subtitle "The tools I reach for first"
6. **Where I've Worked** — 2 expanded role cards + 1 collapsed "earlier roles" line
7. **Contact** — "Got a project in mind?", open to senior & lead roles, Email + LinkedIn + GitHub

---

## Architecture

```
/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts, OG tags
│   ├── page.tsx            # Renders all section components in order
│   └── globals.css         # Tailwind base + CSS vars for gradient theme
├── components/
│   ├── Nav.tsx             # Sticky glassmorphism nav with smooth-scroll
│   ├── Hero.tsx
│   ├── Projects.tsx        # Featured project hero card + 2-col professional grid
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx      # Vertical timeline, 2 expanded + older condensed
│   └── Contact.tsx
├── data/
│   ├── projects.ts         # All project data
│   ├── experience.ts       # Work history
│   └── skills.ts           # Curated skill pills
└── lib/
    └── animations.ts       # Shared Framer Motion variants
```

All content lives in `/data` TypeScript files — no CMS. Components are presentational.

---

## Data Shapes

```ts
// data/projects.ts
export interface Project {
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean        // true = hero card at top
  type: 'personal' | 'professional'
  gradient: string         // CSS gradient string for card preview area
}

// data/experience.ts
export interface Experience {
  company: string
  role: string
  location: string
  period: string
  bullets?: string[]       // present = expanded card; absent = condensed
}

// data/skills.ts
export interface SkillGroup {
  label: string
  color: 'purple' | 'blue' | 'green'
  items: string[]
}
```

---

## Projects Content

### Featured (hero card — personal project)
| Field | Value |
|-------|-------|
| Title | TradeQuoter |
| Description | A mobile-first SaaS platform that lets tradespeople send professional PDF quotes in under 2 minutes — helping them win jobs by responding faster than competitors. |
| Tags | Next.js, TypeScript, React, Tailwind CSS |
| Live URL | https://tradequoter.co/ |
| GitHub | Arsalan to add |
| Badge | "Personal Project" |

### Professional Work (2-column grid)

| # | Title | Description | Tags | Live URL |
|---|-------|-------------|------|----------|
| 1 | GoldenScent | High-traffic perfume & beauty ecommerce for the Middle East. Led SSR migration cutting LCP from 4.5s → 2.5s, 15–30% conversion uplift. | Next.js, React, TypeScript, Contentful, GraphQL | https://goldenscent.com |
| 2 | Al Marwan Machinery | Enterprise platform for heavy equipment rental & sales across UAE, SA & Oman — 3,500+ units. | React, TypeScript, REST API | https://almarwan.com |
| 3 | Tile Mountain | UK's leading tile & flooring retailer. Built full ecommerce frontend with performance optimizations. | Vue.js, Nuxt.js, Laravel | https://tilemountain.co.uk |
| 4 | Bathroom Mountain & Walls and Floors | UK bathroom & tile ecommerce platforms — frontend development and speed optimizations. | Vue.js, Nuxt.js | https://bathroommountain.co.uk + https://wallsandfloors.co.uk |

---

## Personal Info

- **Name:** Arsalan Ahmad Khan
- **Title:** Senior Frontend Engineer / Frontend Lead
- **Location:** Dammam, Saudi Arabia (Open to Relocation)
- **Email:** arslkhan5@gmail.com
- **LinkedIn:** linkedin.com/in/arslkhan
- **GitHub:** Arsalan to provide before launch
- **CV PDF:** place at `public/cv.pdf`; Hero "Download CV" links to `/cv.pdf`
- **Avatar:** gradient initials placeholder ("AA") — replace with `public/avatar.jpg` before launch

---

## Hero Copy

```
[label]   Frontend Engineering
[h1]      I build fast,
          beautiful web
          experiences.
[body]    Hi, I'm Arsalan — a Frontend Lead based in Dammam.
          I've spent 8 years obsessing over performance, UX,
          and the tiny details that make users stay.
[ctas]    See My Work ↓   |   Get In Touch
[footer]  📍 Dammam, Saudi Arabia · Open to remote & relocation
```

---

## About Copy

```
I'm a Frontend Lead at GoldenScent, where I architect and scale
ecommerce experiences for millions of users across the Middle East.
I care deeply about performance, accessibility, and shipping things
that actually work in production.

Currently in Dammam · Open to remote & relocation
```

---

## Skills (curated, not exhaustive)

| Category | Color | Items |
|----------|-------|-------|
| Frontend | purple | React, Next.js, TypeScript, Vue.js / Nuxt |
| Architecture & Perf | blue | SSR/SSG/ISR, Core Web Vitals, TanStack Query, GraphQL |
| Tools | green | Tailwind CSS, Framer Motion, Figma, CI/CD |

---

## Experience

### Expanded cards (top 2)

**GoldenScent — Frontend Lead** | Dammam, SA | Sep 2025 – Present
- Architect frontend for high-traffic ecommerce (millions of users)
- Manage & mentor a team of 8 frontend engineers
- Led Next.js SSR migration — LCP improved from ~4.5s → 2.5s (50% gain)
- ~15–30% conversion uplift through UX & performance improvements

**Al Marwan Heavy Machinery — Frontend Engineer** | Dubai, UAE | Nov 2022 – Jun 2024
- Developed enterprise web applications with focus on performance and usability
- Improved Core Web Vitals and optimized rendering strategies
- Supported multilingual (English/Arabic) workflows

### Condensed (one line)
"Tile Mountain · Creative Tech Solutions · Histone Solutions — 2018–2022"

---

## Animations

Shared variants in `lib/animations.ts`:

- **`fadeUpVariant`** — `hidden: { opacity: 0, y: 30 }` → `visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }`
- **`staggerContainerVariant`** — `staggerChildren: 0.08`
- Each section: `<motion.section>` with `viewport={{ once: true, margin: '-80px' }}`
- Nav: `backdrop-filter: blur(12px)` via `backdrop-blur-md`

---

## CSS Tokens

```css
--gradient-bg: linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
--accent-purple: #a78bfa;   /* skill pills, labels, borders */
--accent-blue:   #60a5fa;   /* secondary accent */
--accent-green:  #34d399;   /* tertiary accent */
--surface:       rgba(255,255,255,0.04);
--border:        rgba(255,255,255,0.08);
```

---

## Out of Scope

- Contact form / email sending (add later as Next.js API route)
- Blog / MDX project writeups
- CMS integration
- Dark/light mode toggle (dark only)
- i18n (English only)
