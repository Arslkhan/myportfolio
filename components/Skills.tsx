'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { sectionProps, staggerContainerVariant, fadeUpVariant } from '@/lib/animations'

const PILL_COLORS = {
  purple: 'text-accent-purple border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)]',
  blue: 'text-accent-blue border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.1)]',
  green: 'text-accent-green border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)]',
} as const

export default function Skills() {
  return (
    <section id="stack" className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]">
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-2">
          Stack
        </p>
        <h2 className="text-2xl font-black mb-1">The tools I reach for first</h2>
        <p className="text-xs text-white/35 mb-8">
          Not exhaustive — just what I trust to ship fast and right.
        </p>
        <div className="flex flex-col gap-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] text-white/35 uppercase tracking-[1px] mb-3">
                {group.label}
              </p>
              <motion.div
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={fadeUpVariant}
                    className={`px-4 py-2 border rounded-full text-sm font-medium ${PILL_COLORS[group.color]}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
