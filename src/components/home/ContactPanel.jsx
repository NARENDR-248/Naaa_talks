import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { REVEAL, ease } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'
import ContactForm from '@/components/forms/ContactForm'
import SectionTitle from '@/components/about/SectionTitle'

// Shows the saved number as typed, e.g. "+91 63000 44926".
const prettyNumber = (n) => String(n ?? '').trim()

// Homepage closing panel: introduction and direct channels left, the contact form right.
export default function ContactPanel() {
  const { contact, whatsapp } = useSiteContent().settings
  const wa = useWhatsAppLink()({ purpose: 'general' })
  const row = 'group flex rounded-2xl transition'
  return (
    <section id="contact" aria-label="Contact" className="relative isolate scroll-mt-20 section-y">
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.8, ease }}
          className="relative isolate overflow-hidden rounded-[26px] border border-primary/35 bg-[linear-gradient(160deg,#1a0408_0%,#0b0b0d_40%,#0b0b0d_100%)] p-3 shadow-[0_40px_100px_-60px_rgb(255_23_68/0.7)] sm:rounded-[28px] sm:p-10 lg:p-12"
        >
          <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.25),transparent)]" />
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="px-3 pt-4 sm:p-0">
              <SectionTitle lines={["Let's Create Something", 'Great Together.']} tone="plain" weight="font-semibold" size="text-[1.75rem] sm:text-[2.1rem] xl:text-[2.3rem]" />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#A1A1AA] sm:mt-4 sm:text-[15px]">{portfolioData.home.contactText}</p>
              {/* Phones: two tap-friendly tiles side by side. Larger screens: icon rows. */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-10">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={`${row} min-w-0 flex-col items-start gap-3 border border-white/10 bg-white/[0.03] p-3.5 active:scale-[0.98] sm:flex-row sm:items-center sm:gap-4 sm:border-0 sm:bg-transparent sm:p-0`}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25D366]/15 sm:size-11"><WhatsAppIcon className="size-5 text-[#25D366]" /></span>
                    <span className="min-w-0"><span className="block text-xs text-[#A1A1AA]">WhatsApp</span><span className="block truncate text-[13px] font-semibold text-white group-hover:text-[#25D366] sm:text-sm">{prettyNumber(whatsapp.number) || 'Chat with us'}</span></span>
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className={`${row} min-w-0 flex-col items-start gap-3 border border-white/10 bg-white/[0.03] p-3.5 active:scale-[0.98] sm:flex-row sm:items-center sm:gap-4 sm:border-0 sm:bg-transparent sm:p-0`}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 sm:size-11"><Mail className="size-5 text-primary" aria-hidden /></span>
                    <span className="min-w-0 max-w-full"><span className="block text-xs text-[#A1A1AA]">Email</span><span className="block text-[13px] font-semibold text-white [overflow-wrap:anywhere] group-hover:text-primary-soft sm:text-sm">{contact.email}</span></span>
                  </a>
                )}
              </div>
            </div>
            <ContactForm submitLabel="Send Enquiry" look="panel" />
          </div>
        </motion.div>
      </Shell>
    </section>
  )
}
