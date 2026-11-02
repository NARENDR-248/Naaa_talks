import { useSearchParams } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Shell } from '@/components/portfolio/Kit'
import BusinessEnquiryForm from '@/components/forms/BusinessEnquiryForm'
import { DirectContact } from '@/components/sections/ContactSection'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const page = portfolioData.pages.workWithUs

// Journey 01 landing: what happens next + the business enquiry form.
export default function WorkWithUsPage() {
  usePageMeta('Work With Us — Business Enquiry', page.subtitle)
  const [params] = useSearchParams()
  return (
    <>
      <PageHero crumbs={[{ label: 'Work With Us' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <WhatsAppCta purpose="business" variant="solid" label="Discuss Your Project" />
      </PageHero>
      <Shell className="grid gap-8 pb-20 lg:grid-cols-[1.6fr_1fr]">
        <BusinessEnquiryForm defaultService={params.get('service') ?? ''} />
        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
            <h2 className="font-display text-xl font-medium text-white">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {page.next.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-signal-500 text-[11px] font-bold text-white tabular-nums">{i + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{s.title}</span>
                    <span className="block text-[13px] leading-relaxed text-white/55">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <DirectContact />
        </aside>
      </Shell>
    </>
  )
}
