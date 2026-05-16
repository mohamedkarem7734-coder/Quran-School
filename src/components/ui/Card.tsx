import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}

export function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return (
    <Tag className={`bg-warm-white rounded-2xl border border-cream-300/60 shadow-lg shadow-brown-900/5 ${className}`}>
      {children}
    </Tag>
  )
}
