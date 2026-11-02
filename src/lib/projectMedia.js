// Shape a portfolio project (database row) for the shared media modal.
export const projectToMedia = (p, aspect = 'portrait') => ({
  title: p.title,
  category: p.category,
  description: p.description,
  image: p.thumbnail,
  videoUrl: p.video_url,
  embedUrl: p.embed_url,
  link: p.instagram_url || p.youtube_url || null,
  platform: p.instagram_url ? 'instagram' : p.youtube_url ? 'youtube' : p.platform,
  isSample: p.is_sample,
  aspect,
})
