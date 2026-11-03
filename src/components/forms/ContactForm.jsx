import { portfolioData } from '@/data/portfolioData'
import { submitContactEnquiry } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { Field, FormAlert, FormCard, FormSuccess, Honeypot, SelectField, SubmitButton } from './FormKit'

const { forms } = portfolioData
const INITIAL = { name: '', email: '', phone: '', service: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email'
  if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid mobile number'
  if (!v.service) e.service = 'Choose what you are interested in'
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters)'
  return e
}

// General "Contact us" enquiry (homepage and Contact page).
export default function ContactForm({ defaultService = '' }) {
  const f = useGuardedForm({
    initial: { ...INITIAL, service: forms.contactTopics.includes(defaultService) ? defaultService : '' },
    validate,
    submit: (v) => submitContactEnquiry(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || null]))),
  })

  return (
    <FormCard>
      {f.status === 'sent' ? (
        <FormSuccess title="Thank you — message received" action={<button type="button" onClick={f.reset} className="text-sm font-semibold text-white/70 hover:text-white">Send another message</button>}>
          Our team will get back to you shortly by email or phone.
          <SubmissionFollowUp purpose="contact" reference={f.result?.reference} name={f.values.name} />
        </FormSuccess>
      ) : (
        <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Honeypot value={f.trap} onChange={f.setTrap} />
          <Field label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} className="sm:col-span-2" />
          <Field label="Email" type="email" inputMode="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
          <Field label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} />
          <SelectField label="Service interested in" options={forms.contactTopics} value={f.values.service} onChange={f.set('service')} error={f.err('service')} className="sm:col-span-2" />
          <Field as="textarea" label="Message" className="sm:col-span-2" value={f.values.message} onChange={f.set('message')} error={f.err('message')} placeholder="Your business, your idea or your question…" />
          <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>
          <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">Send message</SubmitButton>
        </form>
      )}
    </FormCard>
  )
}
