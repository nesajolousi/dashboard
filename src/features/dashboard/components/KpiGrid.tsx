
import { KpiCard } from './KpiCard'
import styles from './KpiGrid.module.css'

// نمایش کارت‌های شاخص کلیدی داشبورد
export function KpiGrid({ items }) {
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
