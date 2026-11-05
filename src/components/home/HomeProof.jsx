import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Shell } from '@/components/portfolio/Kit'
import HomeHeading from './HomeHeading'

const { clientsSection } = portfolioData
const roundBtn = 'grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-primary hover:text-white'

// Shown instead of invented content until real, permission-confirmed entries exist.
function Pending({ children }) {
  return <p className="mt-6 rounded-2xl border border-dashed border-white/12 px-5 py-4 text-sm text-[#A1A1AA]">{children}</p>
}

// Logo tiles reveal one after another; the strip only starts moving once they have.
const logoList = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }
const logoIn = {
  hidden: { opacity: 0, y: 26, scale: 0.92, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
}

// Per-card float settings so neighbours drift out of step: offset, tilt, speed, phase.
const FLOAT = [
  { y: 0, rot: 0.8, dur: 6.2, delay: 0 },
  { y: 10, rot: -1.1, dur: 7.1, delay: -2.4 },
  { y: 4, rot: 0.6, dur: 6.6, delay: -4.1 },
  { y: 12, rot: -0.7, dur: 7.6, delay: -1.2 },
  { y: 2, rot: 1, dur: 6.9, delay: -3.3 },
  { y: 8, rot: -0.9, dur: 6.4, delay: -5.2 },
]

// One client card, floating gently. At rest: a soft white silhouette on dark glass.
// Active (the cycling highlight) or hovered: original colours, red border and glow.
function ClientLogo({ client: c, index, hidden, active }) {
  const Wrap = c.website && !hidden ? 'a' : 'div'
  const link = Wrap === 'a' ? { href: c.website, target: '_blank', rel: 'noopener noreferrer' } : {}
  const f = FLOAT[index % FLOAT.length]
  const plate = c.plate === 'light' ? 'bg-white' : 'bg-white/[0.06]'
  return (
    <motion.li variants={logoIn} aria-hidden={hidden || undefined} className="shrink-0 pr-4 sm:pr-5 lg:pr-10">
      <div
        style={{ '--float-y': `${f.y}px`, '--float-rot': `${f.rot}deg`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
        className="animate-card-float motion-reduce:animate-none"
      >
        <Wrap
          {...link}
          tabIndex={hidden ? -1 : undefined}
          className={cn(
            // Fixed card; the logo is fitted inside a padded box (flex centring, so max-height is
            // measured against the card, never the image's own height).
            'group/logo relative flex h-20 w-[8.5rem] items-center justify-center overflow-hidden rounded-2xl border p-3 backdrop-blur-sm transition-[background-color,border-color,box-shadow,scale] duration-500 sm:h-24 sm:w-40 sm:p-4 lg:h-[110px] lg:w-[190px] lg:p-5',
            'hover:scale-[1.06] hover:border-primary/60 hover:shadow-[0_22px_55px_-22px_rgb(255_23_68/0.8)]',
            c.plate === 'light' ? 'hover:bg-white' : 'hover:bg-white/[0.06]',
            active
              ? cn('scale-[1.06] border-primary/70 shadow-[0_0_0_1px_rgb(255_23_68/0.25),0_22px_60px_-20px_rgb(255_23_68/0.85)]', plate)
              : 'border-white/[0.08] bg-[linear-gradient(160deg,rgb(255_255_255/0.05),rgb(255_255_255/0.012))]',
          )}
        >
          {/* Soft top sheen on the glass */}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent" />
          {c.logo ? (
            <img
              src={c.logo}
              alt={hidden ? '' : c.name}
              loading="lazy"
              draggable={false}
              className={cn(
                'relative block h-auto max-h-full w-auto max-w-full object-contain object-center transition-[filter,opacity] duration-500',
                // At rest: muted greyscale (dark-ink logos are inverted so they stay visible on
                // the dark card). Active or hovered: the original colours.
                active
                  ? 'opacity-100'
                  : cn('opacity-60 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0', c.plate === 'light' && 'invert group-hover/logo:invert-0'),
              )}
            />
          ) : (
            <span className={cn('relative text-center font-display text-base font-semibold transition-colors duration-500 group-hover/logo:text-white', active ? 'text-white' : 'text-white/60')}>{c.name}</span>
          )}
        </Wrap>
      </div>
    </motion.li>
  )
}

// Client logos (published with permission) on an endless strip that pauses on hover.
export function HomeClients() {
  const { clients } = useSiteContent()
  const reduce = useReducedMotion()
  const [moving, setMoving] = useState(false)
  const [active, setActive] = useState(0)
  // The strip is two copies of the list, so sliding it by half loops seamlessly.
  const loop = reduce ? clients : [...clients, ...clients]

  // Once the strip is moving, the red highlight hops to the next client every few seconds
  // (both copies light up, so a highlighted card is always on screen).
  useEffect(() => {
    if (!moving || reduce || clients.length < 2) return
    const t = setInterval(() => setActive((n) => (n + 1) % clients.length), 2600)
    return () => clearInterval(t)
  }, [moving, reduce, clients.length])

  return (
    <section id="clients" aria-label="Our clients" className="relative isolate scroll-mt-20 overflow-x-clip section-y">
      <motion.div aria-hidden initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={REVEAL} transition={{ duration: 1.8, ease }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-[58%] h-[28rem] -translate-y-1/2 bg-[radial-gradient(60%_55%_at_50%_50%,rgb(140_10_30/0.3),transparent_70%)]" />
        <motion.div
          animate={reduce ? undefined : { x: ['-30%', '30%', '-30%'], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[58%] left-1/2 h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.18),transparent)] blur-2xl"
        />
      </motion.div>
      <Shell>
        <HomeHeading eyebrow="Our clients" title="Brands That Trust Our Creativity." />
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={REVEAL}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-5 block h-[2px] w-20 origin-left rounded-full bg-gradient-to-r from-primary to-primary/0"
        />
      </Shell>

      {clients.length === 0 ? (
        <Shell><Pending>{clientsSection.empty}</Pending></Shell>
      ) : (
        <div className="relative mx-auto mt-6 max-w-[90rem] overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:mt-7">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={REVEAL}
            variants={logoList}
            onAnimationComplete={(def) => def === 'show' && setMoving(true)}
            onViewportEnter={() => setTimeout(() => setMoving(true), 1600)}
            aria-label="Client logos"
            style={{ animationDuration: `${Math.max(clients.length, 4) * 5}s` }}
            className={cn(
              'flex items-center',
              reduce ? 'flex-wrap justify-center gap-y-4 px-4' : 'w-max hover:[animation-play-state:paused]',
              moving && !reduce && 'animate-marquee',
            )}
          >
            {loop.map((c, i) => <ClientLogo key={`${c.id}-${i}`} client={c} index={i} hidden={i >= clients.length} active={moving && !reduce && i % clients.length === active} />)}
          </motion.ul>
        </div>
      )}
    </section>
  )
}

// One testimonial at a time with previous / next controls. Hidden until a
// genuine, permission-confirmed testimonial is published.
export function HomeTestimonial() {
  const { testimonials } = useSiteContent()
  const [i, setI] = useState(0)
  const t = testimonials[i % Math.max(testimonials.length, 1)]
  const step = (d) => setI((n) => (n + d + testimonials.length) % testimonials.length)
  if (!t) return null
  return (
    <section aria-label="Testimonials" className="relative isolate section-y">
      <Shell>
        <HomeHeading eyebrow="In their words" title="What Clients & Creators Say." />
          <div className="mt-8 grid items-center gap-6 rounded-[22px] border border-white/10 bg-[#101010] p-6 sm:p-8 lg:grid-cols-[1fr_auto_auto] lg:gap-10">
            <AnimatePresence mode="wait">
              <motion.blockquote key={t.id ?? i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }} className="flex gap-4">
                <Quote className="size-10 shrink-0 fill-primary text-primary" aria-hidden />
                <p className="text-[15px] leading-relaxed text-white/85 sm:text-base">“{t.quote}”</p>
              </motion.blockquote>
            </AnimatePresence>
            <div className="flex items-center gap-3 border-white/10 lg:border-l lg:pl-10">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[#7a0a1a] font-display text-base font-semibold text-white">
                {String(t.name).split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}
              </span>
              <span>
                <span className="block font-semibold text-white">{t.name}</span>
                {t.role && <span className="block text-xs text-[#A1A1AA]">{t.role}</span>}
              </span>
            </div>
            {testimonials.length > 1 && (
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial" className={roundBtn}><ArrowLeft className="size-4" aria-hidden /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next testimonial" className={roundBtn}><ArrowRight className="size-4" aria-hidden /></button>
              </div>
            )}
          </div>
      </Shell>
    </section>
  )
}
