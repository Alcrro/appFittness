import { calculate1RM } from '../../../shared/lib/exercises'
import { Trash2 } from 'lucide-react'
import type { SessionLog } from '../../../shared/types'

interface SetRowProps {
  set: SessionLog
  index: number
  onDelete: (id: string) => Promise<{ error: unknown }>
}

export function SetRow({ set, index, onDelete }: SetRowProps) {
  const oneRm = set.weight && set.reps ? calculate1RM(set.weight, set.reps) : null
  return (
    <div className="flex items-center gap-2 text-sm py-1.5">
      <span className="w-6 text-center text-gray-500 font-mono">{index + 1}</span>
      <span className="w-16 text-center font-semibold text-white">{set.weight ?? '-'} kg</span>
      <span className="w-12 text-center text-gray-300">{set.reps} rep</span>
      {set.rpe && <span className="w-12 text-center text-orange-400">@{set.rpe}</span>}
      {oneRm && <span className="flex-1 text-gray-500 text-xs">1RM≈{oneRm}kg</span>}
      <button onClick={() => onDelete(set.id)} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
        <Trash2 size={12} />
      </button>
    </div>
  )
}
