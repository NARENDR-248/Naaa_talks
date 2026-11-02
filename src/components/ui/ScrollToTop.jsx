import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Top of page on route change; for "#hash" links, scroll to the target once the
// (possibly lazy-loaded) page has rendered it.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el || ++tries > 20) {
        clearInterval(timer)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])
  return null
}
