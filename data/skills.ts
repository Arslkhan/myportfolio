export interface SkillGroup {
  label: string
  color: 'purple' | 'blue' | 'green'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    color: 'purple',
    items: ['Next.js', 'Flutter', 'Vue.js / Nuxt', 'TypeScript', 'React'],
  },
  {
    label: 'Architecture & E-commerce',
    color: 'blue',
    items: ['Bloc / Clean Architecture', 'Vue Storefront', 'Magento', 'SSR/SSG/ISR', 'REST APIs'],
  },
  {
    label: 'CMS & Tools',
    color: 'green',
    items: ['Contentful', 'Tailwind CSS', 'GraphQL', 'CI/CD', 'Git'],
  },
]
