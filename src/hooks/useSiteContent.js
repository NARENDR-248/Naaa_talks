import { useContext } from 'react'
import { SiteContentContext } from '@/context/siteContentContext'

export const useSiteContent = () => useContext(SiteContentContext).content
export const useSiteContentReload = () => useContext(SiteContentContext).reload

// Social links with an empty URL are hidden everywhere.
export const useSocials = () => useSiteContent().settings.socials.filter((s) => s.url)
