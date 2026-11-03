import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'
import Stats from './Stats'

const { about } = portfolioData

// Who NAAA TALKS is: story, mission, vision, difference, approach and team.
// `compact` = homepage version (adds a link to the About page).
export default function AboutAgency({ compact = false }) {
  return (
    <section id="about" aria-label={about.eyebrow} className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-10 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.3),transparent)]" />
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{about.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine delay={0.05}>{about.title[0]}</RevealLine>
              <RevealLine delay={0.18} className="text-white/45">{about.title[1]}</RevealLine>
            </h2>
          </div>
          <div className="space-y-4">
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} {...fadeUp(0.15 + i * 0.1, 16)} className="text-[15px] leading-relaxed text-white/65 sm:text-base">{p}</motion.p>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {about.blocks.map((b, i) => (
            <motion.li
              key={b.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6 transition hover:border-signal-500/40"
            >
              <span aria-hidden className="absolute -top-px right-6 left-6 h-px bg-gradient-to-r from-transparent via-signal-500/0 to-transparent transition group-hover:via-signal-500/70" />
              <span className="font-display text-sm font-light text-signal-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-lg font-medium text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{b.text}</p>
            </motion.li>
          ))}
        </ul>

        {compact && (
          <motion.div {...fadeUp(0.2, 16)} className="mt-8">
            <Cta href="/about" variant="outline">More about us <ArrowRight className="size-4" /></Cta>
          </motion.div>
        )}

        <Stats className="mt-12 sm:mt-16" />
      </Shell>
    </section>
  )
}
