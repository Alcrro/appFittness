import { Card } from '../../../shared/components/atoms/Card'
import { Dumbbell, Timer } from 'lucide-react'
import { formatDate, getDuration } from '../utils/formatters'
import type { Session } from '../../../shared/types'

interface HistoryItemProps {
  session: Session
}

export function HistoryItem({ session }: HistoryItemProps) {
  const duration = getDuration(session.started_at, session.finished_at)
  const setsCount = session.session_logs?.[0]?.count ?? 0

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
          <Dumbbell size={18} className="text-orange-500" />
        </div>
        <div>
          <div className="font-semibold text-white">
            {session.workout_plans?.name ?? 'Antrenament'}
          </div>
          <div className="text-sm text-gray-400 mt-0.5">{formatDate(session.started_at)}</div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
            {duration && (
              <span className="flex items-center gap-1">
                <Timer size={11} />
                {duration}
              </span>
            )}
            {setsCount > 0 && <span>{setsCount} seturi</span>}
          </div>
          {session.notes && (
            <p className="text-sm text-gray-300 mt-2 italic">"{session.notes}"</p>
          )}
        </div>
      </div>
    </Card>
  )
}
