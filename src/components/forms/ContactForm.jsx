import { Mail, MessageSquareText, Phone, UserRound } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { submitContactEnquiry } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { ChipField, Field, FormAlert, FormCard, FormSuccess, Honeypot, SubmitButton } from './FormKit'

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

// General "Contact us" enquiry. `submitLabel` / `look` only change how it looks:
// 'card' is the standalone card, 'panel' sits inside the homepage contact panel.
export default function ContactForm({ defaultService = '', submitLabel = 'Send message', look = 'card' }) {
  const f = useGuardedForm({
    initial: { ...INITIAL, service: forms.contactTopics.includes(defaultService) ? defaultService : '' },
    validate,
    submit: (v) => submitContactEnquiry(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || null]))),
  })

  const content = f.status === 'sent' ? (
    <FormSuccess title="Thank you — message received" action={<button type="button" onClick={f.reset} className="text-sm font-semibold text-white/70 hover:text-white">Send another message</button>}>
      Our team will get back to you shortly by email or phone.
      <SubmissionFollowUp purpose="contact" reference={f.result?.reference} name={f.values.name} />
    </FormSuccess>
  ) : (
    <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Honeypot value={f.trap} onChange={f.setTrap} />
      <Field label="Full name" icon={UserRound} autoComplete="name" placeholder="Your name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} />
      <Field label="Email address" icon={Mail} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
      <Field label="Phone / WhatsApp" icon={Phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} className="sm:col-span-2" />
      <ChipField label="What can we help with?" options={forms.contactTopics} value={f.values.service} onChange={f.set('service')} error={f.err('service')} className="sm:col-span-2" />
      <Field as="textarea" label="Project details" icon={MessageSquareText} className="sm:col-span-2" value={f.values.message} onChange={f.set('message')} error={f.err('message')} placeholder="Tell us about your project, goals or requirements…" />
      {f.error && <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>}
      <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">{submitLabel}</SubmitButton>
    </form>
  )

  if (look === 'panel') {
    return (
      <div className="relative rounded-[20px] border border-white/10 bg-black/45 p-4 backdrop-blur-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/8 pb-4">
          <p className="font-display text-base font-semibold text-white">Send an enquiry</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/45">
            <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" /><span className="relative size-2 rounded-full bg-emerald-400" /></span>
            We read every message
          </span>
        </div>
        {content}
      </div>
    )
  }
  return <FormCard>{content}</FormCard>
}
