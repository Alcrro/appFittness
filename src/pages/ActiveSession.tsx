import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSessions, useActiveSession } from '../hooks/useSessions'
import { useWorkoutDetail } from '../hooks/useWorkouts'
import { RestTimer } from '../components/session/RestTimer'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { calculate1RM } from '../lib/exercises'
import type { WorkoutExercise, SessionLog } from '../types'
import { Check, ChevronLeft, Timer, Trash2, Flag } from 'lucide-react'

const RPE_OPTIONS = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

interface SetRowProps {
  set: SessionLog
  index: number
  onDelete: (id: string) => Promise<{ error: unknown }>
}

function SetRow({ set, index, onDelete }: SetRowProps) {
  const oneRm = set.weight && set.reps ? calculate1RM(set.weight, set.reps) : null
  return (
    <div className="flex items-center gap-2 text-sm py-1.5">
      <span className="w-6 text-center text-gray-500 font-mono">{index + 1}</span>
      <span className="w-16 text-center font-semibold text-white">{set.weight ?? '-'} kg</span>
      <span className="w-12 text-center text-gray-300">{set.reps} rep</span>
      {set.rpe && <span className="w-12 text-center text-orange-400">@{set.rpe}</span>}
      {oneRm && <span className="flex-1 text-gray-500 text-xs">1RM≈{oneRm}kg</span>}
      <button onClick={() => onDelete(set.id)} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
        <Trash2 size={12} />
      </button>
    </div>
  )
}

interface ExerciseBlockProps {
  we: WorkoutExercise
  logs: SessionLog[]
  onLogSet: (exerciseId: string, workoutExerciseId: string, setData: { weight: number | null; reps: number; rpe: number | null; notes: string | null }) => Promise<{ data: SessionLog | null; error: unknown }>
  onDeleteLog: (id: string) => Promise<{ error: unknown }>
  restSeconds: number
}

function ExerciseBlock({ we, logs, onLogSet, onDeleteLog, restSeconds }: ExerciseBlockProps) {
  const exerciseLogs = logs.filter(l => l.workout_exercise_id === we.id)
  const lastLog = exerciseLogs[exerciseLogs.length - 1]

  const [form, setForm] = useState({
    weight: lastLog?.weight?.toString() ?? '',
    reps: we.reps.toString(),
    rpe: '',
    notes: '',
  })
  const [showRpe, setShowRpe] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [logging, setLogging] = useState(false)

  async function handleLog() {
    setLogging(true)
    await onLogSet(we.exercise_id, we.id, {
      weight: form.weight !== '' ? Number(form.weight) : null,
      reps: Number(form.reps),
      rpe: form.rpe !== '' ? Number(form.rpe) : null,
      notes: form.notes || null,
    })
    setLogging(false)
    if (restSeconds > 0) setShowTimer(true)
    setForm(p => ({ ...p, notes: '' }))
  }

  const weightNum = form.weight !== '' ? Number(form.weight) : null
  const repsNum = Number(form.reps)

  return (
    <Card className="p-4 space-y-3">
      <div>
        <h4 className="font-bold text-white">{we.exercises?.name}</h4>
        <p className="text-xs text-gray-400">{we.exercises?.muscle_group} • {we.sets} × {we.reps} rep</p>
      </div>

      {exerciseLogs.length > 0 && (
        <div className="space-y-0.5 border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span className="w-6" />
            <span className="w-16 text-center">Greutate</span>
            <span className="w-12 text-center">Reps</span>
            <span className="w-12 text-center">RPE</span>
          </div>
          {exerciseLogs.map((log, i) => (
            <SetRow key={log.id} set={log} index={i} onDelete={onDeleteLog} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Greutate (kg)</label>
          <input
            type="number" min="0" step="0.5"
            placeholder="0"
            value={form.weight}
            onChange={e => setForm(p => ({ ...p, weight: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Repetări</label>
          <input
            type="number" min="1" max="200"
            value={form.reps}
            onChange={e => setForm(p => ({ ...p, reps: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowRpe(!showRpe)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            form.rpe !== '' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-gray-700 text-gray-500 hover:border-gray-600'
          }`}
        >
          RPE {form.rpe !== '' ? form.rpe : '+'}
        </button>
        <input
          type="text"
          placeholder="Notă..."
          value={form.notes}
          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {showRpe && (
        <div className="flex flex-wrap gap-1.5">
          {RPE_OPTIONS.map(r => (
            <button
              key={r}
              onClick={() => { setForm(p => ({ ...p, rpe: String(r) })); setShowRpe(false) }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                Number(form.rpe) === r ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {r}
            </button>
          ))}
          <button
            onClick={() => { setForm(p => ({ ...p, rpe: '' })); setShowRpe(false) }}
            className="px-2.5 py-1 rounded-lg text-xs text-gray-500 hover:bg-gray-800"
          >
            Șterge
          </button>
        </div>
      )}

      {weightNum !== null && repsNum > 0 && (
        <p className="text-xs text-gray-500">
          1RM estimat: <span className="text-orange-400 font-semibold">{calculate1RM(weightNum, repsNum)} kg</span>
        </p>
      )}

      <Button onClick={handleLog} className="w-full" disabled={logging}>
        <Check size={16} />
        {logging ? 'Se salvează...' : `Înregistrează set ${exerciseLogs.length + 1}`}
      </Button>

      {restSeconds > 0 && exerciseLogs.length > 0 && (
        <button
          onClick={() => setShowTimer(true)}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors"
        >
          <Timer size={14} />
          Timer pauză ({restSeconds}s)
        </button>
      )}

      {showTimer && <RestTimer seconds={restSeconds} onClose={() => setShowTimer(false)} />}
    </Card>
  )
}

export function ActiveSessionPage() {
  const { workoutId } = useParams<{ workoutId: string }>()
  const navigate = useNavigate()
  const { startSession, finishSession } = useSessions()
  const { exercises } = useWorkoutDetail(workoutId)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const { session, logs, logSet, deleteLog } = useActiveSession(sessionId)
  const [starting, setStarting] = useState(true)
  const [showFinish, setShowFinish] = useState(false)
  const [finishNotes, setFinishNotes] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number>(Date.now())

  useEffect(() => {
    if (!workoutId) { navigate('/'); return }
    async function init() {
      const { data, error } = await startSession(workoutId!)
      if (error || !data) { navigate('/'); return }
      setSessionId(data.id)
      startRef.current = Date.now()
      setStarting(false)
    }
    init()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  async function handleFinish() {
    if (!sessionId) return
    await finishSession(sessionId, finishNotes)
    navigate('/')
  }

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  if (starting) return (
    <div className="pt-16 text-center text-gray-400">Se pregătește sesiunea...</div>
  )

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFinish(true)} className="text-gray-400 hover:text-white">
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="font-bold text-white">{session?.workout_plans?.name ?? 'Antrenament activ'}</div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <Timer size={12} />
              {mins}:{String(secs).padStart(2, '0')}
            </div>
          </div>
        </div>
        <Button size="sm" variant="success" onClick={() => setShowFinish(true)}>
          <Flag size={14} />
          Finalizează
        </Button>
      </div>

      <div className="space-y-3">
        {exercises.map(we => (
          <ExerciseBlock
            key={we.id}
            we={we}
            logs={logs}
            onLogSet={logSet}
            onDeleteLog={deleteLog}
            restSeconds={we.rest_seconds ?? 90}
          />
        ))}
      </div>

      <Modal open={showFinish} onClose={() => setShowFinish(false)} title="Finalizează antrenamentul">
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-white">{mins}:{String(secs).padStart(2, '0')}</div>
            <div className="text-sm text-gray-400">Durată antrenament</div>
            <div className="text-sm text-gray-400 mt-1">{logs.length} seturi înregistrate</div>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Note (opțional)</label>
            <textarea
              rows={3}
              placeholder="Cum te-ai simțit? Ce a mers bine?"
              value={finishNotes}
              onChange={e => setFinishNotes(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>
          <Button className="w-full" size="lg" onClick={handleFinish}>
            <Flag size={18} />
            Salvează antrenamentul
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setShowFinish(false)}>
            Continuă antrenamentul
          </Button>
        </div>
      </Modal>
    </div>
  )
}
