import { Icon } from '../../../components/ui/Icon'
import type { Kpi } from '../dashboard.types'
import styles from './KpiCard.module.css'

type KpiCardProps = { kpi: Kpi }

export function KpiCard({ kpi }: KpiCardProps) {
  return (
    <article className={`${styles['kpi-card']} ${styles[kpi.tone]}`}>
      <div className={styles['kpi-top']}>
        <div className={styles['kpi-icon']}>
          <Icon name={kpi.icon} size={19} />
        </div>
        <button aria-label={`گزینه‌های ${kpi.label}`}>
          <Icon name="more" size={19} />
        </button>
      </div>
      <div className={styles['kpi-label']}>{kpi.label}</div>
      <div className={styles['kpi-value']}>
        {kpi.value}
        <small>{kpi.unit}</small>
      </div>
      <div className={styles['kpi-footer']}>
        <span className={`${styles['change']} ${kpi.change.startsWith('-') ? styles['negative'] : styles['positive']}`}>
          <Icon name={kpi.change.startsWith('-') ? 'arrowDown' : 'arrowUp'} size={13} />
          {kpi.change}
        </span>
        <span>{kpi.caption}</span>
      </div>
    </article>
  )
}
