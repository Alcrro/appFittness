import { Card } from '../../../shared/components/atoms/Card'
import { Calendar, Flame } from 'lucide-react'
import { formatDate, getDuration } from '../utils/formatters'
import type { Session } from '../../../shared/types'

interface LastSessionCardProps {
  session: Session
}

export function LastSessionCard({ session }: LastSessionCardProps) {
  return (
    <div>
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <Calendar size={18} className="text-orange-500" />
        Ultima sesiune
      </h3>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-white">
              {session.workout_plans?.name ?? 'Antrenament'}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {formatDate(session.started_at)}
              {session.finished_at && ` • ${getDuration(session.started_at, session.finished_at)}`}
            </div>
            {session.notes && (
              <div className="text-sm text-gray-300 mt-2 italic">"{session.notes}"</div>
            )}
          </div>
          <Flame size={24} className="text-orange-500" />
        </div>
      </Card>
    </div>
  )
}
