import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Archive, ArchiveRestore, ChevronLeft, ChevronRight, Download, FileText, Mail, Phone, Search, Trash2 } from 'lucide-react'
import { DEMO_MODE } from '@/lib/supabase'
import { adminDeleteSubmission, adminList, adminUpdateSubmission, resumeUrl } from '@/services/api'
import { STATUSES, SUBMISSIONS } from '@/services/collections'
import { useAdminData } from '@/hooks/useAdminData'
import { formatDateTime } from '@/lib/date'
import { cn } from '@/lib/cn'
import { AdminButton, AdminPage, ConfirmDialog, Drawer, EmptyState, ErrorBox, Loading, Notice, StatusBadge } from '@/components/admin/AdminKit'

const PAGE_SIZE = 10
const control = 'h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-signal-500/70'

function linkFor(key, value) {
  if (!value) return null
  if (key === 'email') return `mailto:${value}`
  if (key === 'phone') return `tel:${String(value).replace(/\s/g, '')}`
  if (key === 'portfolio_url' && /^https?:\/\//.test(value)) return value
  if (key === 'instagram') return `https://instagram.com/${String(value).replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '')}`
  return null
}

function SubmissionDetail({ config, row, onSaved, onClose, onDelete, onNotice }) {
  const [status, setStatus] = useState(row.status)
  const [notes, setNotes] = useState(row.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [opening, setOpening] = useState(false)
  const dirty = status !== row.status || notes !== (row.notes ?? '')

  const save = async (patch = { status, notes: notes.trim() || null }) => {
    setSaving(true)
    try {
      onSaved(await adminUpdateSubmission(config.table, row.id, patch))
      onNotice({ text: 'Saved.' })
    } catch (e) {
      onNotice({ text: e.message, error: true })
    } finally {
      setSaving(false)
    }
  }

  const openResume = async () => {
    setOpening(true)
    try {
      const url = await resumeUrl(row.resume_path)
      if (url) window.open(url, '_blank', 'noopener,noreferrer')
    } catch (e) {
      onNotice({ text: e.message, error: true })
    } finally {
      setOpening(false)
    }
  }

  return (
    <Drawer
      open
      title={row.name}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="primary" loading={saving} disabled={!dirty} onClick={() => save()}>Save changes</AdminButton>
          <AdminButton onClick={() => save({ archived: !row.archived })}>
            {row.archived ? <><ArchiveRestore className="size-4" /> Unarchive</> : <><Archive className="size-4" /> Archive</>}
          </AdminButton>
          <AdminButton variant="danger" className="ml-auto" onClick={onDelete}><Trash2 className="size-4" /> Delete</AdminButton>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
        <StatusBadge status={row.status} />
        {row.archived && <span className="rounded-full border border-white/15 px-2 py-0.5">Archived</span>}
        <span>Received {formatDateTime(row.created_at)}</span>
        {row.updated_at && <span>· Updated {formatDateTime(row.updated_at)}</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {row.email && <a href={`mailto:${row.email}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/12 px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.05]"><Mail className="size-3.5" /> Email</a>}
        {row.phone && <a href={`tel:${row.phone.replace(/\s/g, '')}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/12 px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.05]"><Phone className="size-3.5" /> Call</a>}
      </div>

      <dl className="mt-6 space-y-4">
        {config.detail.map(([key, label]) => {
          const value = row[key]
          if (value == null || value === '') return null
          const href = linkFor(key, value)
          return (
            <div key={key}>
              <dt className="text-[11px] font-semibold tracking-[0.12em] text-white/40 uppercase">{label}</dt>
              <dd className="mt-1 text-sm whitespace-pre-wrap text-white/85">
                {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-signal-400 underline-offset-2 hover:underline">{String(value)}</a> : String(value)}
              </dd>
            </div>
          )
        })}
      </dl>

      {config.hasResume && (
        <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-white/40 uppercase">Resume</p>
          {row.resume_path ? (
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <FileText className="size-4 text-signal-400" />
              <span className="min-w-0 flex-1 truncate text-sm text-white/85">{row.resume_name || row.resume_path.split('/').pop()}</span>
              {DEMO_MODE ? (
                <span className="text-xs text-white/40">Demo mode stores the file name only</span>
              ) : (
                <AdminButton loading={opening} onClick={openResume}><Download className="size-4" /> Download</AdminButton>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-white/45">No resume attached.</p>
          )}
          {!DEMO_MODE && row.resume_path && <p className="mt-2 text-xs text-white/35">Opens a private link that expires after 60 seconds.</p>}
        </div>
      )}

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="sub-status" className="mb-1.5 block text-xs font-medium text-white/65">Status</label>
          <select id="sub-status" value={status} onChange={(e) => setStatus(e.target.value)} className={cn(control, 'w-full capitalize')}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sub-notes" className="mb-1.5 block text-xs font-medium text-white/65">Internal notes</label>
          <textarea id="sub-notes" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Follow-ups, call notes, next steps… (only visible to admins)" className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-signal-500/70" />
        </div>
      </div>
    </Drawer>
  )
}

export default function AdminInbox({ type }) {
  const config = SUBMISSIONS[type]
  const [params, setParams] = useSearchParams()
  const { data, loading, error, reload, setData } = useAdminData(() => adminList(config.table), type)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [filterField, filterLabel, filterOptions] = config.filters[0]
  const [filterValue, setFilterValue] = useState('all')
  const [showArchived, setShowArchived] = useState(false)
  const [page, setPage] = useState(0)
  const [confirm, setConfirm] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [notice, setNotice] = useState(null)
  const openId = params.get('open')

  useEffect(() => { document.title = `${config.label} | NAAA TALKS Admin` }, [config.label])

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (data ?? []).filter((r) =>
      Boolean(r.archived) === showArchived &&
      (status === 'all' || r.status === status) &&
      (filterValue === 'all' || r[filterField] === filterValue) &&
      (!needle || config.search.some((k) => String(r[k] ?? '').toLowerCase().includes(needle))))
  }, [data, q, status, filterValue, filterField, showArchived, config.search])

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const current = Math.min(page, pages - 1)
  const visible = rows.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)
  const openRow = (data ?? []).find((r) => String(r.id) === openId)

  const open = (id) => setParams(id ? { open: id } : {}, { replace: true })
  const onSaved = (updated) => setData((list) => list.map((r) => (r.id === updated.id ? updated : r)))
  const doDelete = async () => {
    setDeleting(true)
    try {
      await adminDeleteSubmission(config.table, confirm)
      setData((list) => list.filter((r) => r.id !== confirm.id))
      open(null)
      setNotice({ text: 'Deleted.' })
    } catch (e) {
      setNotice({ text: e.message, error: true })
    } finally {
      setDeleting(false)
      setConfirm(null)
    }
  }
  const resetPage = (fn) => (e) => { fn(e.target.value); setPage(0) }

  return (
    <AdminPage title={config.label} subtitle={data ? `${(data ?? []).filter((r) => !r.archived).length} active · ${(data ?? []).filter((r) => r.archived).length} archived` : undefined} actions={<AdminButton onClick={reload}>Refresh</AdminButton>}>
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <label className="relative">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
          <input value={q} onChange={resetPage(setQ)} placeholder="Search name, email, details…" className={cn(control, 'w-full pl-9')} />
        </label>
        <select aria-label="Filter by status" value={status} onChange={resetPage(setStatus)} className={cn(control, 'capitalize')}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select aria-label={`Filter by ${filterLabel}`} value={filterValue} onChange={resetPage(setFilterValue)} className={control}>
          <option value="all">All {filterLabel.toLowerCase()}</option>
          {filterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <label className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-white/70">
          <input type="checkbox" checked={showArchived} onChange={(e) => { setShowArchived(e.target.checked); setPage(0) }} className="accent-primary" /> Archived
        </label>
      </div>

      {loading && !data ? <Loading /> : error ? <ErrorBox error={error} onRetry={reload} /> : rows.length === 0 ? (
        <EmptyState
          title={(data ?? []).length === 0 ? `No ${config.label.toLowerCase()} yet` : 'Nothing matches these filters'}
          text={(data ?? []).length === 0 ? 'New submissions from the website will appear here.' : 'Try clearing the search or changing the filters.'}
        />
      ) : (
        <>
          {/* Table on desktop, cards on phones */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs text-white/45">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  {config.columns.map(([k, l]) => <th key={k} className="px-4 py-3 font-medium">{l}</th>)}
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {visible.map((r) => (
                  <tr key={r.id} onClick={() => open(r.id)} className="cursor-pointer hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      <button type="button" onClick={(e) => { e.stopPropagation(); open(r.id) }} className="text-left font-semibold text-white hover:text-signal-400">{r.name}</button>
                      <span className="block text-xs text-white/40">{r.email}</span>
                    </td>
                    {config.columns.map(([k]) => <td key={k} className="max-w-[12rem] truncate px-4 py-3 text-white/70">{r[k] ?? '—'}</td>)}
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-white/50">{formatDateTime(r.created_at)}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 md:hidden">
            {visible.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => open(r.id)} className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-left">
                  <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-white">{r.name}</span>
                      <span className="block truncate text-xs text-white/45">{config.columns.map(([k]) => r[k]).filter(Boolean).join(' · ')}</span>
                    </span>
                    <StatusBadge status={r.status} />
                  </span>
                  <span className="mt-2 block text-xs text-white/40">{formatDateTime(r.created_at)}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between text-sm text-white/50">
            <span>{rows.length} result{rows.length === 1 ? '' : 's'}</span>
            <div className="flex items-center gap-2">
              <AdminButton variant="ghost" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft className="size-4" /></AdminButton>
              <span className="tabular-nums">{current + 1} / {pages}</span>
              <AdminButton variant="ghost" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}><ChevronRight className="size-4" /></AdminButton>
            </div>
          </div>
        </>
      )}

      {openRow && <SubmissionDetail key={openRow.id} config={config} row={openRow} onSaved={onSaved} onClose={() => open(null)} onDelete={() => setConfirm(openRow)} onNotice={setNotice} />}
      <ConfirmDialog
        open={Boolean(confirm)}
        title={`Delete this ${config.singular}?`}
        text={`This permanently removes ${confirm?.name ?? 'it'}${config.hasResume ? ' and the attached resume' : ''}. Archive it instead if you may need it later.`}
        onCancel={() => setConfirm(null)}
        onConfirm={doDelete}
        loading={deleting}
      />
      <Notice notice={notice} onDone={() => setNotice(null)} />
    </AdminPage>
  )
}
