import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Eyebrow, RevealLine, Shell } from '@/components/portfolio/Kit'

// Breadcrumb trail with structured data for search engines.
export function Breadcrumbs({ items }) {
  const trail = [{ label: 'Home', href: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-white/45" itemScope itemType="https://schema.org/BreadcrumbList">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={c.href ?? c.label} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined} className={cn(last && 'text-white/75')} itemProp="name">{c.label}</span>
              ) : (
                <Link to={c.href} className="hover:text-white" itemProp="item"><span itemProp="name">{c.label}</span></Link>
              )}
              <meta itemProp="position" content={String(i + 1)} />
              {!last && <ChevronRight className="size-3 text-white/25" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Opening block for every inner page: breadcrumbs, two-tone title, intro, CTAs.
export default function PageHero({ crumbs, eyebrow, title, subtitle, children, className }) {
  const [first, second] = title
  return (
    <section className={cn('relative isolate overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16', className)}>
      <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[34rem] w-[50rem] max-w-[170vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(170_14_40/0.38),rgb(60_5_16/0.2)_55%,transparent)]" />
      <Shell>
        <Breadcrumbs items={crumbs} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mt-6">
          <Eyebrow className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-signal-500" />{eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="mt-4 max-w-4xl font-display text-[2.4rem] leading-[1.04] font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
          <RevealLine delay={0.05}>{first}</RevealLine>
          {second && <RevealLine delay={0.18} className="text-white/45">{second}</RevealLine>}
        </h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-lg">
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }} className="mt-8 flex flex-col gap-3 empty:hidden sm:flex-row">
            {children}
          </motion.div>
        )}
      </Shell>
    </section>
  )
}
