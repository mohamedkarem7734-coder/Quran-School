import type { Registration, RegistrationFormData } from '../types'
import { supabase } from './supabase'

function generateRegistrationNumber(): string {
  const year = 2025
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `MQ-${year}-${timestamp}${random}`
}

export async function createRegistration(data: RegistrationFormData): Promise<Registration> {
  const registrationNumber = generateRegistrationNumber()

  const { data: result, error } = await supabase
    .from('registrations')
    .insert({
      registration_number: registrationNumber,
      full_name: data.full_name.trim(),
      age: parseInt(data.age, 10),
      gender: data.gender,
      national_id: data.national_id.trim(),
      address: data.address.trim(),
      phone: data.phone.trim(),
      has_whatsapp: data.has_whatsapp,
      sheikh_name: data.sheikh_name.trim(),
      participated_before: data.participated_before,
      was_winner: data.was_winner,
      feedback: data.feedback.trim(),
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      const field = error.message.includes('national_id') ? 'national_id' : 'phone'
      throw new Error(field === 'national_id'
        ? 'هذا الرقم القومي مسجل بالفعل'
        : 'رقم الهاتف مسجل بالفعل'
      )
    }
    throw new Error('حدث خطأ أثناء التسجيل. حاول مرة أخرى.')
  }

  return result
}

export async function listRegistrations(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error('حدث خطأ أثناء تحميل البيانات')
  return data || []
}

export async function deleteRegistration(id: string): Promise<void> {
  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('id', id)

  if (error) throw new Error('حدث خطأ أثناء الحذف')
}

export async function checkRegistration(nationalId?: string): Promise<{ exists: boolean; field?: string }> {
  if (!nationalId) return { exists: false }

  const { data, error } = await supabase
    .from('registrations')
    .select('id')
    .eq('national_id', nationalId)
    .maybeSingle()

  if (error) throw new Error('حدث خطأ أثناء التحقق')

  if (data) return { exists: true, field: 'national_id' }
  return { exists: false }
}
