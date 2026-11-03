import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import PageHero from '@/components/layout/PageHero'
import { Block } from '@/components/layout/Blocks'
import JourneyChooser from '@/components/sections/JourneyChooser'
import { DirectContact } from '@/components/sections/ContactSection'
import ContactForm from '@/components/forms/ContactForm'
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
      <Block className="pt-3 sm:pt-4">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-white">Send us a message</h2>
            <p className="mt-2 mb-5 text-sm text-white/55">We read and reply to every message.</p>
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-white">Reach us directly</h2>
            <p className="mt-2 mb-5 text-sm text-white/55">Email, WhatsApp or Instagram — whichever is easiest for you.</p>
            <DirectContact />
          </div>
        </div>
      </Block>
      <Block eyebrow="Or choose your path" title={['Brand, creator', 'or team member?']}>
        <JourneyChooser className="mt-8" />
      </Block>
      <FAQ />
    </>
  )
}
