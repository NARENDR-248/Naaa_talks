import { motion } from 'framer-motion'
import { blurUp, fadeUp, staggerGroup } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Eyebrow } from '@/components/portfolio/Kit'

// Eyebrow with a red rule, then heading lines that reveal one by one from a soft blur.
// `tone`: 'accent' paints the last line red, 'muted' greys every line after the first.
export default function SectionTitle({ eyebrow, lines, tone = 'muted', as = 'h2', className, size = 'text-[2rem] sm:text-5xl lg:text-[3.4rem]', weight = 'font-light' }) {
  const Heading = motion[as]
  return (
    <div className={className}>
      {eyebrow && (
        <motion.div {...fadeUp(0, 14)}>
          <Eyebrow className="flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-[#FF1744]" />{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <Heading {...staggerGroup(0.13, 0.05)} className={cn('mt-5 font-display leading-[1.04] tracking-[-0.03em] text-white', weight, size)}>
        {lines.map((line, i) => (
          <motion.span
            key={line}
            variants={blurUp}
            className={cn(
              'block',
              i > 0 && tone === 'muted' && 'text-white/45',
              tone === 'accent' && i === lines.length - 1 && 'text-[#FF1744] [text-shadow:0_0_48px_rgb(255_23_68/0.35)]',
            )}
          >
            {line}
          </motion.span>
        ))}
      </Heading>
    </div>
  )
}
