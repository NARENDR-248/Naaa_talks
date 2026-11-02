import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'
import { REVEAL, ease, fadeUp } from '@/lib/motion'
import { Cta, Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

const { clientsSection } = portfolioData

// Client logos & highlights — only entries published (with permission) from the admin.
export default function Clients({ showHighlights = false }) {
  const { clients } = useSiteContent()

  return (
    <section id="clients" aria-label={clientsSection.eyebrow} className="relative isolate scroll-mt-16 py-16 sm:py-24">
      <Shell>
        <motion.div {...fadeUp(0, 16)}><Eyebrow>{clientsSection.eyebrow}</Eyebrow></motion.div>
        <h2 className="mt-4 font-display text-[2rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl">
          <RevealLine>{clientsSection.title[0]}</RevealLine>
          <RevealLine delay={0.12} className="text-white/45">{clientsSection.title[1]}</RevealLine>
        </h2>

        {clients.length === 0 ? (
          <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-dashed border-white/12 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-white/50"><Building2 className="size-5" /></span>
              <p className="max-w-lg text-sm leading-relaxed text-white/55">{clientsSection.empty}</p>
            </div>
            <Cta href="/work-with-us" size="sm">Become our next client</Cta>
          </motion.div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((c, i) => {
              const Wrap = c.website ? 'a' : 'div'
              return (
                <motion.li key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL} transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease }}>
                  <Wrap {...(c.website ? { href: c.website, target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex h-full flex-col justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-signal-500/40">
                    <div className="grid h-14 place-items-center">
                      {c.logo ? (
                        <img src={c.logo} alt={c.name} loading="lazy" className="max-h-12 max-w-full object-contain opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
                      ) : (
                        <span className="font-display text-lg font-semibold text-white/70">{c.name}</span>
                      )}
                    </div>
                    {showHighlights && c.highlight && <p className="mt-3 text-center text-xs leading-relaxed text-white/50">{c.highlight}</p>}
                  </Wrap>
                </motion.li>
              )
            })}
          </ul>
        )}
      </Shell>
    </section>
  )
}
