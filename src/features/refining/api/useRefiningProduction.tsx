import { useEffect, useState } from 'react'
import { fallbackRefiningResponse } from '../refining.data'
import type { ProductionDateRange, RefiningProductionResponse } from '../model/refining.types'
import { fetchRefiningProduction, type RefiningDataSource } from './refining.client'

export type RefiningProductionQueryState = {
  data: RefiningProductionResponse
  source: RefiningDataSource
  loading: boolean
  error?: string
}

export function useRefiningProduction(range: ProductionDateRange): RefiningProductionQueryState {
  const [state, setState] = useState<RefiningProductionQueryState>({
    data: fallbackRefiningResponse,
    source: 'sample',
    loading: true,
  })

  useEffect(() => {
    const controller = new AbortController()
    setState((current) => ({ ...current, loading: true, error: undefined }))

    fetchRefiningProduction(range, controller.signal).then((result) => {
      setState({ ...result, loading: false })
    }).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setState((current) => ({ ...current, loading: false, error: 'دریافت اطلاعات با خطا مواجه شد.' }))
    })

    return () => controller.abort()
  }, [range.from, range.to])

  return state
}
