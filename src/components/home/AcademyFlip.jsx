import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, BookOpen, Clapperboard, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'

const flip = portfolioData.home.academyFlip
const R = 22 // card corner radius (px)
// Per-card front styling, starting tilt (deg) and vertical offset (px).
const FRONTS = [
  { icon: BookOpen, face: 'bg-[#ECEAE6] text-[#111]', sub: 'text-[#111]/60', tilt: -6, y: 18 },
  { icon: Clapperboard, face: 'bg-primary text-white', sub: 'text-white/80', tilt: 2, y: -8 },
  { icon: TrendingUp, face: 'bg-[#1B1B1D] text-white', sub: 'text-white/60', tilt: 5, y: 12 },
]
// Corners each back ends with once the three cards join: outer corners stay round.
const JOINED = [[R, 0, 0, R], [0, 0, 0, 0], [0, R, R, 0]]
// The same image on every back, sized to three card widths and shifted per card, so the
// backs line up into one continuous picture. The tint layers are split the same way.
const BACK_POSITIONS = ['left center', 'center center', 'right center']
const IMAGE_LAYERS = `linear-gradient(90deg, rgb(5 5 5 / 0.5), rgb(120 10 25 / 0.22) 50%, rgb(5 5 5 / 0.5)), linear-gradient(0deg, rgb(5 5 5 / 0.85), transparent 60%), url(${flip.image})`
// Card width: fits three across and leaves room for the heading on short screens.
const CARD_W = 'min(28vw, calc((100svh - 20rem) / 1.4), 300px)'
const CARD_W_SM = 'min(24vw, calc((100svh - 21rem) / 1.4), 300px)'
const faceBase = 'absolute inset-0 overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

// Timeline (fractions of the pinned scroll): flip 10–55% (edge-on near 32%), gaps close
// 55–75%, seamless image 75–79%, final message 78–92%, then a short hold.
const FLIP = [0.1, 0.55]
const JOIN = [0.55, 0.75]
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
const joinT = (p) => easeInOut(clamp01((p - JOIN[0]) / (JOIN[1] - JOIN[0])))

function FlipCard({ stage, index, progress, gap }) {
  const f = FRONTS[index]
  const Icon = f.icon
  const rotateY = useTransform(progress, FLIP, [0, 180], { ease: easeInOut })
  const rotateZ = useTransform(progress, FLIP, [f.tilt, 0], { ease: easeInOut })
  const lift = useTransform(progress, FLIP, [f.y, 0], { ease: easeInOut })
  // Outer cards slide inwards by one gap so all three meet.
  const x = useTransform([progress, gap], ([p, g]) => (index === 1 ? 0 : (index === 0 ? 1 : -1) * joinT(p) * (g + 0.5)))
  const borderRadius = useTransform(progress, (p) => {
    const t = joinT(p)
    return JOINED[index].map((c) => `${R + (c - R) * t}px`).join(' ')
  })

  return (
    <motion.div style={{ rotateY, rotateZ, y: lift, x }} className="relative aspect-[3/4.2] w-[var(--w)] [transform-style:preserve-3d] will-change-transform">
      {/* Front: learning stage */}
      <div className={cn(faceBase, 'flex flex-col justify-between rounded-[22px] p-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:p-6', f.face)}>
        <div className="flex items-start justify-between">
          <span className="grid size-7 place-items-center rounded-full border border-current/25 sm:size-10"><Icon className="size-3.5 sm:size-5" strokeWidth={1.7} aria-hidden /></span>
          <span className={cn('font-display text-[10px] font-semibold tabular-nums sm:text-sm', f.sub)}>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div>
          <h3 className="font-display text-[1.1rem] leading-none font-semibold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.4rem]">{stage.title}</h3>
          <p className={cn('mt-2 hidden text-[13px] leading-relaxed sm:block', f.sub)}>{stage.text}</p>
        </div>
      </div>
      {/* Back: one third of the shared image */}
      <motion.div
        aria-hidden
        style={{ borderRadius, backgroundImage: IMAGE_LAYERS, backgroundSize: '300% 100%', backgroundPosition: BACK_POSITIONS[index] }}
        className={cn(faceBase, '[transform:rotateY(180deg)]')}
      />
    </motion.div>
  )
}

// Pinned (CSS sticky), scroll-scrubbed story: three tilted learning cards flip 180° in 3D,
// their backs reveal one shared image, the gaps close into one wide panel and the final
// message lands. Reverses on scroll up; reduced-motion visitors see the finished state.
export default function AcademyFlip() {
  const root = useRef(null)
  const row = useRef(null)
  const reduce = useReducedMotion()
  const gap = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 })
  const done = useMotionValue(1)
  const progress = reduce ? done : smooth

  const introOpacity = useTransform(progress, [0.25, 0.4], [1, 0])
  const introY = useTransform(progress, [0.25, 0.4], [0, -24])
  const mergedOpacity = useTransform(progress, [0.75, 0.79], [0, 1])
  const outroOpacity = useTransform(progress, [0.78, 0.92], [0, 1])
  const outroY = useTransform(progress, [0.78, 0.92], [24, 0])
  const outroVisibility = useTransform(outroOpacity, (o) => (o > 0.02 ? 'visible' : 'hidden'))

  // Space between neighbouring cards, measured from the real layout.
  useEffect(() => {
    const el = row.current
    if (!el) return
    const measure = () => {
      const [, a, b] = el.children // first child is the seamless overlay
      gap.set(a && b ? b.offsetLeft - (a.offsetLeft + a.offsetWidth) : 0)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [gap])

  useEffect(() => {
    new Image().src = flip.image // warm the cache before the backs come into view
  }, [])

  return (
    <section ref={root} id="academy" aria-label="NAAA TALKS Academy" className={cn('relative isolate', reduce ? '' : 'h-[280svh] max-sm:h-[230svh]')}>
      <div className={cn('flex h-svh min-h-[36rem] flex-col items-center justify-center overflow-clip bg-[#050505] px-4 pt-16', !reduce && 'sticky top-0')}>
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[46rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.32),transparent)]" />

        <motion.div style={{ opacity: introOpacity, y: introY }} className="max-w-xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-primary uppercase sm:text-[11px]">{flip.eyebrow}</p>
          <h2 className="mt-3 font-display text-[1.7rem] leading-[1.08] font-semibold tracking-[-0.02em] text-white sm:text-[2.4rem] lg:text-[2.8rem]">{flip.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#A1A1AA] sm:text-[15px]">{flip.text}</p>
        </motion.div>

        <div className="relative mt-7 w-full sm:mt-9">
          <div ref={row} style={{ '--card-w': CARD_W, '--card-w-sm': CARD_W_SM }} className="relative flex justify-center gap-3 [--w:var(--card-w)] [perspective:1200px] sm:gap-6 sm:[--w:var(--card-w-sm)] lg:gap-8">
            {/* One seamless copy of the image that takes over once the three backs have met */}
            <motion.div aria-hidden style={{ opacity: mergedOpacity, backgroundImage: IMAGE_LAYERS, backgroundSize: '100% 100%' }} className="pointer-events-none absolute top-0 left-1/2 z-10 aspect-[9/4.2] w-[calc(var(--w)*3)] -translate-x-1/2 rounded-[22px]" />
            {flip.stages.map((s, i) => <FlipCard key={s.key} stage={s} index={i} progress={progress} gap={gap} />)}
          </div>

          {/* Final message over the merged image */}
          <motion.div style={{ opacity: outroOpacity, y: outroY, visibility: outroVisibility }} className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end px-6 pb-[6%] text-center">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-primary uppercase sm:text-xs">{flip.finalEyebrow}</p>
            <h2 className="mt-2 font-display text-[1.5rem] leading-[1.05] font-semibold tracking-[-0.02em] text-white sm:text-[2.6rem] lg:text-[3.2rem]">{flip.finalTitle}</h2>
            <p className="mt-2 hidden max-w-lg text-sm leading-relaxed text-white/75 sm:block">{flip.finalText}</p>
            <Link to={flip.cta.href} className="pointer-events-auto group mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[12px] font-semibold text-white shadow-[0_12px_30px_-10px_rgb(255_23_68/0.9)] transition hover:bg-primary-hover sm:h-11 sm:text-[13px]">
              {flip.cta.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.div>
        </div>
        {/* Phones: closing line under the image (too small to overlay) */}
        <motion.p style={{ opacity: outroOpacity, visibility: outroVisibility }} className="mt-5 max-w-sm text-center text-[13px] leading-relaxed text-[#A1A1AA] sm:hidden">{flip.finalText}</motion.p>
      </div>
    </section>
  )
}
