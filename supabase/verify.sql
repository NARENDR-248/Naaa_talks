-- ════════════════════════════════════════════════════════════════════════════
-- NAAA TALKS — setup check (read-only; changes nothing)
-- Run after schema.sql in the same project: SQL Editor → New query → paste → Run.
-- Every row should say OK. Copy the result table back if anything says MISSING.
-- ════════════════════════════════════════════════════════════════════════════

with
expected_tables(name) as (values
  ('admin_users'), ('business_enquiries'), ('clients'), ('faqs'), ('influencer_applications'),
  ('job_applications'), ('jobs'), ('projects'), ('services'), ('site_settings'), ('testimonials'),
  ('courses'), ('course_enquiries'), ('contact_enquiries')),
expected_buckets(id, public) as (values ('media', true), ('resumes', false))

select 'table' as "check", t.name as item,
  case when c.oid is null then 'MISSING'
       when not c.relrowsecurity then 'RLS OFF'
       else 'OK (' || (select count(*) from pg_policies p where p.schemaname = 'public' and p.tablename = t.name) || ' policies)' end as status
from expected_tables t
left join pg_class c on c.relname = t.name and c.relnamespace = 'public'::regnamespace and c.relkind = 'r'
union all
select 'api access', t.name,
  case when c.oid is null then 'MISSING'
       when t.name = 'admin_users' then case when has_table_privilege('anon', c.oid, 'select') then 'TOO OPEN' else 'OK (hidden from public)' end
       when t.name in ('business_enquiries', 'influencer_applications', 'job_applications', 'course_enquiries', 'contact_enquiries') then
         case when has_table_privilege('anon', c.oid, 'insert') and not has_table_privilege('anon', c.oid, 'select') then 'OK (public insert only)' else 'CHECK GRANTS' end
       else case when has_table_privilege('anon', c.oid, 'select') then 'OK (public read)' else 'NO API ACCESS' end end
from expected_tables t
left join pg_class c on c.relname = t.name and c.relnamespace = 'public'::regnamespace and c.relkind = 'r'
union all
select 'bucket', b.id,
  case when s.id is null then 'MISSING'
       when s.public <> b.public then 'WRONG VISIBILITY'
       else 'OK (' || case when s.public then 'public' else 'private' end || ', ' || coalesce((s.file_size_limit / 1048576)::text, 'no') || ' MB max)' end
from expected_buckets b left join storage.buckets s on s.id = b.id
union all
select 'storage policies', 'storage.objects',
  (select case when count(*) = 7 then 'OK (7 of 7)' else count(*) || ' of 7 — MISSING' end from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname in
    ('media public read', 'media admin write', 'media admin update', 'media admin delete',
     'resumes public upload', 'resumes admin read', 'resumes admin delete'))
union all
select 'admins', 'admin_users',
  case when to_regclass('public.admin_users') is null then 'MISSING'
       else (xpath('/row/c/text()', query_to_xml('select count(*) as c from public.admin_users', false, true, '')))[1]::text || ' admin(s)'
            || ' — must be at least 1' end;
