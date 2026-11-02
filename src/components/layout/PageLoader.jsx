import { Wordmark } from '@/components/portfolio/Kit'

export default function PageLoader() {
  return (
    <div className="grid min-h-dvh place-items-center bg-void" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <Wordmark className="animate-pulse text-xl" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  )
}
