import { useEffect, useRef } from 'react'
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

const COUNT_SECONDS = 2
const STAGGER = 0.2
const easeOutExpo = [0.16, 1, 0.3, 1]

// Counts 0 → value once `start` turns true. Writes straight to the DOM, so the count
// never re-renders React. Screen readers get the final figure from the hidden text;
// reduced-motion visitors simply see it.
function Counter({ value, suffix = '', start, delay = 0 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduce || !start) return
    el.textContent = '0'
    const c = animate(0, value, { duration: COUNT_SECONDS, delay, ease: easeOutExpo, onUpdate: (v) => { el.textContent = String(Math.round(v)) } })
    return () => c.stop()
  }, [start, reduce, value, delay])
  return (
    <span>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden>
        <span ref={ref}>{reduce ? value : 0}</span>
        {suffix && <span className="text-primary">{suffix}</span>}
      </span>
    </span>
  )
}

const statsGroup = { hidden: {}, show: { transition: { staggerChildren: STAGGER } } }
const statIn = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
}

// Admin-editable figures in one strip, shown only once they are marked as verified
// (not samples) in Admin → Settings.
function StatsStrip() {
  const { stats } = useSiteContent().settings
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  if (stats.isSample || !stats.items?.length) return null
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.7, ease }} className="mt-5">
      <motion.dl ref={ref} variants={statsGroup} initial="hidden" animate={inView ? 'show' : 'hidden'} className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 bg-[#0D0D0D] lg:grid-cols-4">
        {stats.items.map((s, i) => {
          // Items edited in admin carry no icon, so fall back by position.
          const Icon = STAT_ICONS[s.icon] ?? Object.values(STAT_ICONS)[i % 4]
          return (
            <motion.div
              key={s.label}
              variants={statIn}
              className={`group relative flex min-w-0 items-center gap-2.5 px-3.5 py-5 sm:py-6 transition-colors duration-500 hover:bg-white/[0.025] sm:gap-4 sm:px-7 ${i % 2 ? 'border-l border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              {/* Hover: a red wash rises from the bottom edge */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-gradient-to-t from-primary/[0.09] to-transparent transition-transform duration-500 group-hover:scale-y-100" />
              <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              <Icon className="relative size-6 shrink-0 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110 sm:size-8" strokeWidth={1.4} aria-hidden />
              <div className="relative flex min-w-0 flex-col-reverse">
                <dt className="truncate text-[11px] text-[#A1A1AA] sm:text-[13px]">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold whitespace-nowrap text-white tabular-nums [text-shadow:0_0_24px_rgb(255_23_68/0.35)] sm:text-[1.75rem]">
                  <Counter value={Number(s.value) || 0} suffix={s.suffix} start={inView} delay={i * STAGGER} />
                </dd>
              </div>
            </motion.div>
          )
        })}
      </motion.dl>
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
                <Link to="/about" className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] p-6 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_26px_60px_-34px_rgb(255_23_68/0.65)]">
                  <div className="flex items-center gap-2.5">
                    {i > 0 && <span className="font-display text-lg font-semibold text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>}
                    <Icon className="size-6 text-primary" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{b.text}</p>
                  <span className="mt-5 grid size-9 place-items-center self-end rounded-full border border-white/15 text-white/70 transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
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
