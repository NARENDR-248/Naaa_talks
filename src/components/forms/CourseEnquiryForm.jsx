import { submitCourseEnquiry } from '@/services/api'
import { EMAIL_RE, PHONE_RE, useGuardedForm } from '@/hooks/useGuardedForm'
import SubmissionFollowUp from './SubmissionFollowUp'
import { Field, FormAlert, FormCard, FormSuccess, Honeypot, SelectField, SubmitButton } from './FormKit'

const isUuid = (id) => /^[0-9a-f-]{36}$/i.test(String(id ?? ''))

// Academy admission enquiry. `courses` = published courses; `defaultSlug` preselects one.
export default function CourseEnquiryForm({ courses, defaultSlug }) {
  const preset = courses.find((c) => c.slug === defaultSlug)
  const f = useGuardedForm({
    initial: { name: '', email: '', phone: '', course: preset?.title ?? '', city: '', message: '' },
    validate: (v) => {
      const e = {}
      if (v.name.trim().length < 2) e.name = 'Please enter your full name'
      if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email'
      if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid mobile number'
      if (!v.course) e.course = 'Choose a course'
      return e
    },
    submit: (v) => {
      const course = courses.find((c) => c.title === v.course)
      const row = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || null]))
      // Only real database ids are linked; built-in default courses are not.
      return submitCourseEnquiry({ ...row, course_id: isUuid(course?.id) ? course.id : null })
    },
  })

  return (
    <FormCard>
      {f.status === 'sent' ? (
        <FormSuccess title="Enquiry received!" action={<button type="button" onClick={f.reset} className="text-sm font-semibold text-white/70 hover:text-white">Enquire about another course</button>}>
          Thank you for your interest in the {f.values.course}. Our team will contact you with the schedule, fees and batch details.
          <SubmissionFollowUp purpose="course" reference={f.result?.reference} name={f.values.name} detail={f.values.course} />
        </FormSuccess>
      ) : (
        <form onSubmit={f.onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Honeypot value={f.trap} onChange={f.setTrap} />
          <Field label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.err('name')} />
          <Field label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={f.values.phone} onChange={f.set('phone')} error={f.err('phone')} />
          <Field label="Email" type="email" inputMode="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} />
          <Field label="City" optional autoComplete="address-level2" value={f.values.city} onChange={f.set('city')} />
          <SelectField label="Course" options={courses.map((c) => c.title)} value={f.values.course} onChange={f.set('course')} error={f.err('course')} className="sm:col-span-2" />
          <Field as="textarea" label="Anything you'd like to ask?" optional className="sm:col-span-2" value={f.values.message} onChange={f.set('message')} placeholder="Your background, preferred timings or questions about the course…" />
          <div className="sm:col-span-2"><FormAlert>{f.error}</FormAlert></div>
          <SubmitButton loading={f.status === 'sending'} className="sm:col-span-2">Send admission enquiry</SubmitButton>
        </form>
      )}
    </FormCard>
  )
}
