import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <input
        className={`bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all
          ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
