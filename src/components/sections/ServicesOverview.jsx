import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Megaphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { SERVICE_ICONS } from '@/lib/icons'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { serviceCategories } = portfolioData

// Four service categories. Homepage shows a preview of each; `full` (Services
// page) lists every service with an anchor per category.
export default function ServicesOverview({ full = false }) {
  const { services } = useSiteContent()

  return (
    <section id="services" aria-label="Our services" className="relative isolate scroll-mt-16 overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.28),transparent)]" />
      <Shell>
        {!full && (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <motion.div {...fadeUp(0, 16)}><Eyebrow>Our services</Eyebrow></motion.div>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
                <RevealLine>Everything your brand needs</RevealLine>
                <RevealLine delay={0.12} className="text-white/45">to be seen and remembered.</RevealLine>
              </h2>
            </div>
            <motion.div {...fadeUp(0.2, 12)}>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
                All services <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        )}

        <div className={full ? 'grid gap-5' : 'mt-10 grid gap-4 sm:mt-14 md:grid-cols-2'}>
          {serviceCategories.map((cat, i) => {
            const Icon = SERVICE_ICONS[cat.icon] ?? Megaphone
            const items = services.filter((s) => s.category === cat.key)
            const shown = full ? items : items.slice(0, 5)
            return (
              <motion.article
                key={cat.key}
                id={full ? cat.key : undefined}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL}
                transition={{ duration: 0.7, delay: full ? 0 : (i % 2) * 0.12, ease }}
                className="group relative isolate scroll-mt-24 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6 transition-[border-color,box-shadow] duration-300 hover:border-signal-500/35 hover:shadow-[0_30px_70px_-40px_rgb(255_23_68/0.6)] sm:p-8"
              >
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 -z-10 size-60 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.18),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-signal-500/25 bg-signal-500/10 text-[#FF4D6A] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.1em] text-white/30 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-white sm:text-2xl">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55 sm:text-[15px]">{cat.intro}</p>
                <ul className={full ? 'mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3' : 'mt-5 space-y-2'}>
                  {shown.map((s) => (
                    <li key={s.id ?? s.title} className="flex gap-2.5 text-sm text-white/75">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden />
                      <span>
                        {s.title}
                        {full && s.description && <span className="mt-0.5 block text-xs text-white/45">{s.description}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                {!full && (
                  <Link to={cat.href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition hover:text-white">
                    {items.length > shown.length ? `+${items.length - shown.length} more · ` : ''}Explore {cat.short.toLowerCase()} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </motion.article>
            )
          })}
        </div>
      </Shell>
    </section>
  )
}
