import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkouts } from '../hooks/useWorkouts'
import { WorkoutCard } from '../components/WorkoutCard'
import { CreateWorkoutModal } from '../components/CreateWorkoutModal'
import { Card } from '../../../shared/components/atoms/Card'
import { Button } from '../../../shared/components/atoms/Button'
import { Plus, Dumbbell } from 'lucide-react'

export function WorkoutsPage() {
  const navigate = useNavigate()
  const { workouts, loading, createWorkout, deleteWorkout } = useWorkouts()
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleCreate(name: string, description: string) {
    setSaving(true)
    const { data, error } = await createWorkout(name, description)
    setSaving(false)
    if (!error && data) {
      setShowCreate(false)
      navigate(`/antrenamente/${data.id}`)
    }
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    if (!confirm('Ștergi planul și toate exercițiile din el?')) return
    await deleteWorkout(id)
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Planurile mele</h2>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={16} />
          Nou
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 h-20 animate-pulse" />
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <Card className="p-8 text-center">
          <Dumbbell size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-300 font-semibold mb-1">Niciun plan creat</p>
          <p className="text-gray-500 text-sm mb-4">Creează primul tău plan de antrenament</p>
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={16} />
            Creează plan
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {workouts.map(w => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onClick={() => navigate(`/antrenamente/${w.id}`)}
              onDelete={e => handleDelete(e, w.id)}
            />
          ))}
        </div>
      )}

      <CreateWorkoutModal
        open={showCreate}
        saving={saving}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
      />
    </div>
  )
}
