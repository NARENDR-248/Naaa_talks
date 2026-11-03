import {
  Camera, CalendarDays, Clapperboard, Compass, Film, GraduationCap, Lightbulb, Megaphone,
  PenLine, Rocket, Scissors, Share2, Smartphone, Target, Users, Video,
} from 'lucide-react'

// Icon per service category key (see portfolioData.serviceCategories).
export const SERVICE_ICONS = { marketing: Megaphone, production: Clapperboard, influencer: Users, training: GraduationCap }

// Icons for individual services (by slug) and production services (by title).
const BY_SLUG = {
  'social-media-marketing': Share2,
  'social-media-management': CalendarDays,
  'influencer-marketing': Users,
  'performance-marketing': Target,
  'brand-promotion': Rocket,
  'digital-marketing-strategy': Compass,
}
const BY_TITLE = {
  'Instagram Reels Production': Smartphone,
  'Business Promotional Videos': Film,
  'Product Photography and Videography': Camera,
  'Script Writing': PenLine,
  'Creative Concepts': Lightbulb,
  'Video Shooting': Video,
  'Video Editing': Scissors,
}
export const serviceIcon = (s) => BY_SLUG[s?.slug] ?? BY_TITLE[s?.title] ?? SERVICE_ICONS[s?.category] ?? Megaphone

const COURSE_ICONS = { 'content-creator-course': Smartphone, 'digital-marketing-course': Megaphone, 'video-editing-course': Scissors }
export const courseIcon = (c) => COURSE_ICONS[c?.slug] ?? GraduationCap

// "line one\nline two" -> ['line one', 'line two'] for the one-item-per-line admin fields.
export const lines = (text) => String(text ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
