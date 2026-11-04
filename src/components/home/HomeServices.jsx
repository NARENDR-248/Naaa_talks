import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useServicePages } from '@/hooks/useSiteContent'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { visualFor } from '@/lib/serviceVisuals'
import { Shell } from '@/components/portfolio/Kit'
import ServicePoster from './ServicePoster'

const CATEGORIES = ['Creativity', 'Strategy', 'Growth']
const pad = (n) => String(n + 1).padStart(2, '0')

// True from tablet width up, where the pinned horizontal story runs.
const WIDE = '(min-width: 768px)'
function useWide() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(WIDE)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(WIDE).matches,
    () => true,
  )
}

const word = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
  show: (i) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, delay: i * 0.06, ease } }),
  exit: { opacity: 0, y: '-0.4em', filter: 'blur(6px)', transition: { duration: 0.25 } },
}

// Active service details: title by word, description and button sliding in.
function ServiceInfo({ service, index, total, large = false }) {
  const v = visualFor(service)
  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex items-center gap-3 font-display text-sm font-semibold tabular-nums">
        <span className="relative inline-flex h-5 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={index} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.45, ease }} className="text-primary">{pad(index)}</motion.span>
          </AnimatePresence>
        </span>
        <span className="h-px w-10 overflow-hidden bg-white/15">
          <motion.span animate={{ scaleX: (index + 1) / total }} transition={{ duration: 0.5, ease }} className="block h-full origin-left bg-primary" />
        </span>
        <span className="text-white/40">{pad(total - 1)}</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={service.slug} initial="hidden" animate="show" exit="exit" className="mt-4">
          <h3 className={cn('font-display leading-[1.02] font-bold tracking-[-0.03em] text-white', large ? 'text-[1.9rem] lg:text-[2.6rem] xl:text-[3rem]' : 'text-[1.7rem]')}>
            {service.title.split(' ').map((w, i) => (
              <motion.span key={`${w}-${i}`} custom={i} variants={word} className="mr-[0.22em] inline-block">{w}</motion.span>
            ))}
          </h3>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.18, ease } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
            className="mt-4 max-w-sm text-sm leading-relaxed text-[#A1A1AA] lg:text-[15px]"
          >
            {service.summary || service.description}
          </motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.28, ease } }, exit: { opacity: 0, transition: { duration: 0.2 } } }} className="mt-6">
            <Link to={`/services/${service.slug}`} className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-primary pr-1.5 pl-5 text-[13px] font-semibold text-white shadow-[0_12px_30px_-12px_rgb(255_23_68/0.9)] transition hover:bg-primary-hover">
              Explore Service
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45"><ArrowRight className="size-4" aria-hidden /></span>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-semibold tracking-[0.22em] uppercase">
        {CATEGORIES.map((c, i) => (
          <span key={c} className={cn('transition-colors duration-500', c === v.category ? 'text-white' : 'text-white/30')}>
            {c}{i < CATEGORIES.length - 1 && <span className="ml-3 text-white/20">/</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

// Bottom strip: six thumbnails (active one framed in red) and a compact preview.
function ThumbStrip({ services, active, onSelect }) {
  const s = services[active]
  return (
    <div className="mt-3 grid gap-4 rounded-[24px] border border-white/[0.07] bg-[#0b0b0b] p-3 sm:p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 py-1" role="tablist" aria-label="Choose a service">
        {services.map((sv, i) => (
          <button
            key={sv.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={sv.title}
            onClick={() => onSelect(i)}
            className={cn('group relative w-12 shrink-0 rounded-xl transition-[filter,opacity] duration-500 sm:w-14 lg:w-16', i === active ? 'opacity-100' : 'opacity-45 brightness-75 hover:opacity-80')}
          >
            <ServicePoster service={sv} index={i} compact />
            {i === active && <motion.span layoutId="service-thumb" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="pointer-events-none absolute -inset-1 rounded-[14px] border-2 border-primary shadow-[0_0_18px_-2px_rgb(255_23_68/0.8)]" />}
          </button>
        ))}
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={s.slug} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35, ease }} className="max-w-[16rem] text-right">
            <p className="font-display text-sm font-semibold text-white">{s.title}</p>
            <p className="mt-0.5 line-clamp-1 text-xs text-[#A1A1AA]">{s.summary || s.description}</p>
          </motion.div>
        </AnimatePresence>
        <Link to="/services" className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 text-[12px] font-semibold text-white/85 transition hover:border-primary hover:text-white">
          All services <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}

// One poster on the pinned track: larger and flat at the focus point, smaller,
// dimmer and turned slightly away the further it sits from it.
function TrackPoster({ service, index, count, progress, active, onFocus }) {
  const offset = useTransform(progress, (p) => index - p * (count - 1))
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 1.5) * 0.1)
  const rotateY = useTransform(offset, (o) => Math.max(-1, Math.min(1, o)) * -12)
  const opacity = useTransform(offset, (o) => (o < -0.6 ? Math.max(0, 1 + (o + 0.6) * 2.2) : 1 - Math.min(o, 3) * 0.16))
  return (
    <motion.li style={{ scale, rotateY, opacity }} className="aspect-[7/10] h-full shrink-0 origin-left [transform-style:preserve-3d]">
      <Link
        to={`/services/${service.slug}`}
        aria-label={service.title}
        // Keyboard focus moves the page to this poster's spot in the story.
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && onFocus(index)}
        className={cn('group block h-full transition-[translate,filter] duration-500 hover:-translate-y-2', active && 'drop-shadow-[0_24px_50px_rgb(255_23_68/0.35)]')}
      >
        <ServicePoster service={service} index={index} className="size-full" />
      </Link>
    </motion.li>
  )
}

// Tablet and desktop: the section pins while vertical scroll slides the posters left.
function PinnedShowcase({ services }) {
  const n = services.length
  const section = useRef(null)
  const track = useRef(null)
  const distance = useMotionValue(0)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform([progress, distance], ([p, d]) => -p * d)
  useMotionValueEvent(progress, 'change', (p) => setActive(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))))))

  // Distance from the first poster to the last, measured from the real layout.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => {
      const [a, b] = el.children
      distance.set(a && b ? (b.offsetLeft - a.offsetLeft) * (n - 1) : 0)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [distance, n])

  // Thumbnail → scroll the page to the point where that service is in focus.
  // Keyboard focus jumps straight there ('instant'), so the focused poster is in view at once.
  const select = (i, behavior = 'smooth') => {
    const el = section.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (i / (n - 1)) * (el.offsetHeight - window.innerHeight) + 2, behavior })
  }

  return (
    <section ref={section} id="services" aria-label="Our services" className="relative isolate" style={{ height: `${100 + (n - 1) * 30}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-clip pt-20 pb-5">
        <Glow />
        <Shell className="w-full">
          <div className="grid h-[min(60svh,34rem)] grid-cols-[minmax(0,35fr)_minmax(0,65fr)] grid-rows-[minmax(0,1fr)] gap-6 overflow-clip rounded-[32px] border border-white/[0.07] bg-[#080808] p-6 lg:gap-10 lg:p-9">
            <div className="flex min-w-0 flex-col justify-between">
              <Brand />
              <ServiceInfo service={services[active]} index={active} total={n} large />
            </div>
            <div className="relative min-w-0 [perspective:1400px] [mask-image:linear-gradient(90deg,#000_88%,transparent)]">
              <motion.ul ref={track} style={{ x }} className="flex h-full gap-5 will-change-transform [transform-style:preserve-3d]">
                {services.map((s, i) => <TrackPoster key={s.slug} service={s} index={i} count={n} progress={progress} active={i === active} onFocus={(j) => select(j, 'instant')} />)}
              </motion.ul>
            </div>
          </div>
          <ThumbStrip services={services} active={active} onSelect={select} />
        </Shell>
      </div>
    </section>
  )
}

// Phones (and reduced motion): a swipeable poster carousel with the same details and strip.
function SwipeShowcase({ services }) {
  const list = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = list.current
    if (!el) return
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      ;[...el.children].forEach((c, i) => {
        if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(el.children[best].offsetLeft + el.children[best].offsetWidth / 2 - mid)) best = i
      })
      setActive(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const select = (i) => {
    const el = list.current
    const c = el?.children[i]
    if (c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section id="services" aria-label="Our services" className="relative isolate overflow-x-clip section-y">
      <Glow />
      <Shell>
        <div className="rounded-[28px] border border-white/[0.07] bg-[#080808] py-5">
          <div className="px-5"><Brand /></div>
          <ul ref={list} className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-[14%]" aria-label="Services">
            {services.map((s, i) => (
              <motion.li key={s.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05, ease }} className="w-[72%] shrink-0 snap-center">
                <Link to={`/services/${s.slug}`} aria-label={s.title} className={cn('group block transition-[scale,opacity] duration-500', i === active ? 'scale-100' : 'scale-[0.92] opacity-60')}>
                  <ServicePoster service={s} index={i} />
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 px-5"><ServiceInfo service={services[active]} index={active} total={services.length} /></div>
        </div>
        <ThumbStrip services={services} active={active} onSelect={select} />
      </Shell>
    </section>
  )
}

function Brand() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span className="relative flex size-2.5"><span className="absolute inset-0 animate-ping rounded-full bg-primary/70 motion-reduce:hidden" /><span className="relative size-2.5 rounded-full bg-primary" /></span>
      <span className="font-display text-xs font-bold tracking-[0.18em] whitespace-nowrap text-white">NAAA TALKS</span>
      <span className="h-3 w-px bg-white/20" />
      <span className="text-[10px] font-semibold tracking-[0.24em] whitespace-nowrap text-white/50 uppercase">Our services</span>
    </div>
  )
}

// Soft red ambient light drifting behind the showcase.
function Glow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div animate={{ x: [0, 80, 0], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 -left-32 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.35),transparent)]" />
      <motion.div animate={{ x: [0, -70, 0], opacity: [0.45, 0.8, 0.45] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.18),transparent)]" />
    </div>
  )
}

// Homepage "Our services": a cinematic horizontal showcase of the service pages.
export default function HomeServices() {
  const services = useServicePages().filter((s) => s.slug)
  const wide = useWide()
  const reduce = useReducedMotion()
  if (!services.length) return null
  return wide && !reduce ? <PinnedShowcase services={services} /> : <SwipeShowcase services={services} />
}
