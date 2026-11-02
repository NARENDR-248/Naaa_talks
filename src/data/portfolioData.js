// ─────────────────────────────────────────────────────────────────────────────
// NAAA TALKS — site content.
//
// Two kinds of content live here:
//  1. Copy for sections that change rarely (pillars, program steps, team...):
//     edit it here.
//  2. DEFAULTS for admin-managed content (hero, contact, socials, stats,
//     portfolio, services, jobs, testimonials, clients, FAQs). Once Supabase is
//     connected and a table has rows, the admin dashboard's data replaces these.
//
// Keep this file free of imports: vite.config.js reads it for SEO tags & sitemap.
// ─────────────────────────────────────────────────────────────────────────────

const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const portfolioData = {
  brand: {
    name: 'NAAA TALKS',
    wordmark: ['NAAA', 'TALKS'],
    logo: '', // optional image path, e.g. "/images/logo.svg" — replaces the wordmark
    tagline: 'Create. Educate. Grow.',
    intro: 'A creative marketing, content production and influencer development agency.',
    menuTagline: 'Create. Educate. Grow.',
  },

  seo: {
    // Replace with the live domain before deploying (used for canonical URL, OG tags and sitemap).
    url: 'https://naaatalks.com',
    title: 'NAAA TALKS — Creative Marketing, Content Production & Influencer Development',
    description: 'NAAA TALKS helps businesses grow with creative marketing, video production and influencer campaigns — and trains aspiring individuals to become confident content creators.',
    image: img('1485846234645-a62644f84728', 1200),
  },

  // Desktop navbar (kept short); the mobile menu and footer use `navAll`.
  nav: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Influencer Program', href: '/influencer-program' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Careers', href: '/careers' },
  ],
  navAll: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Content Production', href: '/content-production' },
    { label: 'Influencer Marketing', href: '/influencer-marketing' },
    { label: 'Influencer Program', href: '/influencer-program' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],

  // The three separate conversion journeys.
  journeys: {
    business: { label: 'Work with us', href: '/work-with-us', audience: 'For brands & business owners', text: 'Marketing, shoots, editing, influencer campaigns and promotions — from idea to results.' },
    influencer: { label: 'Become an influencer', href: '/influencer-program', audience: 'For aspiring creators', text: 'Our Zero to Influencer program: confidence, content skills and your own creator identity.' },
    careers: { label: 'Join our team', href: '/careers', audience: 'For creative professionals', text: 'Editors, videographers, writers and creators — build a career with our production team.' },
  },

  // ── Admin-managed settings (defaults) ──────────────────────────────────────
  settings: {
    branding: {
      logo: '', // image URL; empty shows the NAAA/TALKS wordmark
    },
    // Labels for the three journey buttons used across the site.
    ctas: { business: 'Work with us', influencer: 'Become an influencer', careers: 'Join our team' },
    footer: {
      text: 'A creative marketing, content production and influencer development agency.',
      copyright: 'All rights reserved.',
    },
    seo: {
      title: 'NAAA TALKS — Creative Marketing, Content Production & Influencer Development',
      description: 'NAAA TALKS helps businesses grow with creative marketing, video production and influencer campaigns — and trains aspiring individuals to become confident content creators.',
    },
    // WhatsApp click-to-chat (wa.me links — no WhatsApp Business API). Buttons stay
    // hidden until a number is set. Each purpose has its own pre-filled message.
    whatsapp: {
      number: '', // international format, e.g. +91 98765 43210
      welcome: 'Hello NAAA TALKS Team! I visited your website and would like to chat with your team.',
      general: 'Hello NAAA TALKS Team! I visited your website and would like to know more about your services.',
      business: "Hello NAAA TALKS Team! I'm interested in your creative agency and influencer marketing services. I would like to discuss a potential collaboration.",
      influencer: "Hello NAAA TALKS Team! I'm interested in joining your influencer program. Please share the registration details.",
      careers: "Hello NAAA TALKS Team! I'm interested in career opportunities at your company. Could you please share more information?",
    },
    hero: {
      eyebrow: 'Creative agency · Influencer marketing · Content production',
      title: ["We don't just create content.", 'We create growth.'],
      subtitle: 'We turn creative ideas into powerful stories, help businesses grow and transform aspiring individuals into confident content creators and influencers.',
      note: 'Create. Educate. Grow.',
    },
    contact: {
      email: 'Naaatalks@gmail.com',
      phone: '',
      location: '', // office address
      hours: '',
    },
    socials: [
      { platform: 'instagram', label: 'Instagram', handle: '@naaatalks', url: 'https://instagram.com/naaatalks' },
      { platform: 'youtube', label: 'YouTube', handle: '', url: '' },
      { platform: 'facebook', label: 'Facebook', handle: '', url: '' },
      { platform: 'linkedin', label: 'LinkedIn', handle: '', url: '' },
      { platform: 'tiktok', label: 'TikTok', handle: '', url: '' },
    ],
    stats: {
      isSample: true,
      sampleNote: 'Placeholder figures — update them from the admin dashboard.',
      items: [
        { value: 50, suffix: '+', label: 'Projects delivered' },
        { value: 30, suffix: '+', label: 'Creators trained' },
        { value: 20, suffix: '+', label: 'Brands served' },
        { value: 4, suffix: '', label: 'Creative disciplines' },
      ],
    },
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'About NAAA TALKS',
    title: ['A creative ecosystem', 'for brands and creators.'],
    paragraphs: [
      'NAAA TALKS is a creative marketing, content production and influencer development agency. We help businesses build their digital presence through creative marketing, professional video production, influencer collaborations and engaging social media content.',
      'We also identify, train and develop aspiring individuals into confident content creators and influencers — through practical training, personal mentorship and real-world content production.',
    ],
    vision: 'To become a creative ecosystem where businesses grow, creators develop their talent and ordinary individuals get the opportunity to become influencers.',
  },

  pillars: {
    eyebrow: 'Our three pillars',
    title: ['Create. Educate.', 'Grow.'],
    items: [
      { key: 'create', number: '01', title: 'Create', summary: 'Helping businesses grow through creative content and digital marketing.', icon: 'create', activities: ['Digital Marketing', 'Social Media Management', 'Influencer Marketing', 'Brand Promotions', 'Video Production', 'Reels Creation', 'Professional Video Editing', 'Advertising Campaigns', 'Brand Storytelling'] },
      { key: 'educate', number: '02', title: 'Educate', summary: 'Training and developing aspiring content creators and influencers.', icon: 'educate', activities: ['Content Creator Training', 'Camera Confidence Training', 'Public Speaking', 'Script Writing', 'Video Shooting Training', 'Video Editing Training', 'Practical Content Creation', 'Personal Mentorship'] },
      { key: 'grow', number: '03', title: 'Grow', summary: 'Helping businesses, brands and creators achieve long-term growth.', icon: 'grow', activities: ['Personal Branding', 'Business Growth Strategies', 'Influencer Development', 'Brand Collaborations', 'Social Media Growth', 'Campaign Management', 'Creator Monetization Guidance'] },
    ],
  },

  // ── Services ───────────────────────────────────────────────────────────────
  serviceCategories: [
    { key: 'marketing', title: 'Digital Marketing & Business Growth', short: 'Digital Marketing', icon: 'marketing', href: '/services#marketing', intro: 'Strategy, social media and campaigns that turn attention into business growth.' },
    { key: 'production', title: 'Content Creation & Video Production', short: 'Content Production', icon: 'production', href: '/content-production', intro: 'A full creative production team — from concept and script to shoot, edit and delivery.' },
    { key: 'influencer', title: 'Influencer Marketing', short: 'Influencer Marketing', icon: 'influencer', href: '/influencer-marketing', intro: 'The right creators, the right campaign and partnerships managed end to end.' },
    { key: 'training', title: 'Content Creator Training', short: 'Creator Training', icon: 'training', href: '/influencer-program', intro: 'Practical training for beginners who want to become professional content creators.' },
  ],
  defaultServices: [
    ...['Social Media Marketing', 'Social Media Account Management', 'Performance Marketing', 'Brand Promotion', 'Digital Marketing Strategies', 'Social Media Campaigns', 'Business Growth Content', 'Advertising Campaign Management'].map((t) => ['marketing', t]),
    ...['Instagram Reels Production', 'Professional Video Shooting', 'Mobile Videography', 'Professional Camera Shooting', 'Video Editing', 'Reels Editing', 'Short-form Video Production', 'Product Photography', 'Brand Advertisement Videos', 'Script Writing', 'Content Ideas and Planning', 'Creative Storytelling', 'Cinematic Brand Videos', 'Promotional Videos', 'Behind-the-scenes Content'].map((t) => ['production', t]),
    ...['Influencer Collaborations', 'Influencer Campaign Management', 'Brand and Influencer Partnerships', 'Sponsored Promotions', 'Influencer Identification', 'Influencer Management', 'Personal Brand Development', 'Campaign Planning and Execution', 'Influencer Advertising'].map((t) => ['influencer', t]),
    ...['Overcoming camera fear', 'Camera-facing confidence', 'Public speaking and communication', 'Mobile video shooting', 'Professional camera basics', 'Reels creation', 'Video editing', 'Script writing', 'Content planning', 'Social media understanding', 'Practical shooting exercises', 'Real-world content production'].map((t) => ['training', t]),
  ].map(([category, title], i) => ({ id: `svc-${i + 1}`, category, title, description: '', image: '', published: true, sort_order: i })),

  // ── Creative production team ───────────────────────────────────────────────
  production: {
    eyebrow: 'Our creative production team',
    title: ['One team.', 'Every creative possibility.'],
    promise: 'From the first idea to the final frame, our team handles every stage of creative production.',
    workflow: ['Concept', 'Script', 'Shooting', 'Editing', 'Review', 'Final Delivery'],
    team: [
      { icon: 'creators', title: 'Content Creators', points: ['Generate creative ideas', 'Develop social media content', 'Participate in shoots', 'Create engaging Reels'] },
      { icon: 'editors', title: 'Video Editors', points: ['Professional Reel editing', 'Transitions & motion graphics', 'Colour grading & sound design', 'Subtitles, captions & ad edits'] },
      { icon: 'camera', title: 'Videographers & Camera Operators', points: ['Professional camera shooting', 'Mobile videography', 'Product & location shoots', 'Cinematic video production'] },
      { icon: 'writers', title: 'Content & Script Writers', points: ['Video scripts', 'Creative hooks', 'Brand storytelling', 'Captions & campaign content'] },
    ],
  },

  // ── Signature program ──────────────────────────────────────────────────────
  program: {
    eyebrow: 'Signature program · Zero to Influencer',
    title: ['From Zero to Influencer.', 'We build your journey.'],
    subtitle: 'Your talent deserves a platform. We help you discover your creativity, overcome camera fear, learn content creation and build your own influencer identity.',
    notClassroom: 'This is not a classroom course. It is a practical development journey — personal guidance, content planning, shooting, editing, travel and real-world publishing.',
    cta: { label: 'Become an influencer — apply now', href: '/become-an-influencer' },
    highlights: ['Personal mentorship', 'Camera confidence', 'Practical location shoots', 'Your own creator identity'],
    steps: [
      { title: 'Discover', text: 'We identify interested individuals who want to become influencers.' },
      { title: 'Understand', text: 'We explore your interests, personality, strengths and talents.' },
      { title: 'Build Confidence', text: 'Overcome camera fear and improve how you communicate.' },
      { title: 'Choose a Niche', text: 'Find the content category and personal brand direction that fits you.' },
      { title: 'Plan Content', text: 'Develop content ideas, scripts and storytelling concepts.' },
      { title: 'Learn Production', text: 'Train in mobile shooting, camera usage and video editing.' },
      { title: 'Practical Shoots', text: 'Travel to different locations and create real-world content.' },
      { title: 'Build Identity', text: 'Develop your social media profile and creator identity.' },
      { title: 'Publish Consistently', text: 'Create and publish content regularly with our guidance.' },
      { title: 'Grow & Collaborate', text: 'Keep growing and explore brand collaboration opportunities.' },
    ],
  },

  // ── Working process ("How we work") ────────────────────────────────────────
  process: {
    id: 'process',
    eyebrow: 'How we work',
    title: ['From the first idea.', 'To the final frame.'],
    subtitle: 'We turn creative ideas into powerful visual stories through strategy, production, editing and promotion.',
    // icon: idea | script | shoot | edit | reels | promote | deliver | growth
    steps: [
      { icon: 'idea', title: 'Strategy & Ideas', text: 'Understanding brand identity, target audience and campaign goals.' },
      { icon: 'script', title: 'Concept & Script', text: 'Creative concepts, video scripts, storytelling and engaging hooks.' },
      { icon: 'shoot', title: 'Professional Shoots', text: 'Professional camera shoots, product photography and cinematic visuals.' },
      { icon: 'edit', title: 'Video Editing', text: 'Professional Reel editing, transitions, sound design, subtitles and color grading.' },
      { icon: 'reels', title: 'Reels & Content', text: 'Instagram Reels, short-form videos, UGC and social media content.' },
      { icon: 'promote', title: 'Brand Promotions', text: 'Influencer collaborations, sponsored content and brand campaigns.' },
      { icon: 'deliver', title: 'Publish & Deliver', text: 'Final video delivery, social media formats and content handover.' },
      { icon: 'growth', title: 'Results & Growth', text: 'Campaign performance review and content improvement.' },
    ],
    cta: { title: 'Have a project in mind?', text: "Let's create something people remember.", label: 'Work with us', href: '/work-with-us' },
  },

  // ── Why choose us ──────────────────────────────────────────────────────────
  whyChoose: {
    eyebrow: 'Why choose NAAA TALKS',
    title: ['More than content.', 'We create impact.'],
    subtitle: 'Creative thinking, professional execution and transparent collaboration from start to finish.',
    tagline: 'One team. Every creative possibility.',
    items: [
      { icon: 'reels', title: 'Story-first Content', text: 'Hooks that capture attention and stories that keep viewers watching.' },
      { icon: 'camera', title: 'In-house Production Team', text: 'Creators, videographers, editors and writers working together on every project.' },
      { icon: 'shield', title: 'Brand-safe Creative', text: 'Clear briefs, approvals and consistent, on-time delivery.' },
      { icon: 'grow', title: 'Growth for Brands & Creators', text: 'We grow businesses — and develop the creators who will carry their stories.' },
    ],
    cta: { title: 'Ready to create something memorable?', text: "Let's bring your next creative idea to life.", label: 'Work with us', href: '/work-with-us' },
  },

  // ── Portfolio ──────────────────────────────────────────────────────────────
  projectCategories: ['Instagram Reels', 'Brand Advertisements', 'Video Shooting', 'Video Editing', 'Product Photography', 'Lifestyle Content', 'Influencer Collaborations', 'Behind the Scenes'],
  featuredWork: {
    id: 'work',
    eyebrow: 'Featured creative portfolio',
    title: ['Stories worth', 'stopping for.'],
    subtitle: 'From scroll-stopping Reels to cinematic brand campaigns, every frame is crafted to make an impact.',
    availability: 'Now taking new projects',
    newBadge: 'New project',
    autoplay: { enabled: true, intervalMs: 5000 },
  },
  archive: {
    id: 'portfolio',
    eyebrow: 'Portfolio · Reels · Brand campaigns',
    title: ['Not just videos.', 'Stories that move people.'],
    subtitle: 'Creative productions, brand films, cinematic Reels and visual stories made to leave an impression.',
    sampleNotice: 'Pieces marked “Sample” are demonstration work for layout, not client projects.',
    showreel: { eyebrow: 'Our showreel', title: 'Creativity in 60 seconds.', duration: '01:00', thumbnail: img('1485846234645-a62644f84728', 1200), videoUrl: '', embedUrl: '', link: 'https://instagram.com/naaatalks', platform: 'instagram' },
    cta: { title: 'Have a story to tell?', text: "Let's turn your next idea into something unforgettable.", label: 'Work with us', href: '/work-with-us' },
  },
  // Sample projects (is_sample: true) shown until real work is published from the admin.
  defaultProjects: [
    { title: 'The Art of Storytelling', category: 'Brand Advertisements', description: 'A cinematic brand film built around one honest moment.', thumbnail: img('1516035069371-29a1b244cc32', 1200), duration: '00:45', platform: 'instagram', status_label: 'Featured work', featured: true },
    { title: 'Golden Plates', category: 'Instagram Reels', description: 'A recipe Reel paced for saves and shares.', thumbnail: img('1504674900247-0877df9cc836'), duration: '00:30', platform: 'instagram', status_label: 'New project', featured: true },
    { title: 'Golden Hour Stories', category: 'Lifestyle Content', description: 'A sunset lookbook cut to the beat.', thumbnail: img('1529626455594-4ff0802cfb7e'), duration: '00:35', platform: 'instagram', featured: true },
    { title: 'Shot on Phone', category: 'Video Editing', description: 'Speed ramps, sound design and clean subtitles.', thumbnail: img('1512941937669-90a1b58e7e9c'), duration: '00:25', platform: 'instagram', status_label: 'Creative production', featured: true },
    { title: 'Skin, Honestly', category: 'Product Photography', description: 'Product stills and a routine story for a skincare launch.', thumbnail: img('1556228578-8c89e6adf883'), duration: '00:20', platform: 'instagram', featured: true },
    { title: 'A Day on Location', category: 'Video Shooting', description: 'Golden-hour location shoot from sunrise to sunset.', thumbnail: img('1469474968028-56623f02e42e', 1200), duration: '01:00', platform: 'youtube', featured: true },
    { title: 'Creator Collab Day', category: 'Influencer Collaborations', description: 'A creator and a brand, one shoot, three formats.', thumbnail: img('1534528741775-53994a69daeb'), duration: '00:40', platform: 'instagram', featured: true },
    { title: 'Behind the Glass', category: 'Behind the Scenes', description: 'Lens work and setups from a production day.', thumbnail: img('1502920917128-1aa500764cbd', 1400), duration: '00:40', platform: 'youtube' },
  ].map((p, i) => ({ id: `sample-${i + 1}`, video_url: '', embed_url: '', instagram_url: 'https://instagram.com/naaatalks', youtube_url: '', status_label: '', featured: false, published: true, is_sample: true, sort_order: i, ...p })),

  // ── Clients & testimonials (empty until verified, permission-confirmed entries are added) ──
  clientsSection: {
    eyebrow: 'Our clients & collaborations',
    title: ['Brands we create with.', 'Stories we are proud of.'],
    empty: 'Client logos and campaign highlights will appear here once each brand has approved being featured.',
  },
  testimonialsSection: {
    eyebrow: 'Testimonials',
    title: ['In their words.', 'Clients and creators.'],
    empty: 'Testimonials are published only with the author’s permission. The first ones are on their way.',
  },
  defaultClients: [],
  defaultTestimonials: [],

  // ── Careers ────────────────────────────────────────────────────────────────
  careers: {
    eyebrow: 'Careers · Join our team',
    title: ['Build stories with us.', 'Grow your creative career.'],
    subtitle: 'NAAA TALKS is building a talented creative team. If you love making content that people remember, we would like to hear from you.',
    perks: ['Real brand projects from day one', 'Work alongside editors, shooters and creators', 'Build a portfolio that speaks for you', 'Grow with a fast-moving creative agency'],
    empty: 'There are no open positions right now — you can still send us a general application.',
  },
  // Open roles shown until the admin publishes its own openings.
  defaultJobs: [
    ['Video Editor', 'Production', 'Edit Reels, ads and brand videos with clean cuts, colour grading and sound design.', 'Premiere Pro / DaVinci / CapCut\nColour grading basics\nSound design\nSubtitles & motion text'],
    ['Reels Editor', 'Production', 'Turn raw footage into fast, engaging short-form content for Instagram.', 'Short-form pacing\nTransitions & trends\nCaptions & hooks'],
    ['Content Writer / Script Writer', 'Creative', 'Write hooks, scripts, captions and campaign copy for brands and creators.', 'Script writing\nStorytelling\nCaption & hook writing'],
    ['Professional Camera Operator', 'Production', 'Shoot brand, product and location content on professional cameras.', 'DSLR / mirrorless operation\nLighting basics\nComposition'],
    ['Mobile Videographer', 'Production', 'Shoot high-quality vertical content on smartphones for Reels and ads.', 'Mobile shooting\nStabilisation & framing\nNatural light'],
    ['Content Creator', 'Creative', 'Create on-camera content, ideas and Reels for brands and campaigns.', 'On-camera confidence\nTrend awareness\nIdea generation'],
    ['Social Media Manager', 'Marketing', 'Plan calendars, publish content and grow brand accounts.', 'Content calendars\nCommunity management\nInsights & reporting'],
    ['Digital Marketing Executive', 'Marketing', 'Run campaigns and performance marketing for client brands.', 'Meta Ads basics\nCampaign reporting\nMarketing strategy'],
  ].map(([title, department, description, skills], i) => ({ id: `job-${i + 1}`, title, department, location: 'Discussed during interview', employment_type: 'Full-time / Freelance', experience: 'Freshers and experienced candidates welcome', description, skills, published: true, sort_order: i })),

  // ── FAQs (defaults) ────────────────────────────────────────────────────────
  faqsSection: { eyebrow: 'FAQ', title: ['Questions people ask', 'before they start.'] },
  defaultFaqs: [
    { question: 'What does NAAA TALKS do?', answer: 'We are a creative marketing, content production and influencer development agency. We create content and campaigns for businesses, and we train aspiring individuals to become content creators and influencers.' },
    { question: 'Can you handle shooting and editing for my brand?', answer: 'Yes. Our in-house team handles the full workflow — concept, script, shooting, editing, review and final delivery — for Reels, ads, product shoots and brand videos.' },
    { question: 'How does the Zero to Influencer program work?', answer: 'After you apply, we get to know your interests and personality, then guide you step by step: camera confidence, choosing a niche, content planning, production skills, practical location shoots and publishing consistently.' },
    { question: 'Do I need experience to apply for the influencer program?', answer: 'No. The program is designed for beginners — including people who feel nervous in front of a camera.' },
    { question: 'How do I apply for a job at NAAA TALKS?', answer: 'Visit the Careers page, choose a position and submit the application form with your resume and portfolio links.' },
    { question: 'How do I start a project with you?', answer: 'Use “Work with us” to share your business details and goals. We will get back to you to discuss the scope, timeline and budget.' },
  ].map((f, i) => ({ id: `faq-${i + 1}`, published: true, sort_order: i, ...f })),

  // ── Forms ──────────────────────────────────────────────────────────────────
  forms: {
    serviceOptions: ['Digital marketing & growth', 'Social media management', 'Content production & video shoots', 'Video / Reels editing', 'Influencer marketing campaign', 'Product photography', 'Something else'],
    budgetOptions: ['Under ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+', 'Not sure yet'],
    timelineOptions: ['As soon as possible', 'Within a month', '1–3 months', 'Just exploring'],
    nicheOptions: ['Lifestyle', 'Fashion & beauty', 'Food', 'Travel', 'Tech', 'Fitness', 'Education', 'Comedy & entertainment', 'Not sure yet'],
    cameraOptions: ['Never been on camera', 'A little — I feel nervous', 'Comfortable on camera', 'I already post content'],
    experienceOptions: ['Fresher', 'Less than 1 year', '1–3 years', '3+ years'],
  },

  // ── Inner page copy ────────────────────────────────────────────────────────
  pages: {
    about: { eyebrow: 'About us', title: ['We create.', 'We educate. We grow.'], subtitle: 'A creative ecosystem where businesses grow, creators develop their talent and ordinary individuals get the chance to become influencers.' },
    services: { eyebrow: 'Services', title: ['Marketing, production', 'and influence — in one team.'], subtitle: 'Four service areas that work together: digital marketing, content production, influencer marketing and creator training.' },
    production: {
      eyebrow: 'Content production',
      title: ['From the first idea', 'to the final frame.'],
      subtitle: 'Our creative production team handles every stage — concept, script, shooting, editing, review and delivery — for Reels, ads, product shoots and brand films.',
      formats: [
        { title: 'Instagram Reels & short-form', text: 'Scroll-stopping vertical videos planned, shot and edited for reach.' },
        { title: 'Brand & advertisement videos', text: 'Cinematic brand films and promotional videos for launches and campaigns.' },
        { title: 'Product photography', text: 'Clean, styled product stills for social, websites and marketplaces.' },
        { title: 'Behind-the-scenes content', text: 'Authentic process content that builds trust in your brand.' },
      ],
    },
    influencerMarketing: {
      eyebrow: 'Influencer marketing',
      title: ['The right creators.', 'The right campaign.'],
      subtitle: 'We identify creators who genuinely fit your brand, plan the campaign, manage the partnership and track what it delivers.',
      steps: [
        { title: 'Brief & goals', text: 'Your product, audience, budget and what success looks like.' },
        { title: 'Creator identification', text: 'We shortlist creators whose audience and style match your brand.' },
        { title: 'Campaign planning', text: 'Concepts, deliverables, timelines and usage rights agreed up front.' },
        { title: 'Production & approvals', text: 'Content is created, reviewed and approved before it goes live.' },
        { title: 'Launch & management', text: 'We coordinate publishing and manage the creator partnership.' },
        { title: 'Results & learning', text: 'Performance review and recommendations for the next campaign.' },
      ],
      creatorsNote: 'Are you a creator? Our Zero to Influencer program helps you build your profile — and brand collaborations are part of the journey.',
    },
    program: {
      whoFor: ['Students and young professionals who want to create content', 'People who feel nervous in front of a camera', 'Anyone with a passion they want to share online', 'Beginners with no editing or shooting experience'],
      expect: ['A conversation to understand you and your interests', 'Practical sessions — not just theory', 'Real shoots at real locations', 'Guidance until you publish consistently on your own'],
    },
    portfolio: { eyebrow: 'Portfolio', title: ['Our work.', 'Frame by frame.'], subtitle: 'Reels, brand campaigns, shoots and edits. Filter by category and tap any piece to watch.' },
    clients: { eyebrow: 'Our clients', title: ['Partners in', 'every story.'], subtitle: 'Brands and creators we have worked with — featured only with their permission.' },
    careers: { eyebrow: 'Careers', title: ['Join our', 'creative team.'] },
    contact: { eyebrow: 'Contact us', title: ['Let’s talk.', 'Choose your path.'], subtitle: 'Business enquiry, influencer program or a job with our team — pick the journey that fits you, or reach us directly.' },
    workWithUs: {
      eyebrow: 'Work with us',
      title: ['Tell us about', 'your brand.'],
      subtitle: 'Share your goals and the content you have in mind. We will come back with ideas, a plan and a quote.',
      next: [
        { title: 'We review your enquiry', text: 'Our team reads every brief and may ask a few follow-up questions.' },
        { title: 'Discovery call', text: 'We discuss your goals, audience, timeline and budget.' },
        { title: 'Proposal', text: 'You receive a plan with deliverables, timeline and pricing.' },
        { title: 'Production begins', text: 'Concept → script → shoot → edit → review → delivery.' },
      ],
    },
    apply: { eyebrow: 'Become an influencer', title: ['Your journey', 'starts here.'], subtitle: 'Apply for the Zero to Influencer program. No experience needed — just curiosity and commitment.' },
    jobApply: { eyebrow: 'Job application', title: ['Apply to', 'NAAA TALKS.'], subtitle: 'Tell us about your skills and the work you love. Attach your resume and portfolio links.' },
  },

  marquee: ['Reels', 'Brand Films', 'Product Shoots', 'Influencer Campaigns', 'Video Editing', 'Social Media', 'Creator Training', 'Storytelling'],

  legal: {
    updated: '2 November 2026',
    reviewNote: 'Template text — have it reviewed before launch.',
  },

  footer: { copyright: 'All rights reserved.' },
}
