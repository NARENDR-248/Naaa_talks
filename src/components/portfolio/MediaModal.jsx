import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Photo } from '@/components/ui/Primitives'
import SocialIcon from './SocialIcon'

// Plays item.videoUrl (mp4) or item.embedUrl (iframe); otherwise shows the
// poster with a link out to item.link.
export default function MediaModal({ item, onClose }) {
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  // Latest onClose without re-running the open/close effect on every parent render.
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose })
  const isOpen = Boolean(item)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement
    const video = videoRef.current
    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      video?.pause() // stop playback as the modal animates out
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [isOpen])

  const platform = item?.platform ?? 'instagram'
  const wide = item?.aspect === 'landscape'

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={cn('relative w-full', wide ? 'max-w-5xl' : 'max-w-[22rem]')}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className={cn('relative w-full', wide ? 'aspect-video' : 'aspect-[9/16] max-h-[72dvh]')}>
                {item.videoUrl ? (
                  // Starts muted (browsers block autoplay with sound); controls let viewers unmute.
                  <video ref={videoRef} src={item.videoUrl} poster={item.image} controls autoPlay muted playsInline className="size-full object-cover" />
                ) : item.embedUrl ? (
                  <iframe src={item.embedUrl} title={item.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="size-full" />
                ) : (
                  <Photo src={item.image} alt={item.title} className="size-full" />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.category}</p>
                  {item.description && <p className="mt-1 text-xs leading-relaxed text-white/60">{item.description}</p>}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal-500 px-4 py-2 text-xs font-semibold text-white hover:bg-signal-400">
                    <SocialIcon platform={platform} className="size-3.5" /> Open <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
