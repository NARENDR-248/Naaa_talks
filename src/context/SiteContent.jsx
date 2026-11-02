import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedFaqs, loadSiteContent } from '@/services/api'
import { SiteContentContext, initialContent } from './siteContentContext'

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(initialContent)
  const [loaded, setLoaded] = useState(false)
  // FAQs come straight from the database: { status: 'loading' | 'ready' | 'error', items, error }
  const [faqs, setFaqs] = useState({ status: 'loading', items: [], error: null })

  // One request per app load (and after admin edits), shared by every FAQ section.
  const reload = useCallback(() => {
    loadSiteContent()
      .then(setContent)
      .catch(() => {}) // keep defaults if the backend is unreachable
      .finally(() => setLoaded(true))
    fetchPublishedFaqs()
      .then((items) => setFaqs({ status: 'ready', items, error: null }))
      .catch((error) => {
        if (import.meta.env.DEV) console.error('[faqs] Supabase request failed:', error)
        setFaqs((cur) => ({ ...cur, status: 'error', error }))
      })
  }, [])

  useEffect(reload, [reload])

  return <SiteContentContext.Provider value={{ content, loaded, reload, faqs }}>{children}</SiteContentContext.Provider>
}
