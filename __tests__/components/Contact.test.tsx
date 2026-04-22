import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('renders "Got a project in mind?" heading', () => {
    render(<Contact />)
    expect(screen.getByText(/Got a project in mind/i)).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    const emailLink = screen.getByText('arslkhan5@gmail.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:arslkhan5@gmail.com')
  })

  it('renders LinkedIn link', () => {
    render(<Contact />)
    const linkedInLink = screen.getByText('LinkedIn').closest('a')
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/arslkhan')
    expect(linkedInLink).toHaveAttribute('target', '_blank')
  })

  it('renders "open to senior & lead roles" copy', () => {
    render(<Contact />)
    expect(screen.getByText(/senior.*lead roles/i)).toBeInTheDocument()
  })

  it('has section with id "contact"', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contact')).toBeTruthy()
  })
})
