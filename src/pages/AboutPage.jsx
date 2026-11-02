import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useJourneys } from '@/hooks/useJourneys'
import PageHero from '@/components/layout/PageHero'
import { Cta } from '@/components/portfolio/Kit'
import AboutAgency from '@/components/sections/AboutAgency'
import Pillars from '@/components/sections/Pillars'
import ProductionTeam from '@/components/sections/ProductionTeam'
import BrandPromise from '@/components/sections/BrandPromise'

const page = portfolioData.pages.about

export default function AboutPage() {
  usePageMeta('About Us', page.subtitle)
  const j = useJourneys()
  return (
    <>
      <PageHero crumbs={[{ label: 'About Us' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href={j.business.href}>{j.business.label}</Cta>
        <Cta href={j.influencer.href} variant="outline">{j.influencer.label}</Cta>
      </PageHero>
      <AboutAgency />
      <Pillars />
      <ProductionTeam />
      <BrandPromise />
    </>
  )
}
