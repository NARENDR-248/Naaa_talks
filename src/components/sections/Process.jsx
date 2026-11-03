import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Aperture, Clapperboard, Lightbulb, Megaphone, PenLine, Scissors, Send, TrendingUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'

const { process } = portfolioData
const ease = [0.22, 1, 0.36, 1]
const hoverEase = { duration: 0.3, ease }

// Reveal only once an element is ~18% up from the bottom of the screen. Firing at
// the very edge (the old setting) finished every animation below the reader's
// eye line on phones, so the section looked static.
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -18% 0px' }
const STAGGER = 0.12

const ICONS = {
  idea: Lightbulb,
  script: PenLine,
  shoot: Aperture,
  edit: Scissors,
  reels: Clapperboard,
  promote: Megaphone,
  deliver: Send,
  growth: TrendingUp,
}

// One restrained gesture per icon, played on hover (desktop) or press (touch).
const ICON_GESTURE = {
  idea: { scale: 1.14 },
  script: { rotate: -14 },
  shoot: { rotate: 24, scale: 1.06 },
  edit: { rotate: -12, x: 1 },
  reels: { rotate: -10 },
  promote: { scale: [1, 1.18, 1.06] },
  deliver: { x: 3, y: -2 },
  growth: { y: -3 },
}

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: (c) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, delay: Math.max(0, c), ease } }),
}
// The article both runs the reveal and owns the hover/tap labels. Framer makes any
// element with whileHover/whileTap labels the variant controller for its children,
// so it must also carry hidden/show itself or the icon, number and text inside
// never receive the reveal (they just sit there fully visible).
const articleVariants = {
  hidden: {},
  show: {},
  tap: { scale: 0.975, transition: { duration: 0.15 } },
}
const iconBoxVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  show: (c) => ({ opacity: 1, scale: 1, rotate: 0, transition: c < 0 ? hoverEase : { duration: 0.6, delay: c + 0.15, ease } }),
  hover: { scale: 1.08, transition: hoverEase },
  tap: { scale: 0.94, transition: { duration: 0.15 } },
}
// A single red flash behind the icon as it lands (opacity only, so it stays cheap).
const iconGlowVariants = {
  hidden: { opacity: 0 },
  show: (c) => (c < 0 ? { opacity: 0 } : { opacity: [0, 0.9, 0], transition: { duration: 1.1, delay: c + 0.3, ease: 'easeOut' } }),
}
const numberVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (c) => ({ opacity: 1, scale: 1, transition: c < 0 ? hoverEase : { duration: 0.7, delay: c + 0.2, ease } }),
}
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (c) => ({ opacity: 1, y: 0, transition: c < 0 ? hoverEase : { duration: 0.55, delay: c + 0.25, ease } }),
}

// Cards that come into view together (a desktop row, or a fast flick on a
// phone) are queued 0.12s apart; a card entering on its own starts at once.
function useRevealQueue() {
  const state = useRef({ last: 0, count: 0 })
  return () => {
    const now = performance.now()
    if (now - state.current.last > 400) state.current.count = 0
    state.current.last = now
    return state.current.count++ * STAGGER
  }
}

function ProcessCard({ step, index, nextDelay }) {
  const Icon = ICONS[step.icon] ?? Lightbulb
  const number = String(index + 1).padStart(2, '0')
  const gesture = ICON_GESTURE[step.icon] ?? { scale: 1.1 }
  const [delay, setDelay] = useState(null)
  // After the entrance, drop the delay so hover/tap release snaps back immediately.
  const [settled, setSettled] = useState(false)
  const state = delay === null ? 'hidden' : 'show'
  // -1 marks a settled card: no entrance delays, and the one-time glow stays off.
  const custom = settled ? -1 : (delay ?? 0)

  return (
    <motion.li
      custom={custom}
      variants={cardVariants}
      initial="hidden"
      animate={state}
      viewport={VIEWPORT}
      onViewportEnter={() => setDelay((d) => d ?? nextDelay())}
      onAnimationComplete={(name) => name === 'show' && setSettled(true)}
      className="h-full"
    >
      <motion.article
        variants={articleVariants}
        initial="hidden"
        animate={state}
        whileHover="hover"
        whileTap="tap"
        className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 transition-[border-color,translate,box-shadow,--tw-gradient-from] duration-300 ease-out hover:-translate-y-[5px] hover:border-signal-500/40 hover:from-white/[0.07] hover:shadow-[0_24px_60px_-30px_rgb(245_32_58/0.55)] active:border-signal-500/50 sm:p-6"
      >
        {/* Hover glow + top accent line */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 -z-10 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(245_32_58/0.28),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100" />
        <span aria-hidden className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 via-signal-400/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

        <div className="flex items-start justify-between gap-4">
          <motion.span
            custom={custom}
            variants={iconBoxVariants}
            className="relative grid size-11 place-items-center rounded-xl border border-signal-500/20 bg-signal-500/10 text-signal-400 transition-[color,background-color,border-color] duration-300 group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-white"
          >
            <motion.span aria-hidden custom={custom} variants={iconGlowVariants} className="absolute inset-0 rounded-xl shadow-[0_0_26px_2px_rgb(245_32_58/0.85)]" />
            <motion.span variants={{ hover: { ...gesture, transition: hoverEase }, tap: { ...gesture, transition: hoverEase } }} className="relative grid place-items-center">
              <Icon className="size-5" strokeWidth={1.75} />
            </motion.span>
          </motion.span>
          <motion.span
            aria-hidden
            custom={custom}
            variants={numberVariants}
            className="origin-top-right bg-gradient-to-b from-white/35 to-white/[0.04] bg-clip-text font-display text-5xl leading-none font-extralight text-transparent tabular-nums transition-[--tw-gradient-from] duration-300 group-hover:from-[#ff8a9b] sm:text-6xl"
          >
            {number}
          </motion.span>
        </div>

        <motion.div custom={custom} variants={textVariants}>
          <h3 className="mt-6 font-sans text-base font-semibold text-white sm:mt-10">
            <span className="sr-only">Step {number}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{step.text}</p>
        </motion.div>
      </motion.article>
    </motion.li>
  )
}

export default function Process() {
  const nextDelay = useRevealQueue()

  return (
    <section id={process.id} aria-label={process.eyebrow} className="relative isolate scroll-mt-20 overflow-hidden section-y">
      {/* Ambient burgundy light; the slow breathing loop runs from tablet up only */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[36rem] w-[60rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(120_10_30/0.28),transparent)] md:animate-glow-breathe"
      />
      {/* Fine accent line along the section's top edge */}
      <motion.span
        aria-hidden
        className="absolute top-0 left-1/2 h-px w-[min(60rem,80%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-signal-500/40 to-transparent"
        initial={{ opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />

      <Shell>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.6, ease }}>
              <Eyebrow className="flex items-center gap-3">
                <motion.span
                  aria-hidden
                  className="h-px w-6 origin-left bg-signal-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.7, delay: 0.15, ease }}
                />
                {process.eyebrow}
              </Eyebrow>
            </motion.div>
            <h2 className="mt-4 font-display text-[2.1rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              <RevealLine delay={0.15} duration={0.7} viewport={VIEWPORT}>{process.title[0]}</RevealLine>
              <motion.span
                className="block text-white/45"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay: 0.4, ease }}
              >
                {process.title[1]}
              </motion.span>
            </h2>
          </div>
          <motion.p
            className="max-w-md text-[15px] leading-relaxed text-white/55 sm:text-base lg:mb-2 lg:ml-auto"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            {process.subtitle}
          </motion.p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-3 min-[540px]:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <ProcessCard key={step.title} step={step} index={i} nextDelay={nextDelay} />
          ))}
        </ol>

        <CtaBanner {...process.cta} />
      </Shell>
    </section>
  )
}
