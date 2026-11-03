import { usePageMeta } from '@/hooks/usePageMeta'
import Hero from '@/components/sections/Hero'
import AboutAgency from '@/components/sections/AboutAgency'
import ServicesOverview from '@/components/sections/ServicesOverview'
import ProductionHighlights from '@/components/sections/ProductionHighlights'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import AcademySection from '@/components/sections/Academy'
import BrandPromise from '@/components/sections/BrandPromise'
import Clients from '@/components/sections/Clients'
import ReelGallery from '@/components/sections/ReelGallery'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import ContactSection from '@/components/sections/ContactSection'

// Hero → About → Services → Production → Academy → Why Choose Us → Clients →
// Portfolio → Testimonials → FAQ → Contact (navbar and footer come from SiteLayout).
export default function HomePage() {
  usePageMeta()
  return (
    <>
      <Hero />
      <AboutAgency compact />
      <ServicesOverview />
      <ProductionHighlights />
      <FeaturedGallery />
      <AcademySection />
      <BrandPromise />
      <Clients />
      <ReelGallery limit={8} />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  )
}
