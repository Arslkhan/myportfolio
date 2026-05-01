'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data/experience'
import { sectionProps, fadeUpVariant, staggerContainerVariant } from '@/lib/animations'

export default function Experience() {
  const expanded = experiences.filter((e) => e.bullets)
  const condensed = experiences.filter((e) => !e.bullets)

  return (
    <section id="experience" className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]">
      <motion.div {...sectionProps}>
        <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-2">
          Experience
        </p>
        <h2 className="text-2xl font-black mb-8">Where I&apos;ve Worked</h2>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {expanded.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black mb-0.5">{exp.company}</h3>
                {exp.role && <p className="text-xs text-accent-purple font-semibold mb-2">{exp.role}</p>}
                {exp.bullets && (
                  <ul className="space-y-1">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-xs text-white/45 leading-relaxed flex gap-2">
                        <span className="text-accent-purple/50 shrink-0 mt-0.5">·</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-[10px] text-white/30">{exp.period}</p>
                {exp.location && <p className="text-[10px] text-white/25">{exp.location}</p>}
              </div>
            </motion.div>
          ))}

          {condensed.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeUpVariant}
              className="flex justify-between items-center px-4 py-3 border border-dashed border-white/[0.06] rounded-xl"
            >
              <p className="text-xs text-white/30">{exp.company}</p>
              <p className="text-[10px] text-white/20">{exp.period}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
