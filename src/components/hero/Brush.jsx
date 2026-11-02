import { useId } from 'react'
import { cn } from '@/lib/cn'

// Red dry-brush stroke drawn behind a line of text. Stretches to its parent.
export function BrushStroke({ className }) {
  const id = useId()
  return (
    <svg viewBox="0 0 640 120" preserveAspectRatio="none" aria-hidden className={cn('pointer-events-none absolute', className)}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b80c1d" />
          <stop offset="0.45" stopColor="#ff1a2b" />
          <stop offset="1" stopColor="#c20d1f" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id}-fill)`}
        d="M18 30 C140 20 380 10 612 4 L626 9 L612 15 L632 22 L614 31 L636 41 L616 52 L630 64 L610 74 L622 86 C430 96 220 106 26 116 L10 108 L22 100 L4 90 L20 80 L6 68 L22 58 L8 46 L24 38 Z"
      />
      {/* dry bristle streaks at the ragged ends */}
      <g fill="#ff1a2b" opacity="0.55">
        <path d="M0 52 L40 49 L38 53 L2 56 Z" />
        <path d="M6 74 L52 70 L50 74 L8 78 Z" />
        <path d="M604 30 L640 28 L638 31 L606 33 Z" />
        <path d="M600 62 L636 59 L634 63 L602 65 Z" />
      </g>
      <path d="M40 104 C220 96 420 88 600 80" stroke="#7a0712" strokeWidth="6" opacity="0.35" fill="none" />
    </svg>
  )
}

// Hand-drawn white double scribble used under the brush headline.
export function Scribble({ className }) {
  return (
    <svg viewBox="0 0 200 26" fill="none" aria-hidden className={cn('pointer-events-none absolute', className)}>
      <path d="M4 15 C50 5 120 2 196 6 C140 9 90 14 46 19 C100 15 150 14 190 17" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
