import { Icon } from '../../../components/ui/Icon'
import type { RefiningMetric } from '../refining.types'
import styles from './RefiningSummary.module.css'

type RefiningSummaryProps = { items: RefiningMetric[] }

export function RefiningSummary({ items }: RefiningSummaryProps) {
  return (
    <section className={styles.grid} aria-label="شاخص‌های پالایش و تولید">
      {items.map((item) => (
        <article key={item.label} className={`${styles.card} ${styles[item.tone]}`}>
          <div className={styles.icon}><Icon name={item.icon} size={19} /></div>
          <h2>{item.label}</h2>
          <div className={styles.value}>
            <strong>{item.value}</strong>
            <span>{item.unit}</span>
          </div>
          <p>{item.caption}</p>
        </article>
      ))}
    </section>
  )
}
