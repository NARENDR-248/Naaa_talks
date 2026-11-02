// WhatsApp click-to-chat helpers (https://wa.me/<number>?text=<message>).
// No WhatsApp Business API is involved: links only open a chat with the text
// pre-filled; the visitor decides whether to send it.

export const WHATSAPP_PURPOSES = ['welcome', 'general', 'business', 'influencer', 'careers']

// "+91 (987) 654-3210" → "919876543210". A leading "00" international prefix is dropped.
export function normalizeWhatsAppNumber(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '')
  return digits.startsWith('00') ? digits.slice(2) : digits
}

// wa.me needs the full international number: country code + subscriber number (8–15 digits, no leading 0).
export function isValidWhatsAppNumber(raw) {
  return /^[1-9]\d{7,14}$/.test(normalizeWhatsAppNumber(raw))
}

// Link for a purpose (see WHATSAPP_PURPOSES) or explicit `text`; null until a valid number is set.
// Older saved settings kept the number under contact.whatsapp, so that is still honoured.
export function whatsappLink(settings, { purpose = 'general', text } = {}) {
  const wa = settings?.whatsapp ?? {}
  const number = wa.number || settings?.contact?.whatsapp
  if (!isValidWhatsAppNumber(number)) return null
  const message = text ?? wa[purpose] ?? wa.general ?? ''
  return `https://wa.me/${normalizeWhatsAppNumber(number)}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
