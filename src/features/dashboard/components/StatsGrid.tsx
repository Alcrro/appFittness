import { Card } from '../../../shared/components/atoms/Card'

interface StatsGridProps {
  weeklyCount: number
  totalCount: number
  plansCount: number
}

export function StatsGrid({ weeklyCount, totalCount, plansCount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="p-4 text-center">
        <div className="text-2xl font-black text-orange-500">{weeklyCount}</div>
        <div className="text-xs text-gray-400 mt-1">Sesiuni săpt.</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-black text-orange-500">{totalCount}</div>
        <div className="text-xs text-gray-400 mt-1">Total sesiuni</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-black text-orange-500">{plansCount}</div>
        <div className="text-xs text-gray-400 mt-1">Planuri</div>
      </Card>
    </div>
  )
}
