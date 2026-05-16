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
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected'
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
}

export interface AdminFilterState {
  search: string
  gender: Gender | ''
  status: RegistrationStatus | ''
  participated_before: string
  has_whatsapp: string
}
