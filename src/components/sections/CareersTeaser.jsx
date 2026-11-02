import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { careers } = portfolioData

// Homepage invitation to the careers journey with a few open roles.
export default function CareersTeaser() {
  const jobs = useSiteContent().jobs.slice(0, 4)

  return (
    <section aria-label={careers.eyebrow} className="relative isolate overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.3),transparent)]" />
      <Shell className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <motion.div {...fadeUp(0, 16)}><Eyebrow>{careers.eyebrow}</Eyebrow></motion.div>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
            <RevealLine>{careers.title[0]}</RevealLine>
            <RevealLine delay={0.12} className="text-white/45">{careers.title[1]}</RevealLine>
          </h2>
          <motion.p {...fadeUp(0.2, 16)} className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">{careers.subtitle}</motion.p>
          <motion.ul {...fadeUp(0.3, 16)} className="mt-6 space-y-2">
            {careers.perks.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden /> {p}</li>
            ))}
          </motion.ul>
          <motion.div {...fadeUp(0.4, 16)} className="mt-8"><Cta href="/careers">Join our team</Cta></motion.div>
        </div>

        <ul className="space-y-2.5 self-center">
          {jobs.map((j, i) => (
            <motion.li key={j.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={REVEAL} transition={{ duration: 0.6, delay: i * 0.08, ease }}>
              <Link to={`/careers/apply?job=${encodeURIComponent(j.id)}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition hover:border-signal-500/40 hover:bg-white/[0.05]">
                <span className="min-w-0">
                  <span className="block truncate font-sans text-[15px] font-semibold text-white">{j.title}</span>
                  <span className="block truncate text-xs text-white/45">{[j.department, j.employment_type].filter(Boolean).join(' · ')}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-white/60 group-hover:text-signal-400">
                  Apply <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.li>
          ))}
          {jobs.length === 0 && <li className="rounded-2xl border border-dashed border-white/12 p-5 text-sm text-white/55">{careers.empty}</li>}
        </ul>
      </Shell>
    </section>
  )
}
