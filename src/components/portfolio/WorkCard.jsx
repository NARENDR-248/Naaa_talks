import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Photo } from '@/components/ui/Primitives'
import SocialIcon from './SocialIcon'
import { SampleTag } from './Kit'

export function PlayButton({ pulsing, className }) {
  return (
    <span className={cn('relative grid size-14 place-items-center sm:size-16', className)} aria-hidden>
      {pulsing && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-signal-500" />}
      <span className="absolute -inset-3 rounded-full bg-signal-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative grid size-full place-items-center rounded-full bg-signal-500 text-white shadow-[0_10px_34px_-6px_rgb(245_32_58/0.9)] transition-transform duration-300 ease-out group-hover:scale-110">
        <Play className="ml-1 size-5 fill-current" />
      </span>
    </span>
  )
}

// Portrait card in the film strip. The active card is full size and bright;
// the rest sit slightly smaller and dimmed until hovered.
export default function WorkCard({ project, index, active, onOpen }) {
  const hasVideo = Boolean(project.video_url || project.embed_url)

  return (
    <motion.li
      data-slide
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, delay: Math.min(index, 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="w-[80vw] max-w-[21rem] shrink-0 snap-start sm:w-[16.5rem] lg:w-[18.5rem]"
    >
      {/* Film-strip shrink only from tablet up; on phones every card keeps the same
          size so the next-card preview lines up with the active one. */}
      <div className={cn('origin-bottom transition-[scale] duration-500 ease-out', !active && 'sm:scale-[0.95]')}>
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`${hasVideo ? 'Play' : 'Open'} ${project.title} — ${project.category}`}
          className={cn(
            'group relative block h-[clamp(20.625rem,92vw,22.5rem)] w-full overflow-hidden rounded-[1.25rem] border bg-white/[0.03] text-left sm:h-auto sm:aspect-[9/14] sm:rounded-[1.6rem] transition-[border-color,box-shadow] duration-500',
            active ? 'border-white/15 shadow-[0_30px_70px_-30px_rgb(245_32_58/0.55)]' : 'border-white/[0.07]',
          )}
        >
          <Photo
            src={project.thumbnail}
            alt=""
            className="absolute inset-0 size-full"
            imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:-translate-y-1.5"
          />
          {/* Cinematic grade: bottom gradient + dim for inactive cards */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
          <div className={cn('absolute inset-0 bg-black transition-opacity duration-700 group-hover:opacity-0', active ? 'opacity-0' : 'opacity-30 sm:opacity-35')} />

          <span className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
            <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md">
              <SocialIcon platform={project.platform} className="size-4" />
            </span>
            {project.is_sample && <SampleTag />}
          </span>
          {project.status_label && (
            <span className="absolute top-4 right-3.5 flex items-center gap-1.5 rounded-full bg-signal-500 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-white" /> {project.status_label}
            </span>
          )}

          <span className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <PlayButton pulsing={active} />
          </span>

          <span className={cn('absolute inset-x-4 bottom-4 transition-opacity duration-500 sm:inset-x-5 sm:bottom-5', !active && 'max-sm:opacity-0')}>
            <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-signal-400 uppercase">
              <span className="h-px w-4 bg-signal-500 transition-all duration-500 group-hover:w-8" />
              {project.category}
            </span>
            <span className="mt-1.5 block font-display text-lg leading-snug font-medium text-white sm:text-xl">{project.title}</span>
            {project.description && (
              <span
                className={cn(
                  'mt-1 line-clamp-2 block text-[13px] leading-relaxed text-white/60 transition-all duration-500',
                  // Touch screens always show it; hover devices reveal it on the active or hovered card.
                  !active && '[@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
                )}
              >
                {project.description}
              </span>
            )}
          </span>
        </button>
      </div>
    </motion.li>
  )
}
