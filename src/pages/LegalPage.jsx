import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteContent } from '@/hooks/useSiteContent'
import PageHero from '@/components/layout/PageHero'
import { Shell } from '@/components/portfolio/Kit'

const { brand, legal } = portfolioData

// Plain-language templates. Have them reviewed before launch (see legal.reviewNote).
function privacySections(email) {
  return [
    ['What we collect', `When you use our forms we collect the details you enter: for business enquiries your name, business, email, phone and project details; for the influencer program your name, age, contact details, city, social handles and answers; for job applications your contact details, experience, links and resume.`],
    ['Why we use it', 'Only to respond to your enquiry or application, assess your fit for a project, the program or a role, and contact you about it. We do not sell your information.'],
    ['Where it is stored', 'Submissions are stored securely with our database provider (Supabase). Resumes are kept in private storage that only authorised NAAA TALKS team members can access, using short-lived links.'],
    ['How long we keep it', 'We keep submissions for as long as needed to handle them and for a reasonable period afterwards, then delete them. You can ask us to delete your data sooner.'],
    ['Your rights', `You can ask to see, correct or delete the information you sent us by emailing ${email}.`],
    ['Minors', 'Applicants under 18 should apply with the knowledge of a parent or guardian. We may ask for guardian consent before any shoot or travel.'],
    ['Cookies', 'This website does not use advertising or tracking cookies. Your browser may store small technical items (for example, to prevent duplicate form submissions).'],
    ['Contact', `Questions about privacy: ${email}.`],
  ]
}

function termsSections(email) {
  return [
    ['About these terms', `These terms apply to your use of the ${brand.name} website. By using it you agree to them.`],
    ['Website content', `All content on this website — including videos, images, text and branding — belongs to ${brand.name} or its clients and may not be reused without permission. Work marked “Sample” is demonstration content, not client work.`],
    ['Enquiries and applications', 'Submitting a form does not create a contract or guarantee a project, a place in the influencer program or a job offer. Any engagement is agreed separately in writing.'],
    ['Influencer program', 'Program content, schedules, travel and any costs are confirmed individually before you join. Results such as follower growth or brand collaborations depend on many factors and are not guaranteed.'],
    ['Acceptable use', 'Do not misuse the website, submit false information, attempt to access restricted areas or interfere with its security.'],
    ['Liability', 'The website is provided “as is”. We work to keep information accurate but cannot guarantee it is always complete or up to date.'],
    ['Changes', 'We may update these terms from time to time. The date above shows the latest version.'],
    ['Contact', `Questions about these terms: ${email}.`],
  ]
}

export default function LegalPage({ kind }) {
  const { email } = useSiteContent().settings.contact
  const isPrivacy = kind === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'
  usePageMeta(title, `${title} for the ${brand.name} website.`)
  const sections = isPrivacy ? privacySections(email) : termsSections(email)

  return (
    <>
      <PageHero crumbs={[{ label: title }]} eyebrow={`Last updated ${legal.updated}`} title={[title]} />
      <Shell className="max-w-3xl pb-20">
        <div className="space-y-8">
          {sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="font-display text-xl font-medium text-white">{heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">{body}</p>
            </section>
          ))}
        </div>
      </Shell>
    </>
  )
}
