import { useContext } from 'react'
import { SiteContentContext } from '@/context/siteContentContext'

export const useSiteContent = () => useContext(SiteContentContext).content
export const useSiteContentReload = () => useContext(SiteContentContext).reload

// Social links with an empty URL are hidden everywhere.
export const useSocials = () => useSiteContent().settings.socials.filter((s) => s.url)
export const useFaqs = () => useContext(SiteContentContext).faqs

// Services that have their own detail page (/services/<slug>), and the production services.
export const useServicePages = () => useSiteContent().services.filter((s) => s.slug)
export const useProductionServices = () => useSiteContent().services.filter((s) => s.category === 'production')
