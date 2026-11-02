import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Block } from '@/components/layout/Blocks'
import JourneyChooser from '@/components/sections/JourneyChooser'
import { DirectContact } from '@/components/sections/ContactSection'
import FAQ from '@/components/sections/FAQ'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const page = portfolioData.pages.contact

export default function ContactPage() {
  usePageMeta('Contact Us', page.subtitle)
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <WhatsAppCta purpose="general" variant="solid" label="Talk to Our Team" />
      </PageHero>
      <Block className="pt-0 sm:pt-0">
        <JourneyChooser />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-white">Reach us directly</h2>
            <p className="mt-2 text-sm text-white/55">Email, WhatsApp or Instagram — whichever is easiest for you.</p>
          </div>
          <DirectContact />
        </div>
      </Block>
      <FAQ />
    </>
  )
}
