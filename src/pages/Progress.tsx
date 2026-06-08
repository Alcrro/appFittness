import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useExercises } from '../hooks/useExercises'
import { calculate1RM } from '../lib/exercises'
import { Card } from '../components/ui/Card'
import { TrendingUp } from 'lucide-react'
import type { BodyWeight } from '../types'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, TooltipProps,
} from 'recharts'

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })
}

interface ProgressPoint {
  date: string
  orm: number
  weight: number
  reps: number
}

interface ChartPoint {
  date: string
  '1RM estimat': number
  'Greutate max': number
}

interface BwChartPoint {
  date: string
  'Greutate (kg)': number
}

function useBodyWeightState() {
  const { user } = useAuth()
  const [entries, setEntries] = useState<BodyWeight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('body_weight')
      .select('*')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: true })
      .limit(90)
      .then(({ data }) => { setEntries((data as BodyWeight[]) ?? []); setLoading(false) })
  }, [user])

  async function addEntry(weight: number, date: string) {
    const { data, error } = await supabase
      .from('body_weight')
      .insert({ user_id: user!.id, weight, recorded_at: date })
      .select().single()
    if (!error) {
      setEntries(prev => [...prev, data as BodyWeight].sort((a, b) => a.recorded_at.localeCompare(b.recorded_at)))
    }
    return { error }
  }

  return { entries, loading, addEntry }
}

function useExerciseProgress(exerciseId: string) {
  const [data, setData] = useState<ProgressPoint[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!exerciseId) return
    setLoading(true)
    supabase
      .from('session_logs')
      .select('weight, reps, logged_at, sessions(started_at, finished_at)')
      .eq('exercise_id', exerciseId)
      .not('weight', 'is', null)
      .order('logged_at', { ascending: true })
      .limit(200)
      .then(({ data: logs }) => {
        if (!logs) { setLoading(false); return }
        const byDate: Record<string, ProgressPoint> = {}
        for (const log of logs as Array<{ weight: number; reps: number; logged_at: string; sessions: { started_at: string; finished_at: string | null } }>) {
          if (!log.sessions?.finished_at) continue
          const date = log.sessions.started_at.split('T')[0]
          const orm = calculate1RM(log.weight, log.reps)
          if (!byDate[date] || orm > byDate[date].orm) {
            byDate[date] = { date, orm, weight: log.weight, reps: log.reps }
          }
        }
        setData(Object.values(byDate))
        setLoading(false)
      })
  }, [exerciseId])

  return { data, loading }
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value} kg
        </p>
      ))}
    </div>
  )
}

export function ProgressPage() {
  const { exercises } = useExercises()
  const [selectedExId, setSelectedExId] = useState('')
  const { data: progressData, loading: progressLoading } = useExerciseProgress(selectedExId)
  const { entries: bwEntries, loading: bwLoading, addEntry } = useBodyWeightState()
  const [bwInput, setBwInput] = useState('')
  const [bwDate, setBwDate] = useState(new Date().toISOString().split('T')[0])
  const [savingBw, setSavingBw] = useState(false)

  const chartData: ChartPoint[] = progressData.map(d => ({
    date: formatDateShort(d.date),
    '1RM estimat': d.orm,
    'Greutate max': d.weight,
  }))

  const bwChartData: BwChartPoint[] = bwEntries.map(e => ({
    date: formatDateShort(e.recorded_at),
    'Greutate (kg)': Number(e.weight),
  }))

  async function handleAddBw(e: React.FormEvent) {
    e.preventDefault()
    if (!bwInput) return
    setSavingBw(true)
    await addEntry(Number(bwInput), bwDate)
    setSavingBw(false)
    setBwInput('')
  }

  const lastOrm = chartData[chartData.length - 1]?.['1RM estimat']
  const firstOrm = chartData[0]?.['1RM estimat']
  const ormDiff = lastOrm !== undefined && firstOrm !== undefined ? lastOrm - firstOrm : null

  const lastBw = bwChartData[bwChartData.length - 1]?.['Greutate (kg)']
  const firstBw = bwChartData[0]?.['Greutate (kg)']
  const bwDiff = lastBw !== undefined && firstBw !== undefined ? lastBw - firstBw : null

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-orange-500" />
          Progres exercițiu
        </h3>
        <Card className="p-4 space-y-4">
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedExId}
            onChange={e => setSelectedExId(e.target.value)}
          >
            <option value="">Alege exercițiu...</option>
            {exercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>

          {selectedExId && (
            progressLoading ? (
              <div className="h-48 flex items-center justify-center text-gray-500">Se încarcă...</div>
            ) : chartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-500">
                Nu ai date pentru acest exercițiu
              </div>
            ) : (
              <div>
                <div className="flex gap-4 mb-3">
                  {lastOrm !== undefined && (
                    <div className="text-center">
                      <div className="text-xl font-black text-orange-500">{lastOrm} kg</div>
                      <div className="text-xs text-gray-400">1RM curent</div>
                    </div>
                  )}
                  {ormDiff !== null && chartData.length > 1 && (
                    <div className="text-center">
                      <div className={`text-xl font-black ${ormDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {ormDiff >= 0 ? '+' : ''}{ormDiff} kg
                      </div>
                      <div className="text-xs text-gray-400">Față de prima sesiune</div>
                    </div>
                  )}
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="ormGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="1RM estimat" stroke="#f97316" fill="url(#ormGrad)" strokeWidth={2} dot={{ fill: '#f97316', r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )
          )}
        </Card>
      </div>

      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="text-orange-500 text-lg font-black">⚖</span>
          Greutate corporală
        </h3>
        <Card className="p-4 space-y-4">
          <form onSubmit={handleAddBw} className="flex gap-2">
            <input
              type="number" step="0.1" min="30" max="300"
              placeholder="kg"
              value={bwInput}
              onChange={e => setBwInput(e.target.value)}
              className="w-24 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={bwDate}
              onChange={e => setBwDate(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={savingBw || !bwInput}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              {savingBw ? '...' : 'Adaugă'}
            </button>
          </form>

          {bwLoading ? (
            <div className="h-32 flex items-center justify-center text-gray-500">Se încarcă...</div>
          ) : bwChartData.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-gray-500 text-sm">
              Adaugă prima înregistrare
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                {lastBw !== undefined && (
                  <div className="text-center">
                    <div className="text-xl font-black text-white">{lastBw} kg</div>
                    <div className="text-xs text-gray-400">Curentă</div>
                  </div>
                )}
                {bwDiff !== null && bwChartData.length > 1 && (
                  <div className="text-center">
                    <div className={`text-xl font-black ${bwDiff <= 0 ? 'text-green-400' : 'text-orange-400'}`}>
                      {bwDiff > 0 ? '+' : ''}{bwDiff.toFixed(1)} kg
                    </div>
                    <div className="text-xs text-gray-400">Față de start</div>
                  </div>
                )}
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={bwChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="Greutate (kg)" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
