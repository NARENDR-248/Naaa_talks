import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import PageHero from '@/components/layout/PageHero'
import { Block, StepsGrid } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import { CourseCard } from '@/components/sections/Academy'
import CourseEnquiryForm from '@/components/forms/CourseEnquiryForm'
import FAQ from '@/components/sections/FAQ'

const { academy } = portfolioData

export default function AcademyPage() {
  usePageMeta('Naaa Talks Academy — Courses', academy.subtitle)
  const { courses } = useSiteContent()
  return (
    <>
      <PageHero crumbs={[{ label: 'Academy' }]} eyebrow={academy.eyebrow} title={academy.title} subtitle={academy.subtitle}>
        <Cta href="#courses">View courses</Cta>
        <Cta href="#enquire" variant="outline">Enquire now</Cta>
      </PageHero>

      <Block id="courses" eyebrow="Our courses" title={[`${courses.length} course${courses.length === 1 ? '' : 's'}`, 'built on real work.']} className="pt-3 sm:pt-4">
        {courses.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => <CourseCard key={c.id ?? c.slug} course={c} index={i} />)}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-white/12 p-6 text-sm text-white/55">New batches are being planned — send an enquiry and we will tell you first.</p>
        )}
      </Block>

      <Block eyebrow="How we teach" title={['Practical training,', 'not just theory.']}>
        <StepsGrid steps={academy.approach} columns="lg:grid-cols-4" />
      </Block>

      <Block id="enquire" eyebrow="Admission enquiry" title={['Start your', 'creative journey.']} intro={academy.enquiryNote}>
        <div className="mt-8 max-w-3xl"><CourseEnquiryForm courses={courses} /></div>
      </Block>

      <FAQ />
    </>
  )
}
