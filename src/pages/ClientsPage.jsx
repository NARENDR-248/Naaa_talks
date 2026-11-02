import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Block } from '@/components/layout/Blocks'
import CtaBanner from '@/components/portfolio/CtaBanner'
import Clients from '@/components/sections/Clients'
import Testimonials from '@/components/sections/Testimonials'

const { pages, whyChoose } = portfolioData
const page = pages.clients

export default function ClientsPage() {
  usePageMeta('Our Clients', page.subtitle)
  return (
    <>
      <PageHero crumbs={[{ label: 'Our Clients' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
      <Clients showHighlights />
      <Testimonials />
      <Block><CtaBanner {...whyChoose.cta} className="mt-0" /></Block>
    </>
  )
}
