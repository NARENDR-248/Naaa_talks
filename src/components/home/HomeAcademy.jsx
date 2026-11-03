import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { cardIn, staggerGroup } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import { CourseThumb } from '@/components/sections/Academy'
import HomeHeading from './HomeHeading'

// Homepage "Naaa Talks Academy": the three courses with a solid CTA.
export default function HomeAcademy() {
  const { courses } = useSiteContent()
  if (!courses.length) return null
  return (
    <section id="academy" aria-label="Naaa Talks Academy" className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.25),transparent)]" />
      <Shell>
        <HomeHeading eyebrow="Naaa Talks Academy" title={portfolioData.academy.title} text={portfolioData.home.academyText} action={{ label: 'Explore Academy', href: '/academy', solid: true }} />
        <motion.ul {...staggerGroup(0.12)} className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <motion.li key={c.id ?? c.slug} variants={cardIn}>
              <Link to={`/academy/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF1744]/45 hover:shadow-[0_26px_60px_-34px_rgb(255_23_68/0.65)]">
                <CourseThumb course={c} className="aspect-[16/9]" />
                <div className="flex flex-1 items-end gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">{c.tagline}</p>
                    {c.level && <p className="mt-2 text-[11px] text-white/40">{c.level}{c.duration ? ` · ${c.duration}` : ''}</p>}
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition group-hover:border-[#FF1744] group-hover:bg-[#FF1744] group-hover:text-white">
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Shell>
    </section>
  )
}
