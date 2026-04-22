'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[rgba(15,12,41,0.7)] border-b border-white/[0.08]'
          : ''
      }`}
    >
      <span className="font-black text-xl bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent tracking-tight">
        AAK
      </span>
      <div className="flex gap-6">
        {NAV_LINKS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => scrollTo(e, id)}
            className={`text-xs transition-colors ${
              label === 'Contact'
                ? 'text-accent-purple font-semibold'
                : 'text-white/55 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
