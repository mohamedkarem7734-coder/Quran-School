export interface Registration {
  id: string
  registration_number: string
  full_name: string
  age: number
  gender: 'male' | 'female'
  national_id: string
  address: string
  phone: string
  has_whatsapp: boolean
  sheikh_name: string
  participated_before: boolean
  was_winner: boolean | null
  feedback: string
  created_at: string
}

export type Gender = 'male' | 'female'

export interface RegistrationFormData {
  full_name: string
  age: string
  gender: Gender | ''
  national_id: string
  address: string
  phone: string
  has_whatsapp: boolean
  sheikh_name: string
  participated_before: boolean
  was_winner: boolean | null
  feedback: string
}
