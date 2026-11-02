import { createClient } from '@supabase/supabase-js'

// Public configuration only. The anon key is designed to be shipped to browsers;
// all protection comes from the Row Level Security policies in supabase/schema.sql.
// Never put the service-role key in this project.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

// Without keys the site runs on a browser-local demo store (see services/demoStore.js).
export const DEMO_MODE = !supabase
