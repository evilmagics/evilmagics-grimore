import { createClient, createPublicClient } from '@/utils/supabase/server'

/**
 * Fetch all active tech stack items, ordered by category
 */
export async function fetchTechStack() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('tech_stack')
    .select('id, name, category, sub_category, icon_key')
    .eq('is_active', true)
    .order('category')
    .order('name')

  if (error) {
    console.error('[QUERY] fetchTechStack error:', error.message)
    return []
  }
  return data
}

/**
 * Fetch all projects with their associated tech stack (via junction)
 */
export async function fetchProjects() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id, idx, title, slug, summary, description,
      cover_url, cover_gradient, mana_cost,
      tags, live_url, repo_url, featured, created_at,
      project_images (
        id,
        cloudinary_public_id,
        image_url,
        secure_url,
        width,
        height,
        format,
        bytes,
        alt_text,
        sort_order,
        is_primary,
        created_at
      ),
      project_tech (
        tech_stack ( id, name, icon_key, category )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[QUERY] fetchProjects error:', error.message)
    return []
  }

  // Flatten the nested tech relations
  return data.map(project => ({
    ...project,
    techs: project.project_tech?.map(pt => pt.tech_stack) || [],
    images: (project.project_images || [])
      .slice()
      .sort((a, b) => {
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }),
  }))
}

/**
 * Fetch only featured projects (for home page preview)
 */
export async function fetchFeaturedProjects() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id, idx, title, slug, summary,
      cover_gradient, mana_cost, tags, featured,
      project_tech (
        tech_stack ( name, icon_key )
      )
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('[QUERY] fetchFeaturedProjects error:', error.message)
    return []
  }

  return data.map(project => ({
    ...project,
    techs: project.project_tech?.map(pt => pt.tech_stack?.name).filter(Boolean) || [],
  }))
}

/**
 * Fetch photos with category info
 */
export async function fetchPhotos() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('photos')
    .select(`
      id, title, gradient, aspect, exif_data, featured,
      image_url, cloudinary_id, captured_at,
      photo_categories ( id, name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[QUERY] fetchPhotos error:', error.message)
    return []
  }

  return data.map(photo => ({
    ...photo,
    category: photo.photo_categories?.name || 'Uncategorized',
  }))
}

/**
 * Fetch photo categories
 */
export async function fetchPhotoCategories() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('photo_categories')
    .select('id, name')
    .order('name')

  if (error) {
    console.error('[QUERY] fetchPhotoCategories error:', error.message)
    return []
  }
  return data
}

/**
 * Fetch dashboard metrics (admin only — counts)
 */
export async function fetchDashboardMetrics() {
  const supabase = await createClient()

  const [projectsRes, photosRes, messagesRes] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('photos').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ])

  return {
    projectCount: projectsRes.count || 0,
    photoCount: photosRes.count || 0,
    unreadMessageCount: messagesRes.count || 0,
  }
}

/**
 * Fetch messages (admin only)
 */
export async function fetchMessages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[QUERY] fetchMessages error:', error.message)
    return []
  }
  return data
}

/**
 * Check Supabase connection health
 */
export async function checkDbHealth() {
  const supabase = createPublicClient()
  const start = Date.now()
  const { error } = await supabase.from('tech_stack').select('id', { head: true, count: 'exact' })
  const latency = Date.now() - start

  return {
    status: error ? 'Error' : 'Online',
    latency,
    error: error?.message || null,
  }
}
