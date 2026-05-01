import { render, screen } from '@testing-library/react'
import About from '@/components/About'

describe('About', () => {
  it('renders "About" section label', () => {
    render(<About />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders Next.js in bio', () => {
    render(<About />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders location text', () => {
    render(<About />)
    expect(screen.getByText(/Currently in Dammam/i)).toBeInTheDocument()
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
