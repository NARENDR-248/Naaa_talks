import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import { fadeUp } from '@/lib/motion'
import PageHero from '@/components/layout/PageHero'
import { Block, StepsGrid } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import ProductionTeam from '@/components/sections/ProductionTeam'
import FeaturedGallery from '@/components/sections/FeaturedGallery'

const { pages, archive } = portfolioData
const page = pages.production
const SHOOT_SERVICE = 'Content production & video shoots'

export default function ContentProductionPage() {
  usePageMeta('Content Production', page.subtitle)
  const services = useSiteContent().services.filter((s) => s.category === 'production')
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: 'Content Production' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href={`/work-with-us?service=${encodeURIComponent(SHOOT_SERVICE)}`}>Book a shoot</Cta>
        <Cta href="/portfolio" variant="outline">See our work</Cta>
      </PageHero>
      <Block eyebrow="What we produce" title={['Formats built', 'for how people watch.']}>
        <StepsGrid steps={page.formats} columns="lg:grid-cols-4" />
      </Block>
      <ProductionTeam showCta={false} />
      <Block eyebrow="Production services" title={['Everything from', 'script to screen.']}>
        <motion.ul {...fadeUp(0.1)} className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id} className="flex gap-2.5 text-[15px] text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden />{s.title}</li>
          ))}
        </motion.ul>
      </Block>
      <FeaturedGallery />
      <Block><CtaBanner {...archive.cta} href={`/work-with-us?service=${encodeURIComponent(SHOOT_SERVICE)}`} className="mt-0" /></Block>
    </>
  )
}
