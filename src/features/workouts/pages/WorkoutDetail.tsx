import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import type { DragEndEvent } from '@dnd-kit/core'
import { useWorkoutDetail } from '../hooks/useWorkouts'
import { ExerciseSelector } from '../components/ExerciseSelector'
import { ExerciseRow } from '../components/ExerciseRow'
import { AddExerciseModal } from '../components/AddExerciseModal'
import { Card } from '../../../shared/components/atoms/Card'
import { Button } from '../../../shared/components/atoms/Button'
import type { Exercise } from '../../../shared/types'
import { Play, Plus, ChevronLeft } from 'lucide-react'

export function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { workout, exercises, loading, addExercise, removeExercise, updateExercise, reorderExercises } = useWorkoutDetail(id)
  const [showSelector, setShowSelector] = useState(false)
  const [showAddConfig, setShowAddConfig] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = exercises.findIndex(e => e.id === active.id)
    const newIndex = exercises.findIndex(e => e.id === over.id)
    reorderExercises(arrayMove(exercises, oldIndex, newIndex))
  }

  function handleExerciseSelected(ex: Exercise) {
    setSelectedExercise(ex)
    setShowAddConfig(true)
  }

  async function handleAdd(sets: number, reps: number, restSeconds: number) {
    if (!selectedExercise) return
    setSaving(true)
    await addExercise(selectedExercise.id, sets, reps, restSeconds)
    setSaving(false)
    setShowAddConfig(false)
    setSelectedExercise(null)
  }

  if (loading) return <div className="pt-8 text-center text-gray-500">Se încarcă...</div>
  if (!workout) return <div className="pt-8 text-center text-gray-500">Plan negăsit</div>

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/antrenamente')} className="p-1 text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg">{workout.name}</h2>
          {workout.description && <p className="text-gray-400 text-sm">{workout.description}</p>}
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={() => navigate(`/sesiune/${id}`)} disabled={exercises.length === 0}>
        <Play size={18} />
        Începe antrenamentul
      </Button>

      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Exerciții ({exercises.length})</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowSelector(true)}>
          <Plus size={16} />
          Adaugă
        </Button>
      </div>

      {exercises.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-400 mb-3">Niciun exercițiu în plan</p>
          <Button size="sm" onClick={() => setShowSelector(true)}>
            <Plus size={16} />
            Adaugă exercițiu
          </Button>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={exercises.map(e => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-5">
              {Object.entries(
                exercises.reduce<Record<string, typeof exercises>>((acc, we) => {
                  const group = we.exercises?.muscle_group ?? 'Altele'
                  if (!acc[group]) acc[group] = []
                  acc[group].push(we)
                  return acc
                }, {})
              ).map(([group, items]) => (
                <div key={group}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">{group}</p>
                  <div className="space-y-2">
                    {items.map(we => (
                      <ExerciseRow key={we.id} we={we} onRemove={removeExercise} onUpdate={updateExercise} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <ExerciseSelector open={showSelector} onClose={() => setShowSelector(false)} onSelect={handleExerciseSelected} />

      <AddExerciseModal
        open={showAddConfig}
        exerciseName={selectedExercise?.name ?? ''}
        saving={saving}
        onClose={() => setShowAddConfig(false)}
        onSubmit={handleAdd}
      />
    </div>
  )
}
