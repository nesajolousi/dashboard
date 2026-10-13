import { selectFacilityTotals } from './refining.selectors'
import type { RefiningProductionCard } from './refining.types'
import { selectFeedBalance, type FeedBalanceRow } from './feed-balance'

export type RefineryStatusKey = 'operating' | 'watch' | 'unknown'

export type RefineryStatusRow = FeedBalanceRow & {
  status: RefineryStatusKey
  statusLabel: string
  convertRate: number | null
}

export const refineryStatusLabels: Record<RefineryStatusKey, string> = {
  operating: 'پایدار',
  watch: 'نیازمند پایش',
  unknown: 'داده ناقص',
}

export function selectRefineryStatus(cards: RefiningProductionCard[]): RefineryStatusRow[] {
  const feedRows = selectFeedBalance(cards)
  const rowsById = new Map(feedRows.map((row) => [row.id, row]))

  return cards
    .filter((card) => !card.name.trim().startsWith('انبار'))
    .map((card) => {
      const feed = rowsById.get(card.id)!
      const { convertRate } = selectFacilityTotals(card)
      const status: RefineryStatusKey = feed.consumptionRate === null
        ? 'unknown'
        : feed.consumptionRate >= 98
          ? 'watch'
          : 'operating'

      return {
        ...feed,
        status,
        statusLabel: refineryStatusLabels[status],
        convertRate,
      }
    })
}

export function selectRefineryStatusSummary(rows: RefineryStatusRow[]) {
  const operating = rows.filter((row) => row.status === 'operating').length
  const watch = rows.filter((row) => row.status === 'watch').length
  const unknown = rows.filter((row) => row.status === 'unknown').length
  const knownRates = rows
    .map((row) => row.consumptionRate)
    .filter((value): value is number => value !== null)

  return {
    total: rows.length,
    operating,
    watch,
    unknown,
    averageConsumptionRate: knownRates.length
      ? knownRates.reduce((sum, value) => sum + value, 0) / knownRates.length
      : null,
  }
}
