import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Breadcrumbs } from '@/components/layout/PageHero'
import { Block, Checklist } from '@/components/layout/Blocks'
import { Shell } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import InfluencerProgram from '@/components/sections/InfluencerProgram'
import FAQ from '@/components/sections/FAQ'

const { program, pages } = portfolioData

export default function InfluencerProgramPage() {
  usePageMeta('Zero to Influencer Program', program.subtitle)
  return (
    <>
      <Shell className="pt-24 sm:pt-28"><Breadcrumbs items={[{ label: 'Influencer Program' }]} /></Shell>
      <InfluencerProgram as="h1" />
      <Block eyebrow="Is it for you?" title={['Built for beginners.', 'Designed for real results.']}>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Checklist title="Who it is for" items={pages.program.whoFor} />
          <Checklist title="What to expect" items={pages.program.expect} />
        </div>
      </Block>
      <FAQ />
      <Block>
        <CtaBanner title="Your talent deserves a platform." text="Apply now — our team will contact you about the next step." label={program.cta.label} href={program.cta.href} className="mt-0" />
      </Block>
    </>
  )
}
