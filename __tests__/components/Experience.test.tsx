import { render, screen } from '@testing-library/react'
import Experience from '@/components/Experience'

describe('Experience', () => {
  it("renders \"Where I've Worked\" heading", () => {
    render(<Experience />)
    expect(screen.getByText("Where I've Worked")).toBeInTheDocument()
  })

  it('renders GoldenScent company', () => {
    render(<Experience />)
    expect(screen.getByText('GoldenScent')).toBeInTheDocument()
  })

  it('renders Frontend Lead role', () => {
    render(<Experience />)
    expect(screen.getByText('Frontend Lead')).toBeInTheDocument()
  })

  it('renders Al Marwan company', () => {
    render(<Experience />)
    expect(screen.getByText('Al Marwan Heavy Machinery')).toBeInTheDocument()
  })

  it('renders condensed earlier roles line', () => {
    render(<Experience />)
    expect(screen.getByText(/Tile Mountain/i)).toBeInTheDocument()
    expect(screen.getByText(/2018/i)).toBeInTheDocument()
  })

  it('renders GoldenScent bullet points', () => {
    render(<Experience />)
    expect(screen.getByText(/LCP improved/i)).toBeInTheDocument()
  })

  it('has section with id "experience"', () => {
    const { container } = render(<Experience />)
    expect(container.querySelector('#experience')).toBeTruthy()
  })
})
