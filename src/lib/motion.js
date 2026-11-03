// Shared motion settings so every section reveals the same way.
export const ease = [0.22, 1, 0.36, 1]

// Reveal once an element is comfortably on screen (not at the very bottom edge,
// where a phone reader would miss the animation).
export const REVEAL = { once: true, amount: 0.15, margin: '0px 0px -12% 0px' }

export const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: REVEAL,
  transition: { duration: 0.7, delay, ease },
})

// Phones get shorter travel so reveals never feel like scroll lag.
const TRAVEL = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 639px)').matches ? 20 : 35

// Parent of a staggered group: children with `cardIn` / `blurUp` variants
// animate one after another when the group scrolls into view (once).
export const staggerGroup = (stagger = 0.12, delayChildren = 0) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: REVEAL,
  variants: { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } },
})

// Card entrance: fade, rise and a slight scale.
export const cardIn = {
  hidden: { opacity: 0, y: TRAVEL, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
}

// Heading line: fades up from a soft blur into focus.
export const blurUp = {
  hidden: { opacity: 0, y: TRAVEL * 0.7, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

// A thin accent line that draws in from the left (inside a staggered child).
export const drawLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, delay: 0.25, ease } },
}
