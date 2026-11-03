import { portfolioData } from '@/data/portfolioData'
import { usePageMeta } from '@/hooks/usePageMeta'
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutBeliefs from '@/components/about/AboutBeliefs'
import AboutCapabilities from '@/components/about/AboutCapabilities'
import AboutProcess from '@/components/about/AboutProcess'
import AboutAcademy from '@/components/about/AboutAcademy'
import AboutFinalCta from '@/components/about/AboutFinalCta'

// Hero → story → values → what we do → process → academy → call to action.
export default function AboutPage() {
  usePageMeta('About Us', portfolioData.about.heroParagraphs[0])
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutBeliefs />
      <AboutCapabilities />
      <AboutProcess />
      <AboutAcademy />
      <AboutFinalCta />
    </>
  )
}
