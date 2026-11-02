-- ════════════════════════════════════════════════════════════════════════════
-- NAAA TALKS — Supabase setup
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS).
--
-- After running:
--   1. Authentication → Users → "Add user" to create each admin login.
--   2. Make them an admin:
--        insert into public.admin_users (user_id)
--        select id from auth.users where email = 'admin@example.com';
--   3. Authentication → Providers → Email: turn OFF "Allow new users to sign up"
--      so nobody can create their own account.
-- ════════════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ── Admins ──────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- SECURITY DEFINER so policies can check admin status without exposing the table.
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ── Website content ─────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key text primary key,          -- branding | contact | socials | hero | ctas | stats | footer | seo
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null check (char_length(title) <= 160),
  category text not null,
  description text check (char_length(description) <= 600),
  thumbnail text,
  video_url text,
  embed_url text,
  instagram_url text,
  youtube_url text,
  platform text default 'instagram',
  duration text,
  status_label text,
  featured boolean not null default false,
  is_sample boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null check (category in ('marketing', 'production', 'influencer', 'training')),
  title text not null check (char_length(title) <= 160),
  description text,
  image text,
  published boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  department text,
  location text,
  employment_type text,
  experience text,
  description text,
  skills text,
  published boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  role text,
  kind text not null default 'client' check (kind in ('client', 'creator')),
  quote text not null check (char_length(quote) <= 800),
  permission_confirmed boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0,
  -- A testimonial can only go live once permission is recorded.
  constraint testimonial_permission check (not published or permission_confirmed)
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  logo text,
  website text,
  highlight text,
  permission_confirmed boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0,
  constraint client_permission check (not published or permission_confirmed)
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null,
  answer text not null,
  published boolean not null default true,
  sort_order int not null default 0
);

-- ── Visitor submissions (insert-only for the public) ────────────────────────
create table if not exists public.business_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  company text check (char_length(company) <= 160),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text check (char_length(phone) <= 30),
  service text check (char_length(service) <= 120),
  budget text check (char_length(budget) <= 60),
  timeline text check (char_length(timeline) <= 60),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new',
  notes text
);

create table if not exists public.influencer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text not null check (char_length(phone) between 7 and 30),
  age int check (age between 13 and 80),
  city text check (char_length(city) <= 120),
  instagram text check (char_length(instagram) <= 120),
  niche text check (char_length(niche) <= 120),
  camera_experience text check (char_length(camera_experience) <= 120),
  availability text check (char_length(availability) <= 200),
  motivation text not null check (char_length(motivation) between 10 and 2000),
  status text not null default 'new',
  notes text
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text not null check (char_length(phone) between 7 and 30),
  location text check (char_length(location) <= 120),
  job_id uuid references public.jobs(id) on delete set null,
  position text not null check (char_length(position) <= 160),
  experience text check (char_length(experience) <= 60),
  portfolio_url text check (char_length(portfolio_url) <= 400),
  instagram text check (char_length(instagram) <= 120),
  resume_path text check (resume_path is null or resume_path like 'applications/%'),
  resume_name text check (char_length(resume_name) <= 200),
  intro text not null check (char_length(intro) between 10 and 2000),
  status text not null default 'new',
  notes text
);

-- Workflow columns shared by the three inboxes (added separately so re-running
-- this script upgrades tables created by an earlier version).
do $$
declare t text;
begin
  foreach t in array array['business_enquiries', 'influencer_applications', 'job_applications'] loop
    execute format('alter table public.%I add column if not exists archived boolean not null default false', t);
    execute format('alter table public.%I add column if not exists updated_at timestamptz', t);
    execute format('alter table public.%I add column if not exists reference text check (char_length(reference) <= 20)', t);
    execute format('alter table public.%I drop constraint if exists %I', t, t || '_status_check');
    execute format('alter table public.%I add constraint %I check (status in (''new'', ''reviewed'', ''shortlisted'', ''contacted'', ''approved'', ''rejected''))', t, t || '_status_check');
  end loop;
end $$;

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.jobs enable row level security;
alter table public.testimonials enable row level security;
alter table public.clients enable row level security;
alter table public.faqs enable row level security;
alter table public.business_enquiries enable row level security;
alter table public.influencer_applications enable row level security;
alter table public.job_applications enable row level security;

-- Each signed-in user may only see whether they themselves are an admin.
drop policy if exists "read own admin row" on public.admin_users;
create policy "read own admin row" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Settings: public read, admin write.
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Content tables: public reads published rows; admins read and write everything.
do $$
declare t text;
begin
  foreach t in array array['projects', 'services', 'jobs', 'testimonials', 'clients', 'faqs'] loop
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format('create policy "public read published" on public.%I for select using (published = true or public.is_admin())', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Submissions: anyone may insert a fresh row; only admins can read, update or delete.
do $$
declare t text;
begin
  foreach t in array array['business_enquiries', 'influencer_applications', 'job_applications'] loop
    execute format('drop policy if exists "public insert" on public.%I', t);
    execute format('create policy "public insert" on public.%I for insert to anon, authenticated with check (status = ''new'' and notes is null and archived = false and updated_at is null)', t);
    execute format('drop policy if exists "admin read" on public.%I', t);
    execute format('create policy "admin read" on public.%I for select to authenticated using (public.is_admin())', t);
    execute format('drop policy if exists "admin update" on public.%I', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- ── Storage ─────────────────────────────────────────────────────────────────
-- media: public images for the website (admin uploads only).
-- resumes: private; the public can upload but never list or download.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']),
  ('resumes', 'resumes', false, 5242880, array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "resumes public upload" on storage.objects;
create policy "resumes public upload" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes' and (storage.foldername(name))[1] = 'applications');
drop policy if exists "resumes admin read" on storage.objects;
create policy "resumes admin read" on storage.objects for select to authenticated using (bucket_id = 'resumes' and public.is_admin());
drop policy if exists "resumes admin delete" on storage.objects;
create policy "resumes admin delete" on storage.objects for delete to authenticated using (bucket_id = 'resumes' and public.is_admin());
