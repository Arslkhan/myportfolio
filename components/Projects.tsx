'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { fadeUpVariant, staggerContainerVariant, sectionProps } from '@/lib/animations'
import { ACCENT_PILL_STYLES } from '@/lib/tokens'

const TAG_COLOR_KEYS = ['purple', 'blue', 'green'] as const
const tagColor = (i: number) => ACCENT_PILL_STYLES[TAG_COLOR_KEYS[i % 3]]

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  if (!featured) return null
  const professional = projects.filter((p) => !p.featured)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-8 md:px-16 lg:px-24 py-20 border-t border-white/[0.06]">
      <motion.div {...sectionProps}>
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <p className="text-[10px] tracking-[3px] text-accent-purple uppercase font-semibold mb-1">
              Featured Work
            </p>
            <h2 id="projects-heading" className="text-2xl font-black">Things I&apos;ve built</h2>
          </div>
          <a
            href="https://github.com/Arslkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            GitHub →
          </a>
        </div>

        <div className="bg-[var(--surface)] border border-[rgba(167,139,250,0.2)] rounded-2xl overflow-hidden mb-4">
          <div
            className="h-32 md:h-40 flex items-center justify-center relative"
            style={{ background: featured.gradient }}
          >
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full text-[9px] font-bold tracking-widest text-white uppercase">
              Personal Project
            </span>
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                {featured.title}
              </p>
              {featured.liveUrl && (
                <p className="text-xs text-white/40 mt-1">{new URL(featured.liveUrl).hostname}</p>
              )}
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black mb-2">{featured.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{featured.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 border border-[rgba(167,139,250,0.4)] text-accent-purple rounded-full text-[10px] font-semibold hover:bg-[rgba(167,139,250,0.1)] transition-colors"
                  >
                    Live ↗
                  </a>
                )}
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 border border-white/10 text-white/45 rounded-full text-[10px] hover:border-white/20 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="mt-3.5 flex gap-1.5 flex-wrap">
              {featured.tags.map((tag, i) => (
                <span key={tag} className={`text-[10px] px-2.5 py-1 border rounded-xl ${tagColor(i)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[10px] tracking-[2px] text-white/30 uppercase mb-3">Professional Work</p>
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {professional.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUpVariant}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
            >
              <div
                className="h-12 rounded-lg mb-3"
                style={{ background: project.gradient }}
              />
              <h3 className="text-sm font-bold mb-1">{project.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed mb-2.5">{project.description}</p>
              <div className="flex gap-1.5 flex-wrap mb-2.5">
                {project.tags.map((tag, i) => (
                  <span key={tag} className={`text-[10px] px-2 py-0.5 border rounded-xl ${tagColor(i)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] border border-[rgba(167,139,250,0.3)] text-accent-purple px-2.5 py-1 rounded-xl hover:bg-[rgba(167,139,250,0.1)] transition-colors inline-block"
                >
                  Live ↗
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
