export type AuthMode = 'login' | 'register'

interface AuthModeToggleProps {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthModeToggle({ mode, onChange }: AuthModeToggleProps) {
  return (
    <div className="flex gap-1 mb-6 bg-gray-800 rounded-xl p-1">
      <button
        onClick={() => onChange('login')}
        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
          mode === 'login' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Autentificare
      </button>
      <button
        onClick={() => onChange('register')}
        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
          mode === 'register' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Înregistrare
      </button>
    </div>
  )
}
