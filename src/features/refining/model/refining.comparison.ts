import { formatPersianNumber, formatPersianRate } from '../../../shared/lib/number'
import type { ProductKey, RefiningProductionCard } from './refining.types'

export type ComparisonMetricKey = ProductKey | 'receivedFeed' | 'mainProduction' | 'convertRate' | 'fuelOilRate'
export type ComparisonMetric = {
  key: ComparisonMetricKey
  label: string
  unit: 'quantity' | 'rate'
  preferLower?: boolean
}
export type RefineryComparison = {
  id: number
  name: string
  values: Record<ComparisonMetricKey, number | null>
}

export const comparisonMetrics: ComparisonMetric[] = [
  { key: 'gasoline', label: 'بنزین', unit: 'quantity' },
  { key: 'gasOil', label: 'گازوئیل', unit: 'quantity' },
  { key: 'fuelOil', label: 'نفت کوره', unit: 'quantity' },
  { key: 'crudeOil', label: 'نفت خام', unit: 'quantity' },
  { key: 'gasCondensate', label: 'میعانات گازی', unit: 'quantity' },
  { key: 'receivedFeed', label: 'مجموع خوراک ورودی', unit: 'quantity' },
  { key: 'mainProduction', label: 'مجموع تولید فرآورده‌های اصلی', unit: 'quantity' },
  { key: 'convertRate', label: 'نرخ تبدیل خوراک', unit: 'rate' },
  { key: 'fuelOilRate', label: 'سهم نفت کوره از تولید', unit: 'rate', preferLower: true },
]

function readValue(value: unknown): number | null {
  if (value === null || value === undefined || String(value).trim() === '') return null

  const normalized = String(value).trim()
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/٫/g, '.')
    .replace(/[٬,]/g, '')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

function sumKnown(values: (number | null)[]) {
  return values.every((value) => value !== null)
    ? values.reduce<number>((total, value) => total + (value ?? 0), 0)
    : null
}

function rate(numerator: number | null, denominator: number | null) {
  return numerator !== null && denominator !== null && denominator > 0
    ? (numerator / denominator) * 100
    : null
}

export function selectRefineryComparisons(cards: RefiningProductionCard[]): RefineryComparison[] {
  // The production response identifies storage facilities by the "انبار" prefix.
  return cards.filter((card) => !card.name.trim().startsWith('انبار')).map((card) => {
    const gasoline = readValue(card.gasoline)
    const gasOil = readValue(card.gasOil)
    const fuelOil = readValue(card.fuelOil)
    const crudeOil = readValue(card.crudeOil)
    const gasCondensate = readValue(card.gasCondensate)
    const receivedFeed = sumKnown([crudeOil, gasCondensate])
    const mainProduction = sumKnown([gasoline, gasOil, fuelOil])

    return {
      id: card.id,
      name: card.name,
      values: {
        gasoline, gasOil, fuelOil, crudeOil, gasCondensate, receivedFeed, mainProduction,
        convertRate: readValue(card.convertRate) ?? rate(mainProduction, receivedFeed),
        fuelOilRate: readValue(card.fuelOilRate) ?? rate(fuelOil, mainProduction),
      },
    }
  })
}

export function sortRefineryComparisons(
  rows: RefineryComparison[],
  key: ComparisonMetricKey,
  direction: 'asc' | 'desc',
) {
  return [...rows].sort((a, b) => {
    const left = a.values[key]
    const right = b.values[key]
    if (left === null && right !== null) return 1
    if (right === null && left !== null) return -1
    if (left !== null && right !== null && left !== right) {
      return direction === 'asc' ? left - right : right - left
    }
    return a.name.localeCompare(b.name, 'fa')
  })
}

export function formatComparisonValue(value: number | null, metric: ComparisonMetric) {
  if (value === null) return '—'
  return metric.unit === 'rate'
    ? formatPersianRate(value)
    : formatPersianNumber(value, { maximumFractionDigits: 3 })
}
