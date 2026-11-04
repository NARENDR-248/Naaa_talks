import { motion } from 'framer-motion'
import { Clapperboard, Handshake, Mail, ShieldCheck, UsersRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent, useSocials } from '@/hooks/useSiteContent'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { REVEAL, ease } from '@/lib/motion'
import { Eyebrow } from '@/components/portfolio/Kit'
import SocialIcon from '@/components/portfolio/SocialIcon'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'
import BusinessEnquiryForm from '@/components/forms/BusinessEnquiryForm'
import camera from '@/assets/hero/hero-camera.webp'

const { forms } = portfolioData

const POINTS = [
  { icon: Clapperboard, title: 'Creative Production', text: 'From concepts and scripts to professional video production.' },
  { icon: UsersRound, title: 'Professional Team', text: 'Work with our creative team to bring your vision to life.' },
  { icon: Handshake, title: "Let's Collaborate", text: 'Share your requirements and get a customised project proposal.' },
]

// Trust line + direct channels under the submit button.
function TrustNote() {
  const { contact } = useSiteContent().settings
  const instagram = useSocials().find((s) => s.platform === 'instagram')
  const wa = useWhatsAppLink()({ purpose: 'business' })
  const link = 'inline-flex items-center gap-1.5 text-[13px] text-white/70 transition hover:text-white'
  return (
    <div className="space-y-3 border-t border-white/[0.07] pt-4">
      <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[#A1A1AA]">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400/80" aria-hidden />
        Your project details are safe with us. We'll contact you to discuss your requirements.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pl-6">
        {contact.email && <a href={`mailto:${contact.email}`} className={link}><Mail className="size-3.5" aria-hidden />{contact.email}</a>}
        {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={link}><WhatsAppIcon className="size-3.5 text-[#25D366]" />WhatsApp</a>}
        {instagram && <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={link}><SocialIcon platform="instagram" className="size-3.5" />{instagram.handle || 'Instagram'}</a>}
      </div>
    </div>
  )
}

// Content Production page: introduction on the left, the enquiry form on the right.
export default function ProjectEnquiry() {
  return (
    <section id="enquire" aria-label="Project enquiry" className="relative isolate scroll-mt-20 overflow-hidden bg-[#050505] section-y">
      <div aria-hidden className="pointer-events-none absolute top-10 -left-40 -z-10 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(150_10_32/0.32),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.12),transparent)]" />

      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 xl:gap-20">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-primary" />Project enquiry</Eyebrow>
          <h2 className="mt-5 font-display text-[2.4rem] leading-[1.05] font-medium tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
            Have a shoot <br className="hidden sm:block" /><span className="text-primary">in mind?</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Let's turn your ideas into something extraordinary. Tell us about your project, and our creative team will get back to you.
          </p>

          <ul className="mt-9 space-y-3">
            {POINTS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-primary/35 hover:bg-white/[0.035]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary-soft transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-sans text-[15px] font-semibold text-white">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-[#A1A1AA]">{text}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <figure className="relative mt-8 hidden max-w-sm overflow-hidden rounded-[22px] border border-white/10 sm:block">
            <img src={camera} alt="Camera on set during a NAAA TALKS shoot" loading="lazy" className="aspect-[16/10] w-full object-cover object-[50%_35%]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 font-sans text-[11px] font-semibold tracking-[0.24em] text-white/80 uppercase">Behind the lens</figcaption>
          </figure>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="w-full lg:max-w-[650px] lg:justify-self-end"
        >
          <BusinessEnquiryForm
            defaultService={forms.productionOptions[0]}
            serviceOptions={forms.productionOptions}
            heading="Tell us about your project"
            intro="Fill in the details below. We'll get in touch with you shortly."
            submitLabel="Send Project Enquiry"
            note={<TrustNote />}
            className="shadow-[0_40px_90px_-50px_rgb(255_23_68/0.45)] sm:p-9 lg:p-10"
          />
        </motion.div>
      </div>
    </section>
  )
}
