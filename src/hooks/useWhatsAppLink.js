import { useSiteContent } from './useSiteContent'
import { whatsappLink } from '@/lib/whatsapp'

// Returns a builder: link({ purpose, text }) → wa.me URL, or null when no number is configured.
export function useWhatsAppLink() {
  const { settings } = useSiteContent()
  return (options) => whatsappLink(settings, options)
}
