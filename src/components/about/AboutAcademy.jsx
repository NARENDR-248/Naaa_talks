import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, cardIn, ease, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import { CourseIcon } from '@/components/ui/DynamicIcon'
import SectionTitle from './SectionTitle'

const { academyPromo } = portfolioData.about

// Naaa Talks Academy feature: a distinct panel with the three courses.
export default function AboutAcademy() {
  const { courses } = useSiteContent()
  return (
    <section aria-label="Naaa Talks Academy" className="relative isolate section-y">
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.8, ease }}
          className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0D0D0D] p-7 sm:p-10 lg:p-14"
        >
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.22),transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 -z-10 size-[24rem] rounded-full border border-primary/15" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <SectionTitle eyebrow="Naaa Talks Academy" lines={academyPromo.title} tone="accent" size="text-[1.9rem] sm:text-[2.6rem] lg:text-5xl" />
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#A1A1AA] sm:text-base">{academyPromo.text}</p>
              <Link
                to="/academy"
                className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgb(255_23_68/0.85)] transition-[background-color,translate] hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                Explore Academy <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>

            <motion.ul {...staggerGroup(0.12, 0.2)} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {courses.map((c) => (
                <motion.li key={c.id ?? c.slug} variants={cardIn}>
                  <Link to={`/academy/${c.slug}`} className="group flex items-center gap-4 py-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary-soft transition-transform duration-500 group-hover:scale-105">
                      <CourseIcon course={c} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-medium text-white">{c.title}</span>
                      {c.level && <span className="mt-0.5 block text-xs text-[#A1A1AA]">{c.level}</span>}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-white/30 transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Shell>
    </section>
  )
}
