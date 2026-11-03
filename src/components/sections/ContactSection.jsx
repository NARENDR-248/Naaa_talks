import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useSiteContent, useSocials } from '@/hooks/useSiteContent'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { fadeUp } from '@/lib/motion'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'
import SocialIcon from '@/components/portfolio/SocialIcon'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'
import ContactForm from '@/components/forms/ContactForm'

// Direct channels (email, WhatsApp, phone, socials) — also used on the Contact and Work With Us pages.
export function DirectContact() {
  const { contact } = useSiteContent().settings
  const socials = useSocials()
  const wa = useWhatsAppLink()({ purpose: 'general' })
  const row = 'flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 text-sm text-white/80 transition hover:border-signal-500/40 hover:text-white'
  return (
    <div className="space-y-2.5">
      <a href={`mailto:${contact.email}`} className={row}><Mail className="size-4 shrink-0 text-signal-400" /> {contact.email}</a>
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={row}><WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" /> Chat on WhatsApp</a>}
      {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={row}><Phone className="size-4 shrink-0 text-signal-400" /> {contact.phone}</a>}
      {socials.map((s) => (
        <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className={row}><SocialIcon platform={s.platform} className="size-4 shrink-0 text-signal-400" /> {s.handle || s.label}</a>
      ))}
      {contact.location && <p className="flex items-start gap-3 px-4 pt-2 text-sm text-white/55"><MapPin className="mt-0.5 size-4 shrink-0" /> {contact.location}</p>}
      {contact.hours && <p className="px-4 text-xs text-white/40">{contact.hours}</p>}
    </div>
  )
}

// Homepage closing section: the contact form and direct channels.
export default function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[30rem] w-[50rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(150_12_36/0.3),transparent)]" />
      <Shell>
        <motion.div {...fadeUp(0, 16)}><Eyebrow>Contact us</Eyebrow></motion.div>
        <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
          <RevealLine>Let’s Create Something</RevealLine>
          <RevealLine delay={0.12} className="text-white/45">Great Together.</RevealLine>
        </h2>

        <motion.p {...fadeUp(0.15, 16)} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base">Have a business to grow, a creative idea to discuss or want to join our journey? Let’s talk.</motion.p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h3 className="font-display text-xl font-medium text-white sm:text-2xl">Send us a message</h3>
            <p className="mt-1.5 mb-5 text-sm text-white/55">We read and reply to every message.</p>
            <ContactForm />
          </div>
          <div>
            <h3 className="font-display text-xl font-medium text-white sm:text-2xl">Talk to us directly</h3>
            <p className="mt-1.5 mb-5 text-sm text-white/55">Prefer a quick message? Reach the team here.</p>
            <DirectContact />
          </div>
        </div>
      </Shell>
    </section>
  )
}
