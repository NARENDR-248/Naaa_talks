// Look of each homepage service poster: gradient, optional photo, category and illustration.
// Same URL format and width as the portfolio thumbnails, so a shared photo downloads once.
const photo = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

const VISUALS = {
  'social-media-marketing': { category: 'Creativity', from: '#ff2d55', via: '#b0103a', to: '#2a0410', image: photo('1512941937669-90a1b58e7e9c'), art: 'social' },
  'social-media-management': { category: 'Strategy', from: '#ff8a3d', via: '#c2410c', to: '#2b0d05', image: photo('1504674900247-0877df9cc836'), art: 'calendar' },
  'influencer-marketing': { category: 'Creativity', from: '#c084fc', via: '#7e22ce', to: '#1a0530', image: photo('1534528741775-53994a69daeb'), art: 'creator' },
  'performance-marketing': { category: 'Growth', from: '#38bdf8', via: '#1d4ed8', to: '#050b24', image: null, art: 'chart' },
  'brand-promotion': { category: 'Creativity', from: '#fbbf24', via: '#c2410c', to: '#2a0f04', image: photo('1556228578-8c89e6adf883'), art: 'brand' },
  'digital-marketing-strategy': { category: 'Strategy', from: '#4ade80', via: '#15803d', to: '#03170b', image: null, art: 'strategy' },
}
const FALLBACK = { category: 'Growth', from: '#ff2d55', via: '#7a0a1a', to: '#120306', image: null, art: 'strategy' }

export const visualFor = (service) => VISUALS[service?.slug] ?? FALLBACK
