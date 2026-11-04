import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'
import { ease } from '@/lib/motion'
import { Shell } from '@/components/portfolio/Kit'
import { Breadcrumbs } from '@/components/layout/PageHero'
import SectionTitle from './SectionTitle'

const { about } = portfolioData

export default function AboutHero() {
  return (
    <section aria-label="About NAAA TALKS" className="relative isolate overflow-hidden pt-28 section-pb sm:pt-36">
      {/* ambient red light, drifting very slowly */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_0%,rgb(140_10_30/0.38),transparent_70%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-20 left-[30%] -z-10 size-[34rem] max-w-[120vw] rounded-full bg-[radial-gradient(closest-side,rgb(255_23_68/0.13),transparent)]"
        animate={{ x: [0, 50, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Shell>
        <Breadcrumbs items={[{ label: 'About Us' }]} />
        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_auto_0.85fr] lg:items-end lg:gap-14">
          <SectionTitle as="h1" eyebrow="About NAAA TALKS" lines={about.heroTitle} tone="accent" size="text-[2.6rem] sm:text-6xl lg:text-[4.6rem]" />

          {/* thin vertical rule between the columns (desktop) */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease }}
            className="hidden h-44 w-px origin-top self-end bg-gradient-to-b from-transparent via-primary/60 to-transparent lg:block"
          />

          <div className="space-y-5 lg:pb-2">
            {about.heroParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease }}
                className={i === 0 ? 'text-base leading-relaxed text-white/85 sm:text-lg' : 'text-[15px] leading-relaxed text-[#A1A1AA] sm:text-base'}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* hairline that draws across under the hero */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
          className="mt-12 h-px origin-left bg-gradient-to-r from-primary/60 via-white/10 to-transparent sm:mt-16"
        />
      </Shell>
    </section>
  )
}
