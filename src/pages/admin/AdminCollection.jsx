import { useEffect, useMemo, useState } from 'react'
import { Eye, EyeOff, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { adminDelete, adminImportDefaults, adminList, adminSave } from '@/services/api'
import { COLLECTIONS } from '@/services/collections'
import { portfolioData as d } from '@/data/portfolioData'
import { useAdminData } from '@/hooks/useAdminData'
import { useSiteContentReload } from '@/hooks/useSiteContent'
import { cn } from '@/lib/cn'
import { AdminButton, AdminPage, ConfirmDialog, Drawer, EmptyState, ErrorBox, Loading, Notice, SchemaField } from '@/components/admin/AdminKit'

const HAS_DEFAULTS = { projects: d.defaultProjects, services: d.defaultServices, jobs: d.defaultJobs, faqs: d.defaultFaqs }
const PERMISSION_GATED = ['testimonials', 'clients']

function blankRow(config) {
  return Object.fromEntries(config.fields.map((f) => [f.name, f.type === 'boolean' ? f.name === 'published' : f.type === 'number' ? 0 : '']))
}

function validate(key, config, row) {
  const errors = {}
  for (const f of config.fields) {
    if (f.required && (row[f.name] === '' || row[f.name] == null)) errors[f.name] = 'Required'
    if (f.type === 'url' && row[f.name] && !/^https?:\/\//.test(row[f.name])) errors[f.name] = 'Must start with https://'
  }
  if (PERMISSION_GATED.includes(key) && row.published && !row.permission_confirmed) {
    errors.permission_confirmed = 'Confirm permission before publishing'
  }
  return errors
}

function Editor({ collectionKey, config, initial, onClose, onSaved, onNotice }) {
  const [row, setRow] = useState(initial)
  const [touched, setTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const errors = validate(collectionKey, config, row)
  const isNew = !initial.id

  const save = async () => {
    setTouched(true)
    if (Object.keys(errors).length) return
    setSaving(true)
    try {
      const clean = Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v === '' ? null : v]))
      onSaved(await adminSave(config.table, clean), isNew)
      onNotice({ text: isNew ? `${config.singular} created.` : 'Changes saved.' })
      onClose()
    } catch (e) {
      onNotice({ text: e.message, error: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer
      open
      title={isNew ? `New ${config.singular}` : `Edit ${config.singular}`}
      onClose={onClose}
      footer={<><AdminButton variant="primary" loading={saving} onClick={save}>{isNew ? 'Create' : 'Save changes'}</AdminButton><AdminButton variant="ghost" onClick={onClose}>Cancel</AdminButton></>}
    >
      <div className="grid gap-4">
        {config.fields.map((f) => (
          <SchemaField key={f.name} field={f} value={row[f.name]} onChange={(v) => setRow((r) => ({ ...r, [f.name]: v }))} error={touched ? errors[f.name] : undefined} />
        ))}
        {touched && errors.permission_confirmed && <p className="text-sm text-signal-400">{errors.permission_confirmed}.</p>}
      </div>
    </Drawer>
  )
}

function CollectionPanel({ collectionKey }) {
  const config = COLLECTIONS[collectionKey]
  const reloadSite = useSiteContentReload()
  const { data, loading, error, reload, setData } = useAdminData(() => adminList(config.table), collectionKey)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const imageField = config.fields.find((f) => f.type === 'image')?.name

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (data ?? []).filter((r) => !needle || [config.titleField, config.subtitleField].some((k) => String(r[k] ?? '').toLowerCase().includes(needle)))
  }, [data, q, config])

  const afterChange = () => reloadSite()
  const onSaved = (saved, isNew) => {
    setData((list) => (isNew ? [...list, saved] : list.map((r) => (r.id === saved.id ? saved : r))))
    afterChange()
  }

  const togglePublished = async (row) => {
    if (!row.published && PERMISSION_GATED.includes(collectionKey) && !row.permission_confirmed) {
      setNotice({ text: 'Confirm permission in the editor before publishing.', error: true })
      return
    }
    try {
      onSaved(await adminSave(config.table, { ...row, published: !row.published }), false)
    } catch (e) {
      setNotice({ text: e.message, error: true })
    }
  }

  const doDelete = async () => {
    setBusy(true)
    try {
      await adminDelete(config.table, confirm.id)
      setData((list) => list.filter((r) => r.id !== confirm.id))
      afterChange()
      setNotice({ text: 'Deleted.' })
    } catch (e) {
      setNotice({ text: e.message, error: true })
    } finally {
      setBusy(false)
      setConfirm(null)
    }
  }

  const importDefaults = async () => {
    setBusy(true)
    try {
      const n = await adminImportDefaults(config.table)
      reload()
      afterChange()
      setNotice({ text: `Imported ${n} items — edit or publish them as needed.` })
    } catch (e) {
      setNotice({ text: e.message, error: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search {config.label}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${config.label.toLowerCase()}…`} className="h-10 w-full rounded-xl border border-white/10 bg-black/40 pr-3 pl-9 text-sm text-white outline-none focus:border-signal-500/70" />
        </label>
        <AdminButton variant="primary" onClick={() => setEditing(blankRow(config))}><Plus className="size-4" /> New {config.singular}</AdminButton>
      </div>

      {loading && !data ? <Loading /> : error ? <ErrorBox error={error} onRetry={reload} /> : rows.length === 0 ? (
        <EmptyState
          title={(data ?? []).length ? 'No matches' : `No ${config.label.toLowerCase()} in the database yet`}
          text={(data ?? []).length ? 'Try a different search.' : HAS_DEFAULTS[collectionKey] ? 'The website is currently showing its built-in defaults. Import them to edit them here, or create new entries.' : 'Create the first entry — it appears on the website once published.'}
          action={!(data ?? []).length && HAS_DEFAULTS[collectionKey] && <AdminButton loading={busy} onClick={importDefaults}>Import default {config.label.toLowerCase()}</AdminButton>}
        />
      ) : (
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02]">
              {imageField && (
                <span className="size-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                  {r[imageField] && <img src={r[imageField]} alt="" loading="lazy" className="size-full object-cover" />}
                </span>
              )}
              <button type="button" onClick={() => setEditing(r)} className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-semibold text-white">{r[config.titleField]}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-white/45">
                  {config.subtitleField && r[config.subtitleField] && <span className="truncate">{r[config.subtitleField]}</span>}
                  <span className={cn('rounded-full border px-2 py-px', r.published ? 'border-emerald-500/30 text-emerald-300' : 'border-white/15 text-white/50')}>{r.published ? 'Published' : 'Draft'}</span>
                  {r.featured && <span className="rounded-full border border-signal-500/30 px-2 py-px text-signal-400">Featured</span>}
                  {r.is_sample && <span className="rounded-full border border-amber-500/30 px-2 py-px text-amber-300">Sample</span>}
                </span>
              </button>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => togglePublished(r)} aria-label={r.published ? 'Unpublish' : 'Publish'} title={r.published ? 'Unpublish' : 'Publish'} className="grid size-9 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white">
                  {r.published ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>
                <button type="button" onClick={() => setEditing(r)} aria-label="Edit" className="grid size-9 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"><Pencil className="size-4" /></button>
                <button type="button" onClick={() => setConfirm(r)} aria-label="Delete" className="grid size-9 place-items-center rounded-lg text-white/60 hover:bg-signal-500/15 hover:text-signal-400"><Trash2 className="size-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && <Editor key={editing.id ?? 'new'} collectionKey={collectionKey} config={config} initial={editing} onClose={() => setEditing(null)} onSaved={onSaved} onNotice={setNotice} />}
      <ConfirmDialog open={Boolean(confirm)} title={`Delete this ${config.singular}?`} text={`“${confirm?.[config.titleField] ?? ''}” will be removed from the website permanently.`} onCancel={() => setConfirm(null)} onConfirm={doDelete} loading={busy} />
      <Notice notice={notice} onDone={() => setNotice(null)} />
    </>
  )
}

// One or more collections; several are shown as tabs (e.g. FAQs + job openings).
export default function AdminCollection({ collections, title, subtitle }) {
  const [tab, setTab] = useState(collections[0])
  useEffect(() => { document.title = `${title} | NAAA TALKS Admin` }, [title])
  return (
    <AdminPage title={title} subtitle={subtitle}>
      {collections.length > 1 && (
        <div role="tablist" className="mb-5 inline-flex rounded-xl border border-white/10 p-1">
          {collections.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={tab === c} onClick={() => setTab(c)} className={cn('rounded-lg px-4 py-2 text-sm font-medium transition', tab === c ? 'bg-signal-500 text-white' : 'text-white/60 hover:text-white')}>
              {COLLECTIONS[c].label}
            </button>
          ))}
        </div>
      )}
      <CollectionPanel key={tab} collectionKey={tab} />
    </AdminPage>
  )
}
