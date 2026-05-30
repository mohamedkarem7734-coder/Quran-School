import { Link } from 'react-router-dom'
import { BookOpen, ScrollText, CalendarDays, MapPin, ChevronDown, Phone, User } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const sections = [
  {
    id: 'conditions',
    icon: ScrollText,
    title: 'الشروط',
    items: [
      'حفظ القرآن كاملًا مع إتقان التجويد',
      'إتقان التفسير الميسر لجزء عم',
      'المشاركة متاحة لجميع الأعمار والجنسين',
      'غير مسموح بمشاركة معلمي القرآن بالأزهر',
      'غير مسموح بمشاركة أئمة وخطباء الأوقاف',
      'غير مسموح بمشاركة الفائزين في مسابقة العام الماضي',
      'التقديم قاصر على ساكني مركز ومدينة نجع حمادي وقراها',
    ],
  },
  {
    id: 'dates',
    icon: CalendarDays,
    title: 'مواعيد مهمة',
    items: [
      'التقديم: من 1 يونيو 2026 حتى 30 يونيو 2026',
      'موعد الاختبارات: خلال النصف الثاني من شهر أغسطس 2026',
      'سيتم إخطار كل متسابق بموعد اختباره',
    ],
  },
  {
    id: 'location',
    icon: MapPin,
    title: 'مكان الاختبارات والتقديم',
    items: [
      'مدرسة القرآن الكريم',
      'نجع كمبل - أولاد نجم بهجورة - نجع حمادي',
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
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">
        {/* Background image */}
        <picture>
          <source srcSet="/hero-banner-2026-mobile.webp" media="(max-width: 640px)" />
          <img
            src="/hero-banner-2026.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_25%] sm:object-[center_30%]"
            loading="eager"
          />
        </picture>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 relative text-center">
          {/* Mobile text group container */}
          <div className="max-sm:bg-[rgb(255,248,232)]/25 max-sm:backdrop-blur-[2px] max-sm:rounded-xl max-sm:p-2.5 max-sm:shadow-sm max-sm:shadow-brown-900/5 max-sm:mb-5">
            {/* Organizer label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brown-600/10 text-brown-600 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              <span>للعام الثالث على التوالي</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl max-sm:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brown-800 max-sm:leading-snug sm:leading-tight mb-4" style={{ textShadow: '0 2px 20px rgba(253,251,247,0.95), 0 1px 6px rgba(44,24,16,0.2)' }}>
              مسابقة
              <br />
              <span className="text-brown-600">الماهر بالقرآن الكريم</span>
              <br />
              <span className="text-gold-500">2026</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg max-sm:text-base sm:text-xl text-brown-600/90 max-w-2xl max-sm:max-w-[280px] mx-auto max-sm:mb-0 mb-8 font-medium" style={{ textShadow: '0 1px 10px rgba(253,251,247,0.9), 0 1px 4px rgba(44,24,16,0.15)' }}>
              مسابقة لحفظ القرآن الكريم كاملًا على مستوى مركز ومدينة نجع حمادي
            </p>
          </div>

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
              className="text-xl px-10 py-4 min-w-[200px] bg-warm-white/55 backdrop-blur-sm border-brown-600/70 hover:bg-warm-white/75"
            >
              عرض الشروط
            </Button>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo('conditions')}
            className="mt-12 text-brown-400 hover:text-brown-500 transition-colors animate-bounce"
            style={{ textShadow: '0 1px 8px rgba(253,251,247,0.85), 0 1px 2px rgba(44,24,16,0.12)' }}
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
            الفرصة متاحة من 1 يونيو حتى 30 يونيو 2026
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
