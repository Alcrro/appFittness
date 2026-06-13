import { Button } from '../../../shared/components/atoms/Button'
import { ChevronLeft, Timer, Flag } from 'lucide-react'

interface SessionHeaderProps {
  title: string
  elapsed: number
  onBack: () => void
  onFinish: () => void
}

export function SessionHeader({ title, elapsed, onBack, onFinish }: SessionHeaderProps) {
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div>
          <div className="font-bold text-white">{title}</div>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <Timer size={12} />
            {mins}:{String(secs).padStart(2, '0')}
          </div>
        </div>
      </div>
      <Button size="sm" variant="success" onClick={onFinish}>
        <Flag size={14} />
        Finalizează
      </Button>
    </div>
  )
}
