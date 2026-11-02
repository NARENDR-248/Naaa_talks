import { motion } from 'framer-motion'
import { ArrowRight, Quote } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { fadeUp } from '@/lib/motion'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'
import Stats from './Stats'

const { about } = portfolioData

// Who NAAA TALKS is, its vision and headline figures. `compact` = homepage version.
export default function AboutAgency({ compact = false }) {
  return (
    <section id="about" aria-label={about.eyebrow} className="relative isolate scroll-mt-16 overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute top-10 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.3),transparent)]" />
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{about.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine delay={0.05}>{about.title[0]}</RevealLine>
              <RevealLine delay={0.18} className="text-white/45">{about.title[1]}</RevealLine>
            </h2>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <motion.p key={i} {...fadeUp(0.15 + i * 0.1, 16)} className="max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">{p}</motion.p>
              ))}
            </div>
            {compact && (
              <motion.div {...fadeUp(0.35, 16)} className="mt-8">
                <Cta href="/about" variant="outline">More about us <ArrowRight className="size-4" /></Cta>
              </motion.div>
            )}
          </div>

          <motion.figure {...fadeUp(0.2)} className="relative self-end overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-wine-900/70 via-[#0c0507] to-void p-7 sm:p-9">
            <div aria-hidden className="absolute -top-px right-8 left-8 h-px bg-gradient-to-r from-transparent via-signal-500/70 to-transparent" />
            <Quote className="size-7 text-signal-500" aria-hidden />
            <blockquote className="mt-4 font-display text-xl leading-snug font-light text-white sm:text-2xl">{about.vision}</blockquote>
            <figcaption className="mt-6 font-sans text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">Our vision</figcaption>
          </motion.figure>
        </div>

        <Stats className="mt-12 sm:mt-16" />
      </Shell>
    </section>
  )
}
