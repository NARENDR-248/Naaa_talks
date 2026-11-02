import { createContext } from 'react'
import { portfolioData as d } from '@/data/portfolioData'

// First paint uses the built-in defaults; published content replaces them once
// loaded, so the site never shows an empty loading state for its main content.
export const initialContent = {
  settings: d.settings,
  projects: d.defaultProjects,
  services: d.defaultServices,
  jobs: d.defaultJobs,
  testimonials: d.defaultTestimonials,
  clients: d.defaultClients,
}

export const SiteContentContext = createContext({ content: initialContent, loaded: false, reload: () => {}, faqs: { status: 'loading', items: [], error: null } })
