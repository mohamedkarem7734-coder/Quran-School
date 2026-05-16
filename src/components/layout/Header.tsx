import { Link, useLocation } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-100/80 border-b border-cream-300/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brown-600 flex items-center justify-center group-hover:bg-brown-500 transition-colors">
              <BookOpen className="w-5 h-5 text-gold-500" />
            </div>
            <span className="hidden sm:block text-sm font-bold text-brown-800">
              الماهر بالقرآن
            </span>
          </Link>

          {!isHome && (
            <Link
              to="/"
              className="text-sm font-semibold text-brown-600 hover:text-brown-500 transition-colors"
            >
              الرئيسية
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
