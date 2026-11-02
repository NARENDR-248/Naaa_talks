import { motion, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Photo } from '@/components/ui/Primitives'
import SocialIcon from './SocialIcon'
import { PlayButton } from './WorkCard'
import { SampleTag } from './Kit'

// Grid placement per layout slot. Phones use a swipe track (fixed card width),
// tablets a 2-column grid, desktops a 12-column editorial grid.
const SLOT = {
  big: { cell: 'md:col-span-2 lg:col-span-7 lg:row-span-3', frame: 'md:aspect-[16/9]', hero: true },
  tall5: { cell: 'lg:col-span-5 lg:row-span-3', frame: 'md:aspect-[4/5]' },
  tall4: { cell: 'lg:col-span-4 lg:row-span-3', frame: 'md:aspect-[4/5]' },
  wide5: { cell: 'lg:col-span-5 lg:row-span-2', frame: 'md:aspect-[4/5]' },
  wide7: { cell: 'lg:col-span-7 lg:row-span-2', frame: 'md:aspect-[4/5]' },
  full: { cell: 'md:col-span-2 lg:col-span-12 lg:row-span-2', frame: 'md:aspect-[16/9]', hero: true },
  single: { cell: 'md:col-span-2 lg:col-span-12 lg:row-span-3', frame: 'md:aspect-[16/9]', hero: true },
}

export default function ArchiveCard({ project, slot = 'tall4', index, active = false, onOpen }) {
  const reduce = useReducedMotion()
  const { cell, frame, hero } = SLOT[slot] ?? SLOT.tall4
  const hasVideo = Boolean(project.video_url || project.embed_url)

  // Cursor lighting + a few pixels of image parallax (mouse only).
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--lx', `${x}px`)
    el.style.setProperty('--ly', `${y}px`)
    if (!reduce) {
      el.style.setProperty('--px', ((x / r.width) * 2 - 1).toFixed(3))
      el.style.setProperty('--py', ((y / r.height) * 2 - 1).toFixed(3))
    }
  }
  const onPointerLeave = (e) => {
    e.currentTarget.style.setProperty('--px', '0')
    e.currentTarget.style.setProperty('--py', '0')
  }

  return (
    <motion.li
      data-slide
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.75, delay: Math.min(index, 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn('w-[80vw] max-w-[21rem] shrink-0 snap-start md:w-auto md:max-w-none', cell)}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-label={`${hasVideo ? 'Play' : 'Open'} ${project.title} — ${project.category}${project.duration ? `, ${project.duration}` : ''}`}
        className={cn(
          // Phones: fixed portrait height that always fits beside the controls (320–368px).
          'group relative block h-[clamp(20rem,92vw,23rem)] w-full overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] text-left md:h-auto md:rounded-[1.4rem] lg:aspect-auto lg:h-full',
          !active && 'max-md:scale-[0.96]',
          'transition-[scale,translate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-signal-500/45 hover:shadow-[0_30px_70px_-35px_rgb(255_23_68/0.7)]',
          frame,
        )}
      >
        {/* Image with parallax drift and hover zoom */}
        <div
          className="absolute -inset-3 transition-transform duration-500 ease-out"
          style={{ transform: 'translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -10px), 0)' }}
        >
          <Photo
            src={project.thumbnail}
            alt=""
            className="size-full"
            imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
        </div>

        {/* Cinematic grade, lifted on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20 transition-opacity duration-700 group-hover:opacity-85" />
        {/* Phone carousel: dim cards that aren't the active one */}
        <div className={cn('absolute inset-0 bg-black transition-opacity duration-500 md:hidden', active ? 'opacity-0' : 'opacity-40')} />
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(380px circle at var(--lx, 50%) var(--ly, 50%), rgb(255 23 68 / 0.22), transparent 60%)' }}
        />

        <span className="absolute inset-x-4 top-4 flex items-start justify-between gap-2 sm:inset-x-5 sm:top-5">
          <span className="flex flex-wrap items-center gap-1.5">
            {project.status_label && (
              <span className="animate-float rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-signal-500 align-middle" />
                {project.status_label}
              </span>
            )}
            {project.is_sample && <SampleTag />}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white tabular-nums backdrop-blur-md">
            <SocialIcon platform={project.platform} className="size-3.5" />
            {project.duration && <><Play className="size-2.5 fill-current" aria-hidden />{project.duration}</>}
          </span>
        </span>

        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + Math.min(index, 6) * 0.07 }}
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <PlayButton pulsing={project.featured || active} className={cn(hero && 'lg:size-20')} />
        </motion.span>

        <span className={cn('absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6', hero && 'lg:right-1/3')}>
          <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-signal-400 uppercase">
            <span className="h-px w-4 bg-signal-500 transition-all duration-500 group-hover:w-9" />
            {project.category}
          </span>
          <span
            className={cn(
              'mt-1.5 block font-display leading-tight font-medium text-white transition-transform duration-500 ease-out group-hover:-translate-y-1',
              hero ? 'text-xl sm:text-2xl lg:text-[2rem]' : 'text-lg sm:text-xl',
            )}
          >
            {project.title}
          </span>
          {project.description && (
            <span
              className={cn(
                'mt-1.5 line-clamp-2 block text-[13px] leading-relaxed text-white/65 transition-all duration-500 sm:text-sm',
                // Always visible on touch screens; revealed on hover elsewhere (hero cards always show it).
                !hero && '[@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
              )}
            >
              {project.description}
            </span>
          )}
        </span>
      </button>
    </motion.li>
  )
}
