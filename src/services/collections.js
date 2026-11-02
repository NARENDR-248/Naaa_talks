// Admin-managed collections: table name, labels and the form schema the admin
// panel renders. Adding a field here (and a column in supabase/schema.sql) is all
// it takes to make it editable.
import { portfolioData } from '@/data/portfolioData'
import { isValidWhatsAppNumber } from '@/lib/whatsapp'

const { projectCategories, serviceCategories } = portfolioData

export const COLLECTIONS = {
  projects: {
    table: 'projects',
    label: 'Portfolio',
    singular: 'project',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', options: projectCategories, required: true },
      { name: 'description', label: 'Short description', type: 'textarea' },
      { name: 'thumbnail', label: 'Thumbnail', type: 'image', required: true },
      { name: 'video_url', label: 'Video file URL (.mp4)', type: 'url' },
      { name: 'embed_url', label: 'Embed URL (YouTube embed link)', type: 'url' },
      { name: 'instagram_url', label: 'Instagram link', type: 'url' },
      { name: 'youtube_url', label: 'YouTube link', type: 'url' },
      { name: 'platform', label: 'Platform icon', type: 'select', options: ['instagram', 'youtube', 'tiktok', 'facebook', 'linkedin'] },
      { name: 'duration', label: 'Duration (e.g. 00:30)', type: 'text' },
      { name: 'status_label', label: 'Badge (e.g. New project)', type: 'text' },
      { name: 'featured', label: 'Show in featured carousel', type: 'boolean' },
      { name: 'is_sample', label: 'Sample / demo work (shows a “Sample” label)', type: 'boolean' },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  services: {
    table: 'services',
    label: 'Services',
    singular: 'service',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'category', label: 'Category', type: 'select', options: serviceCategories.map((c) => c.key), optionLabels: Object.fromEntries(serviceCategories.map((c) => [c.key, c.title])), required: true },
      { name: 'title', label: 'Service name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image (optional)', type: 'image' },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  jobs: {
    table: 'jobs',
    label: 'Job openings',
    singular: 'job opening',
    titleField: 'title',
    subtitleField: 'employment_type',
    fields: [
      { name: 'title', label: 'Position', type: 'text', required: true },
      { name: 'department', label: 'Team', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'employment_type', label: 'Employment type', type: 'text' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'description', label: 'Job description', type: 'textarea' },
      { name: 'skills', label: 'Required skills (one per line)', type: 'textarea' },
      { name: 'published', label: 'Open for applications', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  testimonials: {
    table: 'testimonials',
    label: 'Testimonials',
    singular: 'testimonial',
    titleField: 'name',
    subtitleField: 'role',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role / company', type: 'text' },
      { name: 'kind', label: 'Type', type: 'select', options: ['client', 'creator'], required: true },
      { name: 'quote', label: 'Testimonial', type: 'textarea', required: true },
      { name: 'permission_confirmed', label: 'Permission to publish confirmed', type: 'boolean' },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  clients: {
    table: 'clients',
    label: 'Clients',
    singular: 'client',
    titleField: 'name',
    subtitleField: 'website',
    fields: [
      { name: 'name', label: 'Client / brand name', type: 'text', required: true },
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'website', label: 'Website', type: 'url' },
      { name: 'highlight', label: 'Project highlight', type: 'textarea' },
      { name: 'permission_confirmed', label: 'Permission to display confirmed', type: 'boolean' },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
  faqs: {
    table: 'faqs',
    label: 'FAQs',
    singular: 'FAQ',
    titleField: 'question',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'published', label: 'Published', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number' },
    ],
  },
}

// Workflow statuses shared by all three inboxes.
export const STATUSES = ['new', 'reviewed', 'shortlisted', 'contacted', 'approved', 'rejected']
export const PENDING_STATUSES = ['new', 'reviewed', 'shortlisted', 'contacted']

// Visitor submissions shown in the admin inboxes; "path" is the admin route.
export const SUBMISSIONS = {
  business: {
    table: 'business_enquiries',
    path: '/admin/business-enquiries',
    label: 'Business enquiries',
    singular: 'enquiry',
    columns: [['company', 'Business'], ['service', 'Service'], ['budget', 'Budget']],
    search: ['reference', 'name', 'company', 'email', 'phone', 'service', 'message'],
    filters: [['service', 'Service', portfolioData.forms.serviceOptions]],
    detail: [['reference', 'Reference'], ['email', 'Email'], ['phone', 'Phone'], ['company', 'Business'], ['service', 'Service needed'], ['budget', 'Budget'], ['timeline', 'Timeline'], ['message', 'Project details']],
  },
  influencer: {
    table: 'influencer_applications',
    path: '/admin/influencer-applications',
    label: 'Influencer applications',
    singular: 'application',
    columns: [['city', 'City'], ['niche', 'Interest'], ['camera_experience', 'Camera']],
    search: ['reference', 'name', 'email', 'phone', 'city', 'instagram', 'niche', 'motivation'],
    filters: [['niche', 'Interest', portfolioData.forms.nicheOptions]],
    detail: [['reference', 'Reference'], ['email', 'Email'], ['phone', 'Phone'], ['age', 'Age'], ['city', 'City'], ['instagram', 'Instagram'], ['niche', 'Content interest'], ['camera_experience', 'Camera experience'], ['availability', 'Availability'], ['motivation', 'Why they want to join']],
  },
  jobs: {
    table: 'job_applications',
    path: '/admin/job-applications',
    label: 'Job applications',
    singular: 'application',
    columns: [['position', 'Position'], ['experience', 'Experience'], ['location', 'Location']],
    search: ['reference', 'name', 'email', 'phone', 'position', 'location', 'intro'],
    filters: [['experience', 'Experience', portfolioData.forms.experienceOptions]],
    detail: [['reference', 'Reference'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Current location'], ['position', 'Position'], ['experience', 'Experience'], ['portfolio_url', 'Portfolio'], ['instagram', 'Instagram'], ['intro', 'Introduction']],
    hasResume: true,
  },
}

// Admin-editable website settings, one group per site_settings row.
// Names like "title.0" address an item inside an array value.
export const SETTINGS_GROUPS = [
  { key: 'branding', label: 'Branding', fields: [{ name: 'logo', label: 'Website logo (leave empty for the NAAA/TALKS wordmark)', type: 'image' }] },
  {
    key: 'contact', label: 'Contact details', fields: [
      { name: 'email', label: 'Contact email', type: 'email', required: true },
      { name: 'phone', label: 'Phone number', type: 'text' },
      { name: 'location', label: 'Office address', type: 'textarea' },
      { name: 'hours', label: 'Working hours', type: 'text' },
    ],
  },
  {
    key: 'whatsapp', label: 'WhatsApp', fields: [
      {
        name: 'number', label: 'WhatsApp business number', type: 'text',
        hint: 'International format with country code, e.g. +91 98765 43210. Leave empty to hide all WhatsApp buttons.',
        validate: (v) => (!v || isValidWhatsAppNumber(v) ? null : 'Enter the full number with country code (8–15 digits, e.g. +91 98765 43210)'),
      },
      { name: 'welcome', label: 'Default welcome message (floating button)', type: 'textarea', required: true },
      { name: 'general', label: 'General enquiry message', type: 'textarea', required: true },
      { name: 'business', label: 'Business enquiry message', type: 'textarea', required: true },
      { name: 'influencer', label: 'Influencer enquiry message', type: 'textarea', required: true },
      { name: 'careers', label: 'Career enquiry message', type: 'textarea', required: true },
    ],
  },
  { key: 'socials', label: 'Social media links', special: 'socials' },
  {
    key: 'hero', label: 'Homepage hero', fields: [
      { name: 'eyebrow', label: 'Badge above the heading', type: 'text' },
      { name: 'title.0', label: 'Heading — line 1', type: 'text', required: true },
      { name: 'title.1', label: 'Heading — line 2', type: 'text' },
      { name: 'highlight', label: 'Heading — line on the red brush', type: 'text' },
      { name: 'subtitle', label: 'Description', type: 'textarea', required: true },
      { name: 'note', label: 'Brush tagline (bottom right)', type: 'text' },
    ],
  },
  {
    key: 'heroStats', label: 'Homepage hero statistics', fields: [
      { name: 'isSample', label: 'These are sample figures (shows a “Sample figures” label) — untick only for real results', type: 'boolean' },
      { name: 'items.0.value', label: 'Card 1 — number (e.g. 128K+)', type: 'text' },
      { name: 'items.0.label', label: 'Card 1 — label', type: 'text' },
      { name: 'items.1.value', label: 'Card 2 — number', type: 'text' },
      { name: 'items.1.label', label: 'Card 2 — label', type: 'text' },
      { name: 'items.2.value', label: 'Card 3 — number', type: 'text' },
      { name: 'items.2.label', label: 'Card 3 — label', type: 'text' },
    ],
  },
  {
    key: 'ctas', label: 'Button labels', fields: [
      { name: 'business', label: 'Business journey button', type: 'text', required: true },
      { name: 'influencer', label: 'Influencer journey button', type: 'text', required: true },
      { name: 'careers', label: 'Careers journey button', type: 'text', required: true },
      { name: 'showreel', label: 'Hero “Watch Showreel” button (opens the portfolio)', type: 'text' },
    ],
  },
  { key: 'stats', label: 'Statistics', special: 'stats' },
  {
    key: 'footer', label: 'Footer', fields: [
      { name: 'text', label: 'Footer description', type: 'textarea' },
      { name: 'copyright', label: 'Copyright line', type: 'text' },
    ],
  },
  {
    key: 'seo', label: 'SEO', fields: [
      { name: 'title', label: 'Default page title', type: 'text', required: true },
      { name: 'description', label: 'Default meta description', type: 'textarea', required: true, hint: 'Around 150 characters works best in search results.' },
    ],
  },
]
