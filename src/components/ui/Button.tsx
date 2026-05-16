import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brown-600 text-cream-50 hover:bg-brown-500 shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-gold-500 text-brown-800 hover:bg-gold-400 shadow-sm hover:shadow-md active:scale-[0.98]',
    ghost: 'bg-transparent text-brown-600 hover:bg-brown-600/10 border-2 border-brown-600/30',
    danger: 'bg-error text-cream-50 hover:bg-red-700 shadow-md',
    gold: 'bg-gradient-to-br from-gold-500 to-gold-400 text-brown-800 shadow-md hover:shadow-lg active:scale-[0.98]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
