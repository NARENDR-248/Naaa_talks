import { usePageMeta } from '@/hooks/usePageMeta'
import Hero from '@/components/sections/Hero'
import SocialLinks from '@/components/sections/SocialLinks'
import FeaturedGallery from '@/components/sections/FeaturedGallery'
import CategoryMarquee from '@/components/sections/CategoryMarquee'
import AboutAgency from '@/components/sections/AboutAgency'
import Pillars from '@/components/sections/Pillars'
import ServicesOverview from '@/components/sections/ServicesOverview'
import ProductionTeam from '@/components/sections/ProductionTeam'
import InfluencerProgram from '@/components/sections/InfluencerProgram'
import Process from '@/components/sections/Process'
import BrandPromise from '@/components/sections/BrandPromise'
import ReelGallery from '@/components/sections/ReelGallery'
import Clients from '@/components/sections/Clients'
import Testimonials from '@/components/sections/Testimonials'
import CareersTeaser from '@/components/sections/CareersTeaser'
import ContactSection from '@/components/sections/ContactSection'

// Section order follows the NAAA TALKS brief (navbar and footer come from SiteLayout).
export default function HomePage() {
  usePageMeta()
  return (
    <>
      <Hero />
      <SocialLinks />
      <FeaturedGallery />
      <CategoryMarquee />
      <AboutAgency compact />
      <Pillars />
      <ServicesOverview />
      <ProductionTeam />
      <InfluencerProgram compact />
      <Process />
      <BrandPromise />
      <ReelGallery limit={8} />
      <Clients />
      <Testimonials />
      <CareersTeaser />
      <ContactSection />
    </>
  )
}
