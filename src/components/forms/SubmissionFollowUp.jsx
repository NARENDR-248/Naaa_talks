import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const WHAT = { business: 'a business enquiry', influencer: 'an influencer program application', careers: 'a job application', contact: 'a contact enquiry', course: 'an admission enquiry' }

// Shown on a form's success screen: the submission reference and an optional
// "Continue on WhatsApp" button. The pre-filled message only carries the first
// name and reference — never the private details from the form — and nothing is
// sent unless the visitor chooses to open WhatsApp and press send.
export default function SubmissionFollowUp({ purpose, reference, name, detail }) {
  const firstName = String(name ?? '').trim().split(/\s+/)[0]
  const text = [
    `Hello NAAA TALKS Team! I just submitted ${WHAT[purpose]}${detail ? ` for ${detail}` : ''} on your website`,
    reference ? ` (reference ${reference}).` : '.',
    firstName ? ` My name is ${firstName}.` : '',
  ].join('')

  return (
    <div className="mt-5 space-y-4">
      {reference && (
        <p className="text-sm text-white/60">
          Your reference: <span className="rounded-md border border-white/15 bg-white/[0.04] px-2 py-0.5 font-mono text-[13px] font-semibold tracking-wider text-white">{reference}</span>
        </p>
      )}
      <WhatsAppCta purpose={purpose} text={text} label="Continue on WhatsApp" size="sm" />
    </div>
  )
}
