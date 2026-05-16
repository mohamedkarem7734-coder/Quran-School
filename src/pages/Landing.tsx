import { Link } from 'react-router-dom'
import { BookOpen, ScrollText, ClipboardCheck, CalendarDays, MapPin, ChevronDown, Phone, User } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const sections = [
  {
    id: 'conditions',
    icon: ScrollText,
    title: 'الشروط',
    items: [
      'حفظ القرآن كاملًا مع إتقان التجويد',
      'المشاركة متاحة لجميع الأعمار والجنسين',
      'غير مسموح بمشاركة معلمي القرآن بالأزهر',
      'غير مسموح بمشاركة أئمة وخطباء الأوقاف',
      'غير مسموح بمشاركة الفائزين في مسابقة العام الماضي',
    ],
  },
  {
    id: 'requirements',
    icon: ClipboardCheck,
    title: 'المطلوب للتسجيل',
    items: [
      'صورة شخصية حديثة',
      'صورة شهادة الميلاد أو بطاقة الرقم القومي',
    ],
  },
  {
    id: 'dates',
    icon: CalendarDays,
    title: 'مواعيد مهمة',
    items: [
      'التقديم: من 1 يوليو 2025 حتى 31 يوليو 2025',
      'موعد الاختبارات: خلال النصف الثاني من أغسطس 2025',
      'سيتم إخطار كل متسابق بموعد اختباره',
    ],
  },
  {
    id: 'location',
    icon: MapPin,
    title: 'مكان الاختبارات والتقديم',
    items: [
      'مدرسة القرآن الكريم',
      'نجم قبلي - أولاد نجم بهجورة - نجع حمادي',
    ],
  },
]

export default function Landing() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gold-200/30 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 text-center relative">
          {/* Organizer label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brown-600/10 text-brown-600 text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>مدرسة القرآن الكريم - نجع حمادي</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brown-800 leading-tight mb-4">
            مسابقة
            <br />
            <span className="text-brown-600">الماهر بالقرآن الكريم</span>
            <br />
            <span className="text-gold-500">2025</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-brown-600/80 max-w-2xl mx-auto mb-8 font-medium">
            مسابقة لحفظ القرآن الكريم كاملًا على مستوى مركز ومدينة نجع حمادي
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="text-xl px-10 py-4 min-w-[200px]">
                سجّل الآن
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollTo('conditions')}
            >
              عرض الشروط
            </Button>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo('conditions')}
            className="mt-12 text-brown-400 hover:text-brown-500 transition-colors animate-bounce"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="relative h-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-200/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      </div>

      {/* Sections */}
      <section id="conditions" className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 scroll-mt-24">
        <div className="grid gap-6">
          {sections.map((section) => (
            <Card key={section.id} as="section" className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-gold-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-brown-800 mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-brown-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                        <span className="text-base sm:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <Card as="section" className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brown-800 mb-3">
                للاستعلام والتواصل
              </h2>
              <div className="space-y-2 text-brown-700 text-base sm:text-lg">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span dir="ltr">01021077440</span>
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gold-500" />
                  <span>الأستاذ / كارم علي</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 text-center">
        <Card className="p-8 sm:p-12 bg-gradient-to-br from-brown-600 to-brown-700 border-brown-500 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream-50 mb-3">
            سارع بالتسجيل
          </h2>
          <p className="text-gold-300 text-lg mb-6">
            الفرصة متاحة من 1 يوليو حتى 31 يوليو 2025
          </p>
          <Link to="/register">
            <Button variant="gold" size="lg" className="text-xl px-10 py-4 min-w-[200px] shadow-lg">
              سجّل الآن
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  )
}
