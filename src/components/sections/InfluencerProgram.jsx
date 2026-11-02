import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Photo } from '@/components/ui/Primitives'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { program } = portfolioData
const BG = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=70'

// The 10-step journey as a vertical timeline whose red line fills while scrolling.
function Journey({ compact }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ol ref={ref} className={cn('relative', compact ? 'grid gap-x-8 sm:grid-cols-2' : 'space-y-1')} aria-label="The 10-step influencer development journey">
      {!compact && (
        <span aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-white/10">
          <motion.span className="absolute inset-0 origin-top bg-signal-500 shadow-[0_0_10px_rgb(255_23_68/0.8)]" style={{ scaleY: fill }} />
        </span>
      )}
      {program.steps.map((step, i) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.6, delay: compact ? (i % 2) * 0.08 : 0.05, ease }}
          className="relative flex gap-4 py-3"
        >
          <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-signal-500/40 bg-[#14070a] font-sans text-[12px] font-bold text-white tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pt-1.5">
            <h3 className="font-sans text-[15px] font-semibold text-white">{step.title}</h3>
            <p className="mt-0.5 text-[13.5px] leading-relaxed text-white/55">{step.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

// Signature "Zero to Influencer" program. `compact` = homepage version.
// "as" lets the program page use this heading as its <h1>.
export default function InfluencerProgram({ compact = false, as: Heading = 'h2' }) {
  return (
    <section id="influencer-program" aria-label="Zero to Influencer program" className="relative isolate scroll-mt-16 overflow-hidden py-20 sm:py-28">
      {/* Cinematic backdrop */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Photo src={BG} alt="" className="absolute inset-0 size-full opacity-35" imgClassName="object-[center_20%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/75 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute top-1/4 -left-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/60 to-transparent" />

      <Shell className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div {...fadeUp(0, 16)}>
            <Eyebrow className="flex items-center gap-3 text-signal-400"><span aria-hidden className="h-px w-6 bg-signal-500" />{program.eyebrow}</Eyebrow>
          </motion.div>
          <Heading className="mt-5 font-display text-[2.4rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-6xl">
            <RevealLine delay={0.05}>{program.title[0]}</RevealLine>
            <RevealLine delay={0.2} className="text-gradient">{program.title[1]}</RevealLine>
          </Heading>
          <motion.p {...fadeUp(0.3, 16)} className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{program.subtitle}</motion.p>
          <motion.p {...fadeUp(0.4, 16)} className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">{program.notClassroom}</motion.p>
          <motion.ul {...fadeUp(0.45, 16)} className="mt-6 grid max-w-lg grid-cols-2 gap-2">
            {program.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-[13px] text-white/85 backdrop-blur-sm">
                <Check className="size-4 shrink-0 text-signal-400" aria-hidden /> {h}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fadeUp(0.55, 16)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta href={program.cta.href} className="h-14 px-7 tracking-wide uppercase">
              {program.cta.label} <ArrowRight className="size-4" />
            </Cta>
            {compact && <Cta href="/influencer-program" variant="outline" className="h-14">How the program works</Cta>}
          </motion.div>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-black/40 p-5 backdrop-blur-md sm:p-7">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">Your 10-step journey</p>
          <div className="mt-3"><Journey compact={false} /></div>
        </div>
      </Shell>
    </section>
  )
}
