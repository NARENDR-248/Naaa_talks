import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircleQuestion, Plus, RotateCw } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'
import { useFaqs, useSiteContentReload } from '@/hooks/useSiteContent'
import { Fade, Heading, Shell } from '@/components/portfolio/Kit'

const { faqsSection } = portfolioData

function Skeleton() {
  return (
    <div className="space-y-2.5" role="status" aria-label="Loading questions">
      {[72, 58, 66, 50].map((w) => (
        <div key={w} className="flex min-h-14 items-center justify-between rounded-2xl border border-white/[0.07] px-5">
          <span className="h-3.5 animate-pulse rounded-full bg-white/10" style={{ width: `${w}%` }} />
          <span className="size-4 animate-pulse rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  )
}

function Notice({ children, action }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/12 px-6 py-10 text-center">
      <MessageCircleQuestion className="size-7 text-signal-400" aria-hidden />
      <p className="max-w-md text-sm leading-relaxed text-white/60">{children}</p>
      {action}
    </div>
  )
}

export default function FAQ() {
  const { status, items: faqs } = useFaqs()
  const reload = useSiteContentReload()
  const [open, setOpen] = useState(0)

  let body
  if (status === 'loading') body = <Skeleton />
  else if (status === 'error' && !faqs.length) {
    body = (
      <Notice action={<button type="button" onClick={reload} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-white/30"><RotateCw className="size-4" aria-hidden />Try again</button>}>
        We couldn&apos;t load the questions right now. Please try again, or ask us directly through the contact form.
      </Notice>
    )
  } else if (!faqs.length) {
    body = <Notice>No questions here yet — ask us anything through the contact form and we&apos;ll get back to you.</Notice>
  } else {
    body = (
      <div className="space-y-2.5">
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
                      <p className="px-5 pb-5 text-sm leading-relaxed whitespace-pre-line text-white/55">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Fade>
          )
        })}
      </div>
    )
  }

  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28">
      <Shell className="max-w-3xl">
        <Heading align="center" eyebrow={faqsSection.eyebrow} title={faqsSection.title} />
        <div className="mt-12" aria-live="polite" aria-busy={status === 'loading'}>{body}</div>
      </Shell>
    </section>
  )
}
