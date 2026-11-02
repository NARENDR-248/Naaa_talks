import { useState } from 'react'
import { cn } from '@/lib/cn'

const initials = (name = '') => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

// Remote photo with a branded gradient + initials fallback if it fails to load.
export function Photo({ src, alt, className, imgClassName }) {
  const [failed, setFailed] = useState(!src)
  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br from-wine-900 via-ink-800 to-ink-900', className)}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-white/70" role="img" aria-label={alt}>
          {initials(alt)}
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn('size-full object-cover', imgClassName)} />
      )}
    </div>
  )
}
