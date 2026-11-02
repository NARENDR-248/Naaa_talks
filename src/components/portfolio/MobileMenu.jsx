import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Wordmark } from './Kit'
import SocialIcon from './SocialIcon'

const ease = [0.22, 1, 0.36, 1]

// Timeline: backdrop 0s → logo/close 0.2s → links 0.3s (staggered) → socials 0.6s → glow 0.8s.
// Closing runs the same steps in reverse, with the backdrop leaving last.
const backdrop = {
  closed: { opacity: 0, transition: { duration: 0.3, delay: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.35 } },
}
const header = {
  closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease } },
}
const link = {
  closed: (i) => ({ opacity: 0, x: -24, transition: { duration: 0.2, delay: Math.max(0, 9 - i) * 0.02 } }),
  open: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 + i * 0.045, ease } }),
}
const rule = {
  closed: { scaleX: 0, transition: { duration: 0.2 } },
  open: (i) => ({ scaleX: 1, transition: { duration: 0.8, delay: 0.35 + i * 0.045, ease } }),
}
const footer = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6, ease } },
}
const glow = {
  closed: { opacity: 0, transition: { duration: 0.2 } },
  open: { opacity: 1, transition: { duration: 1.2, delay: 0.8 } },
}

function MenuPanel({ items, journeys, currentPath, socialLinks, brandName, tagline, onClose, onNavigate }) {
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const [active, setActive] = useState(currentPath)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // Keep Tab focus inside the open menu.
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Move the red indicator to the tapped link, then close and navigate.
  const select = (e, href) => {
    e.preventDefault()
    setActive(href)
    setTimeout(() => onNavigate(href), reduce ? 0 : 320)
  }

  return (
    <motion.div
      ref={panelRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      variants={backdrop}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-[60] flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-[#050505] lg:hidden"
    >
      {/* Ambient lighting */}
      <motion.div aria-hidden variants={glow} className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[22%] -left-24 size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgb(150_10_36/0.42),transparent)]"
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute -right-32 bottom-0 size-[20rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.14),transparent)]" />
      </motion.div>

      <div className="relative flex min-h-full flex-col px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
        {/* Header */}
        <motion.div variants={header} className="flex h-16 shrink-0 items-center justify-between">
          <a href="/" onClick={(e) => select(e, '/')} aria-label={`${brandName} — home`}>
            <Wordmark />
          </a>
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            initial={{ scale: 0.6, rotate: -90 }}
            animate={{ scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.2, ease } }}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="grid size-11 place-items-center rounded-full border border-signal-500/60 bg-signal-500/5 text-white shadow-[0_0_20px_-6px_rgb(255_23_68/0.8)]"
          >
            <X className="size-5" />
          </motion.button>
        </motion.div>
        <motion.span aria-hidden variants={rule} custom={0} className="block h-px origin-left bg-gradient-to-r from-signal-500/70 via-white/10 to-transparent" />

        {/* Links */}
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center py-4">
          <p className="mb-1 font-sans text-[10px] font-semibold tracking-[0.28em] text-white/35 uppercase">Menu — {String(items.length).padStart(2, '0')} pages</p>
          <ul>
            {items.map((item, i) => {
              const isActive = active === item.href
              return (
                <li key={item.href} className="relative">
                  <motion.a
                    href={item.href}
                    custom={i}
                    variants={link}
                    onClick={(e) => select(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group flex min-h-14 items-center gap-4"
                  >
                    <span
                      className={cn(
                        'w-7 shrink-0 font-sans text-[11px] font-semibold tracking-[0.08em] tabular-nums transition-colors duration-300',
                        isActive ? 'text-[#FF1744]' : 'text-white/35 group-hover:text-[#FF1744]',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Label always starts at the same x; the red dash sits outside the flow. */}
                    <span className="relative flex-1">
                      <span
                        aria-hidden
                        className={cn(
                          'absolute top-1/2 -left-3 h-px w-0 -translate-x-full bg-[#FF1744] transition-[width] duration-500 ease-out',
                          isActive ? 'w-2.5' : 'group-hover:w-2.5',
                        )}
                      />
                      <span
                        className={cn(
                          'relative inline-block font-display text-[clamp(22px,6.4vw,30px)] leading-[1.15] font-medium tracking-[-0.035em] transition-[color,translate] duration-500 ease-out group-hover:translate-x-1.5 group-active:translate-x-1.5',
                          isActive ? 'text-white' : 'text-[#B7B3B5] group-hover:text-[#F5F5F5]',
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="menu-indicator"
                            className="absolute -bottom-1 left-0 h-[2px] w-8 rounded-full bg-[#FF1744] shadow-[0_0_10px_1px_rgb(255_23_68/0.6)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.75}
                      className={cn(
                        'size-[18px] shrink-0 transition-[color,translate] duration-300',
                        isActive ? 'text-[#FF1744]' : 'text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF1744]',
                      )}
                    />
                  </motion.a>
                  <motion.span aria-hidden variants={rule} custom={i + 1} className="block h-px origin-left bg-white/[0.08]" />
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Journeys + social footer */}
        <motion.div variants={footer} className="shrink-0">
          <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-3">
            {Object.values(journeys).map((j, i) => (
              <a
                key={j.href}
                href={j.href}
                onClick={(e) => select(e, j.href)}
                className={cn(
                  'flex h-11 items-center justify-center rounded-full px-3 text-center text-[12px] font-semibold transition active:scale-[0.97]',
                  i === 0 ? 'bg-signal-500 text-white' : 'border border-white/12 text-white/85 hover:border-[#FF1744]/60',
                )}
              >
                {j.label}
              </a>
            ))}
          </div>
          {socialLinks.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <motion.a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="grid size-10 place-items-center rounded-full border border-white/10 text-[#B7B3B5] transition-[color,border-color,box-shadow,background-color] duration-300 hover:border-[#FF1744]/70 hover:text-[#FF1744] hover:shadow-[0_0_20px_-6px_rgb(255_23_68/0.8)] active:border-[#FF1744]/70 active:text-[#FF1744]"
                  >
                    <SocialIcon platform={s.platform} className="size-4" />
                  </motion.a>
                </li>
              ))}
            </ul>
          )}
          {tagline && <p className="mt-4 font-sans text-[10px] font-semibold tracking-[0.28em] text-white/35 uppercase">{tagline}</p>}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Portalled to <body>: the navbar's backdrop-filter would otherwise become the
// containing block for this fixed overlay and squeeze it to the header's height.
export default function MobileMenu({ open, ...props }) {
  return createPortal(<AnimatePresence>{open && <MenuPanel {...props} />}</AnimatePresence>, document.body)
}
