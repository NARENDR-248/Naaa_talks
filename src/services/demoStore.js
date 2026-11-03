// Browser-local stand-in for Supabase, used only when VITE_SUPABASE_* keys are
// missing. It lets the whole site — forms and admin — be tried end to end, but
// nothing leaves the visitor's browser and nothing is shared between devices.
import { portfolioData as d } from '@/data/portfolioData'

const KEY = 'naaatalks.demo.v1'

function seed() {
  return {
    settings: { ...d.settings },
    projects: d.defaultProjects,
    services: d.defaultServices,
    jobs: d.defaultJobs,
    testimonials: d.defaultTestimonials,
    clients: d.defaultClients,
    faqs: d.defaultFaqs,
    courses: d.defaultCourses,
    business_enquiries: [],
    influencer_applications: [],
    job_applications: [],
    course_enquiries: [],
    contact_enquiries: [],
  }
}

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...seed(), ...JSON.parse(raw) }
  } catch {
    // Unavailable or corrupt storage: start from the seed.
  }
  return seed()
}

function write(db) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch {
    // Private mode / quota: changes last for this page view only.
  }
}

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms))
const id = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()))

export const demoStore = {
  async list(table) {
    await wait(120)
    return [...(read()[table] ?? [])]
  },
  async insert(table, row) {
    await wait()
    const db = read()
    const created = { id: id(), created_at: new Date().toISOString(), ...row }
    db[table] = [...(db[table] ?? []), created]
    write(db)
    return created
  },
  async update(table, rowId, patch) {
    await wait()
    const db = read()
    db[table] = (db[table] ?? []).map((r) => (r.id === rowId ? { ...r, ...patch } : r))
    write(db)
    return db[table].find((r) => r.id === rowId)
  },
  async remove(table, rowId) {
    await wait()
    const db = read()
    db[table] = (db[table] ?? []).filter((r) => r.id !== rowId)
    write(db)
  },
  async getSettings() {
    await wait(80)
    return read().settings
  },
  async setSetting(key, value) {
    await wait()
    const db = read()
    db.settings = { ...db.settings, [key]: value }
    write(db)
  },
  reset() {
    write(seed())
  },
}
