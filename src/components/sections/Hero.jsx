import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteContent } from '@/hooks/useSiteContent'
import { useJourneys } from '@/hooks/useJourneys'
import { Cta, Eyebrow, Shell } from '@/components/portfolio/Kit'
import { WhatsAppCta } from '@/components/layout/WhatsAppButton'

const ease = [0.22, 1, 0.36, 1]
const rise = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } })

export default function Hero() {
  const { hero } = useSiteContent().settings
  const journeys = useJourneys()
  const [line1, line2] = hero.title

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36">
      {/* Burgundy stage light, drifting slowly */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[38rem] w-[52rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(170_14_40/0.45),rgb(60_5_16/0.25)_55%,transparent)]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Shell className="text-center">
        <motion.div {...rise(0)}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1 {...rise(0.08)} className="mx-auto mt-5 max-w-5xl font-display text-[2.3rem] leading-[1.06] font-light tracking-tight text-balance text-white uppercase sm:text-6xl lg:text-[4.2rem]">
          {line1}
          {line2 && <><br /><span className="font-normal text-gradient">{line2}</span></>}
        </motion.h1>
        <motion.p {...rise(0.16)} className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-lg">
          {hero.subtitle}
        </motion.p>

        <motion.div {...rise(0.24)} className="mx-auto mt-9 flex max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Cta href={journeys.business.href}>
            {journeys.business.label} <ArrowRight className="size-4" />
          </Cta>
          <Cta href={journeys.influencer.href} variant="outline">{journeys.influencer.label}</Cta>
          <Cta href={journeys.careers.href} variant="outline" className="border-white/10 text-white/80">{journeys.careers.label}</Cta>
        </motion.div>

        <motion.div {...rise(0.3)} className="mt-4 flex justify-center">
          <WhatsAppCta purpose="general" size="sm" label="Chat on WhatsApp" />
        </motion.div>

        {hero.note && (
          <motion.p {...rise(0.32)} className="mt-6 font-sans text-[11px] font-semibold tracking-[0.32em] text-signal-400 uppercase">
            {hero.note}
          </motion.p>
        )}
      </Shell>
    </section>
  )
}
