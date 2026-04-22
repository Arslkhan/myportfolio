import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

describe('Nav', () => {
  it('renders AAK logo', () => {
    render(<Nav />)
    expect(screen.getByText('AAK')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Nav />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('nav links have correct href attributes', () => {
    render(<Nav />)
    expect(screen.getByText('Work').closest('a')).toHaveAttribute('href', '#work')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})
