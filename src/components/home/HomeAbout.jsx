import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, CalendarDays, Eye, GraduationCap, Layers, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, cardIn, ease, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import SectionTitle from '@/components/about/SectionTitle'

const { about } = portfolioData
const CARD_ICONS = { story: BookOpen, mission: Target, vision: Eye }
const STAT_ICONS = { calendar: CalendarDays, layers: Layers, education: GraduationCap, brand: Sparkles }

function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, value, { duration: 1.4, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, value])
  return <span ref={ref}>{reduce ? value : n}{suffix}</span>
}

// Admin-editable figures in one strip; labelled as samples until real numbers are entered.
function StatsStrip() {
  const { stats } = useSiteContent().settings
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.7, ease }} className="mt-5">
      <dl className="grid grid-cols-2 rounded-[20px] border border-white/10 bg-[#0D0D0D] lg:grid-cols-4">
        {stats.items.map((s, i) => {
          // Items edited in admin carry no icon, so fall back by position.
          const Icon = STAT_ICONS[s.icon] ?? Object.values(STAT_ICONS)[i % 4]
          return (
            <div key={s.label} className={`flex items-center gap-4 px-5 py-6 sm:px-7 ${i % 2 ? 'border-l border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
              <Icon className="size-8 shrink-0 text-[#FF1744]" strokeWidth={1.4} aria-hidden />
              <div className="flex flex-col-reverse">
                <dt className="text-xs text-[#A1A1AA] sm:text-[13px]">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-white tabular-nums sm:text-[1.75rem]"><Counter value={Number(s.value) || 0} suffix={s.suffix} /></dd>
              </div>
            </div>
          )
        })}
      </dl>
      {stats.isSample && <p className="mt-2.5 text-center text-[11px] text-white/35">{stats.sampleNote}</p>}
    </motion.div>
  )
}

// Homepage "About NAAA TALKS": heading, introduction, three cards and the figures strip.
export default function HomeAbout() {
  const cards = about.blocks.filter((b) => CARD_ICONS[b.key])
  return (
    <section id="about" aria-label="About NAAA TALKS" className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-0 -right-40 -z-10 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.3),transparent)]" />
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <SectionTitle eyebrow="About NAAA TALKS" lines={about.heroTitle} tone="accent" weight="font-semibold" size="text-[2.2rem] sm:text-5xl lg:text-[3.2rem]" />
          <div className="space-y-4">
            {about.heroParagraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={REVEAL} transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease }} className="text-[15px] leading-relaxed text-[#A1A1AA]">
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.ul {...staggerGroup(0.12)} className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((b, i) => {
            const Icon = CARD_ICONS[b.key]
            return (
              <motion.li key={b.key} variants={cardIn}>
                <Link to="/about" className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] p-6 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF1744]/45 hover:shadow-[0_26px_60px_-34px_rgb(255_23_68/0.65)]">
                  <div className="flex items-center gap-2.5">
                    {i > 0 && <span className="font-display text-lg font-semibold text-[#FF1744] tabular-nums">{String(i + 1).padStart(2, '0')}</span>}
                    <Icon className="size-6 text-[#FF1744]" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{b.text}</p>
                  <span className="mt-5 grid size-9 place-items-center self-end rounded-full border border-white/15 text-white/70 transition group-hover:border-[#FF1744] group-hover:bg-[#FF1744] group-hover:text-white">
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>

        <StatsStrip />
      </Shell>
    </section>
  )
}
