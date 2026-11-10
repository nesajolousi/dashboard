import { progressWidthClass } from '../../../shared/lib/progress'
import { formatFeedBalanceValue, type FeedBalanceRow } from '../model/feed-balance'
import styles from './FeedBalanceBars.module.css'

type FeedBalanceBarsProps = {
  /** ردیف‌ها به ترتیب نمایش */
  rows: FeedBalanceRow[]
  /** شماره رنگ هر پالایشگاه از جایش در فهرست اصلی (ثابت می‌ماند، حتی با عوض‌شدن مرتب‌سازی) */
  colorIndexById: Map<number, number>
}

// شماره رنگ (۱ تا ۱۰) متناظر با categoryColorAt در chartTheme
const colorNumber = (index: number) => (index % 10) + 1

// هر پالایشگاه: نوار کامل = خوراک تحویل‌شده، بخش پررنگ داخل آن = مقدار مصرف‌شده، و عددها جلوی نوار
export function FeedBalanceBars({ rows, colorIndexById }: FeedBalanceBarsProps) {
  const maxDelivered = Math.max(0, ...rows.map((row) => row.delivered ?? 0))

  return (
    <ul className={styles.list}>
      {rows.map((row) => {
        const delivered = row.delivered
        const consumed = row.consumed
        const trackPercent = delivered !== null && maxDelivered > 0 ? Math.max(2, (delivered / maxDelivered) * 100) : 0
        const fillPercent = delivered !== null && delivered > 0 && consumed !== null ? Math.min(100, (consumed / delivered) * 100) : 0
        const color = styles[`c${colorNumber(colorIndexById.get(row.id) ?? 0)}`]

        return (
          <li key={row.id} className={`${styles.row} ${color}`}>
            <span className={styles.name}>{row.name}</span>

            <span className={styles.trackArea}>
              {delivered !== null && (
                <span className={`${styles.track} ${progressWidthClass(trackPercent)}`}>
                  <span className={`${styles.fill} ${progressWidthClass(fillPercent)}`} />
                </span>
              )}
            </span>

            <span className={styles.values}>
              <strong>{formatFeedBalanceValue(consumed, 'quantity')}</strong>
              <small>از {formatFeedBalanceValue(delivered, 'quantity')}</small>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
