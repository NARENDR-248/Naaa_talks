import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useServicePages } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { ServiceIcon } from '@/components/ui/DynamicIcon'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { servicesSection } = portfolioData


export function ServiceCard({ service, index = 0 }) {
  const href = `/services/${service.slug}`
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease }}
      className="group relative isolate flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] transition-[border-color,box-shadow] duration-300 hover:border-signal-500/40 hover:shadow-[0_30px_70px_-40px_rgb(255_23_68/0.6)]"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 -z-10 size-60 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.18),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {service.image && <img src={service.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl border border-signal-500/25 bg-signal-500/10 text-primary-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <ServiceIcon service={service} className="size-6" strokeWidth={1.75} />
          </span>
          <span className="font-sans text-[11px] font-semibold tracking-[0.1em] text-white/30 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-white"><Link to={href} className="hover:text-signal-400">{service.title}</Link></h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{service.summary || service.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link to={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white" aria-label={`Learn more about ${service.title}`}>
            Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to={`${href}#enquire`} className="text-sm font-semibold text-signal-400 hover:text-signal-500" aria-label={`Enquire about ${service.title}`}>Enquire</Link>
        </div>
      </div>
    </motion.article>
  )
}

export function ServiceGrid({ className }) {
  const services = useServicePages()
  return (
    <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
      {services.map((s, i) => <ServiceCard key={s.id ?? s.slug} service={s} index={i} />)}
    </div>
  )
}

// Homepage "Our services" section.
export default function ServicesOverview() {
  return (
    <section id="services" aria-label="Our services" className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.28),transparent)]" />
      <Shell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{servicesSection.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine>{servicesSection.title[0]}</RevealLine>
              <RevealLine delay={0.12} className="text-white/45">{servicesSection.title[1]}</RevealLine>
            </h2>
          </div>
          <motion.div {...fadeUp(0.2, 12)}>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">All services <ArrowUpRight className="size-4" /></Link>
          </motion.div>
        </div>
        <ServiceGrid className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3" />
      </Shell>
    </section>
  )
}
