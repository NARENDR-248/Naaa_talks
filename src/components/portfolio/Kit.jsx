// Small building blocks shared by the portfolio sections.
import { motion } from 'framer-motion'
import { MotionLink } from '@/lib/motionLink'
import { useSiteContent } from '@/hooks/useSiteContent'
import { cn } from '@/lib/cn'
import { portfolioData } from '@/data/portfolioData'

const ease = [0.22, 1, 0.36, 1]

export function Shell({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Fade({ children, delay = 0, y = 22, className, as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Comp>
  )
}

// Line slides up from behind a mask. The trigger sits on the visible wrapper:
// the inner line starts clipped, so it can't report being in view itself.
export function RevealLine({ children, delay = 0, duration = 0.9, className, viewport = { once: true } }) {
  return (
    <motion.span className="block overflow-hidden pb-[0.08em]" initial="hidden" whileInView="show" viewport={viewport}>
      <motion.span
        className={cn('block', className)}
        variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration, delay, ease } } }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

export function Eyebrow({ children, className }) {
  return <p className={cn('text-[10px] font-semibold tracking-[0.22em] sm:text-[11px] sm:tracking-[0.28em] text-white/45 uppercase', className)}>{children}</p>
}

// Two-tone editorial heading: first line white, second line muted.
export function Heading({ eyebrow, title, subtitle, align = 'left', as: Tag = 'h2', className, titleId }) {
  const [first, second] = Array.isArray(title) ? title : [title]
  return (
    <Fade className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={titleId} className="mt-4 font-display text-[2.1rem] leading-[1.08] font-light tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
        {first}
        {second && <><br /><span className="text-white/45">{second}</span></>}
      </Tag>
      {subtitle && <p className={cn('mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base', align === 'center' && 'mx-auto')}>{subtitle}</p>}
    </Fade>
  )
}

const BTN = {
  primary: 'bg-signal-500 text-white shadow-[0_10px_30px_-10px_rgb(245_32_58/0.8)] hover:bg-signal-400',
  outline: 'border border-white/15 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.07]',
  light: 'bg-white text-black hover:bg-white/85',
}

// Internal paths ("/...") use the router; external links open in a new tab.
export function Cta({ href, variant = 'primary', size = 'md', className, children, ...rest }) {
  const internal = href?.startsWith('/')
  const external = /^https?:/.test(href ?? '')
  const Comp = internal ? MotionLink : motion.a
  return (
    <Comp
      {...(internal ? { to: href } : { href })}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
        size === 'sm' ? 'h-9 px-4 text-[13px]' : 'h-12 px-6 text-sm',
        BTN[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function Wordmark({ className }) {
  const { wordmark, name, logo: brandLogo } = portfolioData.brand
  const logo = useSiteContent().settings.branding.logo || brandLogo
  if (logo) return <img src={logo} alt={name} width="619" height="96" className={cn('h-6 w-auto sm:h-7 2xl:h-8', className)} />
  return (
    <span className={cn('inline-flex items-center font-display text-lg font-extrabold tracking-tight text-white', className)} aria-label={name}>
      {wordmark[0]}
      <span aria-hidden className="mx-[0.12em] inline-block h-[0.95em] w-[0.18em] -skew-x-[18deg] rounded-[1px] bg-signal-500" />
      {wordmark[1]}
    </span>
  )
}

// Marks demonstration work so it is never mistaken for a client project.
export function SampleTag({ className }) {
  return (
    <span className={cn('rounded-full border border-white/25 bg-black/55 px-2 py-0.5 font-sans text-[9px] font-bold tracking-[0.16em] text-white/85 uppercase backdrop-blur-md', className)}>
      Sample
    </span>
  )
}
