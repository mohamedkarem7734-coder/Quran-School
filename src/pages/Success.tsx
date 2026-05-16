import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, BookOpen } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Success() {
  const { registrationNumber } = useParams<{ registrationNumber: string }>()

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <Card className="p-8 sm:p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-7 h-7 text-gold-500" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-brown-800 mb-4">
          تم تسجيلك بنجاح
        </h1>

        <p className="text-brown-600 text-lg mb-6">
          في مسابقة الماهر بالقرآن الكريم 2025
        </p>

        {registrationNumber && (
          <div className="bg-gold-100/60 rounded-2xl border border-gold-300/50 p-4 mb-6">
            <p className="text-sm text-brown-500 mb-1">رقم التسجيل</p>
            <p className="text-2xl font-bold text-brown-800 tracking-wider" dir="ltr">
              {registrationNumber}
            </p>
          </div>
        )}

        <p className="text-brown-500 mb-8">
          سيتم التواصل معك لاحقًا لإبلاغك بموعد الاختبار.
        </p>

        <Link to="/">
          <Button variant="primary" size="lg" className="min-w-[200px]">
            العودة للرئيسية
          </Button>
        </Link>
      </Card>
    </div>
  )
}
