import type { PeriodParts, TimelineEntry } from '@/types/portfolio'

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

export function buildPeriod({ startMonth, startYear, endMonth, endYear, current }: PeriodParts): string {
  const start = [startMonth, startYear].filter(Boolean).join(' ')
  const end = current ? 'Present' : [endMonth, endYear].filter(Boolean).join(' ')
  return [start, end].filter(Boolean).join(' — ')
}

export function startYearOf(entry: Pick<TimelineEntry, 'startYear' | 'period'>): number {
  const fromParts = Number.parseInt(entry.startYear ?? '', 10)
  if (!Number.isNaN(fromParts)) return fromParts
  const match = entry.period.match(/\d{4}/)
  return match ? Number.parseInt(match[0], 10) : 0
}

export function sortNewestFirst<T extends Pick<TimelineEntry, 'startYear' | 'period'>>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => startYearOf(b) - startYearOf(a))
}
