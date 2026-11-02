import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Menu } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useSocials } from '@/hooks/useSiteContent'
import { useJourneys } from '@/hooks/useJourneys'
import { cn } from '@/lib/cn'
import { Cta, Wordmark } from '@/components/portfolio/Kit'
import MobileMenu from '@/components/portfolio/MobileMenu'

const { nav, navAll, brand } = portfolioData

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const socials = useSocials()
  const journeys = useJourneys()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // The full-screen menu is phone/tablet only; close it if the viewport grows.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  const closeMenu = useCallback(() => {
    setOpen(false)
    menuButtonRef.current?.focus({ preventScroll: true })
  }, [])

  const navigateTo = useCallback((href) => {
    closeMenu()
    navigate(href)
  }, [closeMenu, navigate])

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-colors duration-300', scrolled ? 'border-b border-white/[0.06] bg-void/80 backdrop-blur-xl' : 'bg-transparent')}>
      <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-[5vw] 2xl:px-[6vw]">
        <Link to="/" aria-label={`${brand.name} — home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) => cn('rounded-full px-3.5 py-2 text-[13px] font-medium transition hover:text-white xl:px-4 xl:text-[15px]', isActive ? 'text-white' : 'text-white/75')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink to="/contact" className={({ isActive }) => cn('hidden rounded-full px-3.5 py-2 text-[13px] font-medium hover:text-white sm:inline-flex xl:mr-3 xl:text-[15px]', isActive ? 'text-white' : 'text-white/85')}>
            Contact
          </NavLink>
          <span className="hidden sm:block">
            <Cta href={journeys.business.href} size="sm" className="shadow-[0_8px_30px_-8px_rgb(255_16_31/0.8)] xl:h-11 xl:px-6 xl:text-[15px]">{journeys.business.label} <ArrowUpRight className="size-4" aria-hidden /></Cta>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full border border-white/10 text-white lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        items={navAll}
        journeys={journeys}
        currentPath={pathname}
        socialLinks={socials}
        brandName={brand.name}
        tagline={brand.menuTagline}
        onClose={closeMenu}
        onNavigate={navigateTo}
      />
    </header>
  )
}
