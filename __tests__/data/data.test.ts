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
