import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { lines } from '@/lib/icons'
import PageHero from '@/components/layout/PageHero'
import { Block, Checklist } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import { CourseCard, CourseMeta, CourseThumb } from '@/components/sections/Academy'
import CourseEnquiryForm from '@/components/forms/CourseEnquiryForm'
import NotFound from './NotFound'

const { academy } = portfolioData

function Modules({ items }) {
  return (
    <ol className="mt-8 grid gap-3 md:grid-cols-2">
      {items.map((m, i) => {
        const [head, ...rest] = m.split(' — ')
        return (
          <motion.li
            key={m}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease }}
            className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <span className="font-display text-2xl font-extralight text-signal-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[15px] text-white/80">
              {rest.length ? <><span className="block text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">{head}</span>{rest.join(' — ')}</> : m}
            </span>
          </motion.li>
        )
      })}
    </ol>
  )
}

export default function CoursePage() {
  const { slug } = useParams()
  const { courses } = useSiteContent()
  const course = courses.find((c) => c.slug === slug)
  usePageMeta(course ? `${course.title} — Naaa Talks Academy` : 'Course not found', course?.tagline)
  if (!course) return <NotFound />

  const syllabus = lines(course.syllabus)
  const modules = lines(course.modules)
  const practical = lines(course.practical)
  const projects = lines(course.projects)
  const outcomes = lines(course.outcomes)
  const others = courses.filter((c) => c.slug !== slug)

  return (
    <>
      <PageHero crumbs={[{ label: 'Academy', href: '/academy' }, { label: course.title }]} eyebrow={academy.eyebrow} title={[course.title]} subtitle={course.tagline}>
        <Cta href="#enquire">Enquire now <ArrowRight className="size-4" /></Cta>
        <Cta href="#syllabus" variant="outline">See the syllabus</Cta>
      </PageHero>

      <Block eyebrow="Course introduction" className="pt-3 sm:pt-4">
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <motion.div {...fadeUp(0.05)}>
            <p className="text-base leading-relaxed text-white/75 sm:text-lg">{course.description}</p>
            {course.slug === 'content-creator-course' && (
              <p className="mt-5 text-sm text-white/55">
                Want a more personal, mentored journey? <Link to="/influencer-program" className="font-semibold text-signal-400 hover:text-signal-500">See our Zero to Influencer program →</Link>
              </p>
            )}
          </motion.div>
          <motion.aside {...fadeUp(0.15)} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
            <CourseThumb course={course} />
            <div className="p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">At a glance</p>
              <CourseMeta course={course} className="mt-3" />
              {modules.length > 0 && <p className="mt-4 text-sm text-white/60">{modules.length} training modules · practical sessions · portfolio projects</p>}
              <Cta href="#enquire" size="sm" className="mt-5 w-full">Enquire now</Cta>
            </div>
          </motion.aside>
        </div>
      </Block>

      {syllabus.length > 0 && (
        <Block id="syllabus" eyebrow="Course syllabus" title={['What you', 'will learn.']}>
          <div className="mt-8 max-w-3xl"><Checklist title="Syllabus" items={syllabus} /></div>
        </Block>
      )}

      {modules.length > 0 && (
        <Block eyebrow="Training modules" title={['Step by step,', 'module by module.']}>
          <Modules items={modules} />
        </Block>
      )}

      {(practical.length > 0 || projects.length > 0) && (
        <Block eyebrow="Learn by doing" title={['Practical sessions', 'and real projects.']}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {practical.length > 0 && <Checklist title="Practical sessions" items={practical} />}
            {projects.length > 0 && <Checklist title="Projects you will complete" items={projects} />}
          </div>
        </Block>
      )}

      {outcomes.length > 0 && (
        <Block eyebrow="Learning outcomes" title={['By the end', 'of the course.']}>
          <div className="mt-8 max-w-3xl"><Checklist title="You will be able to" items={outcomes} /></div>
        </Block>
      )}

      <Block id="enquire" eyebrow="Admission enquiry" title={['Enquire about', course.title]} intro={academy.enquiryNote}>
        <div className="mt-8 max-w-3xl"><CourseEnquiryForm key={course.slug} courses={courses} defaultSlug={course.slug} /></div>
      </Block>

      {others.length > 0 && (
        <Block eyebrow="More from the academy" title={['Explore', 'other courses.']}>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((c, i) => <CourseCard key={c.id ?? c.slug} course={c} index={i} />)}
          </div>
        </Block>
      )}
    </>
  )
}
