import { motion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useJourneys } from '@/hooks/useJourneys'
import { REVEAL, ease } from '@/lib/motion'
import { cn } from '@/lib/cn'

const ICONS = { business: BriefcaseBusiness, influencer: Sparkles, careers: UsersRound }

// The three separate conversion paths, side by side.
export default function JourneyChooser({ className }) {
  const journeys = useJourneys()
  return (
    <ul className={cn('grid gap-3 md:grid-cols-3', className)}>
      {Object.entries(journeys).map(([key, j], i) => {
        const Icon = ICONS[key]
        return (
          <motion.li key={key} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.6, delay: i * 0.1, ease }}>
            <Link
              to={j.href}
              className={cn(
                'group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 active:scale-[0.985]',
                i === 0 ? 'border-signal-500/50 bg-gradient-to-br from-wine-900 to-[#0b0405]' : 'border-white/[0.08] bg-white/[0.025] hover:border-signal-500/40',
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('grid size-11 place-items-center rounded-xl', i === 0 ? 'bg-signal-500 text-white' : 'bg-signal-500/10 text-[#FF4D6A]')}>
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <ArrowUpRight className="size-5 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden />
              </div>
              <p className="mt-6 font-sans text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{j.audience}</p>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight text-white">{j.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{j.text}</p>
            </Link>
          </motion.li>
        )
      })}
    </ul>
  )
}
