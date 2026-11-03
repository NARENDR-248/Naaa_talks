import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { RESUME_MAX_BYTES, RESUME_TYPES, submitJobApplication } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { Field, FileField, FormAlert, FormCard, FormSuccess, Honeypot, SelectField, SubmitButton } from './FormKit'

const { forms } = portfolioData
const URL_RE = /^https?:\/\/\S+\.\S+/

function resumeError(file) {
  if (!file) return 'Please attach your resume (PDF or Word)'
  if (!RESUME_TYPES.includes(file.type)) return 'Resume must be a PDF or Word document'
  if (file.size > RESUME_MAX_BYTES) return 'Resume must be smaller than 5 MB'
  return null
}

// Journey 03 — job applicants. `jobs` = open positions; `defaultJobId` preselects one.
export default function JobApplicationForm({ jobs, defaultJobId }) {
  const [resume, setResume] = useState(null)
  const preset = jobs.find((j) => String(j.id) === String(defaultJobId))
  const positions = [...jobs.map((j) => j.title), 'General application']

  const f = useGuardedForm({
    initial: { name: '', email: '', phone: '', location: '', position: preset?.title ?? '', experience: '', portfolio_url: '', instagram: '', intro: '' },
    validate: (v) => {
      const e = {}
      if (v.name.trim().length < 2) e.name = 'Please enter your full name'
      if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email'
      if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number'
      if (!v.position) e.position = 'Choose the position you are applying for'
      if (!v.experience) e.experience = 'Choose your experience level'
      if (v.portfolio_url.trim() && !URL_RE.test(v.portfolio_url.trim())) e.portfolio_url = 'Enter a full link starting with https://'
      if (v.intro.trim() && v.intro.trim().length < 10) e.intro = 'Write a little more, or leave this empty (10+ characters)'
      const r = resumeError(resume)
      if (r) e.resume = r
      return e
    },
    submit: (v) => {
      const job = jobs.find((j) => j.title === v.position)
      const row = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || null]))
      // Only real database ids (uuids) are linked; built-in default openings are not.
      const jobId = job && /^[0-9a-f-]{36}$/i.test(String(job.id)) ? job.id : null
      return submitJobApplication({ ...row, job_id: jobId }, resume)
    },
  })

  return (
    <FormCard>
      {f.status === 'sent' ? (
        <FormSuccess title="Application submitted" action={<Link to="/careers" className="text-sm font-semibold text-white/70 hover:text-white">Back to careers</Link>}>
          Thank you for applying{f.values.position ? ` for ${f.values.position}` : ''}. Our team reviews every application and will contact shortlisted candidates.
          <SubmissionFollowUp purpose="careers" reference={f.result?.reference} name={f.values.name} detail={f.values.position} />
        </FormSuccess>
      ) : (
        <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Honeypot value={f.trap} onChange={f.setTrap} />
          <Field label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} />
          <Field label="Email" type="email" inputMode="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
          <Field label="Phone number" type="tel" inputMode="tel" autoComplete="tel" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} />
          <Field label="Current location" optional autoComplete="address-level2" value={f.values.location} onChange={f.set('location')} error={f.err('location')} />
          <SelectField label="Position applying for" options={positions} value={f.values.position} onChange={f.set('position')} error={f.err('position')} />
          <SelectField label="Experience" options={forms.experienceOptions} value={f.values.experience} onChange={f.set('experience')} error={f.err('experience')} />
          <Field label="Portfolio link" optional type="url" inputMode="url" value={f.values.portfolio_url} onChange={f.set('portfolio_url')} error={f.err('portfolio_url')} placeholder="https://" />
          <Field label="Instagram profile" optional value={f.values.instagram} onChange={f.set('instagram')} placeholder="@yourname" />
          <FileField label="Resume" className="sm:col-span-2" accept=".pdf,.doc,.docx" file={resume} onFile={setResume} error={f.err('resume')} hint="PDF or Word, up to 5 MB" />
          <Field as="textarea" label="Short introduction" optional className="sm:col-span-2" value={f.values.intro} onChange={f.set('intro')} error={f.err('intro')} placeholder="Your skills, tools you use and the work you're proudest of…" />
          <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>
          <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">Apply Now</SubmitButton>
        </form>
      )}
    </FormCard>
  )
}
