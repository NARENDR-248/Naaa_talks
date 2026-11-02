import { motion } from 'framer-motion'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { cn } from '@/lib/cn'

export function WhatsAppIcon({ className = 'size-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const CTA = {
  solid: 'bg-[#25D366] text-[#04220f] hover:bg-[#2fe072] shadow-[0_10px_30px_-10px_rgb(37_211_102/0.7)]',
  outline: 'border border-[#25D366]/45 text-white hover:border-[#25D366] hover:bg-[#25D366]/10',
}

// WhatsApp button with a purpose-specific pre-filled message. Renders nothing until
// a WhatsApp number is configured in admin Settings, so it never shows a dead link.
export function WhatsAppCta({ purpose = 'general', text, label = 'Chat on WhatsApp', variant = 'outline', size = 'md', className }) {
  const href = useWhatsAppLink()({ purpose, text })
  if (!href) return null
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
        size === 'sm' ? 'h-9 px-4 text-[13px]' : 'h-12 px-6 text-sm',
        CTA[variant],
        className,
      )}
    >
      <WhatsAppIcon className={size === 'sm' ? 'size-4' : 'size-[18px]'} />
      {label}
      <span className="sr-only">(opens WhatsApp)</span>
    </motion.a>
  )
}

// Floating chat button on public pages (SiteLayout only, so never in the admin).
export default function WhatsAppButton() {
  const href = useWhatsAppLink()({ purpose: 'welcome' })
  if (!href) return null
  return (
    <div className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3">
      <span
        role="tooltip"
        id="wa-tooltip"
        className="pointer-events-none hidden translate-x-2 rounded-full border border-white/10 bg-[#0a0a0a]/95 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-xl backdrop-blur transition duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      >
        Chat with our team
      </span>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with our team on WhatsApp"
        aria-describedby="wa-tooltip"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)]"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.6s]" />
        <WhatsAppIcon className="relative size-7" />
      </motion.a>
    </div>
  )
}
