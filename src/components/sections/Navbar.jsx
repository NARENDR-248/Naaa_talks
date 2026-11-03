import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { useServicePages, useSiteContent, useSocials } from '@/hooks/useSiteContent'
import { useJourneys } from '@/hooks/useJourneys'
import { cn } from '@/lib/cn'
import { Cta, Wordmark } from '@/components/portfolio/Kit'
import MobileMenu from '@/components/portfolio/MobileMenu'

const { nav, navAll, brand } = portfolioData
const linkClass = (active) =>
  cn('relative inline-flex items-center py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-200 hover:text-white wide:text-[14px]', active ? 'text-white' : 'text-white/70')

// Thin red underline under the current page.
const ActiveBar = ({ show }) => show && <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-signal-500" />

// Link + chevron toggle. Opens on hover or click, closes on outside click,
// Escape, or when focus leaves; arrow keys move through the items.
function Dropdown({ item, links }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const closeTimer = useRef(null)
  const hoverOpened = useRef(false) // a click right after hover-open should keep it open
  const menuId = useId()
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const items = () => [...(rootRef.current?.querySelectorAll('[role="menuitem"]') ?? [])]
  const focusItem = (i) => { const list = items(); list[(i + list.length) % list.length]?.focus() }
  // Opened with an arrow key: focus the first/last item once the menu has rendered.
  const focusOnOpen = useRef(null)
  useEffect(() => {
    if (!open || focusOnOpen.current === null) return
    ;[...(rootRef.current?.querySelectorAll('[role="menuitem"]') ?? [])].at(focusOnOpen.current)?.focus()
    focusOnOpen.current = null
  }, [open])
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && open) { setOpen(false); buttonRef.current?.focus() }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const list = items(); const at = list.indexOf(document.activeElement)
      if (!open) { focusOnOpen.current = e.key === 'ArrowDown' ? 0 : -1; setOpen(true) }
      else focusItem(at === -1 ? 0 : at + (e.key === 'ArrowDown' ? 1 : -1))
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative flex items-center"
      onMouseEnter={() => { clearTimeout(closeTimer.current); if (!open) hoverOpened.current = true; setOpen(true) }}
      onMouseLeave={() => { closeTimer.current = setTimeout(() => setOpen(false), 120) }}
      onBlur={(e) => !rootRef.current?.contains(e.relatedTarget) && setOpen(false)}
      onKeyDown={onKeyDown}
    >
      <Link to={item.href} className={linkClass(active)}>{item.label}<ActiveBar show={active} /></Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${item.label} menu`}
        onClick={() => {
          if (hoverOpened.current) { hoverOpened.current = false; setOpen(true); return }
          setOpen((o) => !o)
        }}
        className="-mr-1 ml-0.5 grid size-6 place-items-center rounded-full text-white/60 transition hover:text-white focus-visible:text-white"
      >
        <ChevronDown className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-1/2 z-10 w-72 -translate-x-1/2 pt-3"
          >
            <ul id={menuId} role="menu" aria-label={item.label} className="rounded-2xl border border-white/10 bg-[#0b0b0d]/95 p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.85)] backdrop-blur-xl">
              {links.map((l) => (
                <li key={l.href} role="none">
                  <NavLink
                    to={l.href}
                    end
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => cn('block rounded-xl px-3.5 py-2.5 text-sm whitespace-nowrap outline-none transition hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.08] focus-visible:text-white', isActive ? 'bg-signal-500/10 text-white' : 'text-white/75', l.strong && 'font-semibold text-white')}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const socials = useSocials()
  const journeys = useJourneys()
  const servicePages = useServicePages()
  const { courses } = useSiteContent()
  const menus = {
    services: [{ label: 'All services', href: '/services', strong: true }, ...servicePages.map((s) => ({ label: s.title, href: `/services/${s.slug}` })), { label: 'Content Production', href: '/content-production' }],
    courses: [{ label: 'Academy overview', href: '/academy', strong: true }, ...courses.map((c) => ({ label: c.title, href: `/academy/${c.slug}` }))],
  }
  // The phone/tablet menu shows the same sub-pages under Services and Academy.
  const drawerItems = navAll.map((n) => ({ ...n, children: n.href === '/services' ? menus.services.slice(1) : n.href === '/academy' ? menus.courses.slice(1) : undefined }))

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

  // The drawer is below 1200px only; close it if the viewport grows.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 75rem)')
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

  // Transparent over the homepage hero; solid everywhere else and once scrolled.
  const solid = scrolled || pathname !== '/'

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300', solid ? 'border-white/[0.08] bg-[#050505]/90 backdrop-blur-xl' : 'border-transparent bg-transparent')}>
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 nav:h-[76px] nav:px-8 wide:px-10">
        <Link to="/" aria-label={`${brand.name} — home`} className="flex shrink-0 items-center">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-[clamp(1rem,1.45vw,1.6rem)] nav:flex">
          {[...nav, { label: 'Contact Us', href: '/contact' }].map((l) =>
            l.menu && menus[l.menu]?.length > 1
              ? <Dropdown key={l.href} item={l} links={menus[l.menu]} />
              : (
                <NavLink key={l.href} to={l.href} className={({ isActive }) => linkClass(isActive)}>
                  {({ isActive }) => <>{l.label}<ActiveBar show={isActive} /></>}
                </NavLink>
              ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <span className="hidden wide:block">
            <Cta href="/portfolio" variant="outline" size="sm" className="h-10 border-white/15 px-5 whitespace-nowrap hover:border-white/40">Explore Our Work</Cta>
          </span>
          <span className="hidden sm:block">
            <Cta href={journeys.business.href} size="sm" className="h-10 bg-[#FF1744] px-5 whitespace-nowrap shadow-[0_8px_30px_-8px_rgb(255_16_31/0.8)]">{journeys.business.label} <ArrowUpRight className="size-4" aria-hidden /></Cta>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full border border-white/10 text-white nav:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        items={drawerItems}
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
