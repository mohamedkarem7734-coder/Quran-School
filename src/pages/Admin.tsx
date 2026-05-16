import { useState, useEffect, useMemo } from 'react'
import {
  LogIn, LogOut, Search, Users, UserCheck, UserX, Clock,
  FileSpreadsheet, FileText, Trash2,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Toast, useToast } from '../components/ui/Toast'
import type { Registration, RegistrationStatus, Gender } from '../types'
import { listRegistrations, updateRegistrationStatus, deleteRegistration } from '../lib/registrations'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

const statusLabels: Record<RegistrationStatus, string> = {
  pending: 'قيد الانتظار',
  approved: 'مقبول',
  rejected: 'مرفوض',
}

const statusColors: Record<RegistrationStatus, string> = {
  pending: 'bg-gold-100 text-gold-600 border-gold-300/50',
  approved: 'bg-success/10 text-success border-success/30',
  rejected: 'bg-error/10 text-error border-error/30',
}

const genderLabels: Record<Gender, string> = {
  male: 'ذكر',
  female: 'أنثى',
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<Gender | ''>('')
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | ''>('')
  const [participatedFilter, setParticipatedFilter] = useState('')
  const [whatsappFilter, setWhatsappFilter] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const { toast, showToast, clearToast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await listRegistrations()
      setRegistrations(data)
    } catch {
      showToast('حدث خطأ أثناء تحميل البيانات', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) fetchData()
  }, [loggedIn])

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const q = search.trim().toLowerCase()
      if (q) {
        const matches =
          r.full_name.includes(q) ||
          r.phone.includes(q) ||
          r.national_id.includes(q) ||
          r.registration_number.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (genderFilter && r.gender !== genderFilter) return false
      if (statusFilter && r.status !== statusFilter) return false
      if (participatedFilter === 'yes' && !r.participated_before) return false
      if (participatedFilter === 'no' && r.participated_before) return false
      if (whatsappFilter === 'yes' && !r.has_whatsapp) return false
      if (whatsappFilter === 'no' && r.has_whatsapp) return false
      return true
    })
  }, [registrations, search, genderFilter, statusFilter, participatedFilter, whatsappFilter])

  const stats = useMemo(() => ({
    total: registrations.length,
    male: registrations.filter((r) => r.gender === 'male').length,
    female: registrations.filter((r) => r.gender === 'female').length,
    pending: registrations.filter((r) => r.status === 'pending').length,
  }), [registrations])

  const handleStatusChange = async (id: string, status: RegistrationStatus) => {
    try {
      await updateRegistrationStatus(id, status)
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
      showToast('تم تحديث الحالة بنجاح', 'success')
    } catch {
      showToast('حدث خطأ أثناء تحديث الحالة', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRegistration(id)
      setRegistrations((prev) => prev.filter((r) => r.id !== id))
      showToast('تم الحذف بنجاح', 'success')
      setDeleteConfirm(null)
    } catch {
      showToast('حدث خطأ أثناء الحذف', 'error')
    }
  }

  const exportExcel = () => {
    const data = filtered.map((r) => ({
      'رقم التسجيل': r.registration_number,
      'الاسم': r.full_name,
      'السن': r.age,
      'النوع': genderLabels[r.gender],
      'الرقم القومي': r.national_id,
      'الهاتف': r.phone,
      'واتساب': r.has_whatsapp ? 'نعم' : 'لا',
      'الشيخ المحفظ': r.sheikh_name,
      'شارك من قبل': r.participated_before ? 'نعم' : 'لا',
      'الحالة': statusLabels[r.status],
      'تاريخ التسجيل': new Date(r.created_at).toLocaleDateString('ar-EG'),
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'المسجلون')
    XLSX.writeFile(wb, `مسابقة-الماهر-بالقرآن-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const exportPDF = () => {
    const doc = new jsPDF('landscape', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    doc.setFont('cairo', undefined, 'normal')
    doc.text('مسابقة الماهر بالقرآن الكريم 2025 - سجل المتسابقين', pageWidth / 2, 15, { align: 'center' })

    const headers = [
      ['رقم التسجيل', 'الاسم', 'السن', 'النوع', 'الهاتف', 'الرقم القومي', 'واتساب', 'الشيخ المحفظ', 'شارك قبل', 'الحالة', 'تاريخ التسجيل'],
    ]
    const data = filtered.map((r) => [
      r.registration_number,
      r.full_name,
      String(r.age),
      genderLabels[r.gender],
      r.phone,
      r.national_id,
      r.has_whatsapp ? 'نعم' : 'لا',
      r.sheikh_name,
      r.participated_before ? 'نعم' : 'لا',
      statusLabels[r.status],
      new Date(r.created_at).toLocaleDateString('ar-EG'),
    ])

    doc.autoTable({
      head: headers,
      body: data,
      startY: 25,
      theme: 'grid',
      styles: {
        font: 'cairo',
        fontSize: 7,
        cellPadding: 2,
        halign: 'right',
      },
      headStyles: {
        fillColor: [139, 94, 60],
        textColor: [255, 255, 255],
        fontSize: 7,
        halign: 'right',
      },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 30 },
        2: { cellWidth: 10 },
        3: { cellWidth: 12 },
        4: { cellWidth: 22 },
        5: { cellWidth: 25 },
        6: { cellWidth: 14 },
        7: { cellWidth: 28 },
        8: { cellWidth: 16 },
        9: { cellWidth: 18 },
        10: { cellWidth: 22 },
      },
      didDrawPage: (data: { pageCount: number }) => {
        doc.text(`صفحة ${data.pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
      },
    })

    doc.save(`مسابقة-الماهر-بالقرآن-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  if (!loggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-8 sm:p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brown-600 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-gold-500" />
            </div>
            <h1 className="text-2xl font-bold text-brown-800">لوحة التحكم</h1>
            <p className="text-brown-500 mt-1">يرجى إدخال كلمة المرور</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false) }}
                className={`w-full px-4 py-3 bg-cream-50 border-2 rounded-xl text-brown-800 placeholder-brown-300 transition-colors focus:outline-none focus:border-gold-500 text-center text-lg ${loginError ? 'border-error' : 'border-cream-300'}`}
                autoFocus
              />
              {loginError && <p className="text-sm text-error mt-1.5 text-center">كلمة المرور غير صحيحة</p>}
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              دخول
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brown-800">لوحة التحكم</h1>
          <p className="text-brown-500">مسابقة الماهر بالقرآن الكريم 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLoggedIn(false)}>
            <LogOut className="w-4 h-4" />
            خروج
          </Button>
          <Button variant="gold" size="sm" onClick={exportExcel}>
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </Button>
          <Button variant="primary" size="sm" onClick={exportPDF}>
            <FileText className="w-4 h-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'إجمالي المسجلين', value: stats.total, icon: Users, color: 'bg-brown-600/10 text-brown-600' },
          { label: 'ذكور', value: stats.male, icon: UserCheck, color: 'bg-blue-100 text-blue-700' },
          { label: 'إناث', value: stats.female, icon: UserX, color: 'bg-pink-100 text-pink-700' },
          { label: 'قيد الانتظار', value: stats.pending, icon: Clock, color: 'bg-gold-100 text-gold-600' },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-brown-500">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-brown-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="p-4 sm:p-6 mb-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
            <input
              type="text"
              placeholder="بحث بالاسم أو رقم الهاتف أو الرقم القومي أو رقم التسجيل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-cream-50 border-2 border-cream-300 rounded-xl text-brown-800 placeholder-brown-300 transition-colors focus:outline-none focus:border-gold-500"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as Gender | '')}
              className="px-3 py-2 bg-cream-50 border-2 border-cream-300 rounded-xl text-brown-800 text-sm focus:outline-none focus:border-gold-500"
            >
              <option value="">النوع: الكل</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RegistrationStatus | '')}
              className="px-3 py-2 bg-cream-50 border-2 border-cream-300 rounded-xl text-brown-800 text-sm focus:outline-none focus:border-gold-500"
            >
              <option value="">الحالة: الكل</option>
              <option value="pending">قيد الانتظار</option>
              <option value="approved">مقبول</option>
              <option value="rejected">مرفوض</option>
            </select>
            <select
              value={participatedFilter}
              onChange={(e) => setParticipatedFilter(e.target.value)}
              className="px-3 py-2 bg-cream-50 border-2 border-cream-300 rounded-xl text-brown-800 text-sm focus:outline-none focus:border-gold-500"
            >
              <option value="">شارك من قبل: الكل</option>
              <option value="yes">نعم</option>
              <option value="no">لا</option>
            </select>
            <select
              value={whatsappFilter}
              onChange={(e) => setWhatsappFilter(e.target.value)}
              className="px-3 py-2 bg-cream-50 border-2 border-cream-300 rounded-xl text-brown-800 text-sm focus:outline-none focus:border-gold-500"
            >
              <option value="">واتساب: الكل</option>
              <option value="yes">نعم</option>
              <option value="no">لا</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-brown-400">جارٍ التحميل...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brown-600 text-cream-50 text-right">
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">رقم التسجيل</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">الاسم</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">السن</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">النوع</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">الهاتف</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">الرقم القومي</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">واتساب</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">الشيخ المحفظ</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">شارك قبل</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">الحالة</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">تاريخ التسجيل</th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-3 py-8 text-center text-brown-400">
                      لا توجد نتائج
                    </td>
                  </tr>
                ) : (
                  filtered.map((reg) => (
                    <tr key={reg.id} className="border-t border-cream-300/50 hover:bg-cream-100/50 transition-colors">
                      <td className="px-3 py-2.5 font-semibold text-brown-600 whitespace-nowrap" dir="ltr">
                        {reg.registration_number}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">{reg.full_name}</td>
                      <td className="px-3 py-2.5">{reg.age}</td>
                      <td className="px-3 py-2.5">{genderLabels[reg.gender]}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap" dir="ltr">{reg.phone}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap" dir="ltr">{reg.national_id}</td>
                      <td className="px-3 py-2.5">{reg.has_whatsapp ? 'نعم' : 'لا'}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">{reg.sheikh_name}</td>
                      <td className="px-3 py-2.5">{reg.participated_before ? 'نعم' : 'لا'}</td>
                      <td className="px-3 py-2.5">
                        <select
                          value={reg.status}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value as RegistrationStatus)}
                          className={`px-2 py-1 rounded-lg border text-xs font-semibold cursor-pointer focus:outline-none ${statusColors[reg.status]}`}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="approved">مقبول</option>
                          <option value="rejected">مرفوض</option>
                        </select>
                      </td>
                      <td className="px-3 py-2.5 text-brown-500 text-xs whitespace-nowrap">
                        {new Date(reg.created_at).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="px-3 py-2.5">
                        {deleteConfirm === reg.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(reg.id)}
                              className="px-2 py-1 bg-error text-cream-50 text-xs rounded-lg font-semibold"
                            >
                              تأكيد
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-brown-300 text-brown-800 text-xs rounded-lg font-semibold"
                            >
                              إلغاء
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(reg.id)}
                            className="p-1.5 text-brown-400 hover:text-error transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
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
