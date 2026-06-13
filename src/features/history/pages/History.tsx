import { useSessions } from '../../session/hooks/useSessions'
import { HistoryItem } from '../components/HistoryItem'
import { Card } from '../../../shared/components/atoms/Card'
import { Calendar } from 'lucide-react'

export function HistoryPage() {
  const { sessions, loading } = useSessions()
  const finished = sessions.filter(s => s.finished_at)

  if (loading) return (
    <div className="space-y-3 pt-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 h-24 animate-pulse" />
      ))}
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
          {finished.map(s => <HistoryItem key={s.id} session={s} />)}
        </div>
      )}
    </div>
  )
}
