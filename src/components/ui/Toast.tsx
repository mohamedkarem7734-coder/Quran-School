import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'info', onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-error" />,
    info: <Info className="w-5 h-5 text-brown-600" />,
  }

  const bgColors = {
    success: 'bg-success/10 border-success/30',
    error: 'bg-error/10 border-error/30',
    info: 'bg-brown-600/10 border-brown-600/20',
  }

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-lg backdrop-blur-sm ${bgColors[type]} bg-warm-white/95 min-w-[280px]`}>
        {icons[type]}
        <span className="text-sm font-medium text-brown-800 flex-1">{message}</span>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className="text-brown-400 hover:text-brown-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type })
  }

  const clearToast = () => setToast(null)

  return { toast, showToast, clearToast }
}
