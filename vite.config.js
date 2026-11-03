import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { portfolioData } from './src/data/portfolioData.js'

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const { seo, brand, navAll, defaultServices, defaultCourses } = portfolioData

// Public routes for the sitemap (admin pages are deliberately excluded).
const ROUTES = [
  ...navAll.map((n) => n.href),
  ...defaultServices.filter((s) => s.slug).map((s) => `/services/${s.slug}`),
  ...defaultCourses.map((c) => `/academy/${c.slug}`),
  '/influencer-program', '/work-with-us', '/become-an-influencer', '/careers/apply', '/privacy-policy', '/terms',
]

// Injects <title>, description, canonical and Open Graph/Twitter tags from
// portfolioData, and emits sitemap.xml + robots.txt into the build.
function seoFromPortfolioData() {
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    `<link rel="canonical" href="${escape(seo.url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(brand.name)}" />`,
    `<meta property="og:title" content="${escape(seo.title)}" />`,
    `<meta property="og:description" content="${escape(seo.description)}" />`,
    `<meta property="og:url" content="${escape(seo.url)}" />`,
    `<meta property="og:image" content="${escape(seo.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(seo.title)}" />`,
    `<meta name="twitter:description" content="${escape(seo.description)}" />`,
    `<meta name="twitter:image" content="${escape(seo.image)}" />`,
  ].join('\n    ')

  return {
    name: 'seo-from-portfolio-data',
    transformIndexHtml: (html) => html.replace('<!--seo-->', tags),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = [...new Set(ROUTES)].map((r) => `  <url><loc>${seo.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${seo.url}/sitemap.xml\n` })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), seoFromPortfolioData()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
