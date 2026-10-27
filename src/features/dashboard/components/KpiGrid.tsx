import type { Kpi } from '../dashboard.types'
import { KpiCard } from './KpiCard'
import styles from './KpiGrid.module.css'

// نمایش کارت‌های شاخص کلیدی داشبورد
type KpiGridProps = {
  items: Kpi[]
}

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <section
      className={styles['kpi-grid']}
      aria-label="شاخص‌های کلیدی"
    >
      {items.map((kpi) => (
        <KpiCard
          key={kpi.label}
          kpi={kpi}
        />
      ))}
    </section>
  )
}