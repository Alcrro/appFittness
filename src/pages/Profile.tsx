import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSessions } from '../hooks/useSessions'
import { useWorkouts } from '../hooks/useWorkouts'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { User, LogOut, Dumbbell, Calendar, Flame } from 'lucide-react'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const { sessions } = useSessions()
  const { workouts } = useWorkouts()
  const [signingOut, setSigningOut] = useState(false)

  const name = (user?.user_metadata?.full_name as string | undefined) ?? 'Utilizator'
  const email = user?.email ?? ''

  const finishedSessions = sessions.filter(s => s.finished_at)
  const totalMins = finishedSessions.reduce((acc, s) => {
    if (!s.started_at || !s.finished_at) return acc
    return acc + Math.round((new Date(s.finished_at).getTime() - new Date(s.started_at).getTime()) / 60000)
  }, 0)

  const thisWeek = finishedSessions.filter(s => {
    const d = new Date(s.started_at)
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    return d >= startOfWeek
  }).length

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
  }

  return (
    <div className="space-y-6 pt-2">
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
            <User size={28} className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <Flame size={18} className="text-orange-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-white">{finishedSessions.length}</div>
          <div className="text-xs text-gray-400">Total antrenamente</div>
        </Card>
        <Card className="p-4 text-center">
          <Calendar size={18} className="text-orange-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-white">{thisWeek}</div>
          <div className="text-xs text-gray-400">Săptămâna aceasta</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-black text-white">
            {totalMins >= 60 ? `${Math.floor(totalMins / 60)}h` : `${totalMins}m`}
          </div>
          <div className="text-xs text-gray-400">Timp total</div>
        </Card>
        <Card className="p-4 text-center">
          <Dumbbell size={18} className="text-orange-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-white">{workouts.length}</div>
          <div className="text-xs text-gray-400">Planuri create</div>
        </Card>
      </div>

      <Button variant="secondary" className="w-full" onClick={handleSignOut} disabled={signingOut}>
        <LogOut size={16} />
        {signingOut ? 'Se deconectează...' : 'Deconectare'}
      </Button>
    </div>
  )
}
