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
