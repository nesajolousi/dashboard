import type { ProductionDateRange } from './refining.types'

export function getInitialDateRange(): ProductionDateRange {
  const to = new Date()
  const from = new Date(to)
  from.setDate(from.getDate() - 29)

  const toIsoDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return { from: toIsoDate(from), to: toIsoDate(to) }
}
