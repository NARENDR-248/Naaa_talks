import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Check, Clock, MapPin, Plus } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease } from '@/lib/motion'
import { cn } from '@/lib/cn'
import PageHero from '@/components/layout/PageHero'
import { Block, Checklist } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const { careers, pages, production } = portfolioData
const applyHref = (job) => `/careers/apply?job=${encodeURIComponent(job.id)}`

function JobCard({ job, index, open, onToggle }) {
  const skills = (job.skills ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
  const panelId = `job-panel-${index}`
  return (
    <motion.li initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease }}>
      <article className={cn('rounded-2xl border transition-colors', open ? 'border-signal-500/40 bg-white/[0.04]' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20')}>
        <h3>
          <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center gap-4 p-5 text-left sm:p-6">
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-medium text-white sm:text-xl">{job.title}</span>
              <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                {job.department && <span className="flex items-center gap-1"><Briefcase className="size-3.5" />{job.department}</span>}
                {job.employment_type && <span className="flex items-center gap-1"><Clock className="size-3.5" />{job.employment_type}</span>}
                {job.location && <span className="flex items-center gap-1"><MapPin className="size-3.5" />{job.location}</span>}
              </span>
            </span>
            <Plus className={cn('size-5 shrink-0 text-white/60 transition-transform duration-300', open && 'rotate-45 text-signal-400')} aria-hidden />
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
              <div className="grid gap-6 border-t border-white/[0.06] px-5 py-5 sm:grid-cols-[1.4fr_1fr] sm:px-6 sm:py-6">
                <div>
                  <p className="text-[15px] leading-relaxed text-white/70">{job.description}</p>
                  {job.experience && <p className="mt-4 text-sm text-white/55"><span className="font-semibold text-white/80">Experience:</span> {job.experience}</p>}
                </div>
                {skills.length > 0 && (
                  <div>
                    <p className="font-sans text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Required skills</p>
                    <ul className="mt-3 space-y-2">
                      {skills.map((s) => <li key={s} className="flex gap-2 text-sm text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-signal-400" aria-hidden />{s}</li>)}
                    </ul>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <Cta href={applyHref(job)} size="sm">Apply now <ArrowUpRight className="size-4" /></Cta>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.li>
  )
}

export default function CareersPage() {
  usePageMeta('Careers — Join Our Team', careers.subtitle)
  const { jobs } = useSiteContent()
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero crumbs={[{ label: 'Careers' }]} eyebrow={careers.eyebrow} title={pages.careers.title} subtitle={careers.subtitle}>
        <Cta href="#open-positions">View open positions</Cta>
        <Cta href="/careers/apply" variant="outline">General application</Cta>
        <WhatsAppCta purpose="careers" label="Talk to Our Team" />
      </PageHero>

      <Block id="open-positions" eyebrow="Open positions" title={[`${jobs.length} role${jobs.length === 1 ? '' : 's'}`, 'open right now.']}>
        {jobs.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-white/12 p-6 text-sm text-white/55">{careers.empty}</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
          </ul>
        )}
      </Block>

      <Block eyebrow="Life at NAAA TALKS" title={production.title}>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Checklist title="Why join us" items={careers.perks} />
          <Checklist title="How we work together" items={production.workflow.map((w, i) => `${String(i + 1).padStart(2, '0')} — ${w}`)} />
        </div>
      </Block>

      <Block>
        <CtaBanner title="Don't see your role?" text="Send a general application — we are always meeting creative people." label="General application" href="/careers/apply" className="mt-0" />
      </Block>
    </>
  )
}
