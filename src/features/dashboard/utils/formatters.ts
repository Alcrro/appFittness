export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })
}

export function getDuration(start: string, end: string | null): string | null {
  if (!end) return null
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}min`
}

export function getWeeklyCount(sessions: Array<{ started_at: string; finished_at: string | null }>): number {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  return sessions.filter(s => s.finished_at && new Date(s.started_at) >= startOfWeek).length
}
