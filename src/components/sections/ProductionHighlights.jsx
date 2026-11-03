import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useProductionServices } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'
import { ServiceIcon } from '@/components/ui/DynamicIcon'

const page = portfolioData.pages.production

// Homepage "Content production" section: what the production team makes.
export default function ProductionHighlights() {
  const services = useProductionServices()
  if (!services.length) return null
  return (
    <section id="production" aria-label="Content production" className="relative isolate scroll-mt-20 overflow-hidden section-pt">
      <Shell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{page.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine>{page.title[0]}</RevealLine>
              <RevealLine delay={0.12} className="text-white/45">{page.title[1]}</RevealLine>
            </h2>
          </div>
          <motion.div {...fadeUp(0.2, 12)}>
            <Link to="/content-production" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">Explore content production <ArrowUpRight className="size-4" /></Link>
          </motion.div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2.5 sm:mt-12">
          {services.map((s, i) => (
            <motion.li
              key={s.id ?? s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL}
              transition={{ duration: 0.45, delay: i * 0.05, ease }}
            >
              <Link to="/content-production" className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/85 transition hover:border-signal-500/50 hover:text-white">
                <ServiceIcon service={s} className="size-4 text-signal-400" />{s.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </Shell>
    </section>
  )
}
