
import { Icon } from '../../../components/ui/Icon'
import styles from './KpiCard.module.css'

// نمایش یک کارت شاخص کلیدی
export function KpiCard({ kpi }) {
  // تشخیص مثبت یا منفی بودن تغییر شاخص
  const isNegative = kpi.change.startsWith('-')

  return (
    <article
      className={`${styles['kpi-card']} ${styles[kpi.tone] || ''}`}
    >
      {/* آیکون شاخص و دکمه گزینه‌ها */}
      <div className={styles['kpi-top']}>
        <div className={styles['kpi-icon']}>
          <Icon name={kpi.icon} size={19} />
        </div>

        <button
          type="button"
          aria-label={`گزینه‌های ${kpi.label}`}
        >
          <Icon name="more" size={19} />
        </button>
      </div>

      {/* عنوان شاخص */}
      <div className={styles['kpi-label']}>
        {kpi.label}
      </div>

      {/* مقدار و واحد شاخص */}
      <div className={styles['kpi-value']}>
        {kpi.value}
        <small>{kpi.unit}</small>
      </div>

      {/* تغییرات و توضیحات شاخص */}
      <div className={styles['kpi-footer']}>
        <span
          className={`${styles['change']} ${
            isNegative
              ? styles['negative']
              : styles['positive']
          }`}
        >
          <Icon
            name={isNegative ? 'arrowDown' : 'arrowUp'}
            size={13}
          />
          {kpi.change}
        </span>

        <span>{kpi.caption}</span>
      </div>
    </article>
  )
}
