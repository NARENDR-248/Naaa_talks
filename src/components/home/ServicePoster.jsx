import { ArrowUpRight, Heart, MessageCircle, Send, UserPlus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { visualFor } from '@/lib/serviceVisuals'

const chip = 'inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-sm sm:text-[10px]'

// Small illustrative UI pieces layered over each poster (decorative, no real figures).
function Art({ kind }) {
  switch (kind) {
    case 'social':
      return (
        <>
          <span className={cn(chip, 'absolute top-[14%] -left-1 rotate-[-6deg]')}><Heart className="size-3 fill-[#ff2d55] text-[#ff2d55]" />Likes</span>
          <span className={cn(chip, 'absolute top-[34%] -right-1 rotate-[5deg]')}><MessageCircle className="size-3" />Comments</span>
          <span className={cn(chip, 'absolute bottom-[10%] left-[12%] rotate-[-3deg]')}><Send className="size-3" />Shares</span>
        </>
      )
    case 'calendar':
      return (
        <div className="absolute right-[6%] bottom-[8%] grid w-[58%] grid-cols-7 gap-[3px] rounded-xl bg-black/55 p-2 backdrop-blur-sm">
          {Array.from({ length: 21 }, (_, i) => (
            <span key={i} className={cn('aspect-square rounded-[3px]', [2, 6, 9, 13, 17].includes(i) ? 'bg-[#ff8a3d]' : i % 5 === 0 ? 'bg-white/60' : 'bg-white/15')} />
          ))}
        </div>
      )
    case 'creator':
      return (
        <>
          <span className={cn(chip, 'absolute top-[10%] right-[4%]')}><UserPlus className="size-3" />Follow</span>
          <span className={cn(chip, 'absolute bottom-[12%] left-[6%] bg-white/90 text-[#3b0764]')}>Creator collab</span>
        </>
      )
    case 'chart':
      return (
        <div className="absolute inset-[8%] flex flex-col justify-end gap-2 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm">
          <div className="flex gap-1.5">
            {['CTR', 'ROAS', 'Reach'].map((l) => <span key={l} className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-semibold text-white/85 sm:text-[9px]">{l}</span>)}
          </div>
          <div className="flex h-[55%] items-end gap-1.5">
            {[28, 42, 36, 58, 50, 74, 88].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} className={cn('flex-1 rounded-t-[4px]', i === 6 ? 'bg-white' : 'bg-gradient-to-t from-[#38bdf8]/40 to-[#38bdf8]')} />
            ))}
          </div>
        </div>
      )
    case 'brand':
      return (
        <>
          <span className="absolute -bottom-2 -left-1 font-display text-[3.2rem] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.85)] sm:text-[4rem]">BRAND</span>
          <span className="absolute top-[10%] right-[6%] grid size-12 rotate-12 place-items-center rounded-full bg-[#fbbf24] text-center text-[8px] leading-tight font-bold text-[#2a0f04] uppercase sm:size-14">New<br />launch</span>
        </>
      )
    default:
      return (
        <div className="absolute inset-0 grid place-items-center">
          {[92, 68, 44].map((s) => <span key={s} style={{ width: `${s}%` }} className="absolute aspect-square rounded-full border border-white/25" />)}
          {[[18, 30], [72, 22], [80, 70], [26, 76], [50, 50]].map(([x, y], i) => (
            <span key={i} style={{ left: `${x}%`, top: `${y}%` }} className={cn('absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full', i === 4 ? 'size-4 bg-white shadow-[0_0_20px_white]' : 'bg-[#4ade80] shadow-[0_0_12px_#4ade80]')} />
          ))}
        </div>
      )
  }
}

// A portrait service poster. `compact` is the thumbnail version used in navigation.
export default function ServicePoster({ service, index, compact = false, className }) {
  const v = visualFor(service)
  return (
    <div
      style={{ backgroundImage: `linear-gradient(160deg, ${v.from} 0%, ${v.via} 45%, ${v.to} 100%)` }}
      className={cn('relative isolate flex aspect-[7/10] flex-col overflow-hidden bg-[length:140%_140%] bg-[position:0%_0%] transition-[background-position] duration-[1.2s] ease-out group-hover:bg-[position:100%_100%]', compact ? 'rounded-xl' : 'rounded-[22px] p-4 sm:p-5', className)}
    >
      <span aria-hidden className="pointer-events-none absolute -top-1/4 -right-1/4 -z-10 size-3/4 rounded-full bg-white/15 blur-3xl" />
      {/* Illustration area */}
      <div className={cn('relative overflow-hidden', compact ? 'absolute inset-0' : 'h-[54%] rounded-2xl bg-black/20')}>
        {v.image && <img src={v.image} alt="" loading="lazy" draggable={false} className={cn('size-full object-cover', compact ? 'opacity-70' : 'opacity-90 mix-blend-luminosity transition-[opacity,scale] duration-700 group-hover:scale-105 group-hover:opacity-100')} />}
        {!compact && <Art kind={v.art} />}
      </div>

      {!compact && (
        <div className="relative mt-auto">
          <span className="font-display text-xs font-semibold text-white/70 tabular-nums">{String(index + 1).padStart(2, '0')} — {v.category}</span>
          <h3 className="mt-1.5 font-display text-[1.15rem] leading-[1.05] font-bold tracking-[-0.02em] text-white uppercase sm:text-[1.45rem]">{service.title}</h3>
          <div className="mt-2.5 flex items-end justify-between gap-3">
            <p className="line-clamp-2 text-[11px] leading-snug text-white/75 sm:text-xs">{service.summary || service.description}</p>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      )}
      {compact && (
        <span className="absolute right-1.5 bottom-1.5 left-1.5 truncate text-[8px] font-bold tracking-wide text-white uppercase sm:text-[9px]">{String(index + 1).padStart(2, '0')}</span>
      )}
    </div>
  )
}
