import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Send } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea, Select } from '../components/ui/Input'
import { Toast, useToast } from '../components/ui/Toast'
import type { Gender, RegistrationFormData } from '../types'
import { createRegistration } from '../lib/registrations'

interface FormErrors {
  full_name?: string
  age?: string
  gender?: string
  national_id?: string
  address?: string
  phone?: string
  has_whatsapp?: string
  sheikh_name?: string
  participated_before?: string
}

function validateForm(data: RegistrationFormData): FormErrors {
  const errors: FormErrors = {}

  const nameParts = data.full_name.trim().split(/\s+/)
  if (!data.full_name.trim()) {
    errors.full_name = 'من فضلك أدخل الاسم رباعي'
  } else if (nameParts.length < 3 || !/^[\u0600-\u06FF\s]+$/.test(data.full_name.trim())) {
    errors.full_name = 'من فضلك أدخل الاسم رباعي باللغة العربية'
  }

  const age = parseInt(data.age, 10)
  if (!data.age) {
    errors.age = 'من فضلك أدخل السن'
  } else if (isNaN(age) || age < 3 || age > 100) {
    errors.age = 'من فضلك أدخل سن صحيح (بين 3 و 100)'
  }

  if (!data.gender) {
    errors.gender = 'من فضلك اختر النوع'
  }

  if (!data.national_id.trim()) {
    errors.national_id = 'من فضلك أدخل الرقم القومي'
  } else if (!/^\d{14}$/.test(data.national_id.trim())) {
    errors.national_id = 'من فضلك أدخل الرقم القومي المكون من 14 رقمًا'
  }

  if (!data.address.trim()) {
    errors.address = 'من فضلك أدخل العنوان بالتفصيل'
  } else if (data.address.trim().length < 10) {
    errors.address = 'من فضلك أدخل عنوان أكثر تفصيلًا'
  }

  if (!data.phone.trim()) {
    errors.phone = 'من فضلك أدخل رقم الهاتف'
  } else if (!/^01\d{9}$/.test(data.phone.trim())) {
    errors.phone = 'من فضلك أدخل رقم هاتف صحيح'
  }

  if (data.has_whatsapp === undefined || data.has_whatsapp === null) {
    errors.has_whatsapp = 'من فضلك اختر'
  }

  if (!data.sheikh_name.trim()) {
    errors.sheikh_name = 'من فضلك أدخل اسم الشيخ المحفظ'
  }

  if (data.participated_before === undefined || data.participated_before === null) {
    errors.participated_before = 'من فضلك اختر'
  }

  return errors
}

export default function Register() {
  const navigate = useNavigate()
  const { toast, showToast, clearToast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState<RegistrationFormData>({
    full_name: '',
    age: '',
    gender: '',
    national_id: '',
    address: '',
    phone: '',
    has_whatsapp: false,
    sheikh_name: '',
    participated_before: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const updateField = <K extends keyof RegistrationFormData>(
    key: K,
    value: RegistrationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const registration = await createRegistration(form)
      navigate(`/success/${registration.registration_number}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع'
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Card className="p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brown-800 mb-2">
            التسجيل في المسابقة
          </h1>
          <p className="text-brown-500">
            مسابقة الماهر بالقرآن الكريم 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="الاسم رباعي"
            placeholder="الاسم الكامل بالعربية"
            value={form.full_name}
            onChange={(e) => updateField('full_name', e.target.value)}
            error={errors.full_name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="السن"
              type="number"
              min={3}
              max={100}
              placeholder="مثال: 25"
              value={form.age}
              onChange={(e) => updateField('age', e.target.value)}
              error={errors.age}
            />

            <Select
              label="النوع"
              placeholder="اختر النوع"
              value={form.gender}
              onChange={(e) => updateField('gender', e.target.value as Gender | '')}
              options={[
                { value: 'male', label: 'ذكر' },
                { value: 'female', label: 'أنثى' },
              ]}
              error={errors.gender}
            />
          </div>

          <Input
            label="الرقم القومي"
            placeholder="14 رقمًا"
            maxLength={14}
            value={form.national_id}
            onChange={(e) => updateField('national_id', e.target.value.replace(/\D/g, '').slice(0, 14))}
            error={errors.national_id}
          />

          <Textarea
            label="العنوان بالتفصيل"
            placeholder="المحافظة - المركز - القرية - الشارع - رقم المنزل"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            error={errors.address}
          />

          <Input
            label="رقم الهاتف - يفضل أن يكون عليه واتساب إن وجد"
            placeholder="مثال: 01012345678"
            maxLength={11}
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 11))}
            error={errors.phone}
          />

          <Select
            label="هل رقم الهاتف الذي تم إدخاله يوجد عليه واتساب؟"
            placeholder="اختر"
            value={form.has_whatsapp === true ? 'yes' : form.has_whatsapp === false ? 'no' : ''}
            onChange={(e) => updateField('has_whatsapp', e.target.value === 'yes')}
            options={[
              { value: 'yes', label: 'نعم' },
              { value: 'no', label: 'لا' },
            ]}
            error={errors.has_whatsapp}
          />

          <Input
            label="اسم الشيخ المحفظ"
            placeholder="اسم الشيخ الذي حفظت على يديه"
            value={form.sheikh_name}
            onChange={(e) => updateField('sheikh_name', e.target.value)}
            error={errors.sheikh_name}
          />

          <Select
            label="هل شاركت من قبل في أي من مسابقات القرآن الكريم؟"
            placeholder="اختر"
            value={form.participated_before === true ? 'yes' : form.participated_before === false ? 'no' : ''}
            onChange={(e) => updateField('participated_before', e.target.value === 'yes')}
            options={[
              { value: 'yes', label: 'نعم' },
              { value: 'no', label: 'لا' },
            ]}
            error={errors.participated_before}
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-lg"
              loading={submitting}
            >
              <Send className="w-5 h-5" />
              {submitting ? 'جارٍ التسجيل...' : 'تسجيل'}
            </Button>
          </div>
        </form>
      </Card>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </div>
  )
}
