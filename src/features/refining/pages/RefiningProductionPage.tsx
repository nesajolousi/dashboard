import { useEffect, useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { navigationLabels } from '../../../config/navigation'
import { FacilityProductionTable } from '../components/FacilityProductionTable'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { ProductTotals } from '../components/ProductTotals'
import { fetchRefiningProduction, type RefiningDataSource } from '../refining.api'
import { fallbackRefiningResponse } from '../refining.data'
import type { ProductionDateRange, RefiningProductionResponse } from '../refining.types'
import styles from './RefiningProductionPage.module.css'

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getInitialDateRange(): ProductionDateRange {
  const to = new Date()
  const from = new Date(to)
  from.setDate(from.getDate() - 29)
  return { from: toIsoDate(from), to: toIsoDate(to) }
}

type RefiningPageState = {
  data: RefiningProductionResponse
  source: RefiningDataSource
  loading: boolean
  error?: string
}

export function RefiningProductionPage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange)
  const [state, setState] = useState<RefiningPageState>({
    data: fallbackRefiningResponse,
    source: 'sample',
    loading: true,
  })

  useEffect(() => {
    const controller = new AbortController()
    setState((current) => ({ ...current, loading: true, error: undefined }))

    fetchRefiningProduction(dateRange, controller.signal).then((result) => {
      setState({ ...result, loading: false })
    }).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setState((current) => ({ ...current, loading: false, error: 'دریافت اطلاعات با خطا مواجه شد.' }))
    })

    return () => controller.abort()
  }, [dateRange])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <Icon name="factory" size={15} /> مدیریت عملیات پالایش
          </div>
          <h1>{navigationLabels.refining}</h1>
          <p>مجموع تولید فرآورده‌های نفتی در پالایشگاه‌ها و انبارهای تحت پایش</p>
        </div>
        <PersianDateRangePicker value={dateRange} onChange={setDateRange} />
      </header>

      <div className={`${styles.dataStatus} ${state.source === 'backend' ? styles.live : styles.sample}`} aria-live="polite">
        <span className={styles.statusDot} />
        {state.loading ? 'در حال دریافت اطلاعات...' : state.source === 'backend' ? 'اطلاعات از سرویس تولید دریافت شد' : state.error || 'داده‌های نمونه'}
      </div>

      <ProductTotals data={state.data} />
      <FacilityProductionTable cards={state.data.cards} />
      <Footer />
    </div>
  )
}
