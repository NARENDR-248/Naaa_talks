import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blurUp, fadeUp, staggerGroup } from '@/lib/motion'
import { cn } from '@/lib/cn'

// Homepage section header: red-tick eyebrow, bold title, short line, optional pill link.
export default function HomeHeading({ eyebrow, title, text, action, className }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <div className={cn('flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        <motion.p {...fadeUp(0, 12)} className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase">
          <Check className="size-3.5 text-[#FF1744]" strokeWidth={3} aria-hidden />{eyebrow}
        </motion.p>
        <motion.h2 {...staggerGroup(0.12)} className="mt-3 font-display text-[1.8rem] leading-[1.1] font-semibold tracking-[-0.02em] text-white sm:text-[2.4rem]">
          {lines.map((l) => <motion.span key={l} variants={blurUp} className="block">{l}</motion.span>)}
        </motion.h2>
        {text && <motion.p {...fadeUp(0.15, 12)} className="mt-3 max-w-xl text-sm leading-relaxed text-[#A1A1AA] sm:text-[15px]">{text}</motion.p>}
      </div>
      {action && (
        <motion.div {...fadeUp(0.2, 12)} className="shrink-0">
          <Link
            to={action.href}
            className={cn(
              'group inline-flex h-10 items-center gap-2 rounded-full px-5 text-[13px] font-semibold transition',
              action.solid ? 'bg-[#FF1744] text-white shadow-[0_10px_30px_-10px_rgb(255_23_68/0.8)] hover:bg-[#ff2e57]' : 'border border-white/15 text-white/85 hover:border-white/35 hover:text-white',
            )}
          >
            {action.label} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </motion.div>
      )}
    </div>
  )
}
