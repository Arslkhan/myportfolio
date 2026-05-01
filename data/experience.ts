export interface Experience {
  company: string
  role?: string
  location?: string
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
      'Architect and scale CMS-driven ecommerce frontend for millions of users across the Middle East',
      'Led Next.js SSR migration — LCP improved from ~4.5s → 2.5s, driving 15–30% conversion uplift',
      'Built Contentful-powered UI systems enabling content updates without deployments',
      'Manage and mentor a team of 8 frontend engineers across web and mobile',
    ],
  },
  {
    company: 'Al Marwan Heavy Machinery',
    role: 'Frontend Engineer',
    location: 'Dubai, UAE',
    period: 'Nov 2022 – Jun 2024',
    bullets: [
      'Developed enterprise platform for 3,500+ equipment units across UAE, Saudi Arabia, and Oman',
      'Implemented clean architecture separating data, domain, and presentation layers',
      'Optimized Core Web Vitals and rendering strategies for performance at scale',
      'Delivered full multilingual (English/Arabic) support across the platform',
    ],
  },
  {
    company: 'Tile Mountain · Creative Tech Solutions · Histone Solutions',
    period: '2018 – 2022',
  },
]
