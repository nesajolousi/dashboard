
import { Icon } from '../../../components/ui/Icon'
import styles from './PageHeader.module.css'

export function PageHeader() {
  return (
    <section className={styles['welcome-row']}>
      {/* عنوان و وضعیت لحظه‌ای عملیات */}
      <div className={styles['header-title']}>
        <div className={styles['eyebrow']}>
          <span className={styles['status-dot']} />
          <span>وضعیت لحظه‌ای عملیات</span>
        </div>

        <h1>نمای کلی عملیات</h1>
      </div>

      {/* تاریخ و کنترل انتخاب بازه */}
      <div className={styles['date-control']}>
        <Icon name="calendar" size={17} />

        <span>شنبه، ۲۱ مهر ۱۴۰۳</span>

        <button type="button" aria-label="انتخاب بازه">
          <Icon name="chevron" size={15} />
        </button>
      </div>
    </section>
  )
}
