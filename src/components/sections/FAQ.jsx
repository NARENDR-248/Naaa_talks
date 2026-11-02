import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'
import { useSiteContent } from '@/hooks/useSiteContent'
import { Fade, Heading, Shell } from '@/components/portfolio/Kit'

const { faqsSection } = portfolioData

export default function FAQ() {
  const { faqs } = useSiteContent()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28">
      <Shell className="max-w-3xl">
        <Heading align="center" eyebrow={faqsSection.eyebrow} title={faqsSection.title} />
        <div className="mt-12 space-y-2.5">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Fade key={f.id ?? f.question} delay={Math.min(i, 6) * 0.04}>
                <div className={cn('rounded-2xl border transition-colors', isOpen ? 'border-white/15 bg-white/[0.04]' : 'border-white/[0.07] hover:border-white/15')}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-[15px] font-medium text-white"
                    >
                      {f.question}
                      <Plus className={cn('size-4 shrink-0 text-white/60 transition-transform duration-300', isOpen && 'rotate-45 text-signal-400')} aria-hidden />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-white/55">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Fade>
            )
          })}
        </div>
      </Shell>
    </section>
  )
}
