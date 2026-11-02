import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MotionLink } from '@/lib/motionLink'
import { Fade } from './Kit'

// Burgundy call-to-action banner used at the end of content sections.
function CtaLink({ href, ...props }) {
  return href?.startsWith('/') ? <MotionLink to={href} {...props} /> : <motion.a href={href} {...props} />
}

export default function CtaBanner({ title, text, label, href, className = 'mt-14 sm:mt-20' }) {
  return (
    <Fade delay={0.1} className={className}>
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-wine-900/80 via-[#0c0507] to-void px-6 py-10 sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-80 w-[36rem] max-w-[120vw] rounded-full bg-[radial-gradient(closest-side,rgb(245_32_58/0.3),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -top-px right-10 left-10 -z-10 h-px bg-gradient-to-r from-transparent via-signal-500/60 to-transparent" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-3xl leading-tight font-light text-white sm:text-4xl">{title}</h3>
            <p className="mt-2 text-[15px] text-white/55 sm:text-base">{text}</p>
          </div>
          <CtaLink
            href={href}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-signal-500 pr-2 pl-7 text-[13px] font-semibold tracking-[0.18em] text-white uppercase shadow-[0_14px_40px_-12px_rgb(245_32_58/0.85)] transition-[background-color,box-shadow] duration-300 hover:bg-signal-400 hover:shadow-[0_18px_50px_-10px_rgb(245_32_58/1)]"
          >
            {label}
            <span className="grid size-10 place-items-center rounded-full bg-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </CtaLink>
        </div>
      </div>
    </Fade>
  )
}
