import { useState } from 'react'
import { Modal } from '../../../shared/components/molecules/Modal'
import { Button } from '../../../shared/components/atoms/Button'
import { Flag } from 'lucide-react'

interface FinishSessionModalProps {
  open: boolean
  elapsed: number
  logsCount: number
  onClose: () => void
  onSave: (notes: string) => void
}

export function FinishSessionModal({ open, elapsed, logsCount, onClose, onSave }: FinishSessionModalProps) {
  const [notes, setNotes] = useState('')
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  return (
    <Modal open={open} onClose={onClose} title="Finalizează antrenamentul">
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-white">{mins}:{String(secs).padStart(2, '0')}</div>
          <div className="text-sm text-gray-400">Durată antrenament</div>
          <div className="text-sm text-gray-400 mt-1">{logsCount} seturi înregistrate</div>
        </div>
        <div>
          <label className="text-sm text-gray-400 block mb-1">Note (opțional)</label>
          <textarea
            rows={3}
            placeholder="Cum te-ai simțit? Ce a mers bine?"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        <Button className="w-full" size="lg" onClick={() => onSave(notes)}>
          <Flag size={18} />
          Salvează antrenamentul
        </Button>
        <Button variant="ghost" className="w-full" onClick={onClose}>
          Continuă antrenamentul
        </Button>
      </div>
    </Modal>
  )
}
