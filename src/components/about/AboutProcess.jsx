import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'
import { cardIn, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import SectionTitle from './SectionTitle'

const { about } = portfolioData

// "From Idea to Impact": a timeline whose red line fills as the section scrolls past.
export default function AboutProcess() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = reduce ? 1 : scrollYProgress

  return (
    <section id="process" ref={ref} aria-label="Our process" className="relative isolate scroll-mt-20 section-y">
      <Shell>
        <SectionTitle eyebrow="Our process" lines={['From Idea', 'to Impact.']} tone="accent" />

        <div className="relative mt-12 sm:mt-16">
          {/* track + progress: horizontal on desktop, vertical on smaller screens */}
          <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-white/10 lg:block" />
          <motion.span aria-hidden style={{ scaleX: fill }} className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-primary to-primary/40 lg:block" />
          <span aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-white/10 lg:hidden" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gradient-to-b from-primary to-primary/40 lg:hidden" />

          <motion.ol {...staggerGroup(0.14)} className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {about.process.map((s, i) => (
              <motion.li key={s.title} variants={cardIn} className="relative flex gap-6 lg:block">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-primary/60 bg-[#050505] font-display text-sm text-white shadow-[0_0_28px_-6px_rgb(255_23_68/0.75)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1.5 lg:mt-7 lg:pt-0">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-white">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#A1A1AA]">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Shell>
    </section>
  )
}
