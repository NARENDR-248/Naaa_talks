-- ════════════════════════════════════════════════════════════════════════════
-- NAAA TALKS — migration: Academy courses, course enquiries, contact form,
-- and the new service / client / job-application fields.
--
-- Run in Supabase: SQL Editor → New query → paste ALL of this → Run.
-- Safe to run more than once. Only adds tables and columns; no rows are changed
-- or deleted. (supabase/schema.sql contains the same changes for fresh installs.)
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. New tables ───────────────────────────────────────────────────────────
-- Multi-line course fields (syllabus, modules, ...) hold one item per line.
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) <= 160),
  tagline text check (char_length(tagline) <= 200),
  description text,
  thumbnail text,
  level text check (char_length(level) <= 60),
  duration text check (char_length(duration) <= 60),
  syllabus text,
  modules text,
  practical text,
  projects text,
  outcomes text,
  published boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.course_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text not null check (char_length(phone) between 7 and 30),
  course text not null check (char_length(course) <= 160),
  course_id uuid references public.courses(id) on delete set null,
  city text check (char_length(city) <= 120),
  message text check (char_length(message) <= 2000),
  status text not null default 'new',
  notes text
);

-- The website's "Contact us" form.
create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  phone text not null check (char_length(phone) between 7 and 30),
  service text check (char_length(service) <= 160),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new',
  notes text
);

-- Inbox workflow columns, as on the other enquiry tables.
do $$
declare t text;
begin
  foreach t in array array['course_enquiries', 'contact_enquiries'] loop
    execute format('alter table public.%I add column if not exists archived boolean not null default false', t);
    execute format('alter table public.%I add column if not exists updated_at timestamptz', t);
    execute format('alter table public.%I add column if not exists reference text check (char_length(reference) <= 20)', t);
    execute format('alter table public.%I drop constraint if exists %I', t, t || '_status_check');
    execute format('alter table public.%I add constraint %I check (status in (''new'', ''reviewed'', ''shortlisted'', ''contacted'', ''approved'', ''rejected''))', t, t || '_status_check');
  end loop;
end $$;

-- ── 2. New columns on existing tables ───────────────────────────────────────
alter table public.services add column if not exists slug text;        -- set = has its own /services/<slug> page
alter table public.services add column if not exists summary text;     -- one-line card text
alter table public.services add column if not exists features text;    -- one per line
alter table public.services add column if not exists benefits text;    -- one per line
create unique index if not exists services_slug_key on public.services (slug) where slug is not null;
alter table public.clients add column if not exists services text;     -- services delivered to this client
alter table public.job_applications alter column intro drop not null;  -- introduction is optional now

-- ── 3. Row Level Security ───────────────────────────────────────────────────
-- Admin check (already exists if schema.sql was run; recreated identically).
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

alter table public.courses enable row level security;
alter table public.course_enquiries enable row level security;
alter table public.contact_enquiries enable row level security;

-- Courses: visitors read published courses; admins manage everything.
drop policy if exists "public read published" on public.courses;
create policy "public read published" on public.courses for select using (published = true or public.is_admin());
drop policy if exists "admin write" on public.courses;
create policy "admin write" on public.courses for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Enquiries: visitors may only add a fresh row; only admins read, update or delete.
do $$
declare t text;
begin
  foreach t in array array['course_enquiries', 'contact_enquiries'] loop
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

-- ── 4. updated_at timestamps, indexes ───────────────────────────────────────
create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['courses', 'course_enquiries', 'contact_enquiries'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
  foreach t in array array['course_enquiries', 'contact_enquiries'] loop
    execute format('create index if not exists %I on public.%I (created_at desc)', t || '_created_idx', t);
    execute format('create index if not exists %I on public.%I (status) where not archived', t || '_status_idx', t);
    execute format('create unique index if not exists %I on public.%I (reference) where reference is not null', t || '_reference_key', t);
  end loop;
end $$;
create index if not exists courses_published_sort_idx on public.courses (published, sort_order);
create index if not exists course_enquiries_course_id_idx on public.course_enquiries (course_id);

-- ── 5. API access ───────────────────────────────────────────────────────────
-- Grants only make the tables reachable; the policies above decide which rows.
revoke all on public.course_enquiries, public.contact_enquiries from anon;
revoke insert, update, delete, truncate on public.courses from anon;
grant select on public.courses to anon, authenticated;
grant insert, update, delete on public.courses to authenticated;
grant insert on public.course_enquiries, public.contact_enquiries to anon, authenticated;
grant select, update, delete on public.course_enquiries, public.contact_enquiries to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- Make the website API see the new tables and columns straight away.
notify pgrst, 'reload schema';
