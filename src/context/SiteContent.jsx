import { useCallback, useEffect, useState } from 'react'
import { loadSiteContent } from '@/services/api'
import { SiteContentContext, initialContent } from './siteContentContext'

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(initialContent)
  const [loaded, setLoaded] = useState(false)

  const reload = useCallback(() => {
    loadSiteContent()
      .then(setContent)
      .catch(() => {}) // keep defaults if the backend is unreachable
      .finally(() => setLoaded(true))
  }, [])

  useEffect(reload, [reload])

  return <SiteContentContext.Provider value={{ content, loaded, reload }}>{children}</SiteContentContext.Provider>
}
