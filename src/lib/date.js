const dateTime = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
const dateOnly = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' })

export const formatDateTime = (iso) => (iso ? dateTime.format(new Date(iso)) : '—')
export const formatShortDate = (iso) => (iso ? dateOnly.format(new Date(iso)) : '—')

// "3 hours ago" style label for activity feeds.
export function timeAgo(iso) {
  if (!iso) return ''
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  const units = [['day', 86400], ['hour', 3600], ['minute', 60]]
  for (const [u, n] of units) if (s >= n) { const v = Math.floor(s / n); return `${v} ${u}${v === 1 ? '' : 's'} ago` }
  return 'just now'
}
