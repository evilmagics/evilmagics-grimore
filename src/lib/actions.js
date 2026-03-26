'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteCloudinaryImage, uploadProjectImage, uploadPhotoImage } from '@/lib/cloudinary'

// ============================================
// AUTH ACTIONS
// ============================================

/**
 * Sign out the current user and redirect to login
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ============================================
// MESSAGE ACTIONS (Contact form - public)
// ============================================

/**
 * Submit a contact message (public, no auth required)
 */
export async function submitMessage({ email, name, subject, content }) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('messages')
    .insert({
      sender_email: email,
      sender_name: name?.trim() || null,
      subject,
      content,
    })

  if (error) {
    return { success: false, error: 'Failed to send message. Please try again.' }
  }

  return { success: true }
}

/**
 * Mark message as read (admin only)
 */
export async function markMessageRead(messageId) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

/**
 * Delete a message (admin only)
 */
export async function deleteMessage(messageId) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

// ============================================
// PROJECT CRUD ACTIONS (Admin only)
// ============================================

/**
 * Generate next IDX for project (CONSTRUCT_XXX)
 */
async function generateNextIdx() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('idx')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('[ACTION] generateNextIdx error:', error.message)
    const randomNum = Math.floor(Math.random() * 900) + 100
    return `CONSTRUCT_${randomNum}`
  }

  if (!data || data.length === 0) {
    return 'CONSTRUCT_001'
  }

  const lastIdx = data[0].idx
  const match = lastIdx?.match(/CONSTRUCT_(\d+)/)
  if (!match) {
    const randomNum = Math.floor(Math.random() * 900) + 100
    return `CONSTRUCT_${randomNum}`
  }

  const nextNum = parseInt(match[1], 10) + 1
  return `CONSTRUCT_${String(nextNum).padStart(3, '0')}`
}

async function requireAdmin(supabase) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }

  return user
}

function readImageFiles(formData) {
  return formData
    .getAll('images')
    .filter((file) => file && typeof file === 'object' && typeof file.arrayBuffer === 'function' && file.size > 0)
}

async function insertProjectImages({ supabase, projectId, projectSlug, imageFiles = [], startSortOrder = 0 }) {
  if (!imageFiles.length) return []

  const uploadedRecords = []
  const uploadedPublicIds = []

  try {
    for (let i = 0; i < imageFiles.length; i += 1) {
      const uploadResult = await uploadProjectImage({
        file: imageFiles[i],
        projectSlug,
        sortOrder: startSortOrder + i,
        isPrimary: startSortOrder + i === 0,
      })

      uploadedPublicIds.push(uploadResult.cloudinary_public_id)
      uploadedRecords.push({
        project_id: projectId,
        ...uploadResult,
      })
    }

    const { data, error } = await supabase
      .from('project_images')
      .insert(uploadedRecords)
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    await Promise.all(uploadedPublicIds.map((publicId) => deleteCloudinaryImage(publicId).catch(() => null)))
    throw error
  }
}

async function removeProjectImages({ supabase, projectId, imageIds = [] }) {
  if (!imageIds.length) return { success: true }

  const { data: existing, error: fetchError } = await supabase
    .from('project_images')
    .select('id, cloudinary_public_id')
    .eq('project_id', projectId)
    .in('id', imageIds)

  if (fetchError) {
    return { success: false, error: fetchError.message }
  }

  if (existing?.length) {
    await Promise.all(existing.map((image) => deleteCloudinaryImage(image.cloudinary_public_id).catch(() => null)))
  }

  const { error: deleteError } = await supabase
    .from('project_images')
    .delete()
    .eq('project_id', projectId)
    .in('id', imageIds)

  if (deleteError) {
    return { success: false, error: deleteError.message }
  }

  return { success: true }
}

async function ensureSinglePrimaryImage({ supabase, projectId, preferredImageId = null }) {
  const { data: currentImages, error } = await supabase
    .from('project_images')
    .select('id')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error || !currentImages?.length) {
    return
  }

  const nextPrimaryId = currentImages.find((img) => img.id === preferredImageId)?.id || currentImages[0].id

  await supabase
    .from('project_images')
    .update({ is_primary: false })
    .eq('project_id', projectId)

  await supabase
    .from('project_images')
    .update({ is_primary: true })
    .eq('id', nextPrimaryId)
    .eq('project_id', projectId)
}

/**
 * Create a new project
 */
export async function createProject(formData) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const title = formData.get('title')
  const slug = formData.get('slug')
  const summary = formData.get('summary')
  const description = formData.get('description')
  const manaCost = parseInt(formData.get('mana_cost'), 10) || 10
  const tags = formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || []
  const liveUrl = formData.get('live_url') || null
  const repoUrl = formData.get('repo_url') || null
  const featuredRaw = formData.get('featured')
  const featured = featuredRaw === 'on' || featuredRaw === 'true' || featuredRaw === true
  const coverGradient = formData.get('cover_gradient') || 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)'
  const techIds = formData.getAll('tech_ids') || []
  const imageFiles = readImageFiles(formData)

  // Generate IDX
  const idx = await generateNextIdx()

  // Insert project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      idx,
      title,
      slug,
      summary,
      description,
      mana_cost: manaCost,
      tags,
      live_url: liveUrl,
      repo_url: repoUrl,
      featured,
      cover_gradient: coverGradient,
    })
    .select()
    .single()

  if (projectError) {
    console.error('[ACTION] createProject error:', projectError.message)
    return { success: false, error: projectError.message }
  }

  // Insert tech stack relationships
  if (techIds.length > 0) {
    const projectTechRelations = techIds.map(techId => ({
      project_id: project.id,
      tech_id: techId,
    }))

    const { error: junctionError } = await supabase
      .from('project_tech')
      .insert(projectTechRelations)

    if (junctionError) {
      console.error('[ACTION] createProject junction error:', junctionError.message)
      // Rollback project creation
      await supabase.from('projects').delete().eq('id', project.id)
      return { success: false, error: junctionError.message }
    }
  }

  try {
    await insertProjectImages({
      supabase,
      projectId: project.id,
      projectSlug: slug,
      imageFiles,
      startSortOrder: 0,
    })
  } catch (imageError) {
    console.error('[ACTION] createProject image upload error:', imageError.message)
    await supabase.from('projects').delete().eq('id', project.id)
    return { success: false, error: imageError.message }
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { success: true, project }
}

/**
 * Update an existing project
 */
export async function updateProject(projectId, formData) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const title = formData.get('title')
  const slug = formData.get('slug')
  const summary = formData.get('summary')
  const description = formData.get('description')
  const manaCost = parseInt(formData.get('mana_cost'), 10) || 10
  const tags = formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || []
  const liveUrl = formData.get('live_url') || null
  const repoUrl = formData.get('repo_url') || null
  const featuredRaw = formData.get('featured')
  const featured = featuredRaw === 'on' || featuredRaw === 'true' || featuredRaw === true
  const coverGradient = formData.get('cover_gradient') || 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)'
  const techIds = formData.getAll('tech_ids') || []
  const imageFiles = readImageFiles(formData)
  const removedImageIds = formData.getAll('removed_image_ids').filter(Boolean)
  const primaryImageId = formData.get('primary_image_id') || null

  // Update project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .update({
      title,
      slug,
      summary,
      description,
      mana_cost: manaCost,
      tags,
      live_url: liveUrl,
      repo_url: repoUrl,
      featured,
      cover_gradient: coverGradient,
    })
    .eq('id', projectId)
    .select()
    .single()

  if (projectError) {
    console.error('[ACTION] updateProject error:', projectError.message)
    return { success: false, error: projectError.message }
  }

  // Update tech stack relationships (delete old, insert new)
  const { error: deleteJunctionError } = await supabase
    .from('project_tech')
    .delete()
    .eq('project_id', projectId)

  if (deleteJunctionError) {
    console.error('[ACTION] updateProject delete junction error:', deleteJunctionError.message)
    return { success: false, error: deleteJunctionError.message }
  }

  if (techIds.length > 0) {
    const projectTechRelations = techIds.map(techId => ({
      project_id: projectId,
      tech_id: techId,
    }))

    const { error: insertJunctionError } = await supabase
      .from('project_tech')
      .insert(projectTechRelations)

    if (insertJunctionError) {
      console.error('[ACTION] updateProject insert junction error:', insertJunctionError.message)
      return { success: false, error: insertJunctionError.message }
    }
  }

  if (removedImageIds.length > 0) {
    const removeResult = await removeProjectImages({
      supabase,
      projectId,
      imageIds: removedImageIds,
    })

    if (!removeResult.success) {
      return removeResult
    }
  }

  if (imageFiles.length > 0) {
    const { count: existingCount } = await supabase
      .from('project_images')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', projectId)

    try {
      await insertProjectImages({
        supabase,
        projectId,
        projectSlug: slug,
        imageFiles,
        startSortOrder: existingCount || 0,
      })
    } catch (imageError) {
      return { success: false, error: imageError.message }
    }
  }

  await ensureSinglePrimaryImage({ supabase, projectId, preferredImageId: primaryImageId })

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { success: true, project }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const { data: images } = await supabase
    .from('project_images')
    .select('cloudinary_public_id')
    .eq('project_id', projectId)

  if (images?.length) {
    await Promise.all(images.map((image) => deleteCloudinaryImage(image.cloudinary_public_id).catch(() => null)))
  }

  // Delete project (cascade will handle project_tech)
  const { error: deleteError } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)

  if (deleteError) {
    console.error('[ACTION] deleteProject error:', deleteError.message)
    return { success: false, error: deleteError.message }
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { success: true }
}

export async function reorderProjectImages(projectId, orderedImageIds = []) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  if (!Array.isArray(orderedImageIds) || orderedImageIds.length === 0) {
    return { success: false, error: 'orderedImageIds is required' }
  }

  for (let i = 0; i < orderedImageIds.length; i += 1) {
    const imageId = orderedImageIds[i]
    const { error } = await supabase
      .from('project_images')
      .update({ sort_order: i })
      .eq('id', imageId)
      .eq('project_id', projectId)

    if (error) {
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { success: true }
}

export async function removeProjectImage(projectId, imageId) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const result = await removeProjectImages({
    supabase,
    projectId,
    imageIds: [imageId],
  })

  if (!result.success) {
    return result
  }

  await ensureSinglePrimaryImage({ supabase, projectId })

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { success: true }
}

// ============================================
// PHOTO CRUD ACTIONS — Issues #1 & #2
// ============================================

/**
 * Create a new photo (echo)
 */
export async function createPhoto(formData) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const title = formData.get('title') || null
  const categoryId = formData.get('category_id') || null
  const aspect = formData.get('aspect') || '4/3'
  const featured = formData.get('featured') === 'true'
  const capturedAt = formData.get('captured_at') || null
  const file = formData.get('image')
  const exifRaw = formData.get('exif_data')

  let exifData = null
  if (exifRaw) {
    try { exifData = JSON.parse(exifRaw) } catch {}
  }

  // Parse manual EXIF fields
  const aperture = formData.get('exif_aperture')
  const shutter = formData.get('exif_shutter')
  const iso = formData.get('exif_iso')
  const focal = formData.get('exif_focal')
  if (aperture || shutter || iso || focal) {
    exifData = {
      ...(exifData || {}),
      ...(aperture && { aperture }),
      ...(shutter && { shutter }),
      ...(iso && { iso }),
      ...(focal && { focal }),
    }
  }

  let cloudinaryData = {}
  if (file && typeof file === 'object' && typeof file.arrayBuffer === 'function' && file.size > 0) {
    try {
      cloudinaryData = await uploadPhotoImage({ file, title: title || 'echo' })
    } catch (err) {
      return { success: false, error: `Image upload failed: ${err.message}` }
    }
  }

  const { error } = await supabase.from('photos').insert({
    title,
    category_id: categoryId || null,
    aspect,
    featured,
    captured_at: capturedAt || null,
    exif_data: exifData,
    ...cloudinaryData,
  })

  if (error) {
    if (cloudinaryData.cloudinary_id) {
      await deleteCloudinaryImage(cloudinaryData.cloudinary_id).catch(() => null)
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
  return { success: true }
}

/**
 * Update an existing photo (echo) — Issues #2
 */
export async function updatePhoto(photoId, formData) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const title = formData.get('title') || null
  const categoryId = formData.get('category_id') || null
  const aspect = formData.get('aspect') || '4/3'
  const featured = formData.get('featured') === 'true'
  const capturedAt = formData.get('captured_at') || null
  const file = formData.get('image')

  const aperture = formData.get('exif_aperture')
  const shutter = formData.get('exif_shutter')
  const iso = formData.get('exif_iso')
  const focal = formData.get('exif_focal')
  const exifData = (aperture || shutter || iso || focal)
    ? { ...(aperture && { aperture }), ...(shutter && { shutter }), ...(iso && { iso }), ...(focal && { focal }) }
    : null

  let cloudinaryData = {}
  let oldCloudinaryId = null

  if (file && typeof file === 'object' && typeof file.arrayBuffer === 'function' && file.size > 0) {
    // Fetch old cloudinary_id for cleanup
    const { data: existing } = await supabase.from('photos').select('cloudinary_id').eq('id', photoId).single()
    oldCloudinaryId = existing?.cloudinary_id

    try {
      cloudinaryData = await uploadPhotoImage({ file, title: title || 'echo' })
    } catch (err) {
      return { success: false, error: `Image upload failed: ${err.message}` }
    }
  }

  const updates = {
    title,
    category_id: categoryId || null,
    aspect,
    featured,
    captured_at: capturedAt || null,
    ...(exifData && { exif_data: exifData }),
    ...cloudinaryData,
  }

  const { error } = await supabase.from('photos').update(updates).eq('id', photoId)

  if (error) {
    if (cloudinaryData.cloudinary_id) {
      await deleteCloudinaryImage(cloudinaryData.cloudinary_id).catch(() => null)
    }
    return { success: false, error: error.message }
  }

  // Cleanup old image after successful update
  if (oldCloudinaryId && cloudinaryData.cloudinary_id) {
    await deleteCloudinaryImage(oldCloudinaryId).catch(() => null)
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
  return { success: true }
}

/**
 * Delete a photo (echo) — Issue #1
 */
export async function deletePhoto(photoId) {
  const supabase = await createClient()

  try {
    await requireAdmin(supabase)
  } catch (error) {
    return { success: false, error: error.message }
  }

  const { data: photo } = await supabase.from('photos').select('cloudinary_id').eq('id', photoId).single()

  if (photo?.cloudinary_id) {
    await deleteCloudinaryImage(photo.cloudinary_id).catch(() => null)
  }

  const { error } = await supabase.from('photos').delete().eq('id', photoId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
  return { success: true }
}
