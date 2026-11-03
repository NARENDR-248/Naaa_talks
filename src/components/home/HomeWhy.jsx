import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Camera, Check, ChevronDown, GraduationCap, Rocket, Star, TrendingUp, UsersRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { REVEAL, ease } from '@/lib/motion'
import { cn } from '@/lib/cn'

const { whyChoose } = portfolioData
const ICONS = { quality: Star, camera: Camera, grow: TrendingUp, team: UsersRound, educate: GraduationCap, execution: Rocket }
// How far the ring turns over the pinned scroll (radians), and where the first card starts.
const SWEEP = Math.PI * 1.7
const START = -Math.PI / 2

// Orbit size for the current stage: cards stay inside the width and clear of the headline.
function orbitSize(w, h) {
  const card = w >= 1024 ? 176 : w >= 640 ? 144 : 104
  return {
    // Phones: let side cards slip partly past the edge (as in the reference) so they
    // pass beside the headline rather than behind it.
    rx: w < 640 ? w / 2 - card * 0.12 : Math.min(w / 2 - card / 2 - 10, 560),
    ry: Math.min(h / 2 - card * 0.4 - 70, 300),
  }
}

// One card on the invisible ellipse: x = rx·cos(a), y = ry·sin(a). It never rotates;
// cards lower on the ellipse are "in front": larger, brighter and above the others.
function OrbitCard({ item, index, count, turn, enter, rx, ry }) {
  const Icon = ICONS[item.icon] ?? Star
  const base = START + (index / count) * Math.PI * 2
  const angle = useTransform(turn, (p) => base + p * SWEEP)
  const spread = useTransform(enter, (e) => 0.3 + 0.7 * e)
  const x = useTransform([angle, rx, spread], ([a, r, s]) => Math.cos(a) * r * s)
  const y = useTransform([angle, ry, spread], ([a, r, s]) => Math.sin(a) * r * s)
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2)
  const scale = useTransform([depth, enter], ([d, e]) => (0.76 + 0.3 * d) * (0.55 + 0.45 * e))
  const opacity = useTransform([depth, enter], ([d, e]) => (0.38 + 0.62 * d) * e)
  const zIndex = useTransform(depth, (d) => Math.round(d * 10))
  const glow = useTransform(depth, (d) => Math.max(0, (d - 0.72) / 0.28))

  return (
    <motion.div style={{ x, y, scale, opacity, zIndex }} className="absolute top-1/2 left-1/2 will-change-transform">
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div className="relative aspect-[4/3] w-[104px] overflow-hidden rounded-2xl border border-white/12 bg-[#111] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] sm:w-36 sm:rounded-[18px] lg:w-44">
          <img src={item.image} alt="" loading="lazy" draggable={false} className="size-full object-cover" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
          <span className="absolute right-2 bottom-2 left-2 flex items-center gap-1.5 sm:right-2.5 sm:bottom-2.5 sm:left-2.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#FF1744] text-white sm:size-6">
              <Icon className="size-3 sm:size-3.5" strokeWidth={2} aria-hidden />
            </span>
            <span className="line-clamp-2 text-[10px] leading-tight font-semibold text-white sm:text-xs">{item.label}</span>
          </span>
          {/* Red edge that brightens as the card swings to the front */}
          <motion.span aria-hidden style={{ opacity: glow }} className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#FF1744]/80 shadow-[inset_0_0_24px_rgb(255_23_68/0.25)]" />
        </div>
        <motion.span aria-hidden style={{ opacity: glow }} className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-[radial-gradient(closest-side,rgb(255_23_68/0.35),transparent)] blur-md" />
      </div>
    </motion.div>
  )
}

// Homepage "Why choose NAAA TALKS": the section pins while scrolling turns six cards
// around the fixed headline (forwards on scroll down, backwards on scroll up, still when
// the page is still). Reduced-motion visitors get the same layout without the pin or motion.
export default function HomeWhy() {
  const track = useRef(null)
  const stage = useRef(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(420)
  const ry = useMotionValue(240)

  // Pinned scroll → orbit progress, lightly smoothed so it glides like a scrub.
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 })
  // Section entering the screen → cards spread out from the centre and fade in.
  const { scrollYProgress: entering } = useScroll({ target: track, offset: ['start end', 'start 0.15'] })
  const enterSmooth = useSpring(entering, { stiffness: 90, damping: 26, mass: 0.35 })
  const still = useMotionValue(0)
  const full = useMotionValue(1)
  const turn = reduce ? still : smooth
  const enter = reduce ? full : enterSmooth
  const hint = useTransform(smooth, [0, 0.12], [1, 0])

  // Keep the orbit fitted to the stage; motion values only, so resizing never re-renders.
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const s = orbitSize(entry.contentRect.width, entry.contentRect.height)
      rx.set(s.rx)
      ry.set(s.ry)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [rx, ry])

  return (
    <section ref={track} aria-label="Why choose NAAA TALKS" className={cn('relative isolate', reduce ? '' : 'h-[240vh] lg:h-[280vh]')}>
      <div ref={stage} className={cn('relative h-svh min-h-[34rem] overflow-hidden', !reduce && 'sticky top-0')}>
        {/* Ambient red glow behind the headline */}
        <motion.div aria-hidden initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={REVEAL} transition={{ duration: 1.6, ease }} className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 size-[44rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.42),transparent)]" />
          <div className="absolute top-1/2 left-1/2 h-48 w-[30rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-glow-breathe rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.2),transparent)] blur-2xl" />
        </motion.div>

        {whyChoose.orbit.map((item, i) => (
          <OrbitCard key={item.label} item={item} index={i} count={whyChoose.orbit.length} turn={turn} enter={enter} rx={rx} ry={ry} />
        ))}

        {/* Fixed centre: stays put while the cards move around it */}
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-6">
          <div className="relative max-w-[14.5rem] text-center sm:max-w-md">
            <span aria-hidden className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-full bg-[radial-gradient(closest-side,#050505_45%,transparent)]" />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.22em] text-white/55 uppercase sm:text-[11px]"
            >
              <Check className="size-3.5 text-[#FF1744]" strokeWidth={3} aria-hidden />Why choose NAAA TALKS?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={REVEAL}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-3 font-display text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.6rem]"
            >
              We Create <span className="text-[#FF1744] [text-shadow:0_0_40px_rgb(255_23_68/0.45)]">Impact.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="mt-3 text-[13px] leading-relaxed text-[#A1A1AA] sm:mt-4 sm:text-[15px]"
            >
              {whyChoose.orbitText}
            </motion.p>
          </div>
        </div>

        {!reduce && (
          <motion.div aria-hidden style={{ opacity: hint }} className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.24em] text-white/40 uppercase">
            Scroll to explore
            <ChevronDown className="size-4 animate-float text-[#FF1744]" aria-hidden />
          </motion.div>
        )}
      </div>
    </section>
  )
}
