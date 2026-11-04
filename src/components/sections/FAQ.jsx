import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircleQuestion, Plus, RotateCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { cn } from '@/lib/cn'
import { REVEAL, ease } from '@/lib/motion'
import { useFaqs, useSiteContentReload } from '@/hooks/useSiteContent'
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink'
import { Heading, Shell } from '@/components/portfolio/Kit'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'
import HomeHeading from '@/components/home/HomeHeading'

const { faqsSection } = portfolioData

// Questions slide in from the right, one after another, out of a soft blur.
const list = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const row = {
  hidden: { opacity: 0, x: 40, filter: 'blur(6px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
}

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

// One question: numbered, with a red accent bar and glow while open.
function Item({ faq, index, open, onToggle }) {
  return (
    <motion.li variants={row}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-500',
          open
            ? 'border-primary/35 bg-[linear-gradient(120deg,rgb(255_23_68/0.09),rgb(255_255_255/0.02)_55%)] shadow-[0_24px_60px_-40px_rgb(255_23_68/0.8)]'
            : 'border-white/[0.08] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]',
        )}
      >
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleY: open ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
          className="absolute top-0 bottom-0 left-0 w-[3px] origin-top bg-gradient-to-b from-primary-soft to-primary shadow-[0_0_14px_rgb(255_23_68/0.9)]"
        />
        <h3>
          <button
            type="button"
            id={`faq-${index}`}
            aria-expanded={open}
            aria-controls={`faq-panel-${index}`}
            onClick={onToggle}
            className="flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
          >
            <span className={cn('font-display text-sm font-semibold tabular-nums transition-colors duration-500', open ? 'text-primary' : 'text-white/30 group-hover:text-white/60')}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 font-sans text-[15px] font-medium text-white transition-transform duration-500 group-hover:translate-x-1">{faq.question}</span>
            <motion.span
              animate={{ rotate: open ? 135 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className={cn(
                'grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-500',
                open ? 'border-primary bg-primary text-white shadow-[0_0_20px_-2px_rgb(255_23_68/0.8)]' : 'border-white/15 text-white/60 group-hover:border-white/35 group-hover:text-white',
              )}
            >
              <Plus className="size-4" aria-hidden />
            </motion.span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: -8, filter: 'blur(4px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, delay: 0.08, ease }}
                className="pr-6 pb-5 pl-[3.25rem] text-sm leading-relaxed whitespace-pre-line text-white/65 sm:pr-16 sm:pl-[3.6rem]"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}

// Homepage left column: a nudge to ask directly when the answer isn't listed.
function AskCard() {
  const wa = useWhatsAppLink()({ purpose: 'general' })
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="relative mt-8 hidden overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(150deg,#151515,#0B0B0B_65%)] p-6 sm:block"
    >
      <motion.span
        aria-hidden
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-2 -bottom-10 font-display text-[9rem] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1px_rgb(255_23_68/0.25)]"
      >
        ?
      </motion.span>
      <p className="font-display text-lg font-semibold text-white">Still have a question?</p>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">Our team is happy to help — reach out and we&apos;ll get back to you.</p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link to="/contact" className="group inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-10px_rgb(255_23_68/0.8)] transition hover:bg-primary-hover">
          Ask us <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-5 text-[13px] font-semibold text-white/85 transition hover:border-[#25D366] hover:text-white">
            <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function FAQ({ layout }) {
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
      <motion.ul initial="hidden" whileInView="show" viewport={REVEAL} variants={list} className="space-y-3">
        {faqs.map((f, i) => (
          <Item key={f.id ?? f.question} faq={f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </motion.ul>
    )
  }

  // `split` (homepage): heading and ask card on the left, questions on the right.
  if (layout === 'split') {
    return (
      <section id="faq" aria-labelledby="faq-title" className="relative isolate scroll-mt-20 overflow-x-clip section-y">
        <div aria-hidden className="pointer-events-none absolute top-1/4 -left-48 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(140_10_30/0.25),transparent)]" />
        <Shell className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <HomeHeading titleId="faq-title" eyebrow="FAQ" title={['Questions People Ask', 'Before They Start.']} text="Quick answers about our services, collaborations and the academy." />
            <AskCard />
          </div>
          <div aria-live="polite" aria-busy={status === 'loading'}>{body}</div>
        </Shell>
      </section>
    )
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 section-y">
      <Shell className="max-w-3xl">
        <Heading titleId="faq-title" align="center" eyebrow={faqsSection.eyebrow} title={faqsSection.title} />
        <div className="mt-12" aria-live="polite" aria-busy={status === 'loading'}>{body}</div>
      </Shell>
    </section>
  )
}
