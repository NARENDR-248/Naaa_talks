import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { cardIn, drawLine, staggerGroup } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Shell } from '@/components/portfolio/Kit'
import SectionTitle from './SectionTitle'

const { about } = portfolioData

// Asymmetric 12-column layout (desktop); the story leads, the team closes full width.
const LAYOUT = {
  story: 'sm:col-span-2 lg:col-span-7 lg:row-span-2',
  mission: 'lg:col-span-5',
  vision: 'lg:col-span-5',
  different: 'lg:col-span-5',
  approach: 'lg:col-span-7',
  team: 'sm:col-span-2 lg:col-span-12',
}

function StoryCard({ block, index }) {
  const href = about.blockLinks[block.key]
  const lead = block.key === 'story'
  const wide = block.key === 'team'
  const inner = (
    <>
      <motion.span aria-hidden variants={drawLine} className="absolute inset-x-7 top-0 h-px origin-left bg-gradient-to-r from-primary/70 via-primary/15 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_0%_100%,rgb(255_23_68/0.14),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      {lead && (
        <span aria-hidden className="pointer-events-none absolute -top-20 -right-20 hidden size-80 sm:block">
          {[0, 14, 28].map((inset) => (
            <span key={inset} className="absolute rounded-full border border-white/[0.06] transition-colors duration-700 group-hover:border-primary/25" style={{ inset }} />
          ))}
        </span>
      )}

      <div className={cn('relative flex h-full gap-6', wide ? 'flex-col sm:flex-row sm:items-center sm:gap-10' : 'flex-col')}>
        <div className="flex items-start justify-between gap-4">
          <span className={cn('font-display leading-none font-light text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1px_rgb(255_255_255/0.28)] group-hover:[-webkit-text-stroke-color:#FF1744]', lead ? 'text-7xl sm:text-8xl' : 'text-5xl sm:text-6xl')}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {href && !wide && <ArrowUpRight aria-hidden className="size-5 text-white/30 transition-[translate,color] duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />}
        </div>
        <div className={cn(lead && 'mt-auto', wide && 'flex-1')}>
          {lead && <p className="mb-5 font-script text-2xl text-white/35 transition-colors duration-500 group-hover:text-primary/80 sm:text-3xl">{portfolioData.brand.tagline}</p>}
          <span aria-hidden className="block h-px w-8 bg-primary transition-[width] duration-500 group-hover:w-16" />
          <h3 className={cn('mt-4 font-display font-medium tracking-tight text-white', lead ? 'text-2xl sm:text-3xl' : 'text-xl')}>{block.title}</h3>
          <p className={cn('mt-3 leading-relaxed text-[#A1A1AA]', lead ? 'max-w-xl text-base sm:text-lg' : 'text-[15px]')}>{block.text}</p>
        </div>
        {href && wide && <ArrowUpRight aria-hidden className="size-6 shrink-0 text-white/30 transition-[translate,color] duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />}
      </div>
    </>
  )
  const card = 'group relative block h-full overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0D0D0D] p-7 transition-[translate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_70px_-40px_rgb(255_23_68/0.65)] sm:p-8'
  return (
    <motion.li variants={cardIn} className={LAYOUT[block.key]}>
      {href ? (
        href.startsWith('#') ? <a href={href} className={card}>{inner}</a> : <Link to={href} className={card}>{inner}</Link>
      ) : (
        <div className={card}>{inner}</div>
      )}
    </motion.li>
  )
}

export default function AboutStory() {
  return (
    <section aria-label="Our story" className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/4 -left-48 -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(150_10_32/0.22),transparent)]" />
      <Shell>
        <SectionTitle eyebrow="Who we are" lines={['Every brand has a story.', 'We help tell it.']} />
        <motion.ul {...staggerGroup(0.1)} className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {about.blocks.map((b, i) => <StoryCard key={b.key} block={b} index={i} />)}
        </motion.ul>
      </Shell>
    </section>
  )
}
