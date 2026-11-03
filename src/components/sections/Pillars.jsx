import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, TrendingUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { pillars } = portfolioData
const ICONS = { create: Sparkles, educate: GraduationCap, grow: TrendingUp }

function PillarCard({ pillar, index }) {
  const Icon = ICONS[pillar.icon] ?? Sparkles
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={REVEAL}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      whileTap={{ scale: 0.985 }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-[border-color,translate,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal-500/40 hover:shadow-[0_30px_70px_-35px_rgb(255_23_68/0.6)] sm:p-8"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Oversized outline number */}
      <span aria-hidden className="absolute -right-2 -bottom-8 -z-10 font-display text-[9rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)] select-none">
        {pillar.number}
      </span>

      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl border border-signal-500/30 bg-gradient-to-br from-signal-500/30 to-signal-500/5 text-[#FF4D6A] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <span className="font-sans text-[11px] font-semibold tracking-[0.1em] text-white/35 tabular-nums">{pillar.number}</span>
      </div>
      <h3 className="mt-7 font-display text-3xl font-semibold tracking-tight text-white uppercase sm:text-4xl">{pillar.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/60">{pillar.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-1.5">
        {pillar.activities.map((a) => (
          <li key={a} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[12px] text-white/70">{a}</li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Pillars() {
  return (
    <section aria-label={pillars.eyebrow} className="relative isolate overflow-hidden section-y">
      <Shell>
        <motion.div {...fadeUp(0, 16)}><Eyebrow className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-signal-500" />{pillars.eyebrow}</Eyebrow></motion.div>
        <h2 className="mt-4 font-display text-[2.4rem] leading-[1.02] font-semibold tracking-tight text-white uppercase sm:text-6xl">
          <RevealLine delay={0.05}>{pillars.title[0]}</RevealLine>
          <RevealLine delay={0.18} className="text-gradient">{pillars.title[1]}</RevealLine>
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3 sm:mt-14">
          {pillars.items.map((p, i) => (
            <li key={p.key}><PillarCard pillar={p} index={i} /></li>
          ))}
        </ul>
      </Shell>
    </section>
  )
}
