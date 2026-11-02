// Single data API for the public site and the admin dashboard. Every function
// works against Supabase when it is configured, or the local demo store otherwise.
import { DEMO_MODE, supabase } from '@/lib/supabase'
import { portfolioData as d } from '@/data/portfolioData'
import { demoStore } from './demoStore'

const DEFAULTS = {
  projects: d.defaultProjects,
  services: d.defaultServices,
  jobs: d.defaultJobs,
  testimonials: d.defaultTestimonials,
  clients: d.defaultClients,
  faqs: d.defaultFaqs,
}

const bySort = (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
const fail = (error, fallback) => {
  throw new Error(error?.message || fallback)
}

// ── Public content ────────────────────────────────────────────────────────────

// Saved settings over defaults: objects merge field by field; lists replace whole.
export function mergeSettings(saved = {}) {
  return Object.fromEntries(
    Object.entries(d.settings).map(([key, def]) => {
      const value = saved[key]
      if (value == null) return [key, def]
      if (Array.isArray(def)) return [key, Array.isArray(value) && value.length ? value : def]
      if (key === 'stats') return [key, Array.isArray(value.items) ? { ...def, ...value } : def]
      return [key, { ...def, ...value }]
    }),
  )
}

// Published content merged over the built-in defaults. A collection with no rows
// in the database keeps showing its defaults (e.g. sample portfolio pieces).
// FAQs are loaded separately (fetchPublishedFaqs) and never fall back to defaults.
export async function loadSiteContent() {
  const tables = Object.keys(DEFAULTS).filter((t) => t !== 'faqs')
  let settings
  let rows

  if (DEMO_MODE) {
    settings = await demoStore.getSettings()
    rows = await Promise.all(tables.map((t) => demoStore.list(t)))
    rows = rows.map((list) => list.filter((r) => r.published !== false))
  } else {
    const [settingsRes, ...results] = await Promise.all([
      supabase.from('site_settings').select('key, value'),
      ...tables.map((t) => supabase.from(t).select('*').eq('published', true).order('sort_order', { ascending: true })),
    ])
    settings = Object.fromEntries((settingsRes.data ?? []).map((s) => [s.key, s.value]))
    rows = results.map((r) => r.data ?? [])
  }

  const collections = Object.fromEntries(
    tables.map((t, i) => {
      const list = rows[i].length ? rows[i] : DEFAULTS[t].filter((r) => r.published !== false)
      return [t, [...list].sort(bySort)]
    }),
  )

  return { settings: mergeSettings(settings), ...collections }
}

// Published FAQs in display order — exactly what the database holds, so an empty
// table shows an empty state rather than built-in sample questions.
export async function fetchPublishedFaqs() {
  if (DEMO_MODE) return (await demoStore.list('faqs')).filter((f) => f.published !== false).sort(bySort)
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, published, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) fail(error, 'Could not load FAQs.')
  return data ?? []
}

// ── Visitor submissions ──────────────────────────────────────────────────────

// Short reference shown to the visitor and stored with the submission, e.g. NT-B-4F7K2Q.
const REF_PREFIX = { business_enquiries: 'B', influencer_applications: 'I', job_applications: 'J' }
function makeReference(table) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I to avoid confusion
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  const code = [...bytes].map((b) => alphabet[b % alphabet.length]).join('')
  return `NT-${REF_PREFIX[table]}-${code}`
}

// Returns { reference } so the success screen can show it (and offer it for WhatsApp).
async function insertSubmission(table, row) {
  const reference = makeReference(table)
  if (DEMO_MODE) {
    await demoStore.insert(table, { ...row, reference, status: 'new', notes: null, archived: false })
    return { reference }
  }
  const { error } = await supabase.from(table).insert({ ...row, reference })
  if (error) fail(error, 'Could not send your form. Please try again.')
  return { reference }
}

export const submitBusinessEnquiry = (values) => insertSubmission('business_enquiries', values)
export const submitInfluencerApplication = (values) => insertSubmission('influencer_applications', values)

export const RESUME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
export const RESUME_MAX_BYTES = 5 * 1024 * 1024

export async function submitJobApplication(values, resume) {
  let resume_path = null
  if (resume) {
    if (DEMO_MODE) {
      resume_path = `demo/${resume.name}` // demo mode keeps the file name only
    } else {
      const safe = resume.name.replace(/[^\w.-]+/g, '_').slice(-80)
      const path = `applications/${crypto.randomUUID()}-${safe}`
      const { error } = await supabase.storage.from('resumes').upload(path, resume, { contentType: resume.type, upsert: false })
      if (error) fail(error, 'Could not upload your resume.')
      resume_path = path
    }
  }
  return insertSubmission('job_applications', { ...values, resume_path, resume_name: resume?.name ?? null })
}

// ── Admin: auth ──────────────────────────────────────────────────────────────

const DEMO_SESSION_KEY = 'naaatalks.demo.admin'

export async function adminSignIn(email, password) {
  if (DEMO_MODE) throw new Error('Supabase is not configured — use the demo admin button.')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) fail(error, 'Sign-in failed.')
  return getAdminSession()
}

export function demoSignIn() {
  if (!DEMO_MODE) throw new Error('Demo admin is disabled when Supabase is configured.')
  sessionStorage.setItem(DEMO_SESSION_KEY, '1')
}

export async function adminSignOut() {
  if (DEMO_MODE) return sessionStorage.removeItem(DEMO_SESSION_KEY)
  await supabase.auth.signOut()
}

// Returns { email, isAdmin } or null. Admin rights come from the admin_users table,
// which RLS lets each user read only for themselves.
export async function getAdminSession() {
  if (DEMO_MODE) return sessionStorage.getItem(DEMO_SESSION_KEY) ? { email: 'demo@naaatalks', isAdmin: true, demo: true } : null
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user
  if (!user) return null
  const { data: row } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  return { email: user.email, isAdmin: Boolean(row) }
}

export function onAuthChange(callback) {
  if (DEMO_MODE) return () => {}
  const { data } = supabase.auth.onAuthStateChange(() => callback())
  return () => data.subscription.unsubscribe()
}

// ── Admin: data ──────────────────────────────────────────────────────────────

export async function adminList(table) {
  if (DEMO_MODE) {
    const rows = await demoStore.list(table)
    return rows.sort((a, b) => ('created_at' in a ? String(b.created_at).localeCompare(String(a.created_at)) : bySort(a, b)))
  }
  const isSubmission = /enquiries|applications/.test(table)
  const { data, error } = await supabase.from(table).select('*').order(isSubmission ? 'created_at' : 'sort_order', { ascending: !isSubmission })
  if (error) fail(error, 'Could not load data.')
  return data
}

export async function adminSave(table, row) {
  // id/created_at are managed by the database, never written by the client.
  const { id } = row
  const fields = Object.fromEntries(Object.entries(row).filter(([k]) => k !== 'id' && k !== 'created_at'))
  if (DEMO_MODE) return id ? demoStore.update(table, id, fields) : demoStore.insert(table, fields)
  const query = id ? supabase.from(table).update(fields).eq('id', id) : supabase.from(table).insert(fields)
  const { data, error } = await query.select().single()
  if (error) fail(error, 'Could not save.')
  return data
}

export async function adminDelete(table, rowId) {
  if (DEMO_MODE) return demoStore.remove(table, rowId)
  const { error } = await supabase.from(table).delete().eq('id', rowId)
  if (error) fail(error, 'Could not delete.')
}

export async function adminSaveSetting(key, value) {
  if (DEMO_MODE) return demoStore.setSetting(key, value)
  const { error } = await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) fail(error, 'Could not save settings.')
}

// Status, notes and archive flag of a visitor submission.
export async function adminUpdateSubmission(table, rowId, patch) {
  const fields = { ...patch, updated_at: new Date().toISOString() }
  if (DEMO_MODE) return demoStore.update(table, rowId, fields)
  const { data, error } = await supabase.from(table).update(fields).eq('id', rowId).select().single()
  if (error) fail(error, 'Could not update.')
  return data
}

// Permanently delete a submission, including its private resume file.
export async function adminDeleteSubmission(table, row) {
  if (!DEMO_MODE && row.resume_path) {
    const { error } = await supabase.storage.from('resumes').remove([row.resume_path])
    if (error) fail(error, 'Could not delete the resume file.')
  }
  return adminDelete(table, row.id)
}

// Copy the built-in default content (e.g. the default job openings) into an
// empty database table so it can be edited from the admin.
export async function adminImportDefaults(table) {
  const rows = (DEFAULTS[table] ?? []).map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => k !== 'id')))
  if (!rows.length) return 0
  if (DEMO_MODE) {
    for (const r of rows) await demoStore.insert(table, r)
    return rows.length
  }
  const { error } = await supabase.from(table).insert(rows)
  if (error) fail(error, 'Could not import defaults.')
  return rows.length
}

export const MEDIA_MAX_BYTES = 8 * 1024 * 1024

export async function uploadMedia(file) {
  if (DEMO_MODE) throw new Error('Uploads need Supabase — paste an image URL in demo mode.')
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.')
  if (file.size > MEDIA_MAX_BYTES) throw new Error('Images must be under 8 MB.')
  const safe = file.name.replace(/[^\w.-]+/g, '_').slice(-60)
  const path = `uploads/${crypto.randomUUID()}-${safe}`
  const { error } = await supabase.storage.from('media').upload(path, file, { contentType: file.type })
  if (error) fail(error, 'Upload failed.')
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}

// Short-lived link to a private resume (admins only, enforced by storage policies).
export async function resumeUrl(path) {
  if (DEMO_MODE || !path) return null
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60)
  if (error) fail(error, 'Could not open the resume.')
  return data.signedUrl
}
