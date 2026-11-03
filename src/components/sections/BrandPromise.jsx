import { motion, useReducedMotion } from 'framer-motion'
import { BadgeIndianRupee, Camera, Clapperboard, GraduationCap, Lightbulb, ShieldCheck, TrendingUp, UsersRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { Eyebrow, Fade, Shell } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'

const { whyChoose: promise } = portfolioData
const ease = [0.22, 1, 0.36, 1]
const ICONS = { reels: Clapperboard, shield: ShieldCheck, camera: Camera, rupee: BadgeIndianRupee, grow: TrendingUp, idea: Lightbulb, team: UsersRound, educate: GraduationCap }

function PromiseCard({ item, index }) {
  const Icon = ICONS[item.icon] ?? Clapperboard
  return (
    <motion.li
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      className="h-full"
    >
      <article className="group relative isolate flex h-full gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)] transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-[#FF1744]/45 hover:shadow-[0_24px_60px_-28px_rgb(255_23_68/0.55)] sm:flex-col sm:gap-0 sm:p-6">
        {/* Illumination that rises on hover */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-16 -z-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex shrink-0 items-start justify-between sm:w-full">
          <span className="grid size-11 place-items-center rounded-xl border border-[#FF1744]/25 bg-gradient-to-br from-[#FF1744]/25 to-[#FF1744]/[0.04] text-[#FF4D6A] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <span className="hidden font-sans text-[11px] font-semibold tracking-[0.08em] text-white/30 tabular-nums transition-colors group-hover:text-[#FF1744] sm:block">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="min-w-0 sm:mt-8">
          <h3 className="flex items-baseline gap-2 font-display text-[17px] leading-snug font-medium tracking-[-0.01em] text-white sm:text-lg">
            <span className="font-sans text-[10px] font-semibold tracking-[0.08em] text-[#FF1744]/80 tabular-nums sm:hidden">{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55 sm:mt-2 sm:text-sm">{item.text}</p>
        </div>
      </article>
    </motion.li>
  )
}

export default function BrandPromise() {
  const reduce = useReducedMotion()

  return (
    <section aria-label={promise.eyebrow} className="relative isolate overflow-hidden section-y">
      {/* Slow burgundy light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[30rem] w-[52rem] max-w-[170vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.35),transparent)]"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Shell>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <Fade>
            <Eyebrow className="flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-[#FF1744]" />
              {promise.eyebrow}
            </Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              {promise.title[0]}
              <br />
              <span className="text-white/45">{promise.title[1]}</span>
            </h2>
          </Fade>
          <Fade delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-[14px] leading-relaxed text-white/55 sm:text-base">{promise.subtitle}</p>
            {promise.tagline && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium text-white/80">
                <span aria-hidden className="size-1.5 rounded-full bg-[#FF1744] shadow-[0_0_8px_rgb(255_23_68/0.9)]" />
                {promise.tagline}
              </p>
            )}
          </Fade>
        </div>

        {/* Animated divider */}
        <motion.span
          aria-hidden
          className="mt-8 block h-px origin-left bg-gradient-to-r from-[#FF1744]/70 via-white/10 to-transparent sm:mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />

        <ul className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {promise.items.map((item, i) => (
            <PromiseCard key={item.title} item={item} index={i} />
          ))}
        </ul>

        <CtaBanner {...promise.cta} className="mt-8 sm:mt-14" />
      </Shell>
    </section>
  )
}
