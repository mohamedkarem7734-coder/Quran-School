import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label.replace(/\s+/g, '-')
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-brown-800">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-4 py-3 bg-cream-50 border-2 rounded-xl text-brown-800 placeholder-brown-300 transition-colors focus:outline-none focus:border-gold-500 focus:bg-cream-50 ${error ? 'border-error' : 'border-cream-300'} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-error pr-1">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id || label.replace(/\s+/g, '-')
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-brown-800">
        {label}
      </label>
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 bg-cream-50 border-2 rounded-xl text-brown-800 placeholder-brown-300 transition-colors focus:outline-none focus:border-gold-500 focus:bg-cream-50 resize-none ${error ? 'border-error' : 'border-cream-300'} ${className}`}
        rows={3}
        {...props}
      />
      {error && <p className="text-sm text-error pr-1">{error}</p>}
    </div>
  )
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ label, error, options, placeholder, className = '', id, ...props }: SelectProps) {
  const inputId = id || label.replace(/\s+/g, '-')
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-brown-800">
        {label}
      </label>
      <select
        id={inputId}
        className={`w-full px-4 py-3 bg-cream-50 border-2 rounded-xl text-brown-800 transition-colors focus:outline-none focus:border-gold-500 focus:bg-cream-50 ${error ? 'border-error' : 'border-cream-300'} ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-sm text-error pr-1">{error}</p>}
    </div>
  )
}
