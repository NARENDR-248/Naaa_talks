import { portfolioData } from '@/data/portfolioData'

// Slow scrolling strip of content categories between sections.
export default function CategoryMarquee() {
  const { marquee } = portfolioData
  return (
    <div aria-hidden className="overflow-hidden border-y border-white/[0.06] py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 sm:gap-16">
        {[...marquee, ...marquee].map((word, i) => (
          <span key={i} className="font-display text-3xl font-light whitespace-nowrap text-white/25 sm:text-4xl">{word}</span>
        ))}
      </div>
    </div>
  )
}
