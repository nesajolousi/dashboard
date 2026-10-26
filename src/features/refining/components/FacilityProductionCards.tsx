
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import {
  formatPersianNumber,
  formatPersianRate,
} from '../../../shared/lib/number'
import sharedStyles from '../../../styles/shared.module.css'
import { selectFacilityTotals } from '../model/refining.selectors'
import styles from './FacilityProductionCards.module.css'

// خوراک‌های ورودی
const inputProducts = [
  { key: 'crudeOil', label: 'نفت خام' },
  { key: 'gasCondensate', label: 'میعانات گازی' },
]

// فرآورده‌های خروجی
const outputProducts = [
  { key: 'gasOil', label: 'گازوئیل', tone: 'teal' },
  { key: 'gasoline', label: 'بنزین', tone: 'gold' },
  { key: 'fuelOil', label: 'نفت کوره', tone: 'purple' },
]

// قالب‌بندی مقادیر عددی
function formatQuantity(value) {
  return formatPersianNumber(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })
}

// نمایش کارت‌های پالایشگاه‌ها و مخازن
export function FacilityProductionCards({ cards }) {
  const refineryCount = cards.filter(
    (card) => !card.name.startsWith('انبار')
  ).length

  const storageCount = cards.length - refineryCount

  return (
    <section
      className={`${sharedStyles.panel} ${styles.panel}`}
      aria-label="کارت KPI پالایشگاه‌ها و مخازن"
    >
      <PanelHeading
        title="عملکرد پالایشگاه‌ها و مخازن"
        description={`${cards.length} مرکز؛ ${refineryCount} پالایشگاه و ${storageCount} مخزن`}
      />

      {/* شبکه کارت‌ها */}
      <div className={styles.grid}>
        {cards.map((card) => (
          <FacilityCard key={card.id} card={card} />
        ))}
      </div>

      {/* توضیحات پایین پنل */}
      <p className={styles.note}>
        مقادیر برای بازه انتخاب‌شده از سرویس تولید دریافت می‌شوند.
        نرخ ناموجود با خط تیره نمایش داده می‌شود.
      </p>
    </section>
  )
}

// کارت اطلاعات هر پالایشگاه یا مخزن
function FacilityCard({ card }) {
  const isStorage = card.name.startsWith('انبار')

  const {
    receivedFeed: totalFeed,
    convertRate,
    fuelOilRate,
  } = selectFacilityTotals(card)

  return (
    <article className={styles.card}>
      {/* عنوان، نوع مرکز و آیکون */}
      <header className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3>{card.name}</h3>

          {/* شاخص‌های عملکرد با نوشته کوچک‌تر */}
          <div className={styles.headerMeta}>
           {isStorage && (
  <span className={styles.storage}>مخزن</span>
)}

            <span className={styles.headerRate}>
              <span>نرخ تبدیل خوراک:</span>
              <strong>{formatPersianRate(convertRate)}</strong>
            </span>

            <span className={styles.headerRate}>
              <span>نفت کوره:</span>
              <strong>{formatPersianRate(fuelOilRate)}</strong>
            </span>
          </div>
        </div>

        <div className={styles.cardIcon} aria-hidden="true">
          <Icon name={isStorage ? 'tank' : 'factory'} size={22} />
        </div>
      </header>

      {/* خوراک ورودی */}
      <section
        className={styles.feed}
        aria-label={`خوراک ورودی ${card.name}`}
      >
        <div className={styles.sectionTitle}>
          <span>خوراک ورودی</span>
          <small>هزار بشکه در روز</small>
        </div>

        <div className={styles.feedRows}>
          {inputProducts.map((product) => (
            <div className={styles.feedRow} key={product.key}>
              <span>{product.label}</span>
              <strong>{formatQuantity(card[product.key])}</strong>
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span>مجموع خوراک</span>
          <strong>{formatQuantity(totalFeed)}</strong>
        </div>
      </section>

      {/* محصولات تولیدی */}
      <section
        className={styles.products}
        aria-label={`محصولات تولیدی ${card.name}`}
      >
        <div className={styles.sectionTitle}>
          <span>محصولات تولیدی</span>
          <small>هزار بشکه در روز</small>
        </div>

        <div className={styles.productGrid}>
          {outputProducts.map((product) => (
            <div
              className={`${styles.product} ${styles[product.tone]}`}
              key={product.key}
            >
              <span>{product.label}</span>
              <strong>{formatQuantity(card[product.key])}</strong>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
