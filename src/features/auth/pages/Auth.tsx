import { useState } from 'react'
import { useAuth } from '../../../shared/context/AuthContext'
import { AuthHeader } from '../components/AuthHeader'
import { AuthModeToggle, type AuthMode } from '../components/AuthModeToggle'
import { AuthForm } from '../components/AuthForm'

export function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
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
        <AuthHeader />
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <AuthModeToggle mode={mode} onChange={setMode} />
          <AuthForm
            mode={mode}
            form={form}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
