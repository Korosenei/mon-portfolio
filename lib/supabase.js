// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── PROFIL ─────────────────────────────────────────────────
export async function getProfile() {
  const { data, error } = await supabase.from('profile').select('*').single()
  if (error) throw error
  return data
}

export async function updateProfile(updates) {
  const { data, error } = await supabase.from('profile').update(updates).eq('id', 1).select().single()
  if (error) throw error
  return data
}

// ─── PROJETS ────────────────────────────────────────────────
export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('order_index')
  if (error) throw error
  return data
}

export async function createProject(project) {
  const { data, error } = await supabase.from('projects').insert([project]).select().single()
  if (error) throw error
  return data
}

export async function updateProject(id, updates) {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// ─── COMPÉTENCES ────────────────────────────────────────────
export async function getSkills() {
  const { data, error } = await supabase.from('skills').select('*').order('category')
  if (error) throw error
  return data
}

export async function upsertSkill(skill) {
  const { data, error } = await supabase.from('skills').upsert([skill]).select().single()
  if (error) throw error
  return data
}

// ─── EXPÉRIENCES ────────────────────────────────────────────
export async function getExperiences() {
  const { data, error } = await supabase.from('experiences').select('*').order('order_index')
  if (error) throw error
  return data
}

// ─── MESSAGES CONTACT ───────────────────────────────────────
export async function sendContactMessage(message) {
  const { data, error } = await supabase.from('contact_messages').insert([{
    ...message,
    created_at: new Date().toISOString(),
    read: false,
  }]).select().single()
  if (error) throw error
  return data
}

export async function getContactMessages() {
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// ─── AUTH ────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}
