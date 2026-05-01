'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '@/data/skills'
import { sectionProps, staggerContainerVariant, fadeUpVariant } from '@/lib/animations'
import { ACCENT_PILL_STYLES } from '@/lib/tokens'

export default function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]">
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-2">
          Stack
        </p>
        <h2 id="stack-heading" className="text-2xl font-black mb-1">The tools I reach for first</h2>
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
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={fadeUpVariant}
                    className={`px-4 py-2 border rounded-full text-sm font-medium ${ACCENT_PILL_STYLES[group.color]}`}
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
