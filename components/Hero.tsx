'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations'
import { scrollToSection } from '@/lib/scroll'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16 relative overflow-hidden"
    >
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(167,139,250,0.1),transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainerVariant}
        initial="hidden"
        animate="visible"
        className="max-w-2xl"
      >
        <motion.p
          variants={fadeUpVariant}
          className="text-[10px] tracking-[4px] text-accent-purple uppercase font-semibold mb-5"
        >
          Frontend Engineering
        </motion.p>

        <motion.h1
          variants={fadeUpVariant}
          className="text-5xl md:text-6xl font-black leading-[1.05] tracking-[-2px] mb-5"
        >
          I build fast,{' '}
          <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-green bg-clip-text text-transparent">
            beautiful
          </span>{' '}
          web experiences.
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="text-sm text-white/50 max-w-md leading-relaxed mb-8"
        >
          Hi, I&apos;m <strong className="text-white font-semibold">Arsalan</strong> — a Frontend
          Lead with 8 years obsessing over performance, UX, and the tiny details that make users
          stay.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex gap-3 flex-wrap items-center">
          <button
            onClick={() => scrollToSection('projects')}
            aria-label="See my work"
            className="px-7 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            See My Work ↓
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-7 py-3 border border-white/15 text-white/70 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            Get In Touch
          </button>
          <a
            href="/cv.pdf"
            download
            className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
          >
            Download CV
          </a>
        </motion.div>

        <motion.p variants={fadeUpVariant} className="mt-5 text-xs text-white/30">
          <span aria-hidden="true">📍</span>{' '}
          Dammam, Saudi Arabia
        </motion.p>
      </motion.div>
    </section>
  )
}
