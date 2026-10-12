import { useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { navigationLabels } from '../../../config/navigation'
import { FacilityProductionCards } from '../components/FacilityProductionCards'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { ProductTotals } from '../components/ProductTotals'
import { useRefiningProduction } from '../api/useRefiningProduction'
import type { ProductionDateRange } from '../model/refining.types'
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

export function RefiningProductionPage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange)
  const state = useRefiningProduction(dateRange)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <Icon name="factory" size={15} /> مدیریت عملیات پالایش
          </div>
          <h1>{navigationLabels.refining}</h1>
          <p>مجموع تولید فرآورده‌های نفتی در پالایشگاه‌ها و مخازن تحت پایش</p>
        </div>
        <PersianDateRangePicker value={dateRange} onChange={setDateRange} />
      </header>

      <div className={`${styles.dataStatus} ${state.source === 'backend' ? styles.live : styles.sample}`} aria-live="polite">
        <span className={styles.statusDot} />
        {state.loading ? 'در حال دریافت اطلاعات...' : state.source === 'backend' ? 'اطلاعات از سرویس تولید دریافت شد' : state.error || 'داده‌های نمونه'}
      </div>

      <ProductTotals data={state.data} />
      <FacilityProductionCards cards={state.data.cards} />
      <Footer />
    </div>
  )
}
