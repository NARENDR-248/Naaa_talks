import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { portfolioData } from '@/data/portfolioData'
import { useSiteContent } from './useSiteContent'

const { seo: site, brand } = portfolioData

function setMeta(selector, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Per-route <title>, description, canonical and Open Graph tags. The site-wide
// defaults come from the admin SEO settings.
export function usePageMeta(title, description) {
  const { pathname } = useLocation()
  const { seo } = useSiteContent().settings
  const desc = description || seo.description
  useEffect(() => {
    const full = title ? `${title} | ${brand.name}` : seo.title
    const url = `${site.url}${pathname === '/' ? '' : pathname}`
    document.title = full
    setMeta('meta[name="description"]', desc)
    setMeta('meta[property="og:title"]', full)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[name="twitter:title"]', full)
    setMeta('meta[name="twitter:description"]', desc)
    document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [title, desc, pathname, seo.title])
}
