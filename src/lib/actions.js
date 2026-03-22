'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
export async function submitMessage({ email, subject, content }) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('messages')
    .insert({
      sender_email: email,
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
