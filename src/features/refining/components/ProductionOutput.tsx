import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import type { ProductOutput } from '../refining.types'
import styles from './ProductionOutput.module.css'

type ProductionOutputProps = { products: ProductOutput[] }

export function ProductionOutput({ products }: ProductionOutputProps) {
  return (
    <article className={`${sharedStyles.panel} ${styles.panel}`}>
      <PanelHeading title="تولید فرآورده‌ها" description="عملکرد روزانه در مقایسه با برنامه؛ هزار بشکه" />
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.name} className={styles.product}>
            <div className={styles.productHeading}>
              <h3>{product.name}</h3>
              <span>{product.achievementLabel} تحقق</span>
            </div>
            <div className={styles.volumes}>
              <span>تولید: <strong>{product.actual}</strong></span>
              <span>برنامه: {product.target}</span>
            </div>
            <progress
              value={Math.min(product.achievement, 100)}
              max={100}
              aria-label={`تحقق برنامه تولید ${product.name}`}
              aria-valuetext={product.achievementLabel}
            />
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <Icon name="check" size={17} />
        <span>تولید کل: <strong>۱۲۸٫۴ هزار بشکه</strong></span>
      </div>
    </article>
  )
}
