# Portfolio Website Design Spec

**Date:** 2026-04-21  
**Owner:** Arsalan Ahmad Khan  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

---

## Overview

A single-page personal portfolio website for Arsalan Ahmad Khan, Senior Frontend Engineer / Frontend Lead with 8+ years of experience. Goals: attract recruiters for senior/lead roles and showcase open source/side projects. Deployed on Vercel.

---

## Visual Design

- **Style:** Gradient Bold — dark purple/blue gradient background (`#0f0c29 → #302b63 → #24243e`), white text, vibrant purple/blue/green gradient accents (`#a78bfa`, `#60a5fa`, `#34d399`)
- **Typography:** System font stack; headings bold/black weight with tight letter-spacing; section labels in small uppercase with wide letter-spacing
- **Skill pills:** Three accent colors (purple, blue, green) grouped by category
- **Animations:** Framer Motion scroll-triggered fade-up on every section; staggered children on skill pills and project cards; glassmorphism sticky nav

---

## Page Structure (single-page, top→bottom)

1. **Sticky Nav** — glassmorphism blur backdrop, "AAK" gradient logo, smooth-scroll links: About · Skills · Projects · Experience · Contact
2. **Hero** — role badge, name (gradient on last name), 8+ years tagline, three CTAs: View Projects / Download CV / Email
3. **About** — avatar placeholder, professional summary bio, education + certifications callout
4. **Skills** — three grouped rows: Frontend, Architecture & Performance, Tools & Testing
5. **Projects** — 3-column card grid; each card: image/preview, title, description, tech stack tags, Live link + GitHub link
6. **Experience** — vertical timeline with gradient line; most-recent role fully expanded; older roles condensed
7. **Contact** — centered, "Let's build something great together", open to senior & lead roles, Email + LinkedIn + GitHub buttons

---

## Architecture

```
/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Renders all section components in order
│   └── globals.css         # Tailwind base + custom CSS vars for gradient theme
├── components/
│   ├── Nav.tsx             # Sticky glassmorphism nav
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   └── Contact.tsx
├── data/
│   ├── projects.ts         # Project cards data (title, desc, tags, links)
│   ├── experience.ts       # Work history (company, role, dates, bullets)
│   └── skills.ts           # Skill pills grouped by category
└── lib/
    └── animations.ts       # Shared Framer Motion variants
```

All content lives in `/data` TypeScript files — no CMS. Components are presentational; they import from `/data` and render.

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
  gradient: string  // tailwind gradient class for card preview
}

// data/experience.ts
export interface Experience {
  company: string
  role: string
  location: string
  period: string
  bullets?: string[]  // omit for condensed older roles
}

// data/skills.ts
export interface SkillGroup {
  label: string
  color: 'purple' | 'blue' | 'green'
  items: string[]
}
```

---

## Content (from CV)

### Personal
- **Name:** Arsalan Ahmad Khan
- **Title:** Senior Frontend Engineer / Frontend Lead
- **Location:** Dammam, Saudi Arabia (Open to Relocation)
- **Email:** arslkhan5@gmail.com
- **LinkedIn:** linkedin.com/in/arslkhan
- **GitHub:** placeholder — Arsalan to provide GitHub username before launch
- **CV PDF:** place resume PDF at `public/cv.pdf`; "Download CV" button links to `/cv.pdf`
- **Avatar:** gradient initials placeholder ("AA") until Arsalan adds a real photo to `public/avatar.jpg`
- **Summary:** 8+ years building and scaling high-traffic ecommerce platforms. Expert in React, Next.js, TypeScript, performance engineering, SSR/SSG/ISR, and leading frontend teams in multilingual environments.

### Skills
- **Frontend:** React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Vue.js, Nuxt.js, Tailwind CSS, Responsive Design
- **Architecture & Performance:** SSR/SSG/ISR, Core Web Vitals, Micro-frontend, Monorepo, TanStack Query, GraphQL, Zod
- **Tools & Testing:** Jest, React Testing Library, Cypress, Playwright, Vercel, Figma, CI/CD, GTM, GA4, Sentry

### Experience
1. **GoldenScent — Frontend Lead** | Dammam, SA | Sep 2025–Present *(expanded)*
   - Lead frontend architecture for high-traffic ecommerce (millions of users)
   - Manage and mentor a team of 8 frontend engineers
   - Led Next.js SSR migration — LCP improved from ~4.5s → below 2.5s (50% gain)
   - ~15–30% conversion uplift through UX and performance improvements
   - Integrated Contentful CMS for dynamic landing pages
   - Delivered Arabic/English storefronts with hreflang implementation
2. **GoldenScent — Senior Frontend Engineer** | Dubai, UAE | Jul 2024–Sep 2025 *(expanded)*
   - Built performance-critical ecommerce features with React, Next.js, TypeScript
   - Integrated REST and GraphQL APIs
   - Collaborated with backend on PHP, Laravel, Magento
3. **Al Marwan Heavy Machinery — Frontend Engineer** | Dubai, UAE | Nov 2022–Jun 2024 *(condensed)*
4. **Tile Mountain — Senior Frontend Developer** | Islamabad, PK | Jul 2020–Sep 2022 *(condensed)*
5. **Tile Mountain — Laravel / Vue.js Developer** | Islamabad, PK | Jul 2019–Jul 2020 *(condensed)*
6. **Creative Tech Solutions — PHP Developer** | Pakistan | Apr 2018–Jul 2019 *(condensed)*
7. **Histone Solutions — Junior Software Developer** | Pakistan | Jan 2018–Apr 2018 *(condensed)*

### Education
- BSc Computer Science — Bahria University, Islamabad (2013–2017)

### Certifications
- Google SEO Fundamentals — University of California, Davis
- Scrum Master Certification — LearnQuest
- The Basics of Scrum — Project Management Institute
- AWS Cloud Practitioner Essentials — AWS Training & Certification

### Projects
- Placeholder for 2–3 real projects (to be filled in by Arsalan before launch)
- Each card: title, description, tech tags, optional Live URL + GitHub URL

---

## Animations

All animations use Framer Motion. Shared variants in `lib/animations.ts`:

- **`fadeUpVariant`** — `hidden: { opacity: 0, y: 30 }` → `visible: { opacity: 1, y: 0 }` with `duration: 0.6`
- **`staggerContainerVariant`** — `staggerChildren: 0.08` for skill pills and project cards
- Each section wrapped in `<motion.section>` with `viewport={{ once: true, margin: '-80px' }}`
- Nav: `backdrop-filter: blur(12px)` via Tailwind `backdrop-blur-md`

---

## Styling Tokens (Tailwind + CSS vars)

```css
--gradient-bg: linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
--accent-purple: #a78bfa;
--accent-blue: #60a5fa;
--accent-green: #34d399;
--surface: rgba(255,255,255,0.04);
--border: rgba(255,255,255,0.08);
```

---

## Out of Scope

- Contact form / email sending (can be added later as a Next.js API route)
- Blog / MDX project writeups
- CMS integration
- Dark/light mode toggle (dark only)
- i18n (English only)
