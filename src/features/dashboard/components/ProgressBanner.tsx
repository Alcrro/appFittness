import { Card } from '../../../shared/components/atoms/Card'
import { TrendingUp } from 'lucide-react'

interface ProgressBannerProps {
  onClick: () => void
}

export function ProgressBanner({ onClick }: ProgressBannerProps) {
  return (
    <Card className="p-4 flex items-center gap-4" onClick={onClick}>
      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
        <TrendingUp size={20} className="text-orange-500" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-white">Progresul tău</div>
        <div className="text-sm text-gray-400">Grafice și statistici detaliate</div>
      </div>
      <span className="text-gray-500">→</span>
    </Card>
  )
}
