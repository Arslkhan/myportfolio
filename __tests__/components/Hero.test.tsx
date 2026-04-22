import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the main headline text', () => {
    render(<Hero />)
    expect(screen.getByText(/I build fast/i)).toBeInTheDocument()
  })

  it('renders "beautiful" in the headline', () => {
    render(<Hero />)
    expect(screen.getByText('beautiful')).toBeInTheDocument()
  })

  it('renders "See My Work" CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/See My Work/i)).toBeInTheDocument()
  })

  it('renders "Get In Touch" CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument()
  })

  it('renders location line', () => {
    render(<Hero />)
    expect(screen.getByText(/Dammam/i)).toBeInTheDocument()
  })

  it('has section with id "hero"', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#hero')).toBeTruthy()
  })
})
