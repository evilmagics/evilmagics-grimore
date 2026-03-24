import { v2 as cloudinary } from 'cloudinary'

let isConfigured = false

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024

function ensureCloudinaryConfigured() {
    if (isConfigured) return

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error('Cloudinary environment variables are not fully configured')
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    })

    isConfigured = true
}

function sanitizeSegment(value) {
    return String(value || 'untitled')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '')
}

function uploadBuffer(buffer, options) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })

        stream.end(buffer)
    })
}

export function validateImageFile(file) {
    if (!file) return { valid: false, error: 'File is missing' }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: `Unsupported image type: ${file.type || 'unknown'}`,
        }
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return {
            valid: false,
            error: `Image "${file.name}" exceeds 10MB limit`,
        }
    }

    return { valid: true }
}

export async function uploadProjectImage({ file, projectSlug, sortOrder = 0, isPrimary = false }) {
    ensureCloudinaryConfigured()

    const validation = validateImageFile(file)
    if (!validation.valid) {
        throw new Error(validation.error)
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const baseFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'grimoire/projects'
    const slug = sanitizeSegment(projectSlug)
    const folder = `${baseFolder}/${slug}`
    const publicId = `${slug}-${Date.now()}-${sortOrder}`

    const uploaded = await uploadBuffer(buffer, {
        folder,
        public_id: publicId,
        resource_type: 'image',
        overwrite: false,
    })

    return {
        cloudinary_public_id: uploaded.public_id,
        image_url: uploaded.url,
        secure_url: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
        bytes: uploaded.bytes,
        sort_order: sortOrder,
        is_primary: isPrimary,
    }
}

export async function deleteCloudinaryImage(publicId) {
    if (!publicId) return
    ensureCloudinaryConfigured()

    await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
    })
}

export async function uploadPhotoImage({ file, title = 'untitled' }) {
    ensureCloudinaryConfigured()

    const validation = validateImageFile(file)
    if (!validation.valid) {
        throw new Error(validation.error)
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const baseFolder = 'grimoire/echoes'
    const slug = sanitizeSegment(title)
    const publicId = `${slug}-${Date.now()}`

    const uploaded = await uploadBuffer(buffer, {
        folder: baseFolder,
        public_id: publicId,
        resource_type: 'image',
        overwrite: false,
    })

    return {
        cloudinary_id: uploaded.public_id,
        image_url: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
        bytes: uploaded.bytes,
    }
}

