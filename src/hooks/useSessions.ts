import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { Session, SessionLog } from '../types'

export function useSessions() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchSessions()
  }, [user])

  async function fetchSessions() {
    setLoading(true)
    const { data } = await supabase
      .from('sessions')
      .select('*, workout_plans(name), session_logs(count)')
      .eq('user_id', user!.id)
      .order('started_at', { ascending: false })
      .limit(50)
    setSessions((data as Session[]) ?? [])
    setLoading(false)
  }

  async function startSession(workoutPlanId: string) {
    const { data, error } = await supabase
      .from('sessions')
      .insert({ user_id: user!.id, workout_plan_id: workoutPlanId })
      .select()
      .single()
    return { data: data as Session | null, error }
  }

  async function finishSession(sessionId: string, notes: string) {
    const { error } = await supabase
      .from('sessions')
      .update({ finished_at: new Date().toISOString(), notes })
      .eq('id', sessionId)
    if (!error) fetchSessions()
    return { error }
  }

  return { sessions, loading, startSession, finishSession, refetch: fetchSessions }
}

export function useActiveSession(sessionId: string | null) {
  const [logs, setLogs] = useState<SessionLog[]>([])
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) return
    fetchSession()
  }, [sessionId])

  async function fetchSession() {
    if (!sessionId) return
    setLoading(true)
    const [{ data: sData }, { data: lData }] = await Promise.all([
      supabase
        .from('sessions')
        .select('*, workout_plans(*, workout_exercises(*, exercises(*)))')
        .eq('id', sessionId)
        .single(),
      supabase
        .from('session_logs')
        .select('*')
        .eq('session_id', sessionId)
        .order('logged_at'),
    ])
    setSession(sData as Session | null)
    setLogs((lData as SessionLog[]) ?? [])
    setLoading(false)
  }

  interface SetData {
    weight: number | null
    reps: number
    rpe: number | null
    notes: string | null
  }

  async function logSet(exerciseId: string, workoutExerciseId: string, setData: SetData) {
    const { data, error } = await supabase
      .from('session_logs')
      .insert({
        session_id: sessionId,
        exercise_id: exerciseId,
        workout_exercise_id: workoutExerciseId,
        ...setData,
      })
      .select()
      .single()
    if (!error) setLogs(prev => [...prev, data as SessionLog])
    return { data: data as SessionLog | null, error }
  }

  async function deleteLog(logId: string) {
    const { error } = await supabase.from('session_logs').delete().eq('id', logId)
    if (!error) setLogs(prev => prev.filter(l => l.id !== logId))
    return { error }
  }

  return { session, logs, loading, logSet, deleteLog, refetch: fetchSession }
}

export function useExerciseHistory(exerciseId: string | null) {
  const { user } = useAuth()
  const [history, setHistory] = useState<SessionLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!exerciseId || !user) return
    fetchHistory()
  }, [exerciseId, user])

  async function fetchHistory() {
    if (!exerciseId) return
    setLoading(true)
    const { data } = await supabase
      .from('session_logs')
      .select('*, sessions(started_at, finished_at)')
      .eq('exercise_id', exerciseId)
      .order('logged_at', { ascending: false })
      .limit(100)
    setHistory((data as SessionLog[]) ?? [])
    setLoading(false)
  }

  return { history, loading }
}
