import { useState, useEffect } from 'react'
import { supabase } from '../../../shared/lib/supabase'
import { useAuth } from '../../../shared/context/AuthContext'
import type { BodyWeight } from '../../../shared/types'

export function useBodyWeight() {
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
