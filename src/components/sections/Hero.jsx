import { motion } from 'framer-motion'
import { ArrowRight, Camera, ChartNoAxesColumnIncreasing, GraduationCap, Play, Video, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useJourneys } from '@/hooks/useJourneys'
import { ease } from '@/lib/motion'
import { MotionLink } from '@/lib/motionLink'
import { BrushStroke, Scribble } from '@/components/hero/Brush'
import HeroVisual, { HeroStats } from '@/components/hero/HeroVisual'

const SERVICES = [
  { icon: Camera, label: 'Content Creation', href: '/content-production' },
  { icon: ChartNoAxesColumnIncreasing, label: 'Digital Marketing', href: '/services' },
  { icon: Video, label: 'Video Production', href: '/content-production#work' },
  { icon: GraduationCap, label: 'Creator Education', href: '/academy' },
]

const slideIn = (delay) => ({ initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay, ease } })

export default function Hero() {
  const { hero, ctas } = useSiteContent().settings
  const journeys = useJourneys()
  const [line1, line2] = hero.title

  return (
    <section id="top" className="relative isolate overflow-hidden pt-24 pb-7 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-end lg:pb-0">
      {/* stage lighting: red edges, a slow drifting glow, and a neon arc bottom-left */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_0%_100%,rgb(200_10_30/0.45),transparent_70%),radial-gradient(45%_60%_at_100%_40%,rgb(220_14_36/0.4),transparent_70%),radial-gradient(40%_40%_at_10%_0%,rgb(150_8_24/0.35),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-ink-950" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-[20%] -z-10 size-[36rem] max-w-[120vw] rounded-full bg-[radial-gradient(closest-side,rgb(255_16_31/0.22),transparent)]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span aria-hidden className="pointer-events-none absolute -bottom-[20rem] -left-[20rem] -z-10 hidden size-[38rem] rounded-full border-2 border-signal-500/80 shadow-[0_0_34px_rgb(255_16_31/0.7),inset_0_0_30px_rgb(255_16_31/0.4)] lg:block" />

      <div className="mx-auto grid w-full max-w-[100rem] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,41fr)_minmax(0,59fr)] lg:items-end lg:gap-4 lg:pr-0 lg:pl-[5vw] 2xl:pl-[6vw]">
        <div className="relative z-10 lg:pb-9">
          <motion.p {...slideIn(0)} className="inline-flex items-center gap-2 rounded-full border border-signal-500/45 bg-black/40 px-4 py-2 text-sm text-white/90 backdrop-blur sm:text-[15px]">
            <Zap className="size-4 fill-signal-500 text-signal-500" aria-hidden />{hero.eyebrow}
          </motion.p>

          <motion.h1 {...slideIn(0.08)} className="mt-6 font-display text-[2.3rem] leading-[1.06] font-bold tracking-[-0.03em] text-white/95 sm:text-6xl lg:text-[clamp(3rem,4.1vw,4.4rem)]">
            {line1}
            {line2 && <><br />{line2}</>}
            {hero.highlight && (
              <span className="relative mt-3 -ml-3 inline-block px-4 pt-2 pb-4 text-[0.86em] whitespace-nowrap sm:-ml-4 sm:px-7 sm:text-[0.96em]">
                <BrushStroke className="inset-0 size-full -rotate-[3deg]" />
                <span className="relative inline-block -skew-x-[9deg] font-extrabold tracking-[-0.02em] text-white">{hero.highlight}</span>
                <Scribble className="-bottom-5 right-[2%] w-[38%]" />
              </span>
            )}
          </motion.h1>

          <motion.p {...slideIn(0.16)} className="mt-7 max-w-xl text-base leading-relaxed xl:mt-9 text-white/80 sm:text-lg xl:text-[clamp(1.05rem,1.3vw,1.3rem)]">
            {hero.subtitle}
          </motion.p>

          <motion.div {...slideIn(0.24)} className="mt-7 flex flex-col xl:mt-8 gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MotionLink
              to={journeys.business.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#ff2433,#d80d20)] px-8 text-[17px] font-semibold text-white shadow-[0_12px_40px_-10px_rgb(255_16_31/0.8)]"
            >
              {journeys.business.label} <ArrowRight className="size-5" aria-hidden />
            </MotionLink>
            <MotionLink
              to="/portfolio"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/70 px-8 text-[17px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <span className="grid size-6 place-items-center rounded-full bg-white text-black"><Play className="ml-0.5 size-3 fill-current" aria-hidden /></span>
              {ctas.showreel || 'Watch Showreel'}
            </MotionLink>
          </motion.div>

          {/* four capabilities: icon over label, split by hairlines */}
          <motion.ul {...slideIn(0.34)} className="mt-9 grid max-w-xl grid-cols-4 xl:mt-11">
            {SERVICES.map(({ icon: Icon, label, href }, i) => (
              <li key={label} className={i ? 'border-l border-white/10' : ''}>
                <Link to={href} className="group flex flex-col items-center gap-2.5 px-1 text-center text-[11px] leading-tight text-white/75 transition-colors hover:text-white sm:text-[13px]">
                  <Icon className="size-6 text-signal-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 sm:size-7" strokeWidth={1.6} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative">
          <HeroVisual tagline={hero.note} />
          <HeroStats className="mt-4 lg:hidden" />
        </div>
      </div>
    </section>
  )
}
