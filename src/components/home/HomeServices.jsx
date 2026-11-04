import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const tabs = useRef([])
  // Arrow keys move between thumbnails (and select), as in a standard tab list.
  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? services.length - 1 : step ? (active + step + services.length) % services.length : null
    if (to === null) return
    e.preventDefault()
    onSelect(to)
    tabs.current[to]?.focus()
  }
  return (
    <div className="mt-3 grid gap-4 rounded-[24px] border border-white/[0.07] bg-[#0b0b0b] p-3 sm:p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1.5 py-2" role="tablist" aria-label="Choose a service" onKeyDown={onKeyDown}>
        {services.map((sv, i) => (
          <button
            key={sv.slug}
            ref={(n) => { tabs.current[i] = n }}
            id={`service-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="service-panel"
            tabIndex={i === active ? 0 : -1}
            aria-label={sv.title}
            onClick={() => onSelect(i)}
            className={cn('group relative w-12 shrink-0 rounded-xl transition-[filter,opacity,scale] duration-500 sm:w-14 lg:w-16', i === active ? 'scale-105 opacity-100' : 'opacity-45 brightness-75 hover:opacity-80')}
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

// One service at a time: the left details, the single active poster and the thumbnail
// strip all follow `active`; thumbnails are the only way to change it.
function Showcase({ services }) {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <section id="services" aria-label="Our services" className="relative isolate scroll-mt-20 overflow-x-clip section-y">
      <Glow />
      <Shell>
        <div className="grid gap-7 overflow-clip rounded-[28px] border border-white/[0.07] bg-[#080808] p-5 sm:rounded-[32px] sm:p-7 md:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] md:items-center md:gap-8 lg:gap-10 lg:p-9">
          <div className="flex min-w-0 flex-col gap-8 md:min-h-[26rem] md:justify-between">
            <Brand />
            <ServiceInfo service={s} index={active} total={services.length} large />
          </div>
          <div id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${active}`} className="relative grid min-w-0 place-items-center">
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[24rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)] blur-2xl" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.42, ease }}
                className="relative w-full max-w-[17.5rem] sm:max-w-[19rem] lg:max-w-[21rem]"
              >
                <Link to={`/services/${s.slug}`} aria-label={`${s.title}: explore service`} className="group block transition-[translate] duration-500 hover:-translate-y-2">
                  <ServicePoster service={s} index={active} className="shadow-[0_40px_80px_-40px_rgb(255_23_68/0.55)]" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <ThumbStrip services={services} active={active} onSelect={setActive} />
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
// Homepage "Our services": one service card at a time, chosen from the thumbnail strip.
export default function HomeServices() {
  const services = useServicePages().filter((s) => s.slug)
  if (!services.length) return null
  return <Showcase services={services} />
}
