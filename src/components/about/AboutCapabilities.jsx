import { motion } from 'framer-motion'
import { ArrowRight, Clapperboard, GraduationCap, Megaphone, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { cardIn, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import SectionTitle from './SectionTitle'

const { about } = portfolioData
const ICONS = { content: Clapperboard, marketing: Megaphone, video: Video, education: GraduationCap }

// "What We Do": four capabilities in an editorial row, each leading to its page.
export default function AboutCapabilities() {
  return (
    <section aria-label="What we do" className="relative isolate overflow-hidden bg-[#0A0A0A] section-y">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(150_10_32/0.2),transparent)]" />
      <Shell>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="What we do" lines={['Creative Ideas.', 'Powerful Execution.']} />
          <p className="max-w-sm text-[15px] leading-relaxed text-[#A1A1AA]">Four capabilities, one in-house team — from the first idea to the final frame.</p>
        </div>
        <motion.ul {...staggerGroup(0.1)} className="mt-10 grid gap-x-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {about.capabilities.map((c, i) => {
            const Icon = ICONS[c.icon] ?? Clapperboard
            return (
              <motion.li key={c.title} variants={cardIn}>
                <Link to={c.href} className="group relative flex h-full flex-col border-t border-white/10 pt-6 pb-8">
                  <span aria-hidden className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[#FF1744] transition-[scale] duration-500 ease-out group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-white/35 tabular-nums transition-colors duration-500 group-hover:text-[#FF1744]">{String(i + 1).padStart(2, '0')}</span>
                    <Icon className="size-5 text-[#FF1744]/80" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-white">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#A1A1AA]">{c.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                    Explore <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </Shell>
    </section>
  )
}
