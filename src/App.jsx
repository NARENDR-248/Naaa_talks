import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@/components/ui/ScrollToTop'
import SiteLayout from '@/components/layout/SiteLayout'
import PageLoader from '@/components/layout/PageLoader'
import HomePage from '@/pages/HomePage'

// Inner pages are split into their own chunks.
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ContentProductionPage = lazy(() => import('@/pages/ContentProductionPage'))
const InfluencerMarketingPage = lazy(() => import('@/pages/InfluencerMarketingPage'))
const InfluencerProgramPage = lazy(() => import('@/pages/InfluencerProgramPage'))
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'))
const ClientsPage = lazy(() => import('@/pages/ClientsPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const JobApplicationPage = lazy(() => import('@/pages/JobApplicationPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const WorkWithUsPage = lazy(() => import('@/pages/WorkWithUsPage'))
const BecomeInfluencerPage = lazy(() => import('@/pages/BecomeInfluencerPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Admin dashboard (its own chunks; never loaded by public visitors).
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminInbox = lazy(() => import('@/pages/admin/AdminInbox'))
const AdminCollection = lazy(() => import('@/pages/admin/AdminCollection'))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/content-production" element={<ContentProductionPage />} />
            <Route path="/influencer-marketing" element={<InfluencerMarketingPage />} />
            <Route path="/influencer-program" element={<InfluencerProgramPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/apply" element={<JobApplicationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
            <Route path="/become-an-influencer" element={<BecomeInfluencerPage />} />
            <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="business-enquiries" element={<AdminInbox key="business" type="business" />} />
            <Route path="influencer-applications" element={<AdminInbox key="influencer" type="influencer" />} />
            <Route path="job-applications" element={<AdminInbox key="jobs" type="jobs" />} />
            <Route path="portfolio" element={<AdminCollection key="projects" collections={['projects']} title="Portfolio" subtitle="Projects shown in the featured carousel and portfolio gallery." />} />
            <Route path="services" element={<AdminCollection key="services" collections={['services']} title="Services" subtitle="Services listed under each of the four categories." />} />
            <Route path="testimonials" element={<AdminCollection key="testimonials" collections={['testimonials']} title="Testimonials" subtitle="Publish only with the author's permission." />} />
            <Route path="clients" element={<AdminCollection key="clients" collections={['clients']} title="Clients" subtitle="Client logos and highlights — publish only with permission." />} />
            <Route path="content" element={<AdminCollection key="content" collections={['faqs', 'jobs']} title="FAQs & job openings" subtitle="Questions shown across the site and positions on the Careers page." />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
