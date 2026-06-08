import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWorkoutDetail } from '../hooks/useWorkouts'
import { ExerciseSelector } from '../components/workout/ExerciseSelector'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import type { Exercise, WorkoutExercise } from '../types'
import { Play, Plus, Trash2, GripVertical, ChevronLeft } from 'lucide-react'

interface ExerciseRowProps {
  we: WorkoutExercise
  onRemove: (id: string) => Promise<{ error: unknown }>
  onUpdate: (id: string, updates: Partial<Pick<WorkoutExercise, 'sets' | 'reps' | 'rest_seconds'>>) => Promise<{ data: WorkoutExercise | null; error: unknown }>
}

function ExerciseRow({ we, onRemove, onUpdate }: ExerciseRowProps) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ sets: we.sets, reps: we.reps, rest_seconds: we.rest_seconds })

  async function save() {
    await onUpdate(we.id, form)
    setEditing(false)
  }

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <GripVertical size={16} className="text-gray-600 flex-shrink-0" />
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
  )
}

export function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { workout, exercises, loading, addExercise, removeExercise, updateExercise } = useWorkoutDetail(id)
  const [showSelector, setShowSelector] = useState(false)
  const [showAddConfig, setShowAddConfig] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [addForm, setAddForm] = useState({ sets: 3, reps: 10, rest_seconds: 90 })
  const [saving, setSaving] = useState(false)

  function handleExerciseSelected(ex: Exercise) {
    setSelectedExercise(ex)
    setShowAddConfig(true)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedExercise) return
    setSaving(true)
    await addExercise(selectedExercise.id, addForm.sets, addForm.reps, addForm.rest_seconds)
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

      <Button
        className="w-full"
        size="lg"
        onClick={() => navigate(`/sesiune/${id}`)}
        disabled={exercises.length === 0}
      >
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
        <div className="space-y-2">
          {exercises.map(we => (
            <ExerciseRow
              key={we.id}
              we={we}
              onRemove={removeExercise}
              onUpdate={updateExercise}
            />
          ))}
        </div>
      )}

      <ExerciseSelector
        open={showSelector}
        onClose={() => setShowSelector(false)}
        onSelect={handleExerciseSelected}
      />

      <Modal open={showAddConfig} onClose={() => setShowAddConfig(false)} title={selectedExercise?.name ?? 'Configurare'}>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {(['sets', 'reps', 'rest_seconds'] as const).map((field, i) => (
              <div key={field}>
                <label className="text-sm text-gray-400 block mb-1">
                  {['Seturi', 'Reps', 'Pauză (s)'][i]}
                </label>
                <input
                  type="number"
                  value={addForm[field]}
                  onChange={e => setAddForm(p => ({ ...p, [field]: Number(e.target.value) }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Se adaugă...' : 'Adaugă exercițiu'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
