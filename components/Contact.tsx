'use client'

import { motion } from 'framer-motion'
import { sectionProps } from '@/lib/animations'

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-8 md:px-16 lg:px-24 py-24 border-t border-white/[0.06] bg-[rgba(0,0,0,0.15)] text-center"
    >
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-4">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
          Got a project in mind?
        </h2>
        <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
          I&apos;m open to senior &amp; lead roles, freelance collaborations, and interesting
          conversations.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="mailto:arslkhan5@gmail.com"
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            arslkhan5@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/arslkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/15 text-white/65 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/15 text-white/65 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            GitHub
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 border border-white/15 text-white/65 rounded-full text-sm hover:border-white/30 hover:text-white/90 transition-all"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  )
}
