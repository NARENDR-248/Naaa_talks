# NAAA TALKS — website & admin

Creative marketing, content production and influencer development agency site.
React 19 + Vite 8 + Tailwind CSS 4 + Framer Motion + React Router, with Supabase for
admin login, database and file storage. No custom backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # production files in dist/
```

## Pages

| Public | |
| --- | --- |
| `/` | Home — 16 sections in the brief's order |
| `/about` · `/services` · `/content-production` · `/influencer-marketing` | Agency & services |
| `/influencer-program` | Zero to Influencer program |
| `/portfolio` · `/clients` | Work, clients, testimonials |
| `/careers` · `/careers/apply?job=<id>` | Openings & job application (resume upload) |
| `/contact` · `/work-with-us` · `/become-an-influencer` | The three enquiry journeys |
| `/privacy-policy` · `/terms` | Legal (template text — have it reviewed) |

| Admin (`/admin/...`) | |
| --- | --- |
| `login` · `dashboard` | Sign-in, totals, status statistics, recent submissions & activity |
| `business-enquiries` · `influencer-applications` · `job-applications` | Inboxes: search, filters, pagination, status, notes, archive, delete, secure resume download |
| `portfolio` · `services` · `testimonials` · `clients` · `content` (FAQs + job openings) | Create / edit / delete / publish, image upload |
| `settings` | Logo, contact, WhatsApp, social links, hero, button labels, statistics, footer, SEO |

The footer has a small **Team login** link to `/admin/login`.

## Demo mode (no keys)

Without Supabase keys everything still works using **this browser's local storage**:
forms save locally and **Team login → Enter demo admin** opens the dashboard. Nothing is
shared between devices, uploads need Supabase (paste image URLs instead) and resumes keep
only their file name. Demo login is disabled automatically once keys are set.

## Connecting Supabase

1. Create a project at supabase.com.
2. **SQL Editor → New query** → paste [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   It creates the tables, Row Level Security policies and the `media` (public) and
   `resumes` (private) storage buckets. It is safe to re-run after updates.
3. **Authentication → Users → Add user** for each team member (email + password).
4. Make them admins (SQL Editor):
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. **Authentication → Providers → Email**: turn **off** "Allow new users to sign up".
6. Create `.env.local` (see [`.env.example`](.env.example)):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   Both are public by design. **Never** put the `service_role` key in this project.
7. Restart `npm run dev` (or rebuild). In each admin content page, use **Import default …**
   to copy the built-in services, job openings, FAQs and sample portfolio into the database.

### Security model
- Visitors can only **insert** new submissions (forced to status `new`, no notes, not archived) — they can never read them.
- Only users listed in `admin_users` can read/update submissions, edit content or settings, and upload media (checked by `is_admin()` in every policy).
- Resumes are in a private bucket; admins open them through signed links that expire after 60 seconds.
- Testimonials and clients cannot be published (database constraint) until permission is recorded.
- Forms also use a honeypot field, a minimum fill time and a 30-second resubmit cooldown. For heavier spam, add Cloudflare Turnstile or a Supabase Edge Function rate limit.

## Editing content

- **From the admin:** portfolio, services, testimonials, clients, FAQs, job openings and all settings.
- **In code:** [`src/data/portfolioData.js`](src/data/portfolioData.js) holds section copy (pillars, program steps, team, page intros, legal) and the defaults the admin data replaces. Set `seo.url` to the live domain before deploying (used for canonical URLs and the sitemap).
- Sample portfolio pieces are marked “Sample” on the site until you replace them; clients and testimonials stay empty until you add real, permission-confirmed entries.

## Deploy to Hostinger

`npm run build`, then upload the **contents** of `dist/` (including the hidden `.htaccess`)
to `public_html`. The `.htaccess` routes every page URL to `index.html`. Set the Supabase
variables before building — Vite bakes them into the build.

## Project structure

```
src/
  pages/                 public pages; pages/admin/ dashboard
  components/sections/   homepage & shared sections
  components/forms/      three journey forms + FormKit
  components/admin/      AdminKit (drawer, dialogs, schema fields…)
  components/layout/     SiteLayout, PageHero, Blocks, WhatsApp button
  services/              api.js (all data access), demoStore.js, collections.js (admin schemas)
  context/ hooks/ lib/
supabase/schema.sql      tables, RLS, storage
```
