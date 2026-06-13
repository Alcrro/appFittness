import { useState, useMemo } from 'react'
import { useExercises } from '../../exercises/hooks/useExercises'
import { Modal } from '../../../shared/components/molecules/Modal'
import { Input } from '../../../shared/components/atoms/Input'
import { Button } from '../../../shared/components/atoms/Button'
import { MUSCLE_GROUPS, EQUIPMENT_TYPES } from '../../../shared/lib/exercises'
import { getExerciseImage } from '../../../shared/lib/exercise_images'
import type { Exercise } from '../../../shared/types'
import { Search, Plus, Dumbbell } from 'lucide-react'

interface ExerciseSelectorProps {
  open: boolean
  onClose: () => void
  onSelect: (exercise: Exercise) => void
}

export function ExerciseSelector({ open, onClose, onSelect }: ExerciseSelectorProps) {
  const { exercises, createCustomExercise } = useExercises()
  const [search, setSearch] = useState('')
  const [filterGroup, setFilterGroup] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newEx, setNewEx] = useState({ name: '', muscle_group: MUSCLE_GROUPS[0], equipment: EQUIPMENT_TYPES[0] })
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() =>
    exercises.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase())
      const matchGroup = !filterGroup || e.muscle_group === filterGroup
      return matchSearch && matchGroup
    }),
    [exercises, search, filterGroup]
  )

  const grouped = useMemo(() => {
    const groups: Record<string, Exercise[]> = {}
    for (const ex of filtered) {
      if (!groups[ex.muscle_group]) groups[ex.muscle_group] = []
      groups[ex.muscle_group].push(ex)
    }
    return groups
  }, [filtered])

  async function handleCreateCustom(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data, error } = await createCustomExercise(newEx.name, newEx.muscle_group, newEx.equipment)
    setSaving(false)
    if (!error && data) {
      setShowCreate(false)
      setNewEx({ name: '', muscle_group: MUSCLE_GROUPS[0], equipment: EQUIPMENT_TYPES[0] })
      onSelect(data)
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Alege exercițiu" size="lg">
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Caută exercițiu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setFilterGroup('')}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              !filterGroup ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Toate
          </button>
          {MUSCLE_GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setFilterGroup(g === filterGroup ? '' : g)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filterGroup === g ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {showCreate ? (
          <form onSubmit={handleCreateCustom} className="space-y-3 bg-gray-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-white">Exercițiu custom</p>
            <Input
              placeholder="Numele exercițiului"
              value={newEx.name}
              onChange={e => setNewEx(p => ({ ...p, name: e.target.value }))}
              required
              autoFocus
            />
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newEx.muscle_group}
              onChange={e => setNewEx(p => ({ ...p, muscle_group: e.target.value }))}
            >
              {MUSCLE_GROUPS.map(g => <option key={g}>{g}</option>)}
            </select>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newEx.equipment}
              onChange={e => setNewEx(p => ({ ...p, equipment: e.target.value }))}
            >
              {EQUIPMENT_TYPES.map(eq => <option key={eq}>{eq}</option>)}
            </select>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowCreate(false)}>Anulează</Button>
              <Button type="submit" className="flex-1" disabled={saving}>Creează</Button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowCreate(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-gray-700 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors text-sm"
          >
            <Plus size={16} />
            Adaugă exercițiu custom
          </button>
        )}

        <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
          {Object.entries(grouped).map(([group, exs]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{group}</p>
              <div className="space-y-1">
                {exs.map(ex => {
                  const img = ex.image_url ?? getExerciseImage(ex.name)
                  return (
                    <button
                      key={ex.id}
                      onClick={() => { onSelect(ex); onClose() }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center">
                        {img ? (
                          <img
                            src={img}
                            alt={ex.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex' }}
                          />
                        ) : null}
                        <span className={`text-gray-600 ${img ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                          <Dumbbell size={20} />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-white text-sm font-medium block truncate">{ex.name}</span>
                        <span className="text-xs text-gray-500">{ex.equipment}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4">Niciun exercițiu găsit</p>
          )}
        </div>
      </div>
    </Modal>
  )
}
