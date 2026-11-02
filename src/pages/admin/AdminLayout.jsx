import { Suspense, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BriefcaseBusiness, ExternalLink, FileText, Images, LayoutDashboard, LoaderCircle, LogOut, Menu, Quote,
  Settings, ShieldAlert, Sparkles, Building2, UsersRound, Wrench, X,
} from 'lucide-react'
import { DEMO_MODE } from '@/lib/supabase'
import { adminSignOut, getAdminSession, onAuthChange } from '@/services/api'
import { cn } from '@/lib/cn'
import { Wordmark } from '@/components/portfolio/Kit'
import { AdminButton, Loading } from '@/components/admin/AdminKit'

const NAV = [
  { group: 'Overview', items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    group: 'Inbox',
    items: [
      { to: '/admin/business-enquiries', label: 'Business enquiries', icon: BriefcaseBusiness },
      { to: '/admin/influencer-applications', label: 'Influencer applications', icon: Sparkles },
      { to: '/admin/job-applications', label: 'Job applications', icon: UsersRound },
    ],
  },
  {
    group: 'Website',
    items: [
      { to: '/admin/portfolio', label: 'Portfolio', icon: Images },
      { to: '/admin/services', label: 'Services', icon: Wrench },
      { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
      { to: '/admin/clients', label: 'Clients', icon: Building2 },
      { to: '/admin/content', label: 'FAQs & job openings', icon: FileText },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function Sidebar({ session, onNavigate, onSignOut }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-2"><Wordmark /></div>
      <p className="mt-1 px-2 text-[10px] font-semibold tracking-[0.24em] text-white/35 uppercase">Admin</p>
      <nav aria-label="Admin" className="mt-8 flex-1 space-y-6 overflow-y-auto">
        {NAV.map((g) => (
          <div key={g.group}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.2em] text-white/30 uppercase">{g.group}</p>
            <ul className="space-y-0.5">
              {g.items.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={onNavigate}
                    className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-signal-500/12 text-white ring-1 ring-signal-500/30' : 'text-white/60 hover:bg-white/[0.04] hover:text-white')}
                  >
                    {({ isActive }) => <><Icon className={cn('size-4', isActive && 'text-signal-400')} /> {label}</>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-4">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white">
          <ExternalLink className="size-4" /> View website
        </a>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] p-2.5">
          <span className="min-w-0 flex-1 truncate text-xs text-white/60">{session.email}</span>
          <button type="button" onClick={onSignOut} aria-label="Sign out" className="grid size-8 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"><LogOut className="size-4" /></button>
        </div>
      </div>
    </div>
  )
}

// Guards every /admin page: no session → login; signed in but not an admin → refused.
// The database's RLS policies enforce the same rule server-side.
export default function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [session, setSession] = useState(undefined)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    let alive = true
    const check = () => getAdminSession().then((s) => alive && setSession(s)).catch(() => alive && setSession(null))
    check()
    const off = onAuthChange(check)
    return () => { alive = false; off() }
  }, [])

  useEffect(() => {
    if (session === null) navigate('/admin/login', { replace: true, state: { from: pathname } })
  }, [session, navigate, pathname])

  const signOut = async () => {
    await adminSignOut()
    setSession(null)
  }

  if (session === undefined || session === null) {
    return <div className="grid min-h-dvh place-items-center bg-[#050505]"><LoaderCircle className="size-6 animate-spin text-signal-400" aria-label="Checking access" /></div>
  }

  if (!session.isAdmin) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[#050505] px-4 text-center">
        <div className="max-w-sm">
          <ShieldAlert className="mx-auto size-10 text-signal-400" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">No admin access</h1>
          <p className="mt-2 text-sm text-white/55">{session.email} is signed in but is not listed as a NAAA TALKS admin. Ask an existing admin to add this account to the admin_users table.</p>
          <AdminButton className="mt-6" onClick={signOut}>Sign out</AdminButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-[#050505] text-white lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-dvh border-r border-white/[0.06] bg-[#0a0a0a] p-4 lg:block">
        <Sidebar session={session} onSignOut={signOut} />
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0a]/95 px-4 backdrop-blur lg:hidden">
        <Wordmark className="text-base" />
        <button type="button" onClick={() => setDrawer(true)} aria-label="Open admin menu" className="grid size-10 place-items-center rounded-full border border-white/10"><Menu className="size-5" /></button>
      </header>

      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div className="absolute inset-0 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 380, damping: 38 }} className="absolute inset-y-0 left-0 w-72 border-r border-white/[0.06] bg-[#0a0a0a] p-4">
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close admin menu" className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-white/60 hover:bg-white/10"><X className="size-5" /></button>
              <Sidebar session={session} onNavigate={() => setDrawer(false)} onSignOut={signOut} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        {DEMO_MODE && (
          <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200/90">
            Demo mode — data is stored in this browser only. Connect Supabase to manage the live website.
          </p>
        )}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
