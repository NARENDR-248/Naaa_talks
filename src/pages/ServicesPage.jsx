import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { SERVICE_ICONS } from '@/lib/icons'
import PageHero from '@/components/layout/PageHero'
import { Cta, Shell } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import ServicesOverview from '@/components/sections/ServicesOverview'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'

const { pages, serviceCategories, whyChoose } = portfolioData
const page = pages.services

export default function ServicesPage() {
  usePageMeta('Services', page.subtitle)
  return (
    <>
      <PageHero crumbs={[{ label: 'Services' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href="/work-with-us">Request a proposal</Cta>
      </PageHero>
      {/* Jump links to each category */}
      <Shell>
        <nav aria-label="Service categories" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {serviceCategories.map((c) => {
            const Icon = SERVICE_ICONS[c.icon]
            return (
              <Link key={c.key} to={`/services#${c.key}`} className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-white/80 hover:border-signal-500/50 hover:text-white">
                <Icon className="size-4 text-signal-400" /> {c.short}
              </Link>
            )
          })}
        </nav>
      </Shell>
      <ServicesOverview full />
      <Process />
      <FAQ />
      <Shell className="pb-16"><CtaBanner {...whyChoose.cta} className="mt-0" /></Shell>
    </>
  )
}
