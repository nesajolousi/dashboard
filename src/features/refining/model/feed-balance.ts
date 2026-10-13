import { formatPersianNumber, formatPersianRate } from '../../../shared/lib/number'
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

function readValue(value: unknown) {
  if (value === null || value === undefined || String(value).trim() === '') return null

  const normalized = String(value)
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/٫/g, '.')
    .replace(/[٬,]/g, '')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

function sumInputs(card: RefiningProductionCard) {
  const crudeOil = readValue(card.crudeOil)
  const gasCondensate = readValue(card.gasCondensate)
  return crudeOil !== null && gasCondensate !== null ? crudeOil + gasCondensate : null
}

function calculateRate(consumed: number | null, delivered: number | null) {
  return consumed !== null && delivered !== null && delivered > 0
    ? (consumed / delivered) * 100
    : null
}

export function selectFeedBalance(cards: RefiningProductionCard[]): FeedBalanceRow[] {
  return cards
    .filter((card) => !card.name.trim().startsWith('انبار'))
    .map((card) => {
      const explicitDelivered = readValue(card.feedDelivered)
      const explicitConsumed = readValue(card.feedConsumed)
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
