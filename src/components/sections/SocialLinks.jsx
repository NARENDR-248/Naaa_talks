import { Mail } from 'lucide-react'
import { useSiteContent, useSocials } from '@/hooks/useSiteContent'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { Eyebrow, Fade, Shell } from '@/components/portfolio/Kit'
import SocialIcon from '@/components/portfolio/SocialIcon'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'

const chip = 'group flex h-11 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 text-white/60 transition hover:border-signal-500/50 hover:bg-signal-500/10 hover:text-white'

export default function SocialLinks() {
  const socials = useSocials()
  const { contact } = useSiteContent().settings
  const wa = useWhatsAppLink()({ purpose: 'general' })

  return (
    <section aria-labelledby="social-title" className="pb-8">
      <Shell>
        <Fade className="text-center">
          <Eyebrow><span id="social-title">Connect with us</span></Eyebrow>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {socials.map((s) => (
              <li key={s.platform}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${s.handle} (opens in a new tab)`} className={chip}>
                  <SocialIcon platform={s.platform} className="size-[18px] transition group-hover:scale-110" />
                  <span className="text-[13px] font-medium">{s.handle || s.label}</span>
                </a>
              </li>
            ))}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={chip}>
                  <WhatsAppIcon className="size-[18px]" />
                  <span className="text-[13px] font-medium">WhatsApp</span>
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${contact.email}`} className={chip}>
                <Mail className="size-[18px]" />
                <span className="text-[13px] font-medium">{contact.email}</span>
              </a>
            </li>
          </ul>
        </Fade>
      </Shell>
    </section>
  )
}
