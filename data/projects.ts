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
    description: 'Built a mobile-first SaaS platform enabling tradespeople to generate and send professional PDF quotes in under 2 minutes. Architected the full frontend from scratch — real-time form state, PDF generation, and a clean multi-step UX that converts.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    liveUrl: 'https://tradequoter.co/',
    featured: true,
    type: 'personal',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(96,165,250,0.2), rgba(52,211,153,0.1))',
  },
  {
    title: 'GoldenScent',
    description: 'Led frontend architecture for a high-traffic perfume & beauty platform serving millions across the Middle East. Migrated to Next.js SSR — cut LCP from 4.5s to 2.5s and drove 15–30% conversion uplift through performance and UX improvements.',
    tags: ['Next.js', 'React', 'TypeScript', 'Contentful', 'GraphQL'],
    liveUrl: 'https://www.goldenscent.com/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.1))',
  },
  {
    title: 'Al Marwan Machinery',
    description: 'Built an enterprise web platform for heavy equipment rental and sales across UAE, Saudi Arabia, and Oman — 3,500+ units. Focused on scalable architecture, Core Web Vitals, and multilingual (English/Arabic) support.',
    tags: ['React', 'TypeScript', 'REST API', 'Clean Architecture'],
    liveUrl: 'https://almarwan.com/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.1))',
  },
  {
    title: 'Tile Mountain',
    description: "Developed the full e-commerce frontend for the UK's leading tile and flooring retailer. Built on Vue Storefront and Magento — delivered modular component architecture and performance optimizations across the entire storefront.",
    tags: ['Vue Storefront', 'Nuxt.js', 'Magento', 'REST API'],
    liveUrl: 'https://www.tilemountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(96,165,250,0.1))',
  },
  {
    title: 'Bathroom Mountain & Walls and Floors',
    description: 'Frontend development for two UK e-commerce platforms in the bathroom and tile space. Delivered reusable component systems, speed optimizations, and consistent UX across both storefronts.',
    tags: ['Vue.js', 'Nuxt.js', 'Magento'],
    liveUrl: 'https://www.bathroommountain.co.uk/',
    featured: false,
    type: 'professional',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(52,211,153,0.1))',
  },
]
