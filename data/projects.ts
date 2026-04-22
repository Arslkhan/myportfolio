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
    description: 'A mobile-first SaaS platform that lets tradespeople send professional PDF quotes in under 2 minutes — helping them win jobs by responding faster than competitors.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    liveUrl: 'https://tradequoter.co/',
    featured: true,
    type: 'personal',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(96,165,250,0.2), rgba(52,211,153,0.1))',
  },
  {
    title: 'GoldenScent',
    description: 'High-traffic perfume & beauty ecommerce for the Middle East. Led SSR migration cutting LCP from 4.5s → 2.5s, achieving 15–30% conversion uplift.',
    tags: ['Next.js', 'React', 'TypeScript', 'Contentful', 'GraphQL'],
    liveUrl: 'https://www.goldenscent.com/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.1))',
  },
  {
    title: 'Al Marwan Machinery',
    description: 'Enterprise platform for heavy equipment rental & sales across UAE, SA & Oman — 3,500+ units.',
    tags: ['React', 'TypeScript', 'REST API'],
    liveUrl: 'https://almarwan.com/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.1))',
  },
  {
    title: 'Tile Mountain',
    description: "UK's leading tile & flooring retailer. Built full ecommerce frontend with performance optimizations.",
    tags: ['Vue.js', 'Nuxt.js', 'Laravel'],
    liveUrl: 'https://www.tilemountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(96,165,250,0.1))',
  },
  {
    title: 'Bathroom Mountain & Walls and Floors',
    description: 'UK bathroom & tile ecommerce platforms — frontend development and speed optimizations.',
    tags: ['Vue.js', 'Nuxt.js'],
    liveUrl: 'https://www.bathroommountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(52,211,153,0.1))',
  },
]
