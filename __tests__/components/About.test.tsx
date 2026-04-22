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
