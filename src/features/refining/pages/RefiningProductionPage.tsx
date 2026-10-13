import { useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { navigationLabels } from '../../../config/navigation'
import { FacilityProductionCards } from '../components/FacilityProductionCards'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { ProductTotals } from '../components/ProductTotals'
import { RefiningNavigation } from '../components/RefiningNavigation'
import { useRefiningProduction } from '../api/useRefiningProduction'
import { getInitialDateRange } from '../model/refining.dates'
import styles from './RefiningProductionPage.module.css'

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

      <RefiningNavigation />

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
