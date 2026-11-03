import styles from './PageState.module.css'

// نشانگر کوتاهی که هنگام بارگذاری فایل یک صفحه نمایش داده می‌شود
export function PageLoader() {
  return (
    <div className={styles['state']} role="status" aria-live="polite">
      <span className={styles['spinner']} aria-hidden="true" />
      <span>در حال بارگذاری صفحه…</span>
    </div>
  )
}
