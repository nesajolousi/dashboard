import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles['footer']}>
      <span>پترو دیدبان · نسخه ۱٫۰</span>
      <span>آخرین بروزرسانی: امروز، ۱۰:۵۲</span>
    </footer>
  )
}
