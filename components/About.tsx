'use client'

import { motion } from 'framer-motion'
import { sectionProps } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" aria-label="About" className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]">
      <motion.div {...sectionProps} className="flex gap-8 items-start flex-wrap md:flex-nowrap">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple via-accent-blue to-accent-green flex items-center justify-center text-2xl font-black shrink-0">
          AA
        </div>
        <div>
          <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-3">
            About
          </p>
          <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-4">
            I&apos;m a Frontend Lead at{' '}
            <strong className="text-white font-semibold">GoldenScent</strong>, where I architect
            and scale ecommerce experiences for millions of users across the Middle East. I care
            deeply about performance, accessibility, and shipping things that actually work in
            production.
          </p>
          <p className="text-xs text-white/35">
            Currently in Dammam · Open to remote &amp; relocation
          </p>
        </div>
      </motion.div>
    </section>
  )
}
