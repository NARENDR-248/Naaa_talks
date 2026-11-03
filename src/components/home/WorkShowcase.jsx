import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease } from '@/lib/motion'
import { projectToMedia } from '@/lib/projectMedia'
import { cn } from '@/lib/cn'
import { Shell } from '@/components/portfolio/Kit'
import MediaModal from '@/components/portfolio/MediaModal'
import HomeHeading from './HomeHeading'

const GAP = 16
// Cards sweep in from the right out of a blur, one after another.
const track = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const slide = {
  hidden: { opacity: 0, x: 80, scale: 0.94, filter: 'blur(8px)' },
  show: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

function ProjectCard({ project: p, onOpen }) {
  return (
    <motion.li variants={slide} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play ${p.title}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#101010] text-left transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-[#FF1744]/50 hover:shadow-[0_30px_60px_-30px_rgb(255_23_68/0.6)]"
      >
        {p.thumbnail && <img src={p.thumbnail} alt="" loading="lazy" className="size-full object-cover transition-[scale,filter] duration-[1.2s] ease-out group-hover:scale-[1.08] group-hover:saturate-125" />}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />
        {/* Light sweep on hover */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-[card-shine_1s_ease-out]" />

        <span className="absolute top-3 left-3 rounded-full bg-[#FF1744] px-2.5 py-1 text-[10px] font-semibold text-white transition-transform duration-500 group-hover:-translate-y-0.5">{p.category}</span>
        {p.is_sample && <span className="absolute top-3 right-3 rounded-full bg-black/70 px-2 py-1 text-[9px] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">Sample</span>}

        <span aria-hidden className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#FF1744]/60 motion-reduce:hidden" />
          <span className="relative grid size-12 place-items-center rounded-full bg-[#FF1744] text-white shadow-[0_0_30px_rgb(255_23_68/0.6)] transition-transform duration-500 group-hover:scale-[1.18]">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
        </span>

        <span className="absolute right-3 bottom-3 left-4 flex items-end justify-between gap-3">
          <span className="font-display text-[15px] font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1">{p.title}</span>
          <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border border-white/25 text-white/80 transition duration-500 group-hover:rotate-45 group-hover:border-[#FF1744] group-hover:bg-[#FF1744] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </button>
    </motion.li>
  )
}

// Homepage "Our work": an auto-advancing, swipeable row of project cards (three per view
// on desktop). Autoplay pauses on hover, keyboard focus, while a video is open, when the
// section is off screen, with the pause button, and for reduced-motion visitors.
export default function WorkShowcase() {
  const projects = useSiteContent().projects.slice(0, 8)
  const section = useRef(null)
  const list = useRef(null)
  const inView = useInView(section, { amount: 0.35 })
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [stops, setStops] = useState(1)
  const [modal, setModal] = useState(null)
  const [hover, setHover] = useState(false)
  const [stopped, setStopped] = useState(false)

  // The active dot follows the scroll position (swipe included); `stops` is how many
  // distinct positions the row can scroll to at the current width.
  useEffect(() => {
    const el = list.current
    if (!el) return
    const step = () => (el.firstElementChild?.offsetWidth ?? 1) + GAP
    const onScroll = () => setIndex(Math.round(el.scrollLeft / step()))
    const measure = () => setStops(Math.max(1, Math.round((el.scrollWidth - el.clientWidth) / step()) + 1))
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
    }
  }, [projects.length])

  const goTo = (i) => {
    const el = list.current
    const card = el?.children[(i + stops) % stops]
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  if (!projects.length) return null
  const hasSamples = projects.some((p) => p.is_sample)
  const autoplay = !reduce && !stopped && stops > 1
  const paused = !autoplay || hover || !inView || !!modal
  const current = Math.min(index, stops - 1)

  return (
    <section ref={section} id="work" aria-label="Our work" className="relative isolate scroll-mt-20 overflow-x-clip section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/2 -right-40 -z-10 size-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.3),transparent)]" />
      <Shell>
        <HomeHeading eyebrow="Our work" title={['Stories Worth', 'Stopping For.']} text={portfolioData.home.workText} action={{ label: 'View Full Portfolio', href: '/portfolio' }} />

        <div onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)} onPointerLeave={() => setHover(false)} onFocus={(e) => e.target.matches(':focus-visible') && setHover(true)} onBlur={() => setHover(false)}>
          <motion.ul
            ref={list}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL}
            variants={track}
            className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pt-1 pb-2"
            aria-label="Featured projects"
          >
            {projects.map((p) => <ProjectCard key={p.id} project={p} onOpen={() => setModal(projectToMedia(p, 'landscape'))} />)}
          </motion.ul>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a project">
                {Array.from({ length: stops }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to ${projects[i]?.title ?? `slide ${i + 1}`}`}
                    onClick={() => goTo(i)}
                    className={cn('relative h-1.5 overflow-hidden rounded-full transition-all duration-500', i === current ? 'w-10 bg-white/15' : 'w-1.5 bg-white/25 hover:bg-white/50')}
                  >
                    {i === current && (
                      <span
                        key={`${current}-${autoplay}`}
                        onAnimationEnd={() => goTo(current + 1)}
                        style={{ animationPlayState: paused ? 'paused' : 'running' }}
                        className={cn('absolute inset-0 origin-left rounded-full bg-[#FF1744]', autoplay && 'animate-autoplay-fill')}
                      />
                    )}
                  </button>
                ))}
              </div>
              <span className="font-display text-xs font-semibold text-white/40 tabular-nums" aria-hidden>
                <span className="text-white">{String(current + 1).padStart(2, '0')}</span> / {String(stops).padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-2">
              {!reduce && stops > 1 && (
                <button type="button" onClick={() => setStopped((s) => !s)} aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'} className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[#FF1744] hover:text-white">
                  {stopped ? <Play className="ml-0.5 size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
                </button>
              )}
              {[[ArrowLeft, -1, 'Previous'], [ArrowRight, 1, 'Next']].map(([Icon, d, label]) => (
                <motion.button key={label} type="button" whileTap={{ scale: 0.9 }} onClick={() => goTo(current + d)} aria-label={`${label} projects`} className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[#FF1744] hover:bg-[#FF1744] hover:text-white">
                  <Icon className="size-4" aria-hidden />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        {hasSamples && <p className="mt-3 text-[11px] text-white/35">{portfolioData.archive.sampleNotice}</p>}
      </Shell>
      <MediaModal item={modal} onClose={() => setModal(null)} />
    </section>
  )
}
