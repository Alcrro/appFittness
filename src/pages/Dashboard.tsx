import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWorkouts } from '../hooks/useWorkouts'
import { useSessions } from '../hooks/useSessions'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Play, Flame, Calendar, TrendingUp, Dumbbell } from 'lucide-react'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })
}

function getDuration(start: string, end: string | null): string | null {
  if (!end) return null
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}min`
}

export function DashboardPage() {
  const { user } = useAuth()
  const { workouts } = useWorkouts()
  const { sessions } = useSessions()
  const navigate = useNavigate()

  const name = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'Sportiv'

  const thisWeek = sessions.filter(s => {
    const d = new Date(s.started_at)
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    return d >= startOfWeek && s.finished_at
  }).length

  const lastSession = sessions.find(s => s.finished_at)

  return (
    <div className="space-y-6 pt-2">
      <div>
        <p className="text-gray-400 text-sm">Bună ziua,</p>
        <h2 className="text-2xl font-black text-white">{name} 👋</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="text-2xl font-black text-orange-500">{thisWeek}</div>
          <div className="text-xs text-gray-400 mt-1">Sesiuni săpt.</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-black text-orange-500">{sessions.filter(s => s.finished_at).length}</div>
          <div className="text-xs text-gray-400 mt-1">Total sesiuni</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-black text-orange-500">{workouts.length}</div>
          <div className="text-xs text-gray-400 mt-1">Planuri</div>
        </Card>
      </div>

      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Dumbbell size={18} className="text-orange-500" />
          Începe antrenament
        </h3>
        {workouts.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-400 mb-3">Nu ai niciun plan de antrenament</p>
            <Button onClick={() => navigate('/antrenamente')}>Creează un plan</Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {workouts.slice(0, 3).map(w => (
              <Card key={w.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{w.name}</div>
                  <div className="text-sm text-gray-400">
                    {w.workout_exercises?.[0]?.count ?? 0} exerciții
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate(`/sesiune/${w.id}`)}>
                  <Play size={14} />
                  Start
                </Button>
              </Card>
            ))}
            {workouts.length > 3 && (
              <button
                onClick={() => navigate('/antrenamente')}
                className="w-full text-center text-sm text-orange-500 hover:text-orange-400 py-2"
              >
                Vezi toate ({workouts.length}) →
              </button>
            )}
          </div>
        )}
      </div>

      {lastSession && (
        <div>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-orange-500" />
            Ultima sesiune
          </h3>
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-white">{lastSession.workout_plans?.name ?? 'Antrenament'}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {formatDate(lastSession.started_at)}
                  {lastSession.finished_at && ` • ${getDuration(lastSession.started_at, lastSession.finished_at)}`}
                </div>
                {lastSession.notes && (
                  <div className="text-sm text-gray-300 mt-2 italic">"{lastSession.notes}"</div>
                )}
              </div>
              <Flame size={24} className="text-orange-500" />
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4 flex items-center gap-4" onClick={() => navigate('/progres')}>
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
          <TrendingUp size={20} className="text-orange-500" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white">Progresul tău</div>
          <div className="text-sm text-gray-400">Grafice și statistici detaliate</div>
        </div>
        <span className="text-gray-500">→</span>
      </Card>
    </div>
  )
}
