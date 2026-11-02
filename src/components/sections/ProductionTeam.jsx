import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Camera, ChevronRight, PenLine, Scissors, UsersRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { production } = portfolioData
const ICONS = { creators: UsersRound, editors: Scissors, camera: Camera, writers: PenLine }

// The in-house team and the concept → delivery workflow.
export default function ProductionTeam({ showCta = true }) {
  return (
    <section id="team" aria-label={production.eyebrow} className="relative isolate scroll-mt-16 overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[30rem] w-[56rem] max-w-[170vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.3),transparent)]" />
      <Shell>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{production.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine>{production.title[0]}</RevealLine>
              <RevealLine delay={0.12} className="text-white/45">{production.title[1]}</RevealLine>
            </h2>
          </div>
          <motion.p {...fadeUp(0.25, 16)} className="max-w-md border-l-2 border-signal-500 pl-4 text-[15px] leading-relaxed text-white/75 lg:mb-2">
            {production.promise}
          </motion.p>
        </div>

        {/* Workflow strip */}
        <motion.ol {...fadeUp(0.1, 16)} aria-label="Our production workflow" className="no-scrollbar -mx-4 mt-10 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-12 sm:flex-wrap sm:px-0">
          {production.workflow.map((step, i) => (
            <Fragment key={step}>
              <motion.li
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={REVEAL}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-2 pr-4 pl-2 text-[13px] font-medium whitespace-nowrap text-white"
              >
                <span className="grid size-6 place-items-center rounded-full bg-signal-500 text-[10px] font-bold tabular-nums">{i + 1}</span>
                {step}
              </motion.li>
              {i < production.workflow.length - 1 && <ChevronRight aria-hidden className="size-4 shrink-0 text-signal-500/70" />}
            </Fragment>
          ))}
        </motion.ol>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {production.team.map((member, i) => {
            const Icon = ICONS[member.icon] ?? UsersRound
            return (
              <motion.li
                key={member.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={REVEAL}
                transition={{ duration: 0.65, delay: (i % 4) * 0.1, ease }}
              >
                <article className="group relative isolate h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-signal-500/40 sm:p-6">
                  <div aria-hidden className="pointer-events-none absolute -top-20 -right-16 -z-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="grid size-11 place-items-center rounded-xl border border-signal-500/25 bg-signal-500/10 text-[#FF4D6A] transition group-hover:bg-signal-500 group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-sans text-base font-semibold text-white">{member.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {member.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-[13.5px] text-white/60"><span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-signal-500" />{pt}</li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            )
          })}
        </ul>

        {showCta && (
          <motion.div {...fadeUp(0.1, 12)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta href="/content-production">See content production <ArrowRight className="size-4" /></Cta>
            <Cta href="/careers" variant="outline">Join the team</Cta>
          </motion.div>
        )}
      </Shell>
    </section>
  )
}
