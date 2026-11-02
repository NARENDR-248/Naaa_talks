import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import WhatsAppButton from './WhatsAppButton'

function SectionLoader() {
  return <div className="min-h-[60vh]" role="status" aria-label="Loading page" />
}

export default function SiteLayout() {
  return (
    <div className="min-h-dvh overflow-x-clip bg-void">
      <a href="#main" className="sr-only z-[70] rounded-full bg-white px-4 py-2 text-sm font-semibold text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Suspense fallback={<SectionLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
