# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Arsalan Ahmad Khan's single-page Next.js 14 portfolio with Gradient Bold design, Framer Motion animations, and real content from CV and project data.

**Architecture:** Single-page Next.js 14 App Router site. All sections are React components rendered in `app/page.tsx`. Nav uses `'use client'` for scroll detection. All other components are client components for Framer Motion. Content lives in `/data` TypeScript files. Shared Framer Motion variants in `lib/animations.ts`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Jest, React Testing Library

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout, `<html>`, metadata, OG tags |
| `app/page.tsx` | Renders Nav + all 6 section components in order |
| `app/globals.css` | Tailwind base + CSS custom properties for theme tokens |
| `tailwind.config.ts` | Extend colors with accent palette |
| `lib/animations.ts` | `fadeUpVariant`, `staggerContainerVariant`, `sectionProps` helper |
| `data/projects.ts` | `Project` interface + 5 project entries |
| `data/experience.ts` | `Experience` interface + 3 entries (2 expanded, 1 condensed) |
| `data/skills.ts` | `SkillGroup` interface + 3 groups |
| `components/Nav.tsx` | Sticky glassmorphism nav, smooth-scroll, scroll-aware backdrop |
| `components/Hero.tsx` | Full-height hero, staggered entrance animation |
| `components/Projects.tsx` | Featured TradeQuoter card + 2-col professional grid |
| `components/About.tsx` | Avatar initials + personal bio copy |
| `components/Skills.tsx` | Pill grid grouped by category with stagger |
| `components/Experience.tsx` | 2 expanded role cards + 1 condensed "earlier roles" line |
| `components/Contact.tsx` | Centered CTA + email/LinkedIn/GitHub links |
| `__mocks__/framer-motion.tsx` | Jest mock — replaces motion elements with plain HTML |
| `__tests__/lib/animations.test.ts` | Verify variant shape |
| `__tests__/data/data.test.ts` | Verify data integrity (featured count, required fields, URLs) |
| `__tests__/components/Nav.test.tsx` | Nav renders logo + all links |
| `__tests__/components/Hero.test.tsx` | Hero renders headline + CTAs |
| `__tests__/components/Projects.test.tsx` | All 5 projects render; featured badge present |
| `__tests__/components/About.test.tsx` | About renders bio and location |
| `__tests__/components/Skills.test.tsx` | All 3 skill groups render |
| `__tests__/components/Experience.test.tsx` | 2 expanded + condensed line render |
| `__tests__/components/Contact.test.tsx` | Email link and social links render |

---

## Task 1: Scaffold Next.js Project + Install Dependencies + Configure Jest

**Files:**
- Create: all Next.js scaffold files (via create-next-app)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `__mocks__/framer-motion.tsx`

- [ ] **Step 1: Scaffold Next.js project**

From `/Users/arsalanahmadkhan/Documents/myportfolio`, run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-git
```
When asked "The directory contains files that could conflict" → choose **Continue**.
When asked about Turbopack → choose **No** (keep standard webpack for compatibility).

Expected output ends with: `Success! Created ... at /Users/arsalanahmadkhan/Documents/myportfolio`

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies.

- [ ] **Step 3: Install Jest and React Testing Library**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

- [ ] **Step 4: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
}

export default config
```

- [ ] **Step 5: Create jest.setup.ts**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Create style mock**

```ts
// __mocks__/styleMock.ts
export default {}
```

- [ ] **Step 7: Create Framer Motion mock**

```tsx
// __mocks__/framer-motion.tsx
import React from 'react'

type AnyProps = Record<string, unknown> & { children?: React.ReactNode }

const createMock = (tag: string) =>
  React.forwardRef<HTMLElement, AnyProps>(({ children, initial, animate, exit, variants, whileInView, viewport, transition, whileHover, whileTap, ...props }, ref) =>
    React.createElement(tag, { ...props, ref }, children)
  )

export const motion = {
  div: createMock('div'),
  section: createMock('section'),
  h1: createMock('h1'),
  h2: createMock('h2'),
  p: createMock('p'),
  span: createMock('span'),
  nav: createMock('nav'),
  a: createMock('a'),
  ul: createMock('ul'),
  li: createMock('li'),
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const useScroll = () => ({ scrollY: { on: () => () => {}, get: () => 0 } })
export const useTransform = () => 0
export const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} })
```

- [ ] **Step 8: Add test script to package.json**

Open `package.json` and add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 9: Verify Jest is configured**

```bash
npx jest --listTests
```
Expected: prints nothing (no tests yet) without error.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project, install deps, configure Jest"
```

---

## Task 2: Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts**

Replace entire file content:
```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-purple': '#a78bfa',
        'accent-blue': '#60a5fa',
        'accent-green': '#34d399',
      },
      backgroundImage: {
        'gradient-page': 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent-purple: #a78bfa;
  --accent-blue: #60a5fa;
  --accent-green: #34d399;
  --surface: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 255, 255, 0.08);
  --gradient-bg: linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--gradient-bg);
  background-attachment: fixed;
  color: #ffffff;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

::selection {
  background: rgba(167, 139, 250, 0.3);
}
```

- [ ] **Step 3: Delete default Next.js boilerplate from app/page.tsx**

Replace `app/page.tsx` with a minimal placeholder:
```tsx
// app/page.tsx
export default function Home() {
  return <main className="min-h-screen" />
}
```

- [ ] **Step 4: Start dev server and verify gradient background renders**

```bash
npm run dev
```
Open http://localhost:3000 — should show a dark purple/blue gradient background with no content errors in terminal.

Stop dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts app/page.tsx
git commit -m "feat: configure Tailwind theme tokens and gradient global styles"
```

---

## Task 3: Animation Variants

**Files:**
- Create: `lib/animations.ts`
- Create: `__tests__/lib/animations.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// __tests__/lib/animations.test.ts
import { fadeUpVariant, staggerContainerVariant, sectionProps } from '@/lib/animations'

describe('fadeUpVariant', () => {
  it('has hidden state with opacity 0 and y 30', () => {
    expect(fadeUpVariant.hidden).toEqual({ opacity: 0, y: 30 })
  })

  it('has visible state with opacity 1 and y 0', () => {
    const visible = fadeUpVariant.visible as Record<string, unknown>
    expect(visible.opacity).toBe(1)
    expect(visible.y).toBe(0)
  })
})

describe('staggerContainerVariant', () => {
  it('has visible transition with staggerChildren 0.08', () => {
    const visible = staggerContainerVariant.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.08)
  })
})

describe('sectionProps', () => {
  it('has initial hidden, whileInView visible, viewport once true', () => {
    expect(sectionProps.initial).toBe('hidden')
    expect(sectionProps.whileInView).toBe('visible')
    expect(sectionProps.viewport.once).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/lib/animations.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/animations'`

- [ ] **Step 3: Create lib/animations.ts**

```ts
// lib/animations.ts
import type { Variants } from 'framer-motion'

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const sectionProps = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
  variants: fadeUpVariant,
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/lib/animations.test.ts
```
Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/animations.ts __tests__/lib/animations.test.ts
git commit -m "feat: add shared Framer Motion animation variants"
```

---

## Task 4: Data Files

**Files:**
- Create: `data/projects.ts`
- Create: `data/experience.ts`
- Create: `data/skills.ts`
- Create: `__tests__/data/data.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// __tests__/data/data.test.ts
import { projects, type Project } from '@/data/projects'
import { experiences, type Experience } from '@/data/experience'
import { skillGroups, type SkillGroup } from '@/data/skills'

describe('projects data', () => {
  it('has exactly one featured project', () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1)
  })

  it('featured project is TradeQuoter with a live URL', () => {
    const featured = projects.find((p) => p.featured)!
    expect(featured.title).toBe('TradeQuoter')
    expect(featured.liveUrl).toBeTruthy()
    expect(featured.type).toBe('personal')
  })

  it('all projects have title, description, tags, gradient', () => {
    projects.forEach((p: Project) => {
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.tags.length).toBeGreaterThan(0)
      expect(p.gradient).toBeTruthy()
    })
  })

  it('has 5 projects total', () => {
    expect(projects).toHaveLength(5)
  })
})

describe('experience data', () => {
  it('has exactly 3 entries', () => {
    expect(experiences).toHaveLength(3)
  })

  it('first two entries have bullets arrays', () => {
    expect(experiences[0].bullets?.length).toBeGreaterThan(0)
    expect(experiences[1].bullets?.length).toBeGreaterThan(0)
  })

  it('third entry has no bullets (condensed)', () => {
    expect(experiences[2].bullets).toBeUndefined()
  })

  it('all expanded entries have company, role, location, period', () => {
    experiences.slice(0, 2).forEach((e: Experience) => {
      expect(e.company).toBeTruthy()
      expect(e.role).toBeTruthy()
      expect(e.location).toBeTruthy()
      expect(e.period).toBeTruthy()
    })
  })
})

describe('skills data', () => {
  it('has exactly 3 skill groups', () => {
    expect(skillGroups).toHaveLength(3)
  })

  it('colors are purple, blue, green', () => {
    expect(skillGroups.map((g: SkillGroup) => g.color)).toEqual(['purple', 'blue', 'green'])
  })

  it('each group has at least 3 items', () => {
    skillGroups.forEach((g: SkillGroup) => {
      expect(g.items.length).toBeGreaterThanOrEqual(3)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx jest __tests__/data/data.test.ts
```
Expected: FAIL — `Cannot find module '@/data/projects'`

- [ ] **Step 3: Create data/projects.ts**

```ts
// data/projects.ts
export interface Project {
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  type: 'personal' | 'professional'
  gradient: string
}

export const projects: Project[] = [
  {
    title: 'TradeQuoter',
    description:
      'A mobile-first SaaS platform that lets tradespeople send professional PDF quotes in under 2 minutes — helping them win jobs by responding faster than competitors.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    liveUrl: 'https://tradequoter.co/',
    featured: true,
    type: 'personal',
    gradient:
      'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(96,165,250,0.2), rgba(52,211,153,0.1))',
  },
  {
    title: 'GoldenScent',
    description:
      'High-traffic perfume & beauty ecommerce for the Middle East. Led SSR migration cutting LCP from 4.5s → 2.5s, achieving 15–30% conversion uplift.',
    tags: ['Next.js', 'React', 'TypeScript', 'Contentful', 'GraphQL'],
    liveUrl: 'https://www.goldenscent.com/',
    featured: false,
    type: 'professional',
    gradient:
      'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.1))',
  },
  {
    title: 'Al Marwan Machinery',
    description:
      'Enterprise platform for heavy equipment rental & sales across UAE, SA & Oman — 3,500+ units.',
    tags: ['React', 'TypeScript', 'REST API'],
    liveUrl: 'https://almarwan.com/',
    featured: false,
    type: 'professional',
    gradient:
      'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.1))',
  },
  {
    title: 'Tile Mountain',
    description:
      "UK's leading tile & flooring retailer. Built full ecommerce frontend with performance optimizations.",
    tags: ['Vue.js', 'Nuxt.js', 'Laravel'],
    liveUrl: 'https://www.tilemountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient:
      'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(96,165,250,0.1))',
  },
  {
    title: 'Bathroom Mountain & Walls and Floors',
    description:
      'UK bathroom & tile ecommerce platforms — frontend development and speed optimizations.',
    tags: ['Vue.js', 'Nuxt.js'],
    liveUrl: 'https://www.bathroommountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient:
      'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(52,211,153,0.1))',
  },
]
```

- [ ] **Step 4: Create data/experience.ts**

```ts
// data/experience.ts
export interface Experience {
  company: string
  role: string
  location: string
  period: string
  bullets?: string[]
}

export const experiences: Experience[] = [
  {
    company: 'GoldenScent',
    role: 'Frontend Lead',
    location: 'Dammam, Saudi Arabia',
    period: 'Sep 2025 – Present',
    bullets: [
      'Architect frontend for high-traffic ecommerce (millions of users)',
      'Manage & mentor a team of 8 frontend engineers',
      'Led Next.js SSR migration — LCP improved from ~4.5s → 2.5s (50% gain)',
      '~15–30% conversion uplift through UX & performance improvements',
    ],
  },
  {
    company: 'Al Marwan Heavy Machinery',
    role: 'Frontend Engineer',
    location: 'Dubai, UAE',
    period: 'Nov 2022 – Jun 2024',
    bullets: [
      'Developed enterprise web applications with focus on performance and usability',
      'Improved Core Web Vitals and optimized rendering strategies',
      'Supported multilingual (English/Arabic) workflows',
    ],
  },
  {
    company: 'Tile Mountain · Creative Tech Solutions · Histone Solutions',
    role: '',
    location: '',
    period: '2018 – 2022',
  },
]
```

- [ ] **Step 5: Create data/skills.ts**

```ts
// data/skills.ts
export interface SkillGroup {
  label: string
  color: 'purple' | 'blue' | 'green'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    color: 'purple',
    items: ['React', 'Next.js', 'TypeScript', 'Vue.js / Nuxt'],
  },
  {
    label: 'Architecture & Perf',
    color: 'blue',
    items: ['SSR/SSG/ISR', 'Core Web Vitals', 'TanStack Query', 'GraphQL'],
  },
  {
    label: 'Tools',
    color: 'green',
    items: ['Tailwind CSS', 'Framer Motion', 'Figma', 'CI/CD'],
  },
]
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx jest __tests__/data/data.test.ts
```
Expected: PASS — all 9 tests green.

- [ ] **Step 7: Commit**

```bash
git add data/ __tests__/data/
git commit -m "feat: add typed data files for projects, experience, skills"
```

---

## Task 5: Nav Component

**Files:**
- Create: `components/Nav.tsx`
- Create: `__tests__/components/Nav.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Nav.test.tsx
import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

describe('Nav', () => {
  it('renders AAK logo', () => {
    render(<Nav />)
    expect(screen.getByText('AAK')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Nav />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('nav links have correct href attributes', () => {
    render(<Nav />)
    expect(screen.getByText('Work').closest('a')).toHaveAttribute('href', '#work')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Nav.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Nav'`

- [ ] **Step 3: Create components/Nav.tsx**

```tsx
// components/Nav.tsx
'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[rgba(15,12,41,0.7)] border-b border-white/[0.08]'
          : ''
      }`}
    >
      <span className="font-black text-xl bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent tracking-tight">
        AAK
      </span>
      <div className="flex gap-6">
        {NAV_LINKS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => scrollTo(e, id)}
            className={`text-xs transition-colors ${
              label === 'Contact'
                ? 'text-accent-purple font-semibold'
                : 'text-white/55 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Nav.test.tsx
```
Expected: PASS — 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx __tests__/components/Nav.test.tsx
git commit -m "feat: add Nav component with glassmorphism and smooth-scroll"
```

---

## Task 6: Hero Component

**Files:**
- Create: `components/Hero.tsx`
- Create: `__tests__/components/Hero.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the main headline text', () => {
    render(<Hero />)
    expect(screen.getByText(/I build fast/i)).toBeInTheDocument()
  })

  it('renders "beautiful" in the headline', () => {
    render(<Hero />)
    expect(screen.getByText('beautiful')).toBeInTheDocument()
  })

  it('renders "See My Work" CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/See My Work/i)).toBeInTheDocument()
  })

  it('renders "Get In Touch" CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument()
  })

  it('renders location line', () => {
    render(<Hero />)
    expect(screen.getByText(/Dammam/i)).toBeInTheDocument()
  })

  it('has section with id "hero"', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#hero')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Hero.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Hero'`

- [ ] **Step 3: Create components/Hero.tsx**

```tsx
// components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(167,139,250,0.1),transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainerVariant}
        initial="hidden"
        animate="visible"
        className="max-w-2xl"
      >
        <motion.p
          variants={fadeUpVariant}
          className="text-[10px] tracking-[4px] text-accent-purple uppercase font-semibold mb-5"
        >
          Frontend Engineering
        </motion.p>

        <motion.h1
          variants={fadeUpVariant}
          className="text-5xl md:text-6xl font-black leading-[1.05] tracking-[-2px] mb-5"
        >
          I build fast,{' '}
          <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-green bg-clip-text text-transparent">
            beautiful
          </span>{' '}
          web experiences.
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="text-sm text-white/50 max-w-md leading-relaxed mb-8"
        >
          Hi, I&apos;m <strong className="text-white font-semibold">Arsalan</strong> — a Frontend
          Lead based in Dammam. I&apos;ve spent 8 years obsessing over performance, UX, and the
          tiny details that make users stay.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex gap-3 flex-wrap items-center">
          <button
            onClick={() => scrollTo('projects')}
            className="px-7 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            See My Work ↓
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-7 py-3 border border-white/15 text-white/70 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.p variants={fadeUpVariant} className="mt-5 text-xs text-white/30">
          📍 Dammam, Saudi Arabia · Open to remote &amp; relocation
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Hero.test.tsx
```
Expected: PASS — 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx __tests__/components/Hero.test.tsx
git commit -m "feat: add Hero component with staggered entrance animation"
```

---

## Task 7: Projects Component

**Files:**
- Create: `components/Projects.tsx`
- Create: `__tests__/components/Projects.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Projects.test.tsx
import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />)
    expect(screen.getByText("Things I've built")).toBeInTheDocument()
  })

  it('renders TradeQuoter as featured project', () => {
    render(<Projects />)
    expect(screen.getAllByText('TradeQuoter').length).toBeGreaterThan(0)
  })

  it('renders Personal Project badge', () => {
    render(<Projects />)
    expect(screen.getByText(/Personal Project/i)).toBeInTheDocument()
  })

  it('renders all 5 project titles', () => {
    render(<Projects />)
    expect(screen.getAllByText('TradeQuoter').length).toBeGreaterThan(0)
    expect(screen.getByText('GoldenScent')).toBeInTheDocument()
    expect(screen.getByText('Al Marwan Machinery')).toBeInTheDocument()
    expect(screen.getByText('Tile Mountain')).toBeInTheDocument()
    expect(screen.getByText('Bathroom Mountain & Walls and Floors')).toBeInTheDocument()
  })

  it('TradeQuoter Live link points to tradequoter.co', () => {
    render(<Projects />)
    const liveLinks = screen.getAllByText('Live ↗')
    const tradeQuoterLink = liveLinks[0].closest('a')
    expect(tradeQuoterLink).toHaveAttribute('href', 'https://tradequoter.co/')
  })

  it('has section with id "projects"', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('#projects')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Projects.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Projects'`

- [ ] **Step 3: Create components/Projects.tsx**

```tsx
// components/Projects.tsx
'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { fadeUpVariant, staggerContainerVariant, sectionProps } from '@/lib/animations'

const TAG_COLORS = {
  0: 'text-accent-purple border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)]',
  1: 'text-accent-blue border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.1)]',
  2: 'text-accent-green border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)]',
} as const

const tagColor = (i: number) => TAG_COLORS[(i % 3) as keyof typeof TAG_COLORS]

export default function Projects() {
  const featured = projects.find((p) => p.featured)!
  const professional = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]"
    >
      <motion.div {...sectionProps}>
        {/* Header */}
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-1">
              Featured Work
            </p>
            <h2 className="text-2xl font-black">Things I&apos;ve built</h2>
          </div>
          <span className="text-xs text-white/30">GitHub →</span>
        </div>

        {/* Featured hero card */}
        <div className="bg-[var(--surface)] border border-[rgba(167,139,250,0.2)] rounded-2xl overflow-hidden mb-4">
          <div
            className="h-32 md:h-40 flex items-center justify-center relative"
            style={{ background: featured.gradient }}
          >
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full text-[9px] font-bold tracking-widest text-white uppercase">
              Personal Project
            </span>
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                {featured.title}
              </p>
              {featured.liveUrl && (
                <p className="text-xs text-white/40 mt-1">
                  {new URL(featured.liveUrl).hostname}
                </p>
              )}
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black mb-2">{featured.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{featured.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 border border-[rgba(167,139,250,0.4)] text-accent-purple rounded-full text-[10px] font-semibold hover:bg-[rgba(167,139,250,0.1)] transition-colors"
                  >
                    Live ↗
                  </a>
                )}
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 border border-white/10 text-white/45 rounded-full text-[10px] hover:border-white/20 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="mt-3.5 flex gap-1.5 flex-wrap">
              {featured.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2.5 py-1 border rounded-xl ${tagColor(i)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Professional grid */}
        <p className="text-[10px] tracking-[2px] text-white/30 uppercase mb-3">
          Professional Work
        </p>
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {professional.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUpVariant}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
            >
              <div
                className="h-12 rounded-lg mb-3 flex items-center justify-center"
                style={{ background: project.gradient }}
              >
                <span className="text-xs font-bold text-white/50">{project.title}</span>
              </div>
              <h3 className="text-sm font-bold mb-1">{project.title}</h3>
              <p className="text-[10px] text-white/40 leading-relaxed mb-2.5">
                {project.description}
              </p>
              <div className="flex gap-1.5 flex-wrap mb-2.5">
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-[9px] px-2 py-0.5 border rounded-xl ${tagColor(i)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] border border-[rgba(167,139,250,0.3)] text-accent-purple px-2.5 py-1 rounded-xl hover:bg-[rgba(167,139,250,0.1)] transition-colors inline-block"
                >
                  Live ↗
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Projects.test.tsx
```
Expected: PASS — 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Projects.tsx __tests__/components/Projects.test.tsx
git commit -m "feat: add Projects component with featured card and professional grid"
```

---

## Task 8: About Component

**Files:**
- Create: `components/About.tsx`
- Create: `__tests__/components/About.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/About.test.tsx
import { render, screen } from '@testing-library/react'
import About from '@/components/About'

describe('About', () => {
  it('renders "About" section label', () => {
    render(<About />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders GoldenScent in bio', () => {
    render(<About />)
    expect(screen.getByText('GoldenScent')).toBeInTheDocument()
  })

  it('renders location text', () => {
    render(<About />)
    expect(screen.getByText(/Open to remote/i)).toBeInTheDocument()
  })

  it('renders avatar initials', () => {
    render(<About />)
    expect(screen.getByText('AA')).toBeInTheDocument()
  })

  it('has section with id "about"', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#about')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/About.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/About'`

- [ ] **Step 3: Create components/About.tsx**

```tsx
// components/About.tsx
'use client'

import { motion } from 'framer-motion'
import { sectionProps } from '@/lib/animations'

export default function About() {
  return (
    <section
      id="about"
      className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]"
    >
      <motion.div {...sectionProps} className="flex gap-8 items-start flex-wrap md:flex-nowrap">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple via-accent-blue to-accent-green flex items-center justify-center text-2xl font-black shrink-0">
          AA
        </div>

        {/* Bio */}
        <div>
          <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-3">
            About
          </p>
          <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-4">
            I&apos;m a Frontend Lead at{' '}
            <strong className="text-white font-semibold">GoldenScent</strong>, where I architect
            and scale ecommerce experiences for millions of users across the Middle East. I care
            deeply about performance, accessibility, and shipping things that actually work in
            production.
          </p>
          <p className="text-xs text-white/35">
            Currently in Dammam · Open to remote &amp; relocation
          </p>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/About.test.tsx
```
Expected: PASS — 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx __tests__/components/About.test.tsx
git commit -m "feat: add About component with avatar and personal bio"
```

---

## Task 9: Skills Component

**Files:**
- Create: `components/Skills.tsx`
- Create: `__tests__/components/Skills.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Skills.test.tsx
import { render, screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skillGroups } from '@/data/skills'

describe('Skills', () => {
  it('renders Stack section heading', () => {
    render(<Skills />)
    expect(screen.getByText('Stack')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<Skills />)
    expect(screen.getByText(/The tools I reach for first/i)).toBeInTheDocument()
  })

  it('renders all 3 group labels', () => {
    render(<Skills />)
    skillGroups.forEach((group) => {
      expect(screen.getByText(group.label)).toBeInTheDocument()
    })
  })

  it('renders React skill pill', () => {
    render(<Skills />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders all skill items', () => {
    render(<Skills />)
    skillGroups.flatMap((g) => g.items).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('has section with id "stack"', () => {
    const { container } = render(<Skills />)
    expect(container.querySelector('#stack')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Skills.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Skills'`

- [ ] **Step 3: Create components/Skills.tsx**

```tsx
// components/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { sectionProps, staggerContainerVariant, fadeUpVariant } from '@/lib/animations'

const PILL_COLORS = {
  purple: 'text-accent-purple border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)]',
  blue:   'text-accent-blue border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.1)]',
  green:  'text-accent-green border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)]',
} as const

export default function Skills() {
  return (
    <section
      id="stack"
      className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]"
    >
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-2">
          Stack
        </p>
        <h2 className="text-2xl font-black mb-1">The tools I reach for first</h2>
        <p className="text-xs text-white/35 mb-8">
          Not exhaustive — just what I trust to ship fast and right.
        </p>

        <div className="flex flex-col gap-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] text-white/35 uppercase tracking-[1px] mb-3">
                {group.label}
              </p>
              <motion.div
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={fadeUpVariant}
                    className={`px-4 py-2 border rounded-full text-sm font-medium ${PILL_COLORS[group.color]}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Skills.test.tsx
```
Expected: PASS — 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Skills.tsx __tests__/components/Skills.test.tsx
git commit -m "feat: add Skills component with grouped pill grid and stagger animation"
```

---

## Task 10: Experience Component

**Files:**
- Create: `components/Experience.tsx`
- Create: `__tests__/components/Experience.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Experience.test.tsx
import { render, screen } from '@testing-library/react'
import Experience from '@/components/Experience'

describe('Experience', () => {
  it('renders "Where I\'ve Worked" heading', () => {
    render(<Experience />)
    expect(screen.getByText("Where I've Worked")).toBeInTheDocument()
  })

  it('renders GoldenScent company', () => {
    render(<Experience />)
    expect(screen.getByText('GoldenScent')).toBeInTheDocument()
  })

  it('renders Frontend Lead role', () => {
    render(<Experience />)
    expect(screen.getByText('Frontend Lead')).toBeInTheDocument()
  })

  it('renders Al Marwan company', () => {
    render(<Experience />)
    expect(screen.getByText('Al Marwan Heavy Machinery')).toBeInTheDocument()
  })

  it('renders condensed earlier roles line', () => {
    render(<Experience />)
    expect(screen.getByText(/Tile Mountain/i)).toBeInTheDocument()
    expect(screen.getByText(/2018/i)).toBeInTheDocument()
  })

  it('renders GoldenScent bullet points', () => {
    render(<Experience />)
    expect(screen.getByText(/LCP improved/i)).toBeInTheDocument()
  })

  it('has section with id "experience"', () => {
    const { container } = render(<Experience />)
    expect(container.querySelector('#experience')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Experience.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Experience'`

- [ ] **Step 3: Create components/Experience.tsx**

```tsx
// components/Experience.tsx
'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data/experience'
import { sectionProps, fadeUpVariant, staggerContainerVariant } from '@/lib/animations'

export default function Experience() {
  const expanded = experiences.filter((e) => e.bullets)
  const condensed = experiences.filter((e) => !e.bullets)

  return (
    <section
      id="experience"
      className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]"
    >
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-2">
          Experience
        </p>
        <h2 className="text-2xl font-black mb-8">Where I&apos;ve Worked</h2>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {/* Expanded cards */}
          {expanded.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeUpVariant}
              className="flex justify-between items-start gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black mb-0.5">{exp.company}</h3>
                <p className="text-xs text-accent-purple font-semibold mb-2">{exp.role}</p>
                {exp.bullets && (
                  <ul className="space-y-1">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-[11px] text-white/45 leading-relaxed flex gap-2">
                        <span className="text-accent-purple/50 shrink-0 mt-0.5">·</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-white/30">{exp.period}</p>
                <p className="text-[10px] text-white/25">{exp.location}</p>
              </div>
            </motion.div>
          ))}

          {/* Condensed earlier roles */}
          {condensed.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeUpVariant}
              className="flex justify-between items-center px-4 py-3 border border-dashed border-white/[0.06] rounded-xl"
            >
              <p className="text-xs text-white/30">{exp.company}</p>
              <p className="text-[10px] text-white/20">{exp.period}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Experience.test.tsx
```
Expected: PASS — 7 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Experience.tsx __tests__/components/Experience.test.tsx
git commit -m "feat: add Experience component with expanded cards and condensed earlier roles"
```

---

## Task 11: Contact Component

**Files:**
- Create: `components/Contact.tsx`
- Create: `__tests__/components/Contact.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// __tests__/components/Contact.test.tsx
import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('renders "Got a project in mind?" heading', () => {
    render(<Contact />)
    expect(screen.getByText(/Got a project in mind/i)).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    const emailLink = screen.getByText('arslkhan5@gmail.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:arslkhan5@gmail.com')
  })

  it('renders LinkedIn link', () => {
    render(<Contact />)
    const linkedInLink = screen.getByText('LinkedIn').closest('a')
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/arslkhan')
    expect(linkedInLink).toHaveAttribute('target', '_blank')
  })

  it('renders "open to senior & lead roles" copy', () => {
    render(<Contact />)
    expect(screen.getByText(/senior.*lead roles/i)).toBeInTheDocument()
  })

  it('has section with id "contact"', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contact')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest __tests__/components/Contact.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/Contact'`

- [ ] **Step 3: Create components/Contact.tsx**

```tsx
// components/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { sectionProps } from '@/lib/animations'

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-8 md:px-16 lg:px-24 py-24 border-t border-white/[0.06] bg-[rgba(0,0,0,0.15)] text-center"
    >
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-4">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
          Got a project in mind?
        </h2>
        <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
          I&apos;m open to senior &amp; lead roles, freelance collaborations, and interesting
          conversations.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="mailto:arslkhan5@gmail.com"
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            arslkhan5@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/arslkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/15 text-white/65 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/15 text-white/65 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest __tests__/components/Contact.test.tsx
```
Expected: PASS — 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx __tests__/components/Contact.test.tsx
git commit -m "feat: add Contact component with email and social links"
```

---

## Task 12: Wire Up app/layout.tsx and app/page.tsx

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
  description:
    'Senior Frontend Engineer & Frontend Lead with 8+ years building high-traffic ecommerce platforms. Based in Dammam, open to relocation.',
  openGraph: {
    title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer & Frontend Lead. React, Next.js, TypeScript specialist.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Update app/page.tsx**

```tsx
// app/page.tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Run the full test suite**

```bash
npx jest
```
Expected: ALL tests pass. Note the final count — should be 40+ tests across all files.

- [ ] **Step 4: Start dev server and visually verify**

```bash
npm run dev
```
Open http://localhost:3000 and verify:
- Gradient background fills the page
- Hero section text is visible
- Scrolling down shows Projects, About, Skills, Experience, Contact
- Nav appears sticky on scroll
- No console errors

Stop dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: wire up layout and page — portfolio fully assembled"
```

---

## Task 13: Responsive Polish + Build Verification

**Files:**
- No new files — verify and fix layout issues found during testing

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check mobile layout (375px viewport)**

In Chrome DevTools (F12), set viewport to iPhone SE (375 × 667). Verify:
- Hero text doesn't overflow; heading wraps cleanly
- Project cards stack to 1 column
- Nav links are readable (not clipped)
- About section avatar + bio stack vertically on mobile
- Skills pills wrap correctly
- Contact buttons wrap and don't overflow

Fix any layout issues by adjusting Tailwind classes. Most fixes will be adding responsive prefixes (`md:`, `lg:`) or adjusting padding.

- [ ] **Step 3: Check tablet layout (768px viewport)**

Set viewport to iPad (768 × 1024). Verify project grid shows 2 columns, About shows side-by-side.

- [ ] **Step 4: Verify smooth scroll works**

Click "See My Work" in Hero → Projects section should smoothly scroll into view.
Click nav links → each section scrolls correctly.
Click "Get In Touch" → Contact section scrolls into view.

- [ ] **Step 5: Run production build**

Stop dev server, then:
```bash
npm run build
```
Expected: Build completes with no errors. Output shows all routes as static (`○`).

If build fails with TypeScript errors, fix them before continuing.

- [ ] **Step 6: Run final test suite**

```bash
npx jest
```
Expected: All tests pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: responsive polish and verified production build"
```

---

## Task 14: Deploy to Vercel

- [ ] **Step 1: Push to GitHub (if not already)**

If no remote exists:
```bash
git remote add origin https://github.com/<your-username>/myportfolio.git
git push -u origin main
```

- [ ] **Step 2: Deploy on Vercel**

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import the `myportfolio` GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. Leave all build settings as default
6. Click **Deploy**

Expected: Deployment completes in ~2 minutes. Vercel provides a live URL.

- [ ] **Step 3: Verify live site**

Open the Vercel URL and verify:
- Gradient background renders
- All sections are visible
- Project links open correctly in new tabs
- Email link opens mail client
- LinkedIn link opens correctly

- [ ] **Step 4: Add GitHub URL to Contact section (optional)**

Once Arsalan provides their GitHub username, update `components/Contact.tsx` line:
```tsx
href="https://github.com/<arsalan-github-username>"
```
Then commit and push — Vercel auto-deploys.

---

## Self-Review Checklist

- [x] **Sticky Nav** with glassmorphism — Task 5
- [x] **Hero** personality headline, 2 CTAs — Task 6
- [x] **Projects** featured card (TradeQuoter) + professional grid (4 projects) — Task 7
- [x] **About** avatar + bio copy — Task 8
- [x] **Skills** curated pill grid — Task 9
- [x] **Experience** 2 expanded + condensed earlier roles — Task 10
- [x] **Contact** email/LinkedIn/GitHub — Task 11
- [x] **Framer Motion** scroll-triggered fade-up on all sections — `sectionProps` used in Tasks 6–11
- [x] **Stagger animations** on skill pills and project cards — Tasks 7, 9
- [x] **CSS token variables** — Task 2
- [x] **Gradient Bold theme** — throughout all components
- [x] **All real content** from CV — data files in Task 4
- [x] **TypeScript throughout** — interfaces defined in data files
- [x] **Tests for every component and data file** — Tasks 3–11
- [x] **Production build** verification — Task 13
- [x] **Deploy to Vercel** — Task 14
