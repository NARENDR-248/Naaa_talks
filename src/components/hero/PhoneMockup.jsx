import { Clapperboard, Ellipsis, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from '@/hooks/useSiteContent'

// Sunset / dusk tiles standing in for posts on the Instagram-style profile grid.
const TILES = [
  'linear-gradient(180deg,#f7b267 0%,#e0685d 38%,#7b2d53 70%,#1d1024 100%)',
  'linear-gradient(160deg,#4a5d8f 0%,#a26a8a 45%,#e9a07a 100%)',
  'linear-gradient(200deg,#2b1a33 0%,#8c3b4f 55%,#f08a5d 100%)',
  'linear-gradient(170deg,#132238 0%,#3d5a80 50%,#98c1d9 100%)',
  'linear-gradient(190deg,#e8a87c 0%,#c38d9e 50%,#41b3a3 100%)',
  'linear-gradient(150deg,#26131b 0%,#7d1d2b 60%,#ff6f59 100%)',
]

// Person on a hilltop, for the first tile.
function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden>
      <path d="M0 78 Q30 66 52 72 T100 68 V100 H0Z" fill="#160b14" />
      <path d="M47 50 a3.2 3.2 0 1 1 6.4 0 a3.2 3.2 0 1 1 -6.4 0 M46.5 55 h7 l1 13 h-2 l-.6 9 h-1.8 l-.5-8 h-.8 l-.4 8 h-1.8 l-.6-9 h-2z" fill="#160b14" />
    </svg>
  )
}

// A phone showing the NAAA TALKS profile grid. Decorative.
export default function PhoneMockup({ className }) {
  // Same logo as the navbar: an admin-uploaded logo, else the built-in one.
  const logo = useSiteContent().settings.branding?.logo || portfolioData.brand.logo
  return (
    <div aria-hidden className={cn('@container rounded-[2.6rem] bg-[linear-gradient(140deg,#5b0f18,#1a0508_35%,#2a070c_65%,#6d1220)] p-[3.2%] shadow-[0_0_0_1px_rgb(255_40_60/0.45),0_30px_80px_-20px_rgb(255_16_31/0.55)]', className)}>
      <div className="relative flex size-full flex-col overflow-hidden rounded-[2.2rem] bg-[#0a0a0c] pt-[9%]">
        <span className="absolute top-[2.4%] left-1/2 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center gap-[5%] px-[6%]">
          <span className="grid aspect-square w-[20%] shrink-0 place-items-center rounded-full bg-[conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34)] p-[2px]">
            <span className="flex size-full items-center justify-center rounded-full bg-black font-display text-[4.2cqw] leading-none font-bold whitespace-nowrap text-white">
              N<span className="text-signal-500">/</span>T
            </span>
          </span>
          {/* Profile name: the NAAA TALKS logo (falls back to the handle) */}
          {logo ? (
            <img src={logo} alt="" draggable={false} className="block h-[6.5cqw] w-auto min-w-0 object-contain" />
          ) : (
            <span className="truncate font-sans text-[5.2cqw] font-semibold text-white">naaatalks</span>
          )}
          <Ellipsis className="ml-auto w-[10%] text-white/80" />
        </div>
        <div className="mt-[8%] grid grid-cols-2 border-b border-white/10 text-white/80">
          <span className="flex justify-center border-b-2 border-white pb-[6%]"><Grid3x3 className="w-[22%]" /></span>
          <span className="flex justify-center pb-[6%] text-white/45"><Clapperboard className="w-[22%]" /></span>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-[2px] pt-[2px]">
          {TILES.map((bg, i) => (
            <span key={bg} className="relative" style={{ background: bg }}>{i === 0 && <Silhouette />}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
