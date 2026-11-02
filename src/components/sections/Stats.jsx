import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useSiteContent } from '@/hooks/useSiteContent'
import { Fade } from '@/components/portfolio/Kit'

function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setN })
    return () => c.stop()
  }, [inView, reduce, value])

  return <span ref={ref}>{(reduce ? value : n).toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}

// Admin-editable figures. While `isSample` is set, a note says they are placeholders.
export default function Stats({ className }) {
  const { stats } = useSiteContent().settings
  return (
    <Fade className={className}>
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-5 py-8 sm:px-10 sm:py-10">
        <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.08]">
          {stats.items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse text-center">
              <dt className="mt-1.5 text-xs text-white/45 sm:text-[13px]">{s.label}</dt>
              <dd className="font-display text-3xl font-light text-white tabular-nums sm:text-4xl">
                <Counter value={Number(s.value) || 0} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {stats.isSample && <p className="mt-3 text-center text-[11px] text-white/30">{stats.sampleNote}</p>}
    </Fade>
  )
}
