import { motion } from 'framer-motion'
import { ArrowUpRight, ChartNoAxesColumnIncreasing, CirclePlay, Users } from 'lucide-react'
import { useSiteContent } from '@/hooks/useSiteContent'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/motion'
import SocialIcon from '@/components/portfolio/SocialIcon'
import PhoneMockup from './PhoneMockup'
import { BrushStroke } from './Brush'
import person560 from '@/assets/hero/hero-person-560.webp'
import person900 from '@/assets/hero/hero-person-900.webp'
import camera from '@/assets/hero/hero-camera.webp'

// Views, creators trained, growth — in card order.
const STAT_ICONS = [CirclePlay, Users, ChartNoAxesColumnIncreasing]

// Desktop positions (percent of the visual frame), staggered and tilted like the reference.
const STAT_SPOTS = ['left-[60%] top-[5%]', 'left-[61.5%] top-[19.5%]', 'left-[65.5%] top-[34%]']

function StatCard({ icon: Icon, value, label, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      className={cn('flex items-center gap-3 rounded-2xl border border-signal-500/45 bg-black/55 px-4 py-3 shadow-[0_0_30px_-6px_rgb(255_16_31/0.45)] backdrop-blur-md lg:gap-4 lg:px-5 lg:py-4', className)}
    >
      <Icon className="size-7 shrink-0 text-signal-500 lg:size-9" strokeWidth={2.2} aria-hidden />
      <span className="min-w-0">
        <span className="block font-display text-xl leading-none font-bold text-white lg:text-[clamp(1.4rem,2.1vw,2.1rem)]">{value}</span>
        <span className="mt-1 block text-[11px] leading-tight text-white/85 lg:text-[clamp(0.8rem,1.05vw,1.05rem)]">{label}</span>
      </span>
    </motion.div>
  )
}

export function HeroStats({ className, floating }) {
  const { heroStats } = useSiteContent().settings
  const items = (heroStats?.items ?? []).filter((s) => s?.value)
  // Only verified figures are shown: while marked as samples in Admin → Settings, hide them.
  if (!items.length || heroStats?.isSample) return null
  return (
    <div className={className}>
      <ul className={cn(!floating && 'grid grid-cols-3 gap-2 sm:gap-3')}>
        {items.slice(0, 3).map((s, i) => (
          <li key={i} className={cn(floating && cn('absolute w-[31%] -rotate-[5deg]', STAT_SPOTS[i]))}>
            <StatCard icon={STAT_ICONS[i]} value={s.value} label={s.label} delay={0.5 + i * 0.12} className={cn(!floating && 'flex-col gap-1.5 px-2 py-3 text-center sm:flex-row sm:text-left')} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// Right-hand composition: phone behind the creator, floating stats, camera, tagline.
export default function HeroVisual({ tagline }) {
  return (
    <div className="relative mx-auto aspect-[930/850] w-full max-w-[38rem] lg:max-w-none">
      {/* glow + neon rings */}
      <div aria-hidden className="absolute top-[22%] left-[6%] aspect-square w-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(255_16_31/0.5),rgb(140_8_20/0.25)_55%,transparent)] blur-2xl" />
      <motion.div
        aria-hidden
        className="absolute top-[14%] left-[1%] aspect-square w-[86%] rounded-full border-2 border-signal-500/60 shadow-[0_0_24px_rgb(255_16_31/0.55),inset_0_0_24px_rgb(255_16_31/0.35)]"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span aria-hidden className="absolute top-[42%] left-[47%] aspect-square w-[9%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff4a57,#a00915_70%)] opacity-70 blur-[1px]" />

      {/* phone */}
      <motion.div
        className="absolute top-[4%] left-[1%] w-[33%]"
        initial={{ opacity: 0, y: 30, rotate: -10 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotate: -10 }}
        transition={{ opacity: { duration: 0.8, delay: 0.2 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <PhoneMockup className="aspect-[9/18.5] w-full" />
      </motion.div>

      {/* floating Instagram glyph */}
      <motion.span
        aria-hidden
        className="absolute top-0 left-[34.5%] grid aspect-square w-[11%] rotate-[8deg] place-items-center rounded-[26%] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] text-white shadow-[0_10px_40px_-6px_rgb(214_36_159/0.7)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SocialIcon platform="instagram" className="size-[62%]" />
      </motion.span>

      {/* laptop edge, bottom left */}
      <span aria-hidden className="absolute bottom-0 left-[5%] hidden h-[15%] w-[25%] lg:block origin-bottom -skew-x-[18deg] rounded-t-lg border border-white/10 bg-[linear-gradient(180deg,#3a3a40,#16161a)]" />

      {/* creator */}
      <motion.img
        src={person900}
        srcSet={`${person560} 560w, ${person900} 900w`}
        sizes="(min-width: 1024px) 42vw, 90vw"
        alt="NAAA TALKS creator in a branded hoodie"
        width="900"
        height="888"
        fetchPriority="high"
        className="absolute bottom-0 -left-[3%] w-[82%] object-contain drop-shadow-[0_0_28px_rgb(255_16_31/0.35)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease }}
      />

      {/* camera on tripod, right foreground (desktop) */}
      <img
        src={camera}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute right-0 bottom-0 hidden w-[32%] [mask-image:linear-gradient(90deg,transparent,#000_30%),linear-gradient(180deg,transparent,#000_22%)] [mask-composite:intersect] lg:block"
      />

      {/* stats: floating on desktop */}
      <HeroStats floating className="hidden lg:block" />
      <motion.span
        aria-hidden
        className="absolute -top-[3%] left-[90%] hidden w-[7%] text-signal-500 drop-shadow-[0_0_12px_rgb(255_16_31/0.8)] lg:block"
        initial={{ opacity: 0, x: -10, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease }}
      >
        <ArrowUpRight className="size-full" strokeWidth={2.4} />
      </motion.span>

      {/* tagline brush */}
      {tagline && (
        <motion.p
          className="absolute bottom-[5%] left-[33%] flex w-[43%] -rotate-[6deg] items-center justify-center py-[2.4%]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
        >
          <BrushStroke className="inset-0 size-full" />
          <span className="relative font-script text-[clamp(1.1rem,2.6vw,2.6rem)] whitespace-nowrap text-white">{tagline}</span>
        </motion.p>
      )}
    </div>
  )
}
