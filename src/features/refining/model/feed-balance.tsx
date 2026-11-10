import { formatPersianNumber, formatPersianRate, readNumber } from '../../../shared/lib/number'
import { isStorageFacility } from './facility'
import type { RefiningProductionCard } from './refining.types'

export type FeedBalanceMetric = {
  key: 'delivered' | 'consumed' | 'remaining' | 'consumptionRate'
  label: string
  unit: 'quantity' | 'rate'
  tone: 'teal' | 'blue' | 'gold' | 'coral'
}

export type FeedBalanceRow = {
  id: number
  name: string
  delivered: number | null
  consumed: number | null
  remaining: number | null
  consumptionRate: number | null
  isEstimated: boolean
}

export const feedBalanceMetrics: FeedBalanceMetric[] = [
  { key: 'delivered', label: 'تحویل خوراک', unit: 'quantity', tone: 'teal' },
  { key: 'consumed', label: 'مصرف خوراک', unit: 'quantity', tone: 'blue' },
  { key: 'remaining', label: 'مانده خوراک', unit: 'quantity', tone: 'gold' },
  { key: 'consumptionRate', label: 'نسبت مصرف به تحویل', unit: 'rate', tone: 'coral' },
]

function sumInputs(card: RefiningProductionCard) {
  const crudeOil = readNumber(card.crudeOil)
  const gasCondensate = readNumber(card.gasCondensate)
  return crudeOil !== null && gasCondensate !== null ? crudeOil + gasCondensate : null
}

function calculateRate(consumed: number | null, delivered: number | null) {
  return consumed !== null && delivered !== null && delivered > 0
    ? (consumed / delivered) * 100
    : null
}

export function selectFeedBalance(cards: RefiningProductionCard[]): FeedBalanceRow[] {
  return cards
    .filter((card) => !isStorageFacility(card))
    .map((card) => {
      const explicitDelivered = readNumber(card.feedDelivered)
      const explicitConsumed = readNumber(card.feedConsumed)
      const delivered = explicitDelivered ?? sumInputs(card)
      const consumed = explicitConsumed
      const remaining = delivered !== null && consumed !== null ? delivered - consumed : null

      return {
        id: card.id,
        name: card.name,
        delivered,
        consumed,
        remaining,
        consumptionRate: calculateRate(consumed, delivered),
        isEstimated: explicitDelivered === null || explicitConsumed === null,
      }
    })
}

function total(rows: FeedBalanceRow[], key: 'delivered' | 'consumed') {
  const values = rows.map((row) => row[key])
  return values.length > 0 && values.every((value) => value !== null)
    ? values.reduce<number>((sum, value) => sum + (value ?? 0), 0)
    : null
}

export function selectFeedBalanceSummary(rows: FeedBalanceRow[]) {
  const delivered = total(rows, 'delivered')
  const consumed = total(rows, 'consumed')
  const remaining = delivered !== null && consumed !== null ? delivered - consumed : null
  return {
    delivered,
    consumed,
    remaining,
    consumptionRate: calculateRate(consumed, delivered),
  }
}

export function formatFeedBalanceValue(value: number | null, unit: FeedBalanceMetric['unit']) {
  if (value === null) return '—'
  return unit === 'rate'
    ? formatPersianRate(value)
    : formatPersianNumber(value, { minimumFractionDigits: 0, maximumFractionDigits: 3 })
}
