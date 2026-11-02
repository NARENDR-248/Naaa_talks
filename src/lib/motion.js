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
