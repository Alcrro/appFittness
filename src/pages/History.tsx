import { useSessions } from '../hooks/useSessions'
import { Card } from '../components/ui/Card'
import { Calendar, Timer, Dumbbell } from 'lucide-react'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

function getDuration(start: string, end: string | null): string | null {
  if (!end) return null
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}min`
}

export function HistoryPage() {
  const { sessions, loading } = useSessions()
  const finished = sessions.filter(s => s.finished_at)

  if (loading) return (
    <div className="space-y-3 pt-2">
      {[1, 2, 3, 4].map(i => <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 h-24 animate-pulse" />)}
    </div>
  )

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Istoric antrenamente</h2>
        <span className="text-sm text-gray-400">{finished.length} sesiuni</span>
      </div>

      {finished.length === 0 ? (
        <Card className="p-8 text-center">
          <Calendar size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-300 font-semibold">Niciun antrenament finalizat</p>
          <p className="text-gray-500 text-sm mt-1">Istoricul tău va apărea aici</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {finished.map(s => {
            const duration = getDuration(s.started_at, s.finished_at)
            const setsCount = s.session_logs?.[0]?.count ?? 0
            return (
              <Card key={s.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Dumbbell size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {s.workout_plans?.name ?? 'Antrenament'}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">{formatDate(s.started_at)}</div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      {duration && (
                        <span className="flex items-center gap-1">
                          <Timer size={11} />
                          {duration}
                        </span>
                      )}
                      {setsCount > 0 && <span>{setsCount} seturi</span>}
                    </div>
                    {s.notes && (
                      <p className="text-sm text-gray-300 mt-2 italic">"{s.notes}"</p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
