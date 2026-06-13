import { useState, useEffect } from 'react'
import { supabase } from '../../../shared/lib/supabase'
import { calculate1RM } from '../../../shared/lib/exercises'

interface ProgressPoint {
  date: string
  orm: number
  weight: number
  reps: number
}

export function useExerciseProgress(exerciseId: string) {
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
