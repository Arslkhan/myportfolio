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
          <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-3">
            I&apos;m a Frontend Engineer specializing in scalable e-commerce and CMS-driven
            applications. I&apos;ve worked extensively with{' '}
            <strong className="text-white font-semibold">Next.js</strong>,{' '}
            <strong className="text-white font-semibold">Flutter</strong>,{' '}
            <strong className="text-white font-semibold">Vue Storefront</strong>, and{' '}
            <strong className="text-white font-semibold">Magento</strong> — focusing on performance,
            clean architecture, and maintainable systems.
          </p>
          <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-4">
            My work focuses on building flexible UI systems that allow teams to ship faster
            without frequent deployments.
          </p>
          <p className="text-xs text-white/35">
            Currently in Dammam
          </p>
        </div>
      </motion.div>
    </section>
  )
}
