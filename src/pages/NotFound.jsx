import { usePageMeta } from '@/hooks/usePageMeta'
import { Cta, Shell } from '@/components/portfolio/Kit'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <Shell className="grid min-h-[80dvh] place-items-center pt-24 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">This page doesn’t exist</h1>
        <p className="mt-2 text-white/55">The link may be broken or the page may have moved.</p>
        <Cta href="/" className="mt-8">Back to home</Cta>
      </div>
    </Shell>
  )
}
