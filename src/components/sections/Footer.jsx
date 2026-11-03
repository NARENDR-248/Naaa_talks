import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent, useSocials } from '@/hooks/useSiteContent'
import { useJourneys } from '@/hooks/useJourneys'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { Shell, Wordmark } from '@/components/portfolio/Kit'
import SocialIcon from '@/components/portfolio/SocialIcon'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'

const { brand, navAll } = portfolioData
// Scales the cropped wordmark so any brand name fits the viewport width.
const giantSize = `${Math.min(22, 92 / ((brand.wordmark.join('').length + 1) * 0.66)).toFixed(2)}vw`

function Column({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}><Link to={l.href} className="text-sm text-white/65 hover:text-white">{l.label}</Link></li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const { contact, footer } = useSiteContent().settings
  const journeys = useJourneys()
  const socials = useSocials()
  const wa = useWhatsAppLink()({ purpose: 'general' })

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] section-pt">
      <Shell>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="mt-2 font-sans text-[11px] font-semibold tracking-[0.28em] text-signal-400 uppercase">{brand.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">{footer.text}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid size-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-signal-500/50 hover:text-white">
                      <SocialIcon platform={s.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Column title="Explore" links={navAll.slice(1, 7)} />
          <Column title="Get started" links={[...Object.values(journeys), { label: 'Academy courses', href: '/academy' }, { label: 'Contact Us', href: '/contact' }]} />

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-medium text-white hover:text-signal-400">
                  <Mail className="size-4 shrink-0" /> {contact.email}
                </a>
              </li>
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                    <Phone className="size-4 shrink-0" /> {contact.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                    <WhatsAppIcon className="size-4 shrink-0" /> Chat on WhatsApp
                  </a>
                </li>
              )}
              {contact.location && (
                <li className="flex items-start gap-2 text-white/55"><MapPin className="mt-0.5 size-4 shrink-0" /> {contact.location}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. {footer.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/admin/login" className="hover:text-white">Team login</Link>
          </div>
        </div>
      </Shell>

      {/* Oversized cropped wordmark */}
      <div aria-hidden style={{ fontSize: giantSize }} className="pointer-events-none mt-6 -mb-[3vw] text-center font-display leading-none font-extrabold tracking-tighter whitespace-nowrap select-none">
        <span className="bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-transparent">
          {brand.wordmark[0]}
          <span className="text-signal-500/70">/</span>
          {brand.wordmark[1]}
        </span>
      </div>
    </footer>
  )
}
