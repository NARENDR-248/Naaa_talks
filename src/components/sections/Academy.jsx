import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BarChart3, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { CourseIcon } from '@/components/ui/DynamicIcon'
import { cn } from '@/lib/cn'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { academy } = portfolioData

// Uploaded thumbnail, or a branded gradient with the course icon.
export function CourseThumb({ course, className }) {
  return (
    <div className={cn('relative isolate aspect-[16/10] overflow-hidden bg-[radial-gradient(120%_90%_at_20%_0%,#5a0b16,#160306_55%,#050505)]', className)}>
      {course.thumbnail ? (
        <img src={course.thumbnail} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <>
          <span aria-hidden className="absolute -right-10 -bottom-12 size-56 rounded-full border border-signal-500/30" />
          <span aria-hidden className="absolute -right-2 -bottom-4 size-36 rounded-full border border-signal-500/20" />
          <CourseIcon course={course} className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-signal-500 drop-shadow-[0_0_24px_rgb(255_16_31/0.6)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
        </>
      )}
    </div>
  )
}

export function CourseMeta({ course, className }) {
  return (
    <ul className={cn('flex flex-wrap gap-2 text-xs text-white/70', className)}>
      {course.level && <li className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1"><BarChart3 className="size-3.5 text-signal-400" aria-hidden />{course.level}</li>}
      <li className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1"><Clock className="size-3.5 text-signal-400" aria-hidden />{course.duration || academy.durationFallback}</li>
    </ul>
  )
}

export function CourseCard({ course, index = 0 }) {
  const href = `/academy/${course.slug}`
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] transition-[border-color,box-shadow] duration-300 hover:border-signal-500/40 hover:shadow-[0_30px_70px_-40px_rgb(255_23_68/0.6)]"
    >
      <Link to={href} tabIndex={-1} aria-hidden><CourseThumb course={course} /></Link>
      <div className="flex flex-1 flex-col p-6">
        <CourseMeta course={course} />
        <h3 className="mt-4 font-display text-xl font-medium text-white sm:text-2xl"><Link to={href} className="hover:text-signal-400">{course.title}</Link></h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{course.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link to={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">View course <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link>
          <Link to={`${href}#enquire`} className="text-sm font-semibold text-signal-400 hover:text-signal-500">Enquire now</Link>
        </div>
      </div>
    </motion.article>
  )
}

// Homepage section: the three courses.
export default function AcademySection() {
  const { courses } = useSiteContent()
  if (!courses.length) return null
  return (
    <section id="academy" aria-label={academy.eyebrow} className="relative isolate scroll-mt-20 overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-1/4 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(130_10_32/0.3),transparent)]" />
      <Shell>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div {...fadeUp(0, 16)}><Eyebrow>{academy.eyebrow}</Eyebrow></motion.div>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
              <RevealLine>{academy.title[0]}</RevealLine>
              <RevealLine delay={0.12} className="text-white/45">{academy.title[1]}</RevealLine>
            </h2>
            <motion.p {...fadeUp(0.15, 16)} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base">{academy.subtitle}</motion.p>
          </div>
          <motion.div {...fadeUp(0.2, 12)}>
            <Link to="/academy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">Explore the academy <ArrowUpRight className="size-4" /></Link>
          </motion.div>
        </div>
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => <CourseCard key={c.id ?? c.slug} course={c} index={i} />)}
        </div>
      </Shell>
    </section>
  )
}
