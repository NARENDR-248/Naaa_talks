import { useMemo, useRef, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clapperboard, Play } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'
import { projectToMedia } from '@/lib/projectMedia'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useSnapCarousel } from '@/hooks/useSnapCarousel'
import { Photo } from '@/components/ui/Primitives'
import { Eyebrow, Fade, RevealLine, Shell } from '@/components/portfolio/Kit'
import ArchiveCard from '@/components/portfolio/ArchiveCard'
import CtaBanner from '@/components/portfolio/CtaBanner'
import MediaModal from '@/components/portfolio/MediaModal'

const { archive, projectCategories } = portfolioData
const ease = [0.22, 1, 0.36, 1]

// Editorial slot sequence for a run of n cards (desktop 12-col grid).
// Each pattern fills complete rows so no holes appear at any filter size.
const A = ['big', 'tall5']
const B = ['tall4', 'tall4', 'tall4']
const C = ['wide5', 'wide7']
const PATTERNS = { 1: ['single'], 2: A, 3: [...A, 'full'], 4: [...A, ...C], 5: [...A, ...B], 6: [...A, ...B, 'full'], 7: [...A, ...B, ...C], 8: [...A, ...B, ...C, 'full'] }
function slotsFor(n) {
  const out = []
  for (let i = 0; i < n; i += 8) out.push(...PATTERNS[Math.min(8, n - i)])
  return out
}

const showreelMedia = (r) => ({ title: r.title, category: r.eyebrow, image: r.thumbnail, videoUrl: r.videoUrl, embedUrl: r.embedUrl, link: r.link, platform: r.platform, aspect: 'landscape' })

function ShowreelTile({ reel, onOpen }) {
  return (
    <Fade delay={0.2} className="w-full lg:max-w-[25rem]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Watch showreel: ${reel.title}`}
        className="group flex w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 pr-4 text-left sm:gap-4 sm:p-2.5 sm:pr-5 transition-colors hover:border-signal-500/45 hover:bg-white/[0.05]"
      >
        <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg sm:w-36 sm:rounded-xl">
          <Photo src={reel.thumbnail} alt="" className="absolute inset-0 size-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 grid place-items-center bg-black/35">
            <span className="grid size-8 place-items-center rounded-full bg-signal-500 sm:size-10 text-white shadow-[0_8px_24px_-6px_rgb(255_23_68/0.9)] transition-transform group-hover:scale-110">
              <Play className="ml-0.5 size-3.5 fill-current sm:size-4" />
            </span>
          </span>
          {reel.duration && <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1 text-[9px] sm:right-1.5 sm:bottom-1.5 sm:px-1.5 sm:text-[10px] font-semibold text-white tabular-nums">{reel.duration}</span>}
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold tracking-[0.22em] text-signal-400 uppercase">{reel.eyebrow}</span>
          <span className="mt-0.5 block font-display text-[15px] leading-snug text-white sm:mt-1 sm:text-lg">{reel.title}</span>
          <span className="mt-0.5 hidden text-xs font-semibold text-white/50 sm:mt-1 sm:block underline-offset-4 group-hover:text-white group-hover:underline">Watch showreel</span>
        </span>
      </button>
    </Fade>
  )
}

function StepButton({ dir, disabled, onClick }) {
  const Icon = dir < 0 ? ArrowLeft : ArrowRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous project' : 'Next project'}
      className="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/85 transition active:scale-95 enabled:active:bg-signal-500 disabled:opacity-30"
    >
      <Icon className="size-[18px]" />
    </button>
  )
}

// Only categories that currently have work are offered as filters.
function Filters({ projects, value, onChange }) {
  const count = (v) => (v === 'all' ? projects.length : projects.filter((p) => p.category === v).length)
  const filters = [{ label: 'All Work', value: 'all' }, ...projectCategories.map((c) => ({ label: c, value: c }))].filter((f) => count(f.value) > 0)
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div role="group" aria-label="Filter projects by category" className="flex w-max gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1 sm:gap-1.5 sm:p-1.5">
        {filters.map((f) => {
          const n = count(f.value)
          const on = value === f.value
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={on}
              disabled={n === 0}
              onClick={() => onChange(f.value)}
              className={cn(
                'relative flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12px] sm:h-10 sm:gap-2 sm:px-4 sm:text-[13px] font-medium whitespace-nowrap transition-colors disabled:opacity-35',
                on ? 'text-white' : 'text-white/55 hover:text-white',
              )}
            >
              {on && <motion.span layoutId="archive-filter" className="absolute inset-0 rounded-full bg-signal-500 shadow-[0_8px_24px_-8px_rgb(255_23_68/0.9)]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="relative">{f.label}</span>
              <span className={cn('relative text-[10px] tabular-nums sm:text-[11px]', on ? 'text-white/80' : 'text-white/30')}>{String(n).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// `limit` caps how many pieces the homepage shows; the Portfolio page shows all.
export default function ReelGallery({ limit, as: Tag = 'section' }) {
  const projects = useSiteContent().projects
  const [filter, setFilter] = useState('all')
  const [shown, setShown] = useState('all')
  const [modalItem, setModalItem] = useState(null)
  const controls = useAnimationControls()
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const { active, spacer, goTo } = useSnapCarousel(trackRef, { reduceMotion: reduce })

  const list = useMemo(() => {
    const filtered = shown === 'all' ? projects : projects.filter((p) => p.category === shown)
    return limit ? filtered.slice(0, limit) : filtered
  }, [shown, projects, limit])
  const slots = slotsFor(list.length)

  // Desktop: progress line follows scroll through the gallery.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.85', 'end 0.55'] })
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const selectFilter = async (value) => {
    if (value === filter) return
    setFilter(value)
    await controls.start({ opacity: 0, y: 14, transition: { duration: 0.22, ease: 'easeIn' } })
    setShown(value)
    trackRef.current?.scrollTo({ left: 0 })
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.35, ease } })
  }

  return (
    <Tag id={archive.id} aria-label="Portfolio" className="relative isolate scroll-mt-16 overflow-hidden py-14 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute top-40 -right-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(120_10_30/0.35),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute bottom-1/4 -left-48 -z-10 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(170_14_40/0.22),transparent)]" />

      <Shell>
        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Fade><Eyebrow>{archive.eyebrow}</Eyebrow></Fade>
            <h2 className="mt-3 font-display sm:mt-4 text-[2.1rem] leading-[1.06] font-light tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              <RevealLine delay={0}>{archive.title[0]}</RevealLine>
              <RevealLine delay={0.12} className="text-white/45">{archive.title[1]}</RevealLine>
            </h2>
            <motion.span
              aria-hidden
              className="mt-4 block h-[2px] w-20 sm:mt-5 sm:w-24 origin-left rounded-full bg-signal-500 shadow-[0_0_18px_2px_rgb(255_23_68/0.7)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease }}
            />
            <Fade delay={0.15}>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55 sm:mt-5 sm:text-base">{archive.subtitle}</p>
              {projects.some((p) => p.is_sample) && <p className="mt-3 text-xs text-white/40">{archive.sampleNotice}</p>}
            </Fade>
          </div>
          {archive.showreel && <ShowreelTile reel={archive.showreel} onOpen={() => setModalItem(showreelMedia(archive.showreel))} />}
        </div>

        {/* Filters; tablet/desktop also get a scroll-linked progress line here */}
        <div className="mt-8 flex flex-col gap-5 md:mt-12">
          <Filters projects={projects} value={filter} onChange={selectFilter} />
          <div className="hidden items-center gap-4 md:flex">
            <span className="shrink-0 font-display text-sm text-white/45 tabular-nums">
              <span className="text-white">{String(list.length).padStart(2, '0')}</span> projects
            </span>
            <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.span className="absolute inset-0 origin-left bg-signal-500" style={{ scaleX: scrollProgress }} />
            </span>
          </div>
        </div>
      </Shell>

      {/* Gallery: swipe track on phones, editorial grid from tablet up */}
      <div className="mx-auto w-full max-w-6xl md:px-6 lg:px-8">
        <motion.ul
          ref={trackRef}
          animate={controls}
          aria-label="Projects"
          className={cn(
            'no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 scroll-px-4 pb-2',
            'md:mt-8 md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0',
            'lg:grid-flow-dense lg:grid-cols-12 lg:auto-rows-[10.5rem]',
          )}
        >
          {list.map((p, i) => (
            <ArchiveCard key={`${shown}-${p.id}`} project={p} slot={slots[i]} index={i} active={i === active} onOpen={(proj) => setModalItem(projectToMedia(proj))} />
          ))}
          <li aria-hidden style={{ width: spacer }} className="shrink-0 md:hidden" />
        </motion.ul>
        {list.length === 0 && (
          <div className="mx-4 mt-8 grid place-items-center rounded-3xl border border-dashed border-white/10 py-16 text-center md:mx-0">
            <Clapperboard className="size-6 text-white/30" />
            <p className="mt-3 text-sm text-white/50">New work in this category is coming soon.</p>
          </div>
        )}
      </div>

      {/* Phone carousel controls, below the cards */}
      {list.length > 0 && (
        <Shell className="mt-4 flex items-center gap-3 md:hidden">
          <p className="w-14 shrink-0 font-display text-sm text-white/45 tabular-nums" aria-live="polite">
            <span className="text-white">{String(Math.min(active + 1, list.length)).padStart(2, '0')}</span> / {String(list.length).padStart(2, '0')}
          </p>
          <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <motion.span
              className="absolute inset-0 origin-left bg-signal-500 shadow-[0_0_10px_rgb(255_23_68/0.8)]"
              animate={{ scaleX: (Math.min(active, list.length - 1) + 1) / list.length }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            />
          </span>
          <div className="flex shrink-0 gap-2">
            <StepButton dir={-1} disabled={active <= 0} onClick={() => goTo(active - 1)} />
            <StepButton dir={1} disabled={active >= list.length - 1} onClick={() => goTo(active + 1)} />
          </div>
        </Shell>
      )}

      <Shell>
        <CtaBanner {...archive.cta} className="mt-10 sm:mt-20" />
      </Shell>

      <MediaModal item={modalItem} onClose={() => setModalItem(null)} />
    </Tag>
  )
}
