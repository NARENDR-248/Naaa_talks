import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useServicePages, useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { lines } from '@/lib/icons'
import { ServiceIcon } from '@/components/ui/DynamicIcon'
import PageHero from '@/components/layout/PageHero'
import { Block, Checklist, StepsGrid } from '@/components/layout/Blocks'
import { Cta } from '@/components/portfolio/Kit'
import CtaBanner from '@/components/portfolio/CtaBanner'
import { ServiceCard } from '@/components/sections/ServicesOverview'
import BusinessEnquiryForm from '@/components/forms/BusinessEnquiryForm'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'
import NotFound from './NotFound'

const { serviceProcess } = portfolioData

// Portfolio categories that illustrate each service.
const EXAMPLES = {
  'social-media-marketing': ['Social Media Campaigns', 'Instagram Reels'],
  'social-media-management': ['Social Media Campaigns', 'Instagram Reels'],
  'influencer-marketing': ['Social Media Campaigns', 'Instagram Reels'],
  'performance-marketing': ['Promotional Videos', 'Social Media Campaigns'],
  'brand-promotion': ['Brand Promotion', 'Promotional Videos'],
  'digital-marketing-strategy': ['Brand Promotion', 'Social Media Campaigns'],
}

function Examples({ slug }) {
  const { projects } = useSiteContent()
  const cats = EXAMPLES[slug] ?? []
  const picks = [...projects.filter((p) => cats.includes(p.category)), ...projects.filter((p) => !cats.includes(p.category))].slice(0, 3)
  if (!picks.length) return null
  return (
    <Block eyebrow="Relevant work" title={['From our', 'portfolio.']}>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {picks.map((p, i) => (
          <motion.li key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.55, delay: i * 0.08, ease }}>
            <Link to="/portfolio" className="group block overflow-hidden rounded-2xl border border-white/[0.08]">
              <span className="relative block aspect-[4/5] overflow-hidden bg-ink-900">
                {p.thumbnail && <img src={p.thumbnail} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                {p.is_sample && <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase">Sample</span>}
              </span>
              <span className="block p-4">
                <span className="block text-xs text-signal-400">{p.category}</span>
                <span className="mt-1 block font-medium text-white">{p.title}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </Block>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const services = useServicePages()
  const service = services.find((s) => s.slug === slug)
  usePageMeta(service ? service.title : 'Service not found', service?.summary || service?.description)
  if (!service) return <NotFound />

  const features = lines(service.features)
  const benefits = lines(service.benefits)
  const steps = serviceProcess[slug] ?? serviceProcess.default
  const others = services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]} eyebrow="Our services" title={[service.title]} subtitle={service.summary}>
        <Cta href="#enquire">Enquire about this service <ArrowRight className="size-4" /></Cta>
        <WhatsAppCta purpose="business" label="Discuss Your Project" />
      </PageHero>

      <Block eyebrow="Overview" className="pt-3 sm:pt-4">
        <div className="mt-6 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
          <motion.span {...fadeUp(0)} className="grid size-16 place-items-center rounded-2xl border border-signal-500/30 bg-signal-500/10 text-primary-soft">
            <ServiceIcon service={service} className="size-8" strokeWidth={1.6} />
          </motion.span>
          <motion.p {...fadeUp(0.08)} className="max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{service.description}</motion.p>
        </div>
        {service.image && <motion.img {...fadeUp(0.12)} src={service.image} alt="" loading="lazy" className="mt-10 aspect-[21/9] w-full rounded-3xl object-cover" />}
      </Block>

      {(features.length > 0 || benefits.length > 0) && (
        <Block eyebrow="What you get" title={['Key features', 'and benefits.']}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.length > 0 && <Checklist title="Key features" items={features} />}
            {benefits.length > 0 && <Checklist title="Benefits for your business" items={benefits} />}
          </div>
        </Block>
      )}

      <Block eyebrow="Our working process" title={['How we work', 'with you.']}>
        <StepsGrid steps={steps} />
      </Block>

      <Examples slug={slug} />

      <Block id="enquire" eyebrow="Enquiry" title={['Tell us about', 'your business.']} intro="Share your goals and we will come back with ideas, a plan and a quote.">
        <div className="mt-8 max-w-3xl"><BusinessEnquiryForm key={slug} defaultService={service.title} /></div>
      </Block>

      {others.length > 0 && (
        <Block eyebrow="More services" title={['Explore what', 'else we do.']}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => <ServiceCard key={s.id ?? s.slug} service={s} index={i} />)}
          </div>
        </Block>
      )}

      <Block>
        <CtaBanner title="Prefer to talk first?" text="Reach our team by email, WhatsApp or Instagram." label="Contact us" href="/contact" className="mt-0" />
      </Block>
    </>
  )
}
