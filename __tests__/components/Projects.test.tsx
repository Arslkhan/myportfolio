import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />)
    expect(screen.getByText("Things I've built")).toBeInTheDocument()
  })

  it('renders TradeQuoter as featured project', () => {
    render(<Projects />)
    expect(screen.getAllByText('TradeQuoter').length).toBeGreaterThan(0)
  })

  it('renders Personal Project badge', () => {
    render(<Projects />)
    expect(screen.getByText(/Personal Project/i)).toBeInTheDocument()
  })

  it('renders all 5 project titles', () => {
    render(<Projects />)
    expect(screen.getAllByText('TradeQuoter').length).toBeGreaterThan(0)
    expect(screen.getByText('GoldenScent')).toBeInTheDocument()
    expect(screen.getByText('Al Marwan Machinery')).toBeInTheDocument()
    expect(screen.getByText('Tile Mountain')).toBeInTheDocument()
    expect(screen.getByText('Bathroom Mountain & Walls and Floors')).toBeInTheDocument()
  })

  it('TradeQuoter Live link points to tradequoter.co', () => {
    render(<Projects />)
    const liveLinks = screen.getAllByText('Live ↗')
    const tradeQuoterLink = liveLinks[0].closest('a')
    expect(tradeQuoterLink).toHaveAttribute('href', 'https://tradequoter.co/')
  })

  it('has section with id "projects"', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('#projects')).toBeTruthy()
  })
})
