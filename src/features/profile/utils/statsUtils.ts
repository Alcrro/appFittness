export function getTotalMins(sessions: Array<{ started_at: string; finished_at: string | null }>): number {
  return sessions.reduce((acc, s) => {
    if (!s.finished_at) return acc
    return acc + Math.round((new Date(s.finished_at).getTime() - new Date(s.started_at).getTime()) / 60000)
  }, 0)
}

export function formatTotalTime(mins: number): string {
  return mins >= 60 ? `${Math.floor(mins / 60)}h` : `${mins}m`
}

export function getWeeklyCount(sessions: Array<{ started_at: string }>): number {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  return sessions.filter(s => new Date(s.started_at) >= startOfWeek).length
}
