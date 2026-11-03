import { useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Clapperboard, Layers, Search, Send, TrendingUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cardIn, staggerGroup } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Shell } from '@/components/portfolio/Kit'
import HomeHeading from './HomeHeading'

const ICONS = { discover: Search, strategize: Layers, create: Clapperboard, deliver: Send, grow: TrendingUp }
const DASHES = 'bg-[repeating-linear-gradient(var(--dir),rgb(255_255_255/0.14)_0_6px,transparent_6px_12px)]'

// The red progress line with a glowing head; horizontal on desktop, vertical on phones.
function Track({ progress, vertical }) {
  const head = useTransform(progress, (v) => `${v * 100}%`)
  return (
    <div
      aria-hidden
      style={{ '--dir': vertical ? '180deg' : '90deg' }}
      className={cn('pointer-events-none absolute', vertical ? 'top-7 bottom-10 left-7 w-px lg:hidden' : 'top-7 right-[10%] left-[10%] hidden h-px lg:block')}
    >
      <span className={cn('absolute inset-0', DASHES)} />
      <motion.span
        style={vertical ? { scaleY: progress } : { scaleX: progress }}
        className={cn(
          'absolute inset-0 shadow-[0_0_12px_rgb(255_23_68/0.8)]',
          vertical ? 'origin-top bg-gradient-to-b' : 'origin-left bg-gradient-to-r',
          'from-[#7a0a1a] via-[#FF1744] to-[#FF4D6A]',
        )}
      />
      <motion.span
        style={vertical ? { top: head } : { left: head }}
        className={cn(
          'absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgb(255_23_68/0.35),0_0_24px_6px_rgb(255_23_68/0.8)]',
          vertical ? 'left-1/2' : 'top-1/2',
        )}
      />
    </div>
  )
}

// One step: dim until the line reaches it, then it lights up with a pulse; the
// newest lit step keeps a slowly orbiting highlight.
function Step({ step, index, on, current }) {
  const Icon = ICONS[step.icon] ?? Search
  return (
    <motion.li variants={cardIn} className="group flex gap-5 lg:flex-col lg:items-center lg:text-center">
      <span className="relative z-10 grid size-14 shrink-0 place-items-center">
        {on && (
          <motion.span
            aria-hidden
            initial={{ scale: 1, opacity: 0.75 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#FF1744]"
          />
        )}
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          className={cn(
            'absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#FF1744_70deg,transparent_140deg)] transition-opacity duration-500 [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1.5px))]',
            current ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
        />
        <motion.span
          animate={on ? { scale: 1, rotate: 0 } : { scale: 0.88, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={cn(
            'relative grid size-14 place-items-center rounded-full border transition-[border-color,background-color,color,box-shadow] duration-500 group-hover:scale-110',
            on
              ? 'border-[#FF1744]/70 bg-[radial-gradient(circle_at_50%_35%,rgb(255_23_68/0.22),#0D0D0D_70%)] text-[#FF1744] shadow-[0_0_34px_-4px_rgb(255_23_68/0.75)]'
              : 'border-white/12 bg-[#0D0D0D] text-white/35',
          )}
        >
          <Icon className="size-6" strokeWidth={1.7} aria-hidden />
        </motion.span>
      </span>
      <div className="pt-2 lg:pt-0">
        <h3 className={cn('font-display text-base font-semibold transition-colors duration-500 lg:mt-4', on ? 'text-white' : 'text-white/55')}>
          <span className={cn('mr-1.5 tabular-nums transition-colors duration-500', on ? 'text-[#FF1744]' : 'text-white/30')}>{String(index + 1).padStart(2, '0')}</span>
          {step.title}
        </h3>
        <p className={cn('mt-1.5 text-[13px] leading-relaxed transition-colors duration-500 lg:mx-auto lg:max-w-[12rem]', on ? 'text-[#A1A1AA]' : 'text-[#A1A1AA]/60')}>{step.text}</p>
      </div>
    </motion.li>
  )
}

// Homepage "Our process": the red line fills as you scroll and lights each step in turn.
export default function HomeProcess() {
  const steps = portfolioData.home.process
  const last = steps.length - 1
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 })
  const [reached, setReached] = useState(-1)
  // Step i sits at i / last along the line; light it as the head arrives.
  useMotionValueEvent(progress, 'change', (v) => setReached(Math.min(last, Math.floor(v * last + 0.04))))
  const active = reduce ? last : reached
  const full = useMotionValue(1)
  const fill = reduce ? full : progress

  return (
    <section id="process" aria-label="Our process" className="relative isolate scroll-mt-20 section-y">
      <Shell>
        <HomeHeading eyebrow="Our process" title="From the First Idea to the Final Frame" text="A simple, clear and effective creative process." />
        <div ref={ref} className="relative mt-10 sm:mt-12">
          <Track progress={fill} />
          <Track progress={fill} vertical />
          <motion.ol {...staggerGroup(0.1)} className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} on={i <= active} current={i === active} />
            ))}
          </motion.ol>
        </div>
      </Shell>
    </section>
  )
}
