import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoaderCircle, Lock } from 'lucide-react'
import { DEMO_MODE } from '@/lib/supabase'
import { adminSignIn, demoSignIn, getAdminSession } from '@/services/api'
import { Wordmark } from '@/components/portfolio/Kit'
import { AdminButton } from '@/components/admin/AdminKit'

const input = 'h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-[15px] text-white placeholder:text-white/30 outline-none focus:border-signal-500/70 focus:ring-4 focus:ring-signal-500/15'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const target = location.state?.from || '/admin/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(location.state?.error ?? null)

  useEffect(() => {
    document.title = 'Admin login | NAAA TALKS'
    getAdminSession().then((s) => s?.isAdmin && navigate(target, { replace: true })).catch(() => {})
  }, [navigate, target])

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const session = await adminSignIn(email.trim(), password)
      if (!session?.isAdmin) throw new Error('This account does not have admin access.')
      navigate(target, { replace: true })
    } catch (ex) {
      setError(ex.message)
    } finally {
      setBusy(false)
    }
  }

  const demo = () => {
    demoSignIn()
    navigate(target, { replace: true })
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-[#050505] px-4 py-10">
      <div aria-hidden className="pointer-events-none fixed top-0 left-1/2 h-[30rem] w-[44rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(150_12_36/0.3),transparent)]" />
      <main className="relative w-full max-w-sm">
        <Link to="/" className="inline-block"><Wordmark /></Link>
        <h1 className="mt-8 font-display text-3xl font-semibold text-white">Team login</h1>
        <p className="mt-2 text-sm text-white/50">Sign in to manage enquiries, applications and website content.</p>

        {DEMO_MODE ? (
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <p className="text-sm font-semibold text-amber-300">Demo mode</p>
            <p className="mt-1 text-sm leading-relaxed text-amber-100/70">Supabase is not configured, so the dashboard uses data stored in this browser only. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable real sign-in.</p>
            <AdminButton variant="primary" className="mt-4 w-full" onClick={demo}>Enter demo admin</AdminButton>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-xs font-medium text-white/65">Email</label>
              <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-xs font-medium text-white/65">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            </div>
            {error && <p role="alert" className="rounded-xl border border-signal-500/30 bg-signal-500/10 px-4 py-3 text-sm text-signal-400">{error}</p>}
            <button type="submit" disabled={busy || !email || !password} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-signal-500 text-sm font-semibold text-white transition hover:bg-signal-400 disabled:opacity-50">
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : <Lock className="size-4" />} Sign in
            </button>
          </form>
        )}
        <Link to="/" className="mt-8 inline-block text-xs text-white/40 hover:text-white">← Back to website</Link>
      </main>
    </div>
  )
}
