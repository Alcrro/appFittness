import { useState } from 'react'
import { Modal } from '../../../shared/components/molecules/Modal'
import { Input } from '../../../shared/components/atoms/Input'
import { Button } from '../../../shared/components/atoms/Button'

interface CreateWorkoutModalProps {
  open: boolean
  saving: boolean
  onClose: () => void
  onSubmit: (name: string, description: string) => Promise<void>
}

export function CreateWorkoutModal({ open, saving, onClose, onSubmit }: CreateWorkoutModalProps) {
  const [form, setForm] = useState({ name: '', description: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form.name, form.description)
    setForm({ name: '', description: '' })
  }

  return (
    <Modal open={open} onClose={onClose} title="Plan nou">
      <form onSubmit={handleSubmit} className="space-y-4">
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
  )
}
