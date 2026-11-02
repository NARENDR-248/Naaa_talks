import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'
import { projectToMedia } from '@/lib/projectMedia'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useSnapCarousel } from '@/hooks/useSnapCarousel'
import { Heading, Shell } from '@/components/portfolio/Kit'
import MediaModal from '@/components/portfolio/MediaModal'
import WorkCard from '@/components/portfolio/WorkCard'

const { featuredWork } = portfolioData
const { autoplay } = featuredWork

function ArrowButton({ dir, disabled, onClick }) {
  const Icon = dir < 0 ? ArrowLeft : ArrowRight
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      aria-label={dir < 0 ? 'Previous project' : 'Next project'}
      className="group grid size-12 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/80 transition-colors enabled:hover:border-signal-500 enabled:hover:bg-signal-500 enabled:hover:text-white disabled:opacity-30"
    >
      <Icon className={cn('size-5 transition-transform duration-300', dir < 0 ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')} />
    </motion.button>
  )
}

// Segmented progress: the active segment fills over the autoplay interval.
function Progress({ titles, active, running, onSelect }) {
  const count = titles.length
  return (
    <div className="flex flex-1 items-center gap-1.5" role="group" aria-label="Choose project">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show project ${i + 1}: ${titles[i]}`}
          aria-current={i === active ? 'true' : undefined}
          className="group flex h-6 flex-1 items-center"
        >
          <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/12 transition-colors group-hover:bg-white/30">
            {i < active && <span className="absolute inset-0 bg-white/45" />}
            {i === active && (
              <motion.span
                key={`${active}-${running}`}
                className="absolute inset-y-0 left-0 bg-signal-500"
                initial={{ width: running ? '0%' : '100%' }}
                animate={{ width: '100%' }}
                transition={{ duration: running ? autoplay.intervalMs / 1000 : 0, ease: 'linear' }}
              />
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

export default function FeaturedGallery() {
  const all = useSiteContent().projects
  // Featured projects lead the carousel; with fewer than three, show the latest work instead.
  const projects = useMemo(() => {
    const featured = all.filter((p) => p.featured)
    return (featured.length >= 3 ? featured : all).slice(0, 10)
  }, [all])
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px' })
  const { active, goTo, spacer, dragging, trackProps } = useSnapCarousel(trackRef, { reduceMotion: reduce })

  const [modalItem, setModalItem] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [touchHold, setTouchHold] = useState(false)
  const touchTimer = useRef(0)

  const running = autoplay.enabled && !reduce && inView && !hovering && !focusWithin && !dragging && !touchHold && !modalItem

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => goTo(active + 1), autoplay.intervalMs)
    return () => clearTimeout(t)
  }, [running, active, goTo])

  useEffect(() => () => clearTimeout(touchTimer.current), [])

  // Touch: pause autoplay while the visitor swipes, resume a few seconds later.
  const onTouchStart = () => {
    clearTimeout(touchTimer.current)
    setTouchHold(true)
  }
  const onTouchEnd = () => {
    touchTimer.current = setTimeout(() => setTouchHold(false), 6000)
  }

  // Desktop-only "drag" cursor that trails the pointer.
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })
  const [cursorOn, setCursorOn] = useState(false)
  const onPointerMoveWrap = (e) => {
    if (e.pointerType !== 'mouse' || reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)
    if (!cursorOn) setCursorOn(true)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1) }
  }

  return (
    <section ref={sectionRef} id={featuredWork.id} aria-label="Featured work" className="relative isolate scroll-mt-16 overflow-hidden pt-10 pb-4 sm:pt-14 sm:pb-6">
      {/* Ambient red light behind the strip */}
      <div aria-hidden className="pointer-events-none absolute top-[28%] left-1/2 -z-10 h-[34rem] w-[70rem] max-w-[170vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(170_14_40/0.32),rgb(60_5_16/0.18)_55%,transparent)]" />

      <Shell className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Heading eyebrow={featuredWork.eyebrow} title={featuredWork.title} subtitle={featuredWork.subtitle} />
        {featuredWork.availability && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: [0, -4, 0] }}
            viewport={{ once: true }}
            transition={{ opacity: { duration: 0.6 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            className="flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md lg:mb-3"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {featuredWork.availability}
          </motion.span>
        )}
      </Shell>

      <div
        className="relative mt-10 sm:mt-12"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={() => { setHovering(false); setCursorOn(false) }}
        onPointerMove={onPointerMoveWrap}
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusWithin(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ul
          ref={trackRef}
          {...trackProps}
          onKeyDown={onKeyDown}
          aria-label="Featured projects — swipe, drag or use arrow keys"
          className={cn(
            'no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth overscroll-x-contain py-6 select-none sm:gap-5',
            'px-4 scroll-px-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2+2rem))] sm:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+2rem))]',
            dragging ? 'cursor-grabbing' : '[@media(pointer:fine)]:cursor-grab',
          )}
        >
          {projects.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} active={i === active} onOpen={(proj) => setModalItem(projectToMedia(proj))} />
          ))}
          <li aria-hidden style={{ width: spacer }} className="shrink-0" />
        </ul>

        {/* Edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-void to-transparent sm:block" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-void to-transparent sm:block" />

        {!reduce && (
          <motion.span
            aria-hidden
            style={{ x: springX, y: springY }}
            animate={{ scale: cursorOn && !dragging ? 1 : 0, opacity: cursorOn ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute top-0 left-0 z-10 -mt-10 -ml-10 hidden size-20 place-items-center rounded-full border border-white/20 bg-black/40 text-[10px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md [@media(pointer:fine)]:grid"
          >
            <span className="flex flex-col items-center gap-1"><MoveHorizontal className="size-4" />Drag</span>
          </motion.span>
        )}
      </div>

      <Shell className="mt-4 flex items-center gap-4 sm:gap-6">
        <p className="w-14 shrink-0 font-display text-sm text-white/45 tabular-nums" aria-live="polite">
          <span className="text-white">{String(active + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
        </p>
        <Progress titles={projects.map((p) => p.title)} active={active} running={running} onSelect={(i) => goTo(i)} />
        <div className="flex shrink-0 gap-2">
          <ArrowButton dir={-1} disabled={active <= 0} onClick={() => goTo(active - 1)} />
          <ArrowButton dir={1} disabled={active >= projects.length - 1} onClick={() => goTo(active + 1)} />
        </div>
      </Shell>

      <MediaModal item={modalItem} onClose={() => setModalItem(null)} />
    </section>
  )
}
