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
