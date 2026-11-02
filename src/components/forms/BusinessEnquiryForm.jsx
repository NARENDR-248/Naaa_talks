import { portfolioData } from '@/data/portfolioData'
import { submitBusinessEnquiry } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { Field, FormAlert, FormCard, FormSuccess, Honeypot, SelectField, SubmitButton } from './FormKit'

const { forms } = portfolioData
const INITIAL = { name: '', company: '', email: '', phone: '', service: '', budget: '', timeline: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email'
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number'
  if (!v.service) e.service = 'Choose what you need'
  if (v.message.trim().length < 10) e.message = 'Tell us a little about your project (10+ characters)'
  return e
}

// Journey 01 — business owners.
export default function BusinessEnquiryForm({ defaultService = '' }) {
  const f = useGuardedForm({
    initial: { ...INITIAL, service: forms.serviceOptions.includes(defaultService) ? defaultService : '' },
    validate,
    submit: (v) => submitBusinessEnquiry(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || null]))),
  })

  return (
    <FormCard>
      {f.status === 'sent' ? (
        <FormSuccess title="Thank you — enquiry received" action={<button type="button" onClick={f.reset} className="text-sm font-semibold text-white/70 hover:text-white">Send another enquiry</button>}>
          Our team will review your project and get back to you shortly by email{f.values.phone ? ' or phone' : ''}.
          <SubmissionFollowUp purpose="business" reference={f.result?.reference} name={f.values.name} />
        </FormSuccess>
      ) : (
        <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Honeypot value={f.trap} onChange={f.setTrap} />
          <Field label="Your name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} />
          <Field label="Business / brand" optional autoComplete="organization" value={f.values.company} onChange={f.set('company')} />
          <Field label="Email" type="email" inputMode="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
          <Field label="Phone / WhatsApp" optional type="tel" inputMode="tel" autoComplete="tel" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} />
          <SelectField label="What do you need?" options={forms.serviceOptions} value={f.values.service} onChange={f.set('service')} error={f.err('service')} className="sm:col-span-2" />
          <SelectField label="Budget" optional placeholder="Select a range" options={forms.budgetOptions} value={f.values.budget} onChange={f.set('budget')} required={false} />
          <SelectField label="Timeline" optional placeholder="Select a timeline" options={forms.timelineOptions} value={f.values.timeline} onChange={f.set('timeline')} required={false} />
          <Field as="textarea" label="Project details" className="sm:col-span-2" value={f.values.message} onChange={f.set('message')} error={f.err('message')} placeholder="Your business, goals, the content you have in mind and any references…" />
          <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>
          <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">Send enquiry</SubmitButton>
        </form>
      )}
    </FormCard>
  )
}
