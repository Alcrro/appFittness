import { Card } from '../../../shared/components/atoms/Card'
import { Flame, Calendar, Dumbbell } from 'lucide-react'

interface ProfileStatsProps {
  totalSessions: number
  weeklyCount: number
  totalTime: string
  plansCount: number
}

export function ProfileStats({ totalSessions, weeklyCount, totalTime, plansCount }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-4 text-center">
        <Flame size={18} className="text-orange-500 mx-auto mb-1" />
        <div className="text-2xl font-black text-white">{totalSessions}</div>
        <div className="text-xs text-gray-400">Total antrenamente</div>
      </Card>
      <Card className="p-4 text-center">
        <Calendar size={18} className="text-orange-500 mx-auto mb-1" />
        <div className="text-2xl font-black text-white">{weeklyCount}</div>
        <div className="text-xs text-gray-400">Săptămâna aceasta</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-black text-white">{totalTime}</div>
        <div className="text-xs text-gray-400">Timp total</div>
      </Card>
      <Card className="p-4 text-center">
        <Dumbbell size={18} className="text-orange-500 mx-auto mb-1" />
        <div className="text-2xl font-black text-white">{plansCount}</div>
        <div className="text-xs text-gray-400">Planuri create</div>
      </Card>
    </div>
  )
}
