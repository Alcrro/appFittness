import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Dumbbell } from 'lucide-react'

type Mode = 'login' | 'register'

export function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = mode === 'login'
      ? await signIn(form.email, form.password)
      : await signUp(form.email, form.password, form.fullName)

    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-2xl mb-4">
            <Dumbbell size={32} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-black text-white">AppFitness</h1>
          <p className="text-gray-400 mt-1">Trackează-ți progresul la sală</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex gap-1 mb-6 bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'login' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Autentificare
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'register' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Înregistrare
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <Input
                label="Nume complet"
                name="fullName"
                type="text"
                placeholder="Ion Ionescu"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="email@exemplu.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Parolă"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
              {loading ? 'Se procesează...' : mode === 'login' ? 'Intră în cont' : 'Creează cont'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
