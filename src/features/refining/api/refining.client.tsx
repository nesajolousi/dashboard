import { fallbackRefiningResponse } from '../refining.data'
import type { ProductionDateRange, RefiningProductionResponse } from '../model/refining.types'

export type RefiningDataSource = 'backend' | 'sample'

export type RefiningFetchResult = {
  data: RefiningProductionResponse
  source: RefiningDataSource
  error?: string
}

const apiEndpoint = import.meta.env.VITE_REFINING_API_URL || '/api/refining/production'

function isProductionResponse(value: unknown): value is RefiningProductionResponse {
  if (!value || typeof value !== 'object') return false

  const response = value as Partial<RefiningProductionResponse>
  return (
    typeof response.gasoline === 'string' &&
    typeof response.gasOil === 'string' &&
    typeof response.fuelOil === 'string' &&
    typeof response.crudeOil === 'string' &&
    typeof response.gasCondensate === 'string' &&
    Array.isArray(response.cards)
  )
}

export async function fetchRefiningProduction(
  range: ProductionDateRange,
  signal?: AbortSignal,
): Promise<RefiningFetchResult> {
  try {
    const url = new URL(apiEndpoint, window.location.origin)
    url.searchParams.set('from', range.from)
    url.searchParams.set('to', range.to)

    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const payload: unknown = await response.json()
    if (!isProductionResponse(payload)) throw new Error('Invalid refining response')

    return { data: payload, source: 'backend' }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error

    return {
      data: fallbackRefiningResponse,
      source: 'sample',
      error: 'اتصال به سرویس داده برقرار نشد؛ داده‌های نمونه نمایش داده می‌شود.',
    }
  }
}
