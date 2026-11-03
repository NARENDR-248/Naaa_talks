import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Camera, GraduationCap, Rocket, Star, TrendingUp, UsersRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import HomeHeading from './HomeHeading'

const { whyChoose } = portfolioData
const ICONS = { quality: Star, camera: Camera, grow: TrendingUp, team: UsersRound, educate: GraduationCap, execution: Rocket }

// Cards rise and tip forward into place, one after another.
const grid = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const card = {
  hidden: { opacity: 0, y: 40, rotateX: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}
const icon = {
  hidden: { scale: 0.4, rotate: -25, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.25 } },
}
const rule = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, delay: 0.35, ease } } }

// One benefit card: a spotlight and a gentle 3D tilt follow the pointer.
function Benefit({ item, index }) {
  const Icon = ICONS[item.icon] ?? Star
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18 })

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    e.currentTarget.style.setProperty('--my', `${py * 100}%`)
    if (!reduce) {
      rx.set((0.5 - py) * 8)
      ry.set((px - 0.5) * 8)
    }
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.li variants={card} className="[perspective:1000px]">
      <motion.div
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX, rotateY }}
        className="group relative isolate h-full overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,#141414_0%,#0B0B0B_60%)] p-6 transition-[border-color,box-shadow] duration-500 [transform-style:preserve-3d] hover:border-[#FF1744]/40 hover:shadow-[0_30px_70px_-40px_rgb(255_23_68/0.7)] sm:p-7"
      >
        {/* Pointer spotlight */}
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgb(255_23_68/0.16),transparent_60%)]" />
        {/* Large outlined number */}
        <span aria-hidden className="pointer-events-none absolute -top-3 right-4 font-display text-[5.5rem] leading-none font-bold text-transparent tabular-nums transition-[translate,color] duration-700 [-webkit-text-stroke:1px_rgb(255_255_255/0.07)] group-hover:-translate-y-1 group-hover:[-webkit-text-stroke:1px_rgb(255_23_68/0.35)]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.span variants={icon} className="relative grid size-12 place-items-center rounded-2xl border border-[#FF1744]/30 bg-[#FF1744]/10 text-[#FF1744] shadow-[0_0_30px_-8px_rgb(255_23_68/0.7)] transition-colors duration-500 group-hover:bg-[#FF1744] group-hover:text-white">
          <Icon className="size-[22px] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.7} aria-hidden />
        </motion.span>

        <h3 className="mt-6 font-display text-lg leading-snug font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA] transition-colors duration-500 group-hover:text-white/75">{item.text}</p>

        <span aria-hidden className="mt-6 block h-px overflow-hidden bg-white/8">
          <motion.span variants={rule} className="block h-full w-1/3 origin-left bg-gradient-to-r from-[#FF1744] to-transparent transition-[width] duration-700 group-hover:w-full" />
        </span>
      </motion.div>
    </motion.li>
  )
}

// Homepage "Why choose NAAA TALKS": six benefit cards over a drifting IMPACT wordmark.
export default function HomeWhy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['8%', '-18%'])

  return (
    <section ref={ref} aria-label="Why choose NAAA TALKS" className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.28),transparent)]" />
      <motion.span
        aria-hidden
        style={{ x: drift }}
        className="pointer-events-none absolute top-6 left-0 -z-10 font-display text-[9rem] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.05)] sm:text-[13rem] lg:text-[17rem]"
      >
        IMPACT · IMPACT
      </motion.span>

      <Shell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <HomeHeading eyebrow="Why choose NAAA TALKS" title={whyChoose.homeTitle} />
          <motion.p
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={REVEAL}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="max-w-sm text-sm leading-relaxed text-[#A1A1AA] lg:text-right"
          >
            {whyChoose.homeText}
          </motion.p>
        </div>
        <motion.ul initial="hidden" whileInView="show" viewport={REVEAL} variants={grid} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {whyChoose.items.map((it, i) => <Benefit key={it.title} item={it} index={i} />)}
        </motion.ul>
      </Shell>
    </section>
  )
}
