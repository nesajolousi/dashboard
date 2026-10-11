import { Icon } from '../../../components/ui/Icon'
import styles from './PageHeader.module.css'

export function PageHeader() {
  return (
    <section className={styles['welcome-row']}>
      <div>
        <div className={styles['eyebrow']}>
          <span className={styles['status-dot']} /> وضعیت لحظه‌ای عملیات
        </div>
        <h1>نمای کلی عملیات</h1>
        <p>سلام محمد، امروز همه واحدها در مسیر برنامه تولید هستند.</p>
      </div>
      <div className={styles['date-control']}>
        <Icon name="calendar" size={17} />
        <span>شنبه، ۲۱ مهر ۱۴۰۳</span>
        <button aria-label="انتخاب بازه">
          <Icon name="chevron" size={15} />
        </button>
      </div>
    </section>
  )
}
