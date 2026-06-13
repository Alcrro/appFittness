import { useState } from 'react'
import { Modal } from '../../../shared/components/molecules/Modal'
import { Button } from '../../../shared/components/atoms/Button'

interface AddExerciseModalProps {
  open: boolean
  exerciseName: string
  saving: boolean
  onClose: () => void
  onSubmit: (sets: number, reps: number, restSeconds: number) => Promise<void>
}

export function AddExerciseModal({ open, exerciseName, saving, onClose, onSubmit }: AddExerciseModalProps) {
  const [form, setForm] = useState({ sets: 3, reps: 10, rest_seconds: 90 })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form.sets, form.reps, form.rest_seconds)
  }

  return (
    <Modal open={open} onClose={onClose} title={exerciseName || 'Configurare'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {(['sets', 'reps', 'rest_seconds'] as const).map((field, i) => (
            <div key={field}>
              <label className="text-sm text-gray-400 block mb-1">
                {['Seturi', 'Reps', 'Pauză (s)'][i]}
              </label>
              <input
                type="number"
                value={form[field]}
                onChange={e => setForm(p => ({ ...p, [field]: Number(e.target.value) }))}
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
  )
}
