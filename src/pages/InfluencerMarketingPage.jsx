import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import { fadeUp } from '@/lib/motion'
import PageHero from '@/components/layout/PageHero'
import { Block, StepsGrid } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'

const page = portfolioData.pages.influencerMarketing
const CAMPAIGN = `/work-with-us?service=${encodeURIComponent('Influencer marketing campaign')}`

export default function InfluencerMarketingPage() {
  usePageMeta('Influencer Marketing', page.subtitle)
  const services = useSiteContent().services.filter((s) => s.category === 'influencer')
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: 'Influencer Marketing' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <Cta href={CAMPAIGN}>Plan a campaign</Cta>
      </PageHero>
      <Block eyebrow="How a campaign runs" title={['Six steps from brief', 'to measurable results.']}>
        <StepsGrid steps={page.steps} />
      </Block>
      <Block eyebrow="What we handle" title={['Influencer services', 'end to end.']}>
        <motion.ul {...fadeUp(0.1)} className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id} className="flex gap-2.5 text-[15px] text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden />{s.title}</li>
          ))}
        </motion.ul>
        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-white/65">{page.creatorsNote}</p>
          <Cta href="/influencer-program" variant="outline" size="sm">Zero to Influencer <ArrowRight className="size-4" /></Cta>
        </motion.div>
      </Block>
      <Block>
        <CtaBanner title="Ready to launch a campaign?" text="Tell us about your brand and audience — we will plan the rest." label="Start a campaign" href={CAMPAIGN} className="mt-0" />
      </Block>
    </>
  )
}
