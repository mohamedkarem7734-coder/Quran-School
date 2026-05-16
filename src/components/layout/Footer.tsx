import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-cream-300/50 bg-cream-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center text-sm text-brown-400 space-y-1">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - مدرسة القرآن الكريم</p>
          <p>بجمعية تنمية المجتمع بأولاد نجم بهجورة - نجع حمادي</p>
          <div className="pt-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-brown-400 hover:text-brown-600 transition-colors text-xs"
            >
              <Shield className="w-3 h-3" />
              دخول الإدارة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
