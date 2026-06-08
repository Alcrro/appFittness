import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkouts } from '../hooks/useWorkouts'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Plus, Dumbbell, ChevronRight, Trash2 } from 'lucide-react'

export function WorkoutsPage() {
  const navigate = useNavigate()
  const { workouts, loading, createWorkout, deleteWorkout } = useWorkouts()
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data, error } = await createWorkout(form.name, form.description)
    setSaving(false)
    if (!error && data) {
      setShowCreate(false)
      setForm({ name: '', description: '' })
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
            <Card
              key={w.id}
              className="p-4 flex items-center gap-3"
              onClick={() => navigate(`/antrenamente/${w.id}`)}
            >
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Dumbbell size={20} className="text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{w.name}</div>
                <div className="text-sm text-gray-400">
                  {w.workout_exercises?.[0]?.count ?? 0} exerciții
                  {w.description && ` • ${w.description}`}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={e => handleDelete(e, w.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <ChevronRight size={18} className="text-gray-600" />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Plan nou">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Numele planului"
            placeholder="ex: Push Day, Full Body, Spate+Biceps"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            required
            autoFocus
          />
          <Input
            label="Descriere (opțional)"
            placeholder="ex: Luni și Joi"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          />
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Se creează...' : 'Creează plan'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
