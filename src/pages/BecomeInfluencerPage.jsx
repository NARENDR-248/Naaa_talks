import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Shell } from '@/components/portfolio/Kit'
import InfluencerApplicationForm from '@/components/forms/InfluencerApplicationForm'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const { pages, program } = portfolioData
const page = pages.apply

// Journey 02 landing: the influencer program application.
export default function BecomeInfluencerPage() {
  usePageMeta('Become an Influencer — Apply', page.subtitle)
  return (
    <>
      <PageHero crumbs={[{ label: 'Influencer Program', href: '/influencer-program' }, { label: 'Apply' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <WhatsAppCta purpose="influencer" label="Chat on WhatsApp" />
      </PageHero>
      <Shell className="grid gap-8 pb-20 lg:grid-cols-[1.6fr_1fr]">
        <InfluencerApplicationForm />
        <aside className="h-fit rounded-3xl border border-white/[0.08] bg-gradient-to-b from-wine-900/60 to-void p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-medium text-white">Your journey with us</h2>
          <ol className="mt-5 space-y-2.5">
            {program.steps.map((s, i) => (
              <li key={s.title} className="flex items-center gap-3 text-sm text-white/75">
                <span className="w-6 font-sans text-[11px] font-semibold text-signal-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </li>
            ))}
          </ol>
          <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
            {pages.program.expect.map((e) => <li key={e} className="flex gap-2 text-[13px] text-white/60"><Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden />{e}</li>)}
          </ul>
          <Link to="/influencer-program" className="mt-6 inline-block text-sm font-semibold text-white/75 hover:text-white">Read about the program →</Link>
        </aside>
      </Shell>
    </>
  )
}
