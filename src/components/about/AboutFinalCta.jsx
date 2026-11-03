import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useJourneys } from '@/hooks/useJourneys'
import { REVEAL, ease } from '@/lib/motion'
import { Cta, Shell } from '@/components/portfolio/Kit'
import SectionTitle from './SectionTitle'

const { finalCta } = portfolioData.about

// Closing call to action under a soft red spotlight.
export default function AboutFinalCta() {
  const j = useJourneys()
  return (
    <section aria-label="Work with us" className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[30rem] w-[56rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.2),rgb(120_8_24/0.12)_50%,transparent)]" />
      <Shell className="text-center">
        <SectionTitle lines={finalCta.title} tone="accent" size="text-[2rem] sm:text-5xl lg:text-6xl" className="mx-auto max-w-4xl" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#A1A1AA] sm:text-lg"
        >
          {finalCta.text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Cta href={j.business.href} className="group">{j.business.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Cta>
          <Cta href="/portfolio" variant="outline">Explore Our Work</Cta>
        </motion.div>
      </Shell>
    </section>
  )
}
