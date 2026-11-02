import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

// Section wrapper with an optional two-tone heading.
export function Block({ id, eyebrow, title, intro, children, className }) {
  return (
    <section id={id} aria-label={eyebrow} className={cn('relative isolate scroll-mt-20 py-14 sm:py-20', className)}>
      <Shell>
        {eyebrow && <motion.div {...fadeUp(0, 16)}><Eyebrow>{eyebrow}</Eyebrow></motion.div>}
        {title && (
          <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
            <RevealLine>{title[0]}</RevealLine>
            {title[1] && <RevealLine delay={0.12} className="text-white/45">{title[1]}</RevealLine>}
          </h2>
        )}
        {intro && <motion.p {...fadeUp(0.15, 16)} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base">{intro}</motion.p>}
        {children}
      </Shell>
    </section>
  )
}

// Numbered process steps in a responsive grid.
export function StepsGrid({ steps, columns = 'lg:grid-cols-3', className }) {
  return (
    <ol className={cn('mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4', columns, className)}>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={REVEAL}
          transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 transition hover:border-signal-500/40 sm:p-6"
        >
          <span className="font-display text-4xl font-extralight text-white/25 tabular-nums transition-colors group-hover:text-signal-400/80">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 font-sans text-base font-semibold text-white">{s.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}

// Titled checklist card.
export function Checklist({ title, items, className }) {
  return (
    <motion.div {...fadeUp(0.1)} className={cn('rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8', className)}>
      <h3 className="font-display text-xl font-medium text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] text-white/75"><Check className="mt-0.5 size-5 shrink-0 text-signal-400" aria-hidden />{it}</li>
        ))}
      </ul>
    </motion.div>
  )
}
