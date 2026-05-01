'use client'

import { useEffect, useState } from 'react'
import { scrollToSection } from '@/lib/scroll'

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen
        ? 'backdrop-blur-md bg-[rgba(15,12,41,0.85)] border-b border-white/[0.08]'
        : ''
    }`}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4">
        <span className="font-black text-xl bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent tracking-tight">
          AAK
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-4 md:gap-6">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className={`text-xs transition-colors ${
                activeId === id
                  ? 'text-accent-purple font-semibold'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-0.5 bg-white/70 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/70 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/70 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-8 pt-2 pb-8 gap-6 border-t border-white/[0.08]">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { scrollTo(e, id); setMenuOpen(false) }}
              className={`text-base font-medium transition-colors ${
                activeId === id
                  ? 'text-accent-purple'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
