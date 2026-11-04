import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { submitInfluencerApplication } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { Field, FormAlert, FormCard, FormSuccess, Honeypot, SelectField, SubmitButton } from './FormKit'

const { forms } = portfolioData
const INITIAL = { name: '', email: '', phone: '', age: '', city: '', instagram: '', niche: '', camera_experience: '', availability: '', motivation: '', consent: false }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email'
  if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a phone number we can reach you on'
  const age = Number(v.age)
  if (!v.age || !Number.isInteger(age) || age < 13 || age > 80) e.age = 'Please enter your age (13–80)'
  if (!v.city.trim()) e.city = 'Please enter your city'
  if (!v.niche) e.niche = 'Choose the content you are most interested in'
  if (!v.camera_experience) e.camera_experience = 'Tell us how comfortable you are on camera'
  if (v.motivation.trim().length < 10) e.motivation = 'Tell us a little about yourself (10+ characters)'
  if (!v.consent) e.consent = 'Please confirm so we can contact you'
  return e
}

// Journey 02 — aspiring influencers.
export default function InfluencerApplicationForm() {
  const f = useGuardedForm({
    initial: INITIAL,
    validate,
    // The consent checkbox gates submission but is not stored as a column.
    submit: (v) => submitInfluencerApplication({
      ...Object.fromEntries(Object.entries(v).filter(([k]) => k !== 'consent').map(([k, x]) => [k, String(x).trim() || null])),
      age: Number(v.age),
    }),
  })

  return (
    <FormCard>
      {f.status === 'sent' ? (
        <FormSuccess title="Application received!" action={<Link to="/influencer-program" className="text-sm font-semibold text-white/70 hover:text-white">Read about the journey</Link>}>
          Thank you for taking the first step. Our team will review your application and contact you about the next stage.
          <SubmissionFollowUp purpose="influencer" reference={f.result?.reference} name={f.values.name} />
        </FormSuccess>
      ) : (
        <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Honeypot value={f.trap} onChange={f.setTrap} />
          <Field label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} />
          <Field label="Age" type="number" inputMode="numeric" min="13" max="80" value={f.values.age} onChange={f.set('age')} error={f.err('age')} />
          <Field label="Email" type="email" inputMode="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
          <Field label="Phone / WhatsApp" type="tel" inputMode="tel" autoComplete="tel" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} />
          <Field label="City" autoComplete="address-level2" value={f.values.city} onChange={f.set('city')} error={f.err('city')} />
          <Field label="Instagram handle" optional value={f.values.instagram} onChange={f.set('instagram')} placeholder="@yourname" />
          <SelectField label="Content you'd love to create" options={forms.nicheOptions} value={f.values.niche} onChange={f.set('niche')} error={f.err('niche')} />
          <SelectField label="Camera experience" options={forms.cameraOptions} value={f.values.camera_experience} onChange={f.set('camera_experience')} error={f.err('camera_experience')} />
          <Field label="Availability" optional className="sm:col-span-2" value={f.values.availability} onChange={f.set('availability')} placeholder="e.g. weekends, evenings, full-time" />
          <Field as="textarea" label="Why do you want to become a content creator?" className="sm:col-span-2" value={f.values.motivation} onChange={f.set('motivation')} error={f.err('motivation')} placeholder="Your interests, your story and what you'd like to achieve…" />
          <label className="flex items-start gap-3 text-sm text-white/65 sm:col-span-2">
            <input type="checkbox" checked={f.values.consent} onChange={(e) => f.set('consent')(e.target.checked)} aria-invalid={!!f.err('consent')} className="mt-0.5 size-4 shrink-0 accent-primary" />
            <span>I agree to be contacted by NAAA TALKS about my application, and I have read the <Link to="/privacy-policy" className="underline hover:text-white">privacy policy</Link>. If I am under 18, a parent or guardian knows I am applying.</span>
          </label>
          {f.err('consent') && <p className="-mt-2 text-xs text-signal-400 sm:col-span-2">{f.err('consent')}</p>}
          <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>
          <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">Apply now</SubmitButton>
        </form>
      )}
    </FormCard>
  )
}
