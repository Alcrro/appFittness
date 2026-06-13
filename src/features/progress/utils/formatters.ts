export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })
}
