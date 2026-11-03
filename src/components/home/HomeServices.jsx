import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useServicePages } from '@/hooks/useSiteContent'
import { cardIn, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import { ServiceIcon } from '@/components/ui/DynamicIcon'
import HomeHeading from './HomeHeading'

// Homepage "Our services": the agency services that have their own pages.
export default function HomeServices() {
  const services = useServicePages()
  return (
    <section id="services" aria-label="Our services" className="relative isolate scroll-mt-20 section-y">
      <Shell>
        <HomeHeading eyebrow="Our services" title="Everything Your Brand Needs" text={portfolioData.home.servicesText} action={{ label: 'Explore All Services', href: '/services' }} />
        <motion.ul {...staggerGroup(0.08)} className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <motion.li key={s.id ?? s.slug} variants={cardIn}>
              <Link
                to={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] p-6 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF1744]/55 hover:shadow-[0_0_0_1px_rgb(255_23_68/0.25),0_26px_60px_-34px_rgb(255_23_68/0.7)]"
              >
                <span aria-hidden className="pointer-events-none absolute -top-20 -left-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.16),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <ServiceIcon service={s} className="size-7 text-[#FF1744]" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{s.summary || s.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF1744]">Explore Service <ArrowUpRight className="size-3.5" aria-hidden /></span>
                  <span className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition group-hover:border-[#FF1744] group-hover:bg-[#FF1744] group-hover:text-white">
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Shell>
    </section>
  )
}
