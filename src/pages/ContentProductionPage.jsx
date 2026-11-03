import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useProductionServices } from '@/hooks/useSiteContent'
import { REVEAL, ease } from '@/lib/motion'
import { ServiceIcon } from '@/components/ui/DynamicIcon'
import PageHero from '@/components/layout/PageHero'
import { Block } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import ProductionTeam from '@/components/sections/ProductionTeam'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import ReelGallery from '@/components/sections/ReelGallery'
import ProjectEnquiry from '@/components/sections/ProjectEnquiry'

const { pages } = portfolioData
const page = pages.production

// Video-first: what we produce, the work itself, the team, then a project enquiry.
export default function ContentProductionPage() {
  usePageMeta('Content Production', page.subtitle)
  const services = useProductionServices()
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: 'Content Production' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href="#enquire">Book a shoot</Cta>
        <Cta href="#work" variant="outline">Watch our work</Cta>
      </PageHero>

      <Block eyebrow="What we produce" title={['From script', 'to screen.']} className="pt-3 sm:pt-4">
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {services.map((s, i) => {
            return (
              <motion.li
                key={s.id ?? s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL}
                transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease }}
                className="group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-5 transition hover:border-signal-500/40 sm:p-6"
              >
                <ServiceIcon service={s} className="size-7 text-signal-500 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                <h3 className="mt-4 font-sans text-base font-semibold text-white">{s.title}</h3>
                {s.description && <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.description}</p>}
              </motion.li>
            )
          })}
        </ul>
      </Block>

      <div>
        <FeaturedGallery />
        <ReelGallery limit={8} />
      </div>

      <ProductionTeam showCta={false} />

      <ProjectEnquiry />
    </>
  )
}
