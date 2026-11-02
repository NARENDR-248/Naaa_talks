import { useSearchParams } from 'react-router-dom'
import { Briefcase, Clock, MapPin } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import PageHero from '@/components/layout/PageHero'
import { Shell } from '@/components/portfolio/Kit'
import JobApplicationForm from '@/components/forms/JobApplicationForm'

const page = portfolioData.pages.jobApply

export default function JobApplicationPage() {
  const [params] = useSearchParams()
  const { jobs } = useSiteContent()
  const job = jobs.find((j) => String(j.id) === params.get('job'))
  usePageMeta(job ? `Apply — ${job.title}` : 'Job Application', page.subtitle)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers', href: '/careers' }, { label: job ? job.title : 'Application' }]}
        eyebrow={page.eyebrow}
        title={job ? ['Apply for', job.title] : page.title}
        subtitle={page.subtitle}
      />
      <Shell className="grid gap-8 pb-20 lg:grid-cols-[1fr_1.6fr]">
        <aside className="h-fit rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 lg:sticky lg:top-24">
          {job ? (
            <>
              <p className="font-sans text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Position</p>
              <h2 className="mt-2 font-display text-2xl font-medium text-white">{job.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {job.department && <li className="flex items-center gap-2"><Briefcase className="size-4 text-signal-400" />{job.department}</li>}
                {job.employment_type && <li className="flex items-center gap-2"><Clock className="size-4 text-signal-400" />{job.employment_type}</li>}
                {job.location && <li className="flex items-center gap-2"><MapPin className="size-4 text-signal-400" />{job.location}</li>}
              </ul>
              {job.description && <p className="mt-5 text-sm leading-relaxed text-white/60">{job.description}</p>}
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl font-medium text-white">General application</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">Choose a position in the form, or select “General application” if you would like to be considered for future roles.</p>
            </>
          )}
          <p className="mt-6 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-white/40">Your resume is stored privately and only our hiring team can open it. See our privacy policy.</p>
        </aside>
        <JobApplicationForm key={job?.id ?? 'general'} jobs={jobs} defaultJobId={job?.id} />
      </Shell>
    </>
  )
}
