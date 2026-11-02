import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BriefcaseBusiness, CircleCheck, Clock, Images, Sparkles, UsersRound } from 'lucide-react'
import { adminList } from '@/services/api'
import { PENDING_STATUSES, STATUSES, SUBMISSIONS } from '@/services/collections'
import { useAdminData } from '@/hooks/useAdminData'
import { formatDateTime, timeAgo } from '@/lib/date'
import { AdminPage, ErrorBox, Loading, StatusBadge } from '@/components/admin/AdminKit'

const TYPES = Object.entries(SUBMISSIONS)
const ICONS = { business: BriefcaseBusiness, influencer: Sparkles, jobs: UsersRound }

async function loadDashboard() {
  const lists = await Promise.all([...TYPES.map(([, c]) => adminList(c.table)), adminList('projects')])
  const subs = Object.fromEntries(TYPES.map(([key], i) => [key, lists[i].filter((r) => !r.archived)]))
  return { subs, projects: lists[TYPES.length] }
}

function StatCard({ label, value, icon: Icon, to, tone = 'text-signal-400' }) {
  const body = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/55">{label}</span>
        <Icon className={`size-4 ${tone}`} />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-white tabular-nums">{value}</p>
    </>
  )
  const cls = 'block rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/20'
  return to ? <Link to={to} className={cls}>{body}</Link> : <div className={cls}>{body}</div>
}

export default function AdminDashboard() {
  useEffect(() => { document.title = 'Dashboard | NAAA TALKS Admin' }, [])
  const { data, loading, error, reload } = useAdminData(loadDashboard)

  if (loading && !data) return <Loading />
  if (error) return <ErrorBox error={error} onRetry={reload} />

  const all = TYPES.flatMap(([key, c]) => data.subs[key].map((r) => ({ ...r, type: key, typeLabel: c.label, path: c.path })))
  const pending = all.filter((r) => PENDING_STATUSES.includes(r.status)).length
  const approved = all.filter((r) => r.status === 'approved').length
  const recent = [...all].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))).slice(0, 8)
  const activity = all
    .map((r) => ({ ...r, at: r.updated_at || r.created_at, kind: r.updated_at ? `marked ${r.status}` : 'submitted' }))
    .sort((a, b) => String(b.at).localeCompare(String(a.at)))
    .slice(0, 8)
  const published = data.projects.filter((p) => p.published !== false).length

  return (
    <AdminPage title="Dashboard" subtitle="Enquiries, applications and website content at a glance.">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {TYPES.map(([key, c]) => <StatCard key={key} label={c.label} value={data.subs[key].length} icon={ICONS[key]} to={c.path} />)}
        <StatCard label="Pending" value={pending} icon={Clock} tone="text-amber-300" />
        <StatCard label="Approved" value={approved} icon={CircleCheck} tone="text-emerald-300" />
        <StatCard label="Published projects" value={published} icon={Images} to="/admin/portfolio" />
      </div>

      {/* Status breakdown per inbox */}
      <section className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
        <h2 className="font-sans text-base font-semibold text-white">Application statistics</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {TYPES.map(([key, c]) => {
            const list = data.subs[key]
            return (
              <div key={key}>
                <p className="text-sm font-medium text-white/80">{c.label}</p>
                <ul className="mt-3 space-y-2">
                  {STATUSES.map((s) => {
                    const n = list.filter((r) => r.status === s).length
                    return (
                      <li key={s} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-2 text-xs">
                        <span className="text-white/50 capitalize">{s}</span>
                        <span className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <span className="block h-full rounded-full bg-signal-500" style={{ width: list.length ? `${(n / list.length) * 100}%` : 0 }} />
                        </span>
                        <span className="text-right text-white/70 tabular-nums">{n}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
          <h2 className="font-sans text-base font-semibold text-white">Recent submissions</h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-white/45">No submissions yet. They will appear here as soon as visitors use the forms.</p>
          ) : (
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {recent.map((r) => (
                <li key={`${r.type}-${r.id}`}>
                  <Link to={`${r.path}?open=${r.id}`} className="flex items-center gap-3 py-3 hover:bg-white/[0.02]">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">{r.name}</span>
                      <span className="block truncate text-xs text-white/45">{r.typeLabel} · {formatDateTime(r.created_at)}</span>
                    </span>
                    <StatusBadge status={r.status} />
                    <ArrowUpRight className="size-4 text-white/30" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
          <h2 className="font-sans text-base font-semibold text-white">Recent activity</h2>
          {activity.length === 0 ? (
            <p className="mt-4 text-sm text-white/45">Nothing yet.</p>
          ) : (
            <ol className="mt-4 space-y-3">
              {activity.map((r) => (
                <li key={`a-${r.type}-${r.id}`} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-signal-500" />
                  <span className="min-w-0 flex-1 text-white/70"><span className="font-semibold text-white">{r.name}</span> — {r.typeLabel.toLowerCase().replace(/s$/, '')} {r.kind}</span>
                  <span className="shrink-0 text-xs text-white/40">{timeAgo(r.at)}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </AdminPage>
  )
}
