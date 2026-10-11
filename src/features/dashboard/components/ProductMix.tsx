import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './ProductMix.module.css'

export function ProductMix() {
  return (
    <article className={`${sharedStyles.panel} ${styles['distribution-panel']}`}>
      <PanelHeading title="توزیع سبد تولید" description="بر اساس محصول نهایی">
        <button className={panelHeadingStyles['more-button']} aria-label="گزینه‌ها">
          <Icon name="more" size={19} />
        </button>
      </PanelHeading>
      <div className={styles['donut-wrap']}>
        <div className={styles['donut']}>
          <div className={styles['donut-center']}>
            <strong>۱۲۸٫۴</strong>
            <span>هزار بشکه</span>
          </div>
        </div>
      </div>
      <div className={styles['distribution-legend']}>
        <div>
          <span className={`${styles['legend-square']} ${styles.petrol}`} />
          <span>بنزین</span>
          <strong>۴۲٪</strong>
        </div>
        <div>
          <span className={`${styles['legend-square']} ${styles.diesel}`} />
          <span>گازوئیل</span>
          <strong>۳۱٪</strong>
        </div>
        <div>
          <span className={`${styles['legend-square']} ${styles.kerosene}`} />
          <span>نفت سفید</span>
          <strong>۱۷٪</strong>
        </div>
        <div>
          <span className={`${styles['legend-square']} ${styles.other}`} />
          <span>سایر محصولات</span>
          <strong>۱۰٪</strong>
        </div>
      </div>
    </article>
  )
}
