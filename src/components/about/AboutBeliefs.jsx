import { motion } from 'framer-motion'
import { BadgeCheck, Handshake, Lightbulb, Sparkles } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cardIn, drawLine, ease, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import SectionTitle from './SectionTitle'

const { about } = portfolioData
const ICONS = { creativity: Sparkles, innovation: Lightbulb, authenticity: BadgeCheck, collaboration: Handshake }
const drawDown = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, delay: 0.25, ease } } }

// "What We Believe In": a quiet row of values split by drawn dividers.
export default function AboutBeliefs() {
  return (
    <section aria-label="What we believe in" className="relative isolate section-y">
      <Shell>
        <SectionTitle eyebrow="Our values" lines={['What We', 'Believe In.']} />
        <motion.ul {...staggerGroup(0.12)} className="mt-10 grid sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => {
            const Icon = ICONS[v.icon] ?? Sparkles
            return (
              <motion.li key={v.title} variants={cardIn} className="group relative py-7 sm:px-6 lg:px-8 lg:py-2 lg:first:pl-0">
                {/* divider: horizontal on small screens, vertical on desktop */}
                <motion.span aria-hidden variants={drawLine} className="absolute inset-x-0 top-0 h-px origin-left bg-white/10 lg:hidden" />
                {i > 0 && <motion.span aria-hidden variants={drawDown} className="absolute inset-y-0 left-0 hidden w-px origin-top bg-gradient-to-b from-white/15 via-white/10 to-transparent lg:block" />}
                <Icon className="size-6 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-5 font-display text-xl font-medium text-white">{v.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#A1A1AA]">{v.text}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </Shell>
    </section>
  )
}
