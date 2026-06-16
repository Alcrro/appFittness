import { useState } from 'react'
import { Card } from '../../../shared/components/atoms/Card'
import { Button } from '../../../shared/components/atoms/Button'
import { Play, Dumbbell } from 'lucide-react'
import type { WorkoutPlan } from '../../../shared/types'

interface WorkoutQuickStartProps {
  workouts: WorkoutPlan[]
  onStart: (workoutId: string) => void
  onViewAll: () => void
  onCreatePlan: () => void
}

export function WorkoutQuickStart({ workouts, onStart, onViewAll, onCreatePlan }: WorkoutQuickStartProps) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? workouts : workouts.slice(0, 3)

  return (
    <div>
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <Dumbbell size={18} className="text-orange-500" />
        Începe antrenament
      </h3>

      {workouts.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-400 mb-3">Nu ai niciun plan de antrenament</p>
          <Button onClick={onCreatePlan}>Creează un plan</Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map(w => (
            <Card key={w.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{w.name}</div>
                <div className="text-sm text-gray-400">
                  {w.workout_exercises?.[0]?.count ?? 0} exerciții
                </div>
              </div>
              <Button size="sm" onClick={() => onStart(w.id)}>
                <Play size={14} />
                Start
              </Button>
            </Card>
          ))}
          {workouts.length > 3 && (
            <button
              onClick={() => setShowAll(p => !p)}
              className="w-full text-center text-sm text-orange-500 hover:text-orange-400 py-2"
            >
              {showAll ? 'Arată mai puțin ↑' : `Vezi toate (${workouts.length}) →`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
