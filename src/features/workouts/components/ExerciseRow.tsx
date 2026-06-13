import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '../../../shared/components/atoms/Card'
import { GripVertical, Trash2 } from 'lucide-react'
import type { WorkoutExercise } from '../../../shared/types'

interface ExerciseRowProps {
  we: WorkoutExercise
  onRemove: (id: string) => Promise<{ error: unknown }>
  onUpdate: (id: string, updates: Partial<Pick<WorkoutExercise, 'sets' | 'reps' | 'rest_seconds'>>) => Promise<{ data: WorkoutExercise | null; error: unknown }>
}

export function ExerciseRow({ we, onRemove, onUpdate }: ExerciseRowProps) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ sets: we.sets, reps: we.reps, rest_seconds: we.rest_seconds })

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: we.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  async function save() {
    await onUpdate(we.id, form)
    setEditing(false)
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="p-3">
        <div className="flex items-center gap-3">
          <button
            className="text-gray-600 flex-shrink-0 cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-sm">{we.exercises?.name}</div>
            <div className="text-xs text-gray-400">{we.exercises?.muscle_group} • {we.exercises?.equipment}</div>
            {editing ? (
              <div className="flex gap-2 mt-2">
                <input
                  type="number" min="1" max="20"
                  value={form.sets}
                  onChange={e => setForm(p => ({ ...p, sets: Number(e.target.value) }))}
                  className="w-14 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm text-center text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-gray-400 text-sm self-center">×</span>
                <input
                  type="number" min="1" max="100"
                  value={form.reps}
                  onChange={e => setForm(p => ({ ...p, reps: Number(e.target.value) }))}
                  className="w-14 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm text-center text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-gray-400 text-sm self-center">rep •</span>
                <input
                  type="number" min="0" max="600" step="15"
                  value={form.rest_seconds}
                  onChange={e => setForm(p => ({ ...p, rest_seconds: Number(e.target.value) }))}
                  className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm text-center text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <span className="text-gray-400 text-sm self-center">s</span>
              </div>
            ) : (
              <div className="text-xs text-orange-400 mt-0.5">
                {we.sets} × {we.reps} rep • {we.rest_seconds}s pauză
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="text-xs text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-800">Anulează</button>
                <button onClick={save} className="text-xs text-orange-500 px-2 py-1 rounded-lg hover:bg-gray-800 font-semibold">Salvează</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="text-xs text-gray-400 px-2 py-1 rounded-lg hover:bg-gray-800">Edit</button>
                <button onClick={() => onRemove(we.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
