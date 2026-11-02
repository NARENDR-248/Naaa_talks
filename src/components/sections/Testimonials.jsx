import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { testimonialsSection } = portfolioData

// Client and creator testimonials — published from the admin with permission only.
export default function Testimonials() {
  const { testimonials } = useSiteContent()

  return (
    <section aria-label={testimonialsSection.eyebrow} className="relative isolate overflow-hidden py-16 sm:py-24">
      <Shell>
        <motion.div {...fadeUp(0, 16)}><Eyebrow>{testimonialsSection.eyebrow}</Eyebrow></motion.div>
        <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
          <RevealLine>{testimonialsSection.title[0]}</RevealLine>
          <RevealLine delay={0.12} className="text-white/45">{testimonialsSection.title[1]}</RevealLine>
        </h2>

        {testimonials.length === 0 ? (
          <motion.p {...fadeUp(0.15)} className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-dashed border-white/12 p-5 text-sm leading-relaxed text-white/55">
            <Quote className="mt-0.5 size-5 shrink-0 text-signal-500/70" aria-hidden />
            {testimonialsSection.empty}
          </motion.p>
        ) : (
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.li key={t.id} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease }}>
                <figure className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6">
                  <Quote className="size-6 text-signal-500" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/80">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <span>
                      <span className="block text-sm font-semibold text-white">{t.name}</span>
                      {t.role && <span className="block text-xs text-white/45">{t.role}</span>}
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-white/50 uppercase">{t.kind}</span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </ul>
        )}
      </Shell>
    </section>
  )
}
