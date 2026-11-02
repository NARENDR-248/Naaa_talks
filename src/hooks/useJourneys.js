import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from './useSiteContent'

// The three journeys with button labels from the admin-editable CTA settings.
export function useJourneys() {
  const { ctas } = useSiteContent().settings
  const j = portfolioData.journeys
  return {
    business: { ...j.business, label: ctas.business || j.business.label },
    influencer: { ...j.influencer, label: ctas.influencer || j.influencer.label },
    careers: { ...j.careers, label: ctas.careers || j.careers.label },
  }
}
