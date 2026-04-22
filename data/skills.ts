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
