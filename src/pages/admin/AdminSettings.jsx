import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { adminSaveSetting, loadSiteContent } from '@/services/api'
import { SETTINGS_GROUPS } from '@/services/collections'
import { useAdminData } from '@/hooks/useAdminData'
import { useSiteContentReload } from '@/hooks/useSiteContent'
import SocialIcon from '@/components/portfolio/SocialIcon'
import { AdminButton, AdminPage, ErrorBox, Loading, Notice, SchemaField } from '@/components/admin/AdminKit'

const input = 'h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-signal-500/70'

// "title.0" → value.title[0]
function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}
function setPath(obj, path, value) {
  const [head, ...rest] = path.split('.')
  const copy = Array.isArray(obj) ? [...obj] : { ...obj }
  copy[head] = rest.length ? setPath(obj?.[head] ?? (/^\d+$/.test(rest[0]) ? [] : {}), rest.join('.'), value) : value
  return copy
}

function SocialsEditor({ value, onChange }) {
  const update = (i, k, v) => onChange(value.map((s, j) => (j === i ? { ...s, [k]: v } : s)))
  return (
    <div className="space-y-3">
      {value.map((s, i) => (
        <div key={s.platform} className="grid gap-2 rounded-xl border border-white/[0.06] p-3 sm:grid-cols-[8rem_1fr_2fr] sm:items-center">
          <span className="flex items-center gap-2 text-sm font-medium text-white"><SocialIcon platform={s.platform} className="size-4 text-signal-400" />{s.label}</span>
          <input aria-label={`${s.label} handle`} placeholder="@handle" value={s.handle ?? ''} onChange={(e) => update(i, 'handle', e.target.value)} className={input} />
          <input aria-label={`${s.label} URL`} type="url" placeholder="https://… (empty hides it)" value={s.url ?? ''} onChange={(e) => update(i, 'url', e.target.value)} className={input} />
        </div>
      ))}
      <p className="text-xs text-white/40">Platforms with an empty URL are hidden on the website.</p>
    </div>
  )
}

function StatsEditor({ value, onChange }) {
  const items = value.items ?? []
  const setItem = (i, k, v) => onChange({ ...value, items: items.map((it, j) => (j === i ? { ...it, [k]: v } : it)) })
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3 rounded-xl border border-white/[0.08] px-3 py-3 text-sm text-white/80">
        <input type="checkbox" checked={Boolean(value.isSample)} onChange={(e) => onChange({ ...value, isSample: e.target.checked })} className="size-5 accent-primary" />
        These are placeholder figures (shows a “placeholder” note on the website)
      </label>
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[5rem_4rem_1fr_auto] gap-2">
          <input aria-label="Value" type="number" value={it.value ?? ''} onChange={(e) => setItem(i, 'value', e.target.value === '' ? '' : Number(e.target.value))} className={input} />
          <input aria-label="Suffix" placeholder="+" value={it.suffix ?? ''} onChange={(e) => setItem(i, 'suffix', e.target.value)} className={input} />
          <input aria-label="Label" placeholder="Label" value={it.label ?? ''} onChange={(e) => setItem(i, 'label', e.target.value)} className={input} />
          <button type="button" aria-label="Remove statistic" onClick={() => onChange({ ...value, items: items.filter((_, j) => j !== i) })} className="grid size-10 place-items-center rounded-xl text-white/50 hover:bg-signal-500/15 hover:text-signal-400"><Trash2 className="size-4" /></button>
        </div>
      ))}
      {items.length < 6 && <AdminButton onClick={() => onChange({ ...value, items: [...items, { value: 0, suffix: '+', label: '' }] })}><Plus className="size-4" /> Add statistic</AdminButton>}
    </div>
  )
}

function SettingsGroup({ group, initial, onSaved }) {
  const [value, setValue] = useState(initial)
  const [touched, setTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const dirty = JSON.stringify(value) !== JSON.stringify(initial)
  const errors = Object.fromEntries((group.fields ?? []).flatMap((f) => {
    const v = getPath(value, f.name)
    if (f.required && !String(v ?? '').trim()) return [[f.name, 'Required']]
    const msg = f.validate?.(v)
    return msg ? [[f.name, msg]] : []
  }))

  const save = async () => {
    setTouched(true)
    if (Object.keys(errors).length) return
    setSaving(true)
    try {
      await adminSaveSetting(group.key, value)
      onSaved({ text: `${group.label} saved — the website is updated.` })
    } catch (e) {
      onSaved({ text: e.message, error: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id={`settings-${group.key}`} className="scroll-mt-20 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-sans text-base font-semibold text-white">{group.label}</h2>
        <AdminButton variant="primary" loading={saving} disabled={!dirty} onClick={save}>Save</AdminButton>
      </div>
      {group.special === 'socials' ? (
        <SocialsEditor value={value} onChange={setValue} />
      ) : group.special === 'stats' ? (
        <StatsEditor value={value} onChange={setValue} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {group.fields.map((f) => (
            <div key={f.name} className={f.type === 'textarea' || f.type === 'image' ? 'md:col-span-2' : ''}>
              <SchemaField field={f} value={getPath(value, f.name)} onChange={(v) => setValue((cur) => setPath(cur, f.name, v))} error={touched ? errors[f.name] : undefined} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default function AdminSettings() {
  useEffect(() => { document.title = 'Settings | NAAA TALKS Admin' }, [])
  const reloadSite = useSiteContentReload()
  const { data, loading, error, reload } = useAdminData(() => loadSiteContent().then((c) => c.settings))
  const [notice, setNotice] = useState(null)

  const onSaved = (n) => {
    setNotice(n)
    if (!n.error) {
      reloadSite()
      reload()
    }
  }

  return (
    <AdminPage title="Settings" subtitle="Website details that appear across every page.">
      {loading && !data ? <Loading /> : error ? <ErrorBox error={error} onRetry={reload} /> : (
        <div className="grid gap-5 xl:grid-cols-[12rem_1fr]">
          <nav aria-label="Settings sections" className="hidden xl:block">
            <ul className="sticky top-6 space-y-1">
              {SETTINGS_GROUPS.map((g) => <li key={g.key}><a href={`#settings-${g.key}`} className="block rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white">{g.label}</a></li>)}
            </ul>
          </nav>
          <div className="space-y-5">
            {SETTINGS_GROUPS.map((g) => <SettingsGroup key={`${g.key}-${JSON.stringify(data[g.key])}`} group={g} initial={data[g.key]} onSaved={onSaved} />)}
          </div>
        </div>
      )}
      <Notice notice={notice} onDone={() => setNotice(null)} />
    </AdminPage>
  )
}
