import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useProductionServices } from '@/hooks/useSiteContent'
import { fadeUp } from '@/lib/motion'
import { ServiceIcon } from '@/components/ui/DynamicIcon'
import PageHero from '@/components/layout/PageHero'
import { Block } from '@/components/layout/Blocks'
import { Cta, Shell } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import { ServiceGrid } from '@/components/sections/ServicesOverview'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'

const { pages, whyChoose } = portfolioData
const page = pages.services

export default function ServicesPage() {
  usePageMeta('Services', page.subtitle)
  const production = useProductionServices()
  return (
    <>
      <PageHero crumbs={[{ label: 'Services' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href="/work-with-us">Request a proposal</Cta>
        <Cta href="/portfolio" variant="outline">Explore our work</Cta>
      </PageHero>

      <Shell><ServiceGrid /></Shell>

      {production.length > 0 && (
        <Block eyebrow="Content production" title={['Every service is backed', 'by our production team.']}>
          <motion.ul {...fadeUp(0.1)} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {production.map((s) => {
              return (
                <li key={s.id ?? s.title} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white/80">
                  <ServiceIcon service={s} className="size-5 shrink-0 text-signal-400" />{s.title}
                </li>
              )
            })}
          </motion.ul>
          <motion.div {...fadeUp(0.2)} className="mt-6">
            <Link to="/content-production" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">Explore content production <ArrowRight className="size-4" /></Link>
          </motion.div>
        </Block>
      )}

      <Process />
      <FAQ />
      <Block><CtaBanner {...whyChoose.cta} className="mt-0" /></Block>
    </>
  )
}
