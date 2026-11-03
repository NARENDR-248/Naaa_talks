import { usePageMeta } from '@/hooks/usePageMeta'
import Hero from '@/components/sections/Hero'
import HomeAbout from '@/components/home/HomeAbout'
import HomeServices from '@/components/home/HomeServices'
import HomeProcess from '@/components/home/HomeProcess'
import WorkShowcase from '@/components/home/WorkShowcase'
import HomeAcademy from '@/components/home/HomeAcademy'
import HomeWhy from '@/components/home/HomeWhy'
import { HomeClients, HomeTestimonial } from '@/components/home/HomeProof'
import FAQ from '@/components/sections/FAQ'
import ContactPanel from '@/components/home/ContactPanel'

// Hero → About (+ figures) → Services → Process → Work → Academy → Why choose us →
// Clients → Testimonials → FAQ → Contact (navbar and footer come from SiteLayout).
export default function HomePage() {
  usePageMeta()
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeServices />
      <HomeProcess />
      <WorkShowcase />
      <HomeAcademy />
      <HomeWhy />
      <HomeClients />
      <HomeTestimonial />
      <FAQ layout="split" />
      <ContactPanel />
    </>
  )
}
