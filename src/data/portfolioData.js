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
    logo: '/brand/naaa-talks-logo.webp', // default logo (public/brand); an admin-uploaded logo replaces it
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

  // Desktop navbar (Home is the logo, Contact sits beside the CTA). `menu` adds a
  // dropdown filled from live content: every service with a detail page, every course.
  nav: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services', menu: 'services' },
    { label: 'Content Production', href: '/content-production' },
    { label: 'Academy', href: '/academy', menu: 'courses' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Careers', href: '/careers' },
  ],
  navAll: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Content Production', href: '/content-production' },
    { label: 'Naaa Talks Academy', href: '/academy' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
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
      logo: '', // admin-uploaded logo; empty uses brand.logo
    },
    // Labels for the three journey buttons used across the site.
    ctas: { business: 'Work with us', influencer: 'Become an influencer', careers: 'Join our team', showreel: 'Watch Showreel' },
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
      eyebrow: 'Creative & Digital Marketing Agency',
      title: ['Create Content.', 'Build Influence.'],
      highlight: 'Grow Your Brand.', // on the red brush stroke
      subtitle: 'We help businesses grow with high-quality content creation, strategic digital marketing and powerful storytelling.',
      note: 'Create. Educate. Grow.', // brush tagline, bottom right
    },
    // Floating cards beside the hero portrait. Keep isSample on until these are real results.
    heroStats: {
      isSample: true,
      sampleNote: 'Sample figures',
      items: [
        { value: '128K+', label: 'Total Views' },
        { value: '6.4K+', label: 'Creators Trained' },
        { value: '12.9%', label: 'Avg. Growth' },
      ],
    },
    contact: {
      email: 'Naaatalks@gmail.com',
      phone: '',
      location: 'Tirupati, Andhra Pradesh, India', // office address
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
        { value: 17, suffix: '+', label: 'Years of Experience', icon: 'calendar' },
        { value: 10, suffix: '+', label: 'Creative Projects', icon: 'layers' },
        { value: 7, suffix: '+', label: 'Training Programs', icon: 'education' },
        { value: 1, suffix: '', label: 'Core Brand', icon: 'brand' },
      ],
    },
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'About NAAA TALKS',
    title: ['Our Story. Our Creativity.', 'Our Vision.'],
    paragraphs: [
      'Naaa Talks is a creative and digital marketing agency dedicated to helping businesses grow through content creation, digital marketing and powerful storytelling.',
      'We also believe in developing creative talent. Through Naaa Talks Academy, we train aspiring individuals in content creation, digital marketing and video editing.',
    ],
    vision: 'To become a creative ecosystem where businesses grow, creators develop their talent and ordinary individuals get the opportunity to become influencers.',
    // Shown as cards on the About page (and a preview on the homepage).
    blocks: [
      { key: 'story', title: 'Our Story', text: 'Naaa Talks started with a simple belief: every business has a story worth telling, and every person has a creative voice worth developing. From Tirupati, we bring brands and creators together through content that connects.' },
      { key: 'mission', title: 'Our Mission', text: 'To help businesses grow with creative content and smart digital marketing — and to give aspiring creators the practical skills, confidence and guidance to build their own future.' },
      { key: 'vision', title: 'Our Vision', text: 'To become a creative ecosystem where businesses grow, creators develop their talent and ordinary individuals get the opportunity to become influencers.' },
      { key: 'different', title: 'What Makes Us Different', text: 'We are an agency and an academy in one. The same team that plans, shoots and edits for brands trains the next generation of creators — so our work stays practical and our training stays real.' },
      { key: 'approach', title: 'Our Approach', text: 'Story first, then strategy. We understand your audience and goals, plan the idea, produce it professionally, publish it and keep improving it with what the results tell us.' },
      { key: 'team', title: 'Meet Our Team', text: 'Content creators, videographers, video editors, script writers and marketers working together under one roof — from the first idea to the final frame.' },
    ],
    // About page: what we stand for, and how a project moves.
    values: [
      { icon: 'creativity', title: 'Creativity', text: 'Fresh ideas and bold storytelling in everything we make.' },
      { icon: 'innovation', title: 'Innovation', text: 'New formats, platforms and techniques — always learning.' },
      { icon: 'authenticity', title: 'Authenticity', text: 'Honest work, real results and content that feels true.' },
      { icon: 'collaboration', title: 'Collaboration', text: 'Brands, creators and our team building it together.' },
    ],
    // ── About page ──
    heroTitle: ['Our Story.', 'Our Creativity.', 'Our Vision.'], // last line in brand red
    heroParagraphs: [
      'Naaa Talks is a creative and digital marketing agency dedicated to helping businesses grow through content creation, digital marketing and powerful storytelling.',
      'Through Naaa Talks Academy, we also empower aspiring creators with practical skills in content creation, digital marketing and video editing.',
    ],
    // Story cards that lead somewhere get an arrow.
    blockLinks: { approach: '#process', team: '/content-production#team' },
    capabilities: [
      { icon: 'content', title: 'Content Creation', text: 'Reels, posts and stories built around ideas people remember.', href: '/content-production' },
      { icon: 'marketing', title: 'Digital Marketing', text: 'Strategy, social media and campaigns that grow businesses.', href: '/services' },
      { icon: 'video', title: 'Video Production', text: 'Concept, script, shoot and edit — produced in-house.', href: '/content-production' },
      { icon: 'education', title: 'Creator Education', text: 'Practical courses through Naaa Talks Academy.', href: '/academy' },
    ],
    process: [
      { title: 'Discover', text: 'Understand the brand, audience and objectives.' },
      { title: 'Strategize', text: 'Develop creative ideas and a clear execution plan.' },
      { title: 'Create', text: 'Produce engaging content and marketing campaigns.' },
      { title: 'Grow', text: 'Measure results, improve performance and build growth.' },
    ],
    academyPromo: {
      title: ['Building the Next Generation', 'of Creators.'],
      text: 'Learn practical creative skills, develop your personal brand and turn your passion into opportunities.',
    },
    finalCta: {
      title: ['Have an Idea?', "Let's Create Something", 'Extraordinary.'], // last line in brand red
      text: "Whether you're building a brand, launching a campaign or starting your creative journey, let's make it happen.",
    },
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
  // Admin "category" values for services. Agency services (marketing / influencer)
  // with a slug get their own page at /services/<slug>; production services are
  // listed on the Content Production page.
  serviceCategories: [
    { key: 'marketing', title: 'Digital Marketing', short: 'Digital Marketing', icon: 'marketing', href: '/services' },
    { key: 'influencer', title: 'Influencer Marketing', short: 'Influencer Marketing', icon: 'influencer', href: '/services/influencer-marketing' },
    { key: 'production', title: 'Content Production', short: 'Content Production', icon: 'production', href: '/content-production' },
    { key: 'training', title: 'Academy', short: 'Academy', icon: 'training', href: '/academy' },
  ],
  servicesSection: {
    eyebrow: 'Our services',
    title: ['Everything your brand needs', 'to be seen and remembered.'],
  },
  // Steps shown on every service page (a service can be given its own in `serviceProcess`).
  serviceProcess: {
    default: [
      { title: 'Understand', text: 'Your business, audience, competitors and what success looks like.' },
      { title: 'Plan', text: 'A clear strategy, content calendar and creative direction.' },
      { title: 'Create', text: 'Concepts, scripts, shoots and edits produced by our in-house team.' },
      { title: 'Launch', text: 'Publishing, campaign setup and community engagement.' },
      { title: 'Measure', text: 'Honest reporting on what is working — and what is not.' },
      { title: 'Improve', text: 'We refine the next round of content using real results.' },
    ],
    'influencer-marketing': [
      { title: 'Brief & goals', text: 'Your product, audience, budget and what success looks like.' },
      { title: 'Creator identification', text: 'We shortlist creators whose audience and style match your brand.' },
      { title: 'Campaign planning', text: 'Concepts, deliverables, timelines and usage rights agreed up front.' },
      { title: 'Production & approvals', text: 'Content is created, reviewed and approved before it goes live.' },
      { title: 'Launch & management', text: 'We coordinate publishing and manage the creator partnership.' },
      { title: 'Results & learning', text: 'Performance review and recommendations for the next campaign.' },
    ],
  },
  defaultServices: [
    {
      category: 'marketing', slug: 'social-media-marketing', title: 'Social Media Marketing',
      summary: 'Content and campaigns that grow your audience and turn followers into customers.',
      description: 'We build your brand on Instagram, Facebook and YouTube with content people actually want to watch — planned around your audience and your business goals, and backed by campaigns that put it in front of the right people.',
      features: 'Platform strategy for Instagram, Facebook and YouTube\nReels, posts and stories planned around your goals\nCaptions, hooks and hashtag research\nCampaigns to grow reach and engagement\nMonthly performance insights',
      benefits: 'A consistent, recognisable brand presence\nMore reach from content made for each platform\nFollowers who turn into enquiries and customers\nClear visibility into what is working',
    },
    {
      category: 'marketing', slug: 'social-media-management', title: 'Social Media Management',
      summary: 'We run your accounts day to day — planning, posting and engaging — so you can run your business.',
      description: 'From the monthly content calendar to replying to comments, we take care of your social media accounts end to end, keeping your brand active, consistent and responsive.',
      features: 'Monthly content calendar\nDesign, copy and scheduling\nCommunity management and replies\nProfile and highlight optimisation\nMonthly reports',
      benefits: 'Consistent posting without the daily effort\nA professional, on-brand profile\nFaster responses to your audience\nMore time to focus on your business',
    },
    {
      category: 'influencer', slug: 'influencer-marketing', title: 'Influencer Marketing',
      summary: 'The right creators, the right campaign — partnerships managed end to end.',
      description: 'We identify creators who genuinely fit your brand, plan the campaign, manage the partnership and track what it delivers — so your product is introduced by voices your audience already trusts.',
      features: 'Creator identification and shortlisting\nCampaign concepts and deliverables\nNegotiation and partnership management\nContent review and approvals\nCampaign performance reporting',
      benefits: 'Trusted voices introducing your brand\nAuthentic content you can reuse\nAccess to engaged, relevant audiences\nOne team managing everything',
    },
    {
      category: 'marketing', slug: 'performance-marketing', title: 'Performance Marketing',
      summary: 'Paid campaigns on Meta and Google built around measurable results.',
      description: 'We plan, launch and optimise paid campaigns that are measured against what matters to you — leads, sales, store visits or app installs — and we combine them with creative that is made to perform.',
      features: 'Meta (Instagram & Facebook) and Google ads\nAudience research and targeting\nAd creatives made for performance\nConversion tracking setup\nBudget optimisation and reporting',
      benefits: 'Spend focused on the results you care about\nCreative and targeting tested, not guessed\nTransparent reporting on every rupee\nCampaigns that improve over time',
    },
    {
      category: 'marketing', slug: 'brand-promotion', title: 'Brand Promotion',
      summary: 'Launches, offers and campaigns that make people notice your brand.',
      description: 'Whether you are launching a product, opening a store or running a seasonal offer, we create the campaign — the idea, the content and the promotion plan — that gets your brand talked about.',
      features: 'Launch and offer campaigns\nPromotional videos and creatives\nInfluencer and collaboration tie-ups\nOn-ground and event coverage\nCross-platform promotion plans',
      benefits: 'A memorable brand moment\nContent ready for every platform\nMore footfall, enquiries and buzz\nOne coordinated campaign, not scattered posts',
    },
    {
      category: 'marketing', slug: 'digital-marketing-strategy', title: 'Digital Marketing Strategy',
      summary: 'A clear plan for where to show up, what to say and how to grow.',
      description: 'Before spending on content or ads, you need a plan. We study your business, audience and competitors and give you a practical digital marketing strategy — channels, content pillars, campaigns and the numbers to track.',
      features: 'Business and audience research\nCompetitor and market review\nChannel and content pillar planning\nCampaign roadmap and calendar\nKPIs and measurement plan',
      benefits: 'Clarity on where to focus your budget\nA roadmap your team can follow\nContent that serves a clear purpose\nGrowth you can measure',
    },
    ...[
      ['Instagram Reels Production', 'Scroll-stopping vertical videos — hooks, shooting, editing and trends — made for reach.'],
      ['Business Promotional Videos', 'Brand films and promotional videos for launches, offers, stores and services.'],
      ['Product Photography and Videography', 'Clean, styled product stills and videos for social media, websites and marketplaces.'],
      ['Script Writing', 'Hooks, scripts and storyboards that keep viewers watching until the end.'],
      ['Creative Concepts', 'Ideas and campaign concepts built around your brand and audience.'],
      ['Video Shooting', 'Professional camera and mobile shoots — in studio or on location.'],
      ['Video Editing', 'Cuts, transitions, colour grading, sound design, subtitles and motion text.'],
    ].map(([title, description]) => ({ category: 'production', title, description })),
  ].map((s, i) => ({ id: `svc-${i + 1}`, slug: '', summary: '', features: '', benefits: '', image: '', published: true, sort_order: i, ...s })),

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
    eyebrow: 'Why choose us',
    title: ['More than content.', 'We create impact.'],
    subtitle: 'Creative thinking, professional execution and transparent collaboration from start to finish.',
    tagline: 'One team. Every creative possibility.',
    items: [
      { icon: 'quality', title: 'Creative Quality', text: 'High-quality, original and brand-focused content.' },
      { icon: 'camera', title: 'Professional Production', text: 'End-to-end video production with a creative edge.' },
      { icon: 'grow', title: 'Strategic Marketing', text: 'Result-driven marketing that drives real growth.' },
      { icon: 'team', title: 'Experienced Creative Team', text: 'A skilled and passionate team with real industry experience.' },
      { icon: 'educate', title: 'Practical Learning', text: 'Hands-on training with real-world projects.' },
      { icon: 'execution', title: 'End-to-End Execution', text: 'From idea to final delivery, we handle it all.' },
    ],
    // Homepage version of this section.
    homeTitle: 'We Create Impact.',
    homeText: 'A complete creative and learning ecosystem for businesses, brands and aspiring creators.',
    // Homepage scroll orbit: six cards around the headline. Images reuse the sample
    // portfolio thumbnails at the same URLs (one download each); replace with real posts.
    orbitText: "We don't just create content. We create connections, influence and measurable brand impact.",
    orbit: [
      { label: 'Creative Content', icon: 'quality', image: img('1516035069371-29a1b244cc32', 1200) },
      { label: 'Social Media Reach', icon: 'grow', image: img('1529626455594-4ff0802cfb7e') },
      { label: 'Brand Collaborations', icon: 'team', image: img('1534528741775-53994a69daeb') },
      { label: 'Quality Production', icon: 'camera', image: img('1502920917128-1aa500764cbd', 1400) },
      { label: 'Smart Strategy', icon: 'educate', image: img('1512941937669-90a1b58e7e9c') },
      { label: 'Real Impact', icon: 'execution', image: img('1469474968028-56623f02e42e', 1200) },
    ],
    cta: { title: 'Ready to create something memorable?', text: "Let's bring your next creative idea to life.", label: 'Work with us', href: '/work-with-us' },
  },

  // ── Homepage: process & sections ────────────────────────────────────────────
  home: {
    process: [
      { icon: 'discover', title: 'Discover', text: 'Understand the brand, audience and objectives.' },
      { icon: 'strategize', title: 'Strategize', text: 'Develop creative ideas and a clear execution plan.' },
      { icon: 'create', title: 'Create', text: 'Produce engaging content and marketing campaigns.' },
      { icon: 'deliver', title: 'Deliver', text: 'Publish and distribute across the right platforms.' },
      { icon: 'grow', title: 'Grow', text: 'Measure results, improve performance and build growth.' },
    ],
    servicesText: 'Creative, strategic and result-driven solutions for businesses and creators.',
    workText: 'A showcase of our creative work, brand campaigns and content productions.',
    academyText: 'Practical, hands-on courses for aspiring creators and marketing professionals.',
    // Homepage Academy flip: three learning stages whose backs form one image.
    academyFlip: {
      eyebrow: 'NAAA TALKS Academy',
      title: 'Where does your creator journey begin?',
      text: 'Learn the skills, create meaningful content and grow your influence with NAAA TALKS Academy.',
      stages: [
        { key: 'learn', title: 'Learn', text: 'Master digital skills, content creation and personal branding.' },
        { key: 'create', title: 'Create', text: 'Turn your creativity into powerful content and meaningful stories.' },
        { key: 'grow', title: 'Grow', text: 'Build your audience, establish your brand and unlock new opportunities.' },
      ],
      // One shared image across all three card backs (sample photo; swap for a real NAAA TALKS studio shot).
      image: `${img('1516035069371-29a1b244cc32', 1800)}&h=840`, // cropped to the merged panel's 9:4.2 shape
      finalEyebrow: 'Three steps. One journey.',
      finalTitle: 'Learn. Create. Grow.',
      finalText: 'Your creativity deserves the right direction. NAAA TALKS Academy helps you transform your skills into opportunities.',
      cta: { label: 'Explore NAAA TALKS Academy', href: '/academy' },
    },
    contactText: "Whether you're building a brand, launching a campaign or starting your creative journey, let's make it happen.",
  },

  // ── Portfolio ──────────────────────────────────────────────────────────────
  projectCategories: ['Social Media Campaigns', 'Instagram Reels', 'Promotional Videos', 'Product Photography', 'Brand Promotion', 'Video Production'],
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
    { title: 'The Art of Storytelling', category: 'Brand Promotion', description: 'A cinematic brand film built around one honest moment.', thumbnail: img('1516035069371-29a1b244cc32', 1200), duration: '00:45', platform: 'instagram', status_label: 'Featured work', featured: true },
    { title: 'Golden Plates', category: 'Instagram Reels', description: 'A recipe Reel paced for saves and shares.', thumbnail: img('1504674900247-0877df9cc836'), duration: '00:30', platform: 'instagram', status_label: 'New project', featured: true },
    { title: 'Golden Hour Stories', category: 'Social Media Campaigns', description: 'A sunset lookbook cut to the beat.', thumbnail: img('1529626455594-4ff0802cfb7e'), duration: '00:35', platform: 'instagram', featured: true },
    { title: 'Shot on Phone', category: 'Video Production', description: 'Speed ramps, sound design and clean subtitles.', thumbnail: img('1512941937669-90a1b58e7e9c'), duration: '00:25', platform: 'instagram', status_label: 'Creative production', featured: true },
    { title: 'Skin, Honestly', category: 'Product Photography', description: 'Product stills and a routine story for a skincare launch.', thumbnail: img('1556228578-8c89e6adf883'), duration: '00:20', platform: 'instagram', featured: true },
    { title: 'A Day on Location', category: 'Promotional Videos', description: 'Golden-hour location shoot from sunrise to sunset.', thumbnail: img('1469474968028-56623f02e42e', 1200), duration: '01:00', platform: 'youtube', featured: true },
    { title: 'Creator Collab Day', category: 'Social Media Campaigns', description: 'A creator and a brand, one shoot, three formats.', thumbnail: img('1534528741775-53994a69daeb'), duration: '00:40', platform: 'instagram', featured: true },
    { title: 'Behind the Glass', category: 'Video Production', description: 'Lens work and setups from a production day.', thumbnail: img('1502920917128-1aa500764cbd', 1400), duration: '00:40', platform: 'youtube' },
  ].map((p, i) => ({ id: `sample-${i + 1}`, video_url: '', embed_url: '', instagram_url: 'https://instagram.com/naaatalks', youtube_url: '', status_label: '', featured: false, published: true, is_sample: true, sort_order: i, ...p })),

  // ── Clients & testimonials (empty until verified, permission-confirmed entries are added) ──
  clientsSection: {
    eyebrow: 'Our clients & collaborations',
    title: ['Brands That Trust', 'Our Creativity.'],
    empty: 'Client logos and campaign highlights will appear here once each brand has approved being featured.',
  },
  testimonialsSection: {
    eyebrow: 'Testimonials',
    title: ['In their words.', 'Clients and creators.'],
    empty: 'Testimonials are published only with the author’s permission. The first ones are on their way.',
  },
  // Logos supplied by NAAA TALKS for its own clients. Rows published from the admin
  // replace this list. `plate: 'light'` marks a dark-ink logo that needs a light
  // backing to stay visible in its original colours.
  defaultClients: [
    { id: 'crystal-claws', name: 'Crystal Claws Nail Bar', logo: '/clients/crystal-claws.webp', plate: 'light', permission_confirmed: true, sort_order: 1 },
    { id: 'yezdi', name: 'Yezdi', logo: '/clients/yezdi.webp', permission_confirmed: true, sort_order: 2 },
    { id: 'gayatri', name: 'Gayatri Cosmetology Academy', logo: '/clients/gayatri-cosmetology-academy.webp', permission_confirmed: true, sort_order: 3 },
    { id: 'saara', name: 'Saara', logo: '/clients/saara.webp', permission_confirmed: true, sort_order: 4 },
    { id: 'varsha', name: 'Varsha Bridal Studio', logo: '/clients/varsha-bridal-studio.webp', permission_confirmed: true, sort_order: 5 },
    { id: 'lora', name: 'Lora', logo: '/clients/lora.webp', permission_confirmed: true, sort_order: 6 },
  ],
  defaultTestimonials: [],

  // ── Careers ────────────────────────────────────────────────────────────────
  careers: {
    eyebrow: 'Careers at Naaa Talks',
    title: ['Creativity, fresh ideas', 'and people who love learning.'],
    subtitle: 'At Naaa Talks, we believe in creativity, fresh ideas and people who love learning. If you love making content that people remember, we would like to hear from you.',
    hiring: ['Video Editors', 'Content Writers', 'Camera Operators', 'Mobile Videographers', 'Content Creators'],
    perks: ['Real brand projects from day one', 'Work alongside editors, shooters and creators', 'Build a portfolio that speaks for you', 'Grow with a fast-moving creative agency'],
    empty: 'There are no open positions right now — you can still send us a general application.',
  },
  // Open roles shown until the admin publishes its own openings.
  defaultJobs: [
    ['Video Editor', 'Production', 'Edit Reels, ads and brand videos with clean cuts, colour grading and sound design.', 'Premiere Pro / DaVinci / CapCut\nColour grading basics\nSound design\nSubtitles & motion text'],
    ['Content Writer', 'Creative', 'Write hooks, scripts, captions and campaign copy for brands and creators.', 'Script writing\nStorytelling\nCaption & hook writing'],
    ['Camera Operator', 'Production', 'Shoot brand, product and location content on professional cameras.', 'DSLR / mirrorless operation\nLighting basics\nComposition'],
    ['Mobile Videographer', 'Production', 'Shoot high-quality vertical content on smartphones for Reels and ads.', 'Mobile shooting\nStabilisation & framing\nNatural light'],
    ['Content Creator', 'Creative', 'Create on-camera content, ideas and Reels for brands and campaigns.', 'On-camera confidence\nTrend awareness\nIdea generation'],
  ].map(([title, department, description, skills], i) => ({ id: `job-${i + 1}`, title, department, location: 'Discussed during interview', employment_type: 'Full-time / Freelance', experience: 'Freshers and experienced candidates welcome', description, skills, published: true, sort_order: i })),

  // ── NAAA TALKS Academy ─────────────────────────────────────────────────────
  academy: {
    eyebrow: 'Naaa Talks Academy',
    title: ['Learn Skills. Create Content.', 'Build Your Future.'],
    subtitle: 'Practical courses in content creation, digital marketing and video editing — taught by the team that creates for brands every day.',
    approach: [
      { title: 'Learn by doing', text: 'Every module ends with something you make, not just something you read.' },
      { title: 'Taught by practitioners', text: 'Our creators, editors and marketers teach from live client work.' },
      { title: 'Real shoots, real feedback', text: 'Practical sessions on location and honest reviews of your work.' },
      { title: 'A portfolio you can show', text: 'Finish with projects that prove what you can do.' },
    ],
    enquiryNote: 'Tell us which course interests you — we will share the schedule, fees and batch details.',
    durationFallback: 'Shared on enquiry',
  },
  // Courses shown until the admin publishes its own. Multi-line fields = one item per line.
  defaultCourses: [
    {
      slug: 'content-creator-course', title: 'Content Creator Course',
      tagline: 'Find your voice, face the camera and create content people want to watch.',
      description: 'For anyone who wants to create content for themselves or for brands. You will overcome camera fear, find your niche, plan and shoot Reels on your phone, edit them and publish consistently — with personal guidance from our team.',
      level: 'Beginner',
      syllabus: 'Camera confidence and communication\nFinding your niche and personal brand\nContent ideas, hooks and scripting\nMobile shooting: framing, light and sound\nEditing Reels on your phone\nPublishing, consistency and growth',
      modules: 'Module 1 — Understanding content and platforms\nModule 2 — Overcoming camera fear\nModule 3 — Niche, audience and personal brand\nModule 4 — Ideas, hooks and scripts\nModule 5 — Mobile shooting\nModule 6 — Mobile editing\nModule 7 — Publishing and growth',
      practical: 'On-camera practice sessions\nOutdoor and location shoots\nScript-to-Reel exercises\nWeekly feedback on your content',
      projects: 'Create and publish a series of Reels in your niche\nBuild your creator profile\nA brand-style promotional Reel',
      outcomes: 'Speak confidently on camera\nPlan, shoot and edit Reels independently\nA clear niche and personal brand\nA content portfolio you can show brands',
    },
    {
      slug: 'digital-marketing-course', title: 'Digital Marketing Course',
      tagline: 'Learn how brands grow online — from strategy to social media and paid ads.',
      description: 'A practical introduction to digital marketing for students, job seekers and business owners. Learn social media marketing, content strategy, Meta ads and reporting by working on real campaign briefs.',
      level: 'Beginner to intermediate',
      syllabus: 'Digital marketing fundamentals\nSocial media strategy and content calendars\nInstagram and Facebook marketing\nMeta Ads: setup, targeting and budgets\nInfluencer marketing basics\nAnalytics, reporting and optimisation',
      modules: 'Module 1 — How digital marketing works\nModule 2 — Audience and brand strategy\nModule 3 — Social media marketing\nModule 4 — Content planning\nModule 5 — Paid ads on Meta\nModule 6 — Influencer collaborations\nModule 7 — Measuring results',
      practical: 'Live campaign brief exercises\nBuilding a content calendar\nSetting up an ad campaign step by step\nReading insights and writing reports',
      projects: 'A digital marketing plan for a real business\nA one-month social media calendar\nA sample ad campaign with targeting and creatives',
      outcomes: 'Plan a social media strategy\nRun and optimise basic paid campaigns\nMeasure and report campaign results\nReady for entry-level marketing roles or your own business',
    },
    {
      slug: 'video-editing-course', title: 'Video Editing Course',
      tagline: 'Turn raw footage into Reels, ads and stories that keep people watching.',
      description: 'Learn professional video editing for social media and brands — cutting for pace, transitions, colour, sound and subtitles — using the same workflow our editors use for client projects.',
      level: 'Beginner to intermediate',
      syllabus: 'Editing fundamentals and storytelling\nCutting for pace and retention\nTransitions and motion text\nColour correction and grading\nSound design and music\nSubtitles, formats and exporting',
      modules: 'Module 1 — Editing software and workflow\nModule 2 — Story and pacing\nModule 3 — Reels and short-form editing\nModule 4 — Transitions and effects\nModule 5 — Colour\nModule 6 — Sound\nModule 7 — Delivery for every platform',
      practical: 'Edit real footage from our shoots\nRecreate trending Reel styles\nBefore-and-after colour sessions\nReview sessions with our editors',
      projects: 'A Reel edited from raw footage\nA brand promotional video\nYour editing showreel',
      outcomes: 'Edit Reels and ads independently\nColour and sound that look professional\nA showreel for clients or employers\nReady for freelance or studio editing work',
    },
  ].map((c, i) => ({ id: `course-${i + 1}`, thumbnail: '', duration: '', published: true, sort_order: i, ...c })),

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
    // The six agency service titles must stay in this list (service pages preselect them).
    serviceOptions: ['Social Media Marketing', 'Social Media Management', 'Influencer Marketing', 'Performance Marketing', 'Brand Promotion', 'Digital Marketing Strategy', 'Content production & video shoots', 'Video / Reels editing', 'Product photography & videography', 'Something else'],
    contactTopics: ['Social Media Marketing', 'Social Media Management', 'Influencer Marketing', 'Performance Marketing', 'Brand Promotion', 'Digital Marketing Strategy', 'Content Production', 'Naaa Talks Academy', 'Careers', 'Something else'],
    budgetOptions: ['Below ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000', 'Not decided'],
    timelineOptions: ['Within 1 week', 'Within 2 weeks', 'Within 1 month', 'Flexible'],
    // "What do you need?" on the Content Production enquiry.
    productionOptions: ['Content Production & Video Shoots', 'Instagram Reels', 'Promotional Videos', 'Product Photography', 'Brand Videos', 'Video Editing', 'Script Writing', 'Other'],
    nicheOptions: ['Lifestyle', 'Fashion & beauty', 'Food', 'Travel', 'Tech', 'Fitness', 'Education', 'Comedy & entertainment', 'Not sure yet'],
    cameraOptions: ['Never been on camera', 'A little — I feel nervous', 'Comfortable on camera', 'I already post content'],
    experienceOptions: ['Fresher', 'Less than 1 year', '1–3 years', '3+ years'],
  },

  // ── Inner page copy ────────────────────────────────────────────────────────
  pages: {
    about: { eyebrow: 'About us', title: ['We create.', 'We educate. We grow.'], subtitle: 'A creative ecosystem where businesses grow, creators develop their talent and ordinary individuals get the chance to become influencers.' },
    services: { eyebrow: 'Services', title: ['Digital marketing that', 'grows your business.'], subtitle: 'Six services that work together — strategy, social media, influencers, paid campaigns and brand promotion — backed by our in-house content production team.' },
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
    careers: { eyebrow: 'Careers', title: ['Creativity, fresh ideas', 'and people who love learning.'] },
    contact: { eyebrow: 'Contact us', title: ['Let’s Create Something', 'Great Together.'], subtitle: 'Have a business to grow, a creative idea to discuss or want to join our journey? Let’s talk.' },
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
