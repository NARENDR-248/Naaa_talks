import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Cta } from '@/components/portfolio/Kit'
import ReelGallery from '@/components/sections/ReelGallery'

const page = portfolioData.pages.portfolio

export default function PortfolioPage() {
  usePageMeta('Portfolio', page.subtitle)
  return (
    <>
      <PageHero crumbs={[{ label: 'Portfolio' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href="/work-with-us">Start your project</Cta>
      </PageHero>
      <ReelGallery />
    </>
  )
}
