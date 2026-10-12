import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import { formatPersianNumber, formatPersianRate } from '../../../shared/lib/number'
import sharedStyles from '../../../styles/shared.module.css'
import { selectFacilityTotals } from '../model/refining.selectors'
import type { RefiningProductionCard } from '../model/refining.types'
import styles from './FacilityProductionCards.module.css'

type FacilityProductionCardsProps = { cards: RefiningProductionCard[] }
type InputKey = 'crudeOil' | 'gasCondensate'
type OutputKey = 'gasoline' | 'gasOil' | 'fuelOil'

const inputProducts: { key: InputKey; label: string }[] = [
  { key: 'crudeOil', label: 'نفت خام' },
  { key: 'gasCondensate', label: 'میعانات گازی' },
]

const outputProducts: { key: OutputKey; label: string; tone: 'teal' | 'gold' | 'purple' }[] = [
  { key: 'gasOil', label: 'گازوئیل', tone: 'teal' },
  { key: 'gasoline', label: 'بنزین', tone: 'gold' },
  { key: 'fuelOil', label: 'نفت کوره', tone: 'purple' },
]

function formatQuantity(value: string | number | null | undefined) {
  return formatPersianNumber(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })
}

export function FacilityProductionCards({ cards }: FacilityProductionCardsProps) {
  const refineryCount = cards.filter((card) => !card.name.startsWith('انبار')).length
  const storageCount = cards.length - refineryCount

  return (
    <section className={`${sharedStyles.panel} ${styles.panel}`} aria-label="کارت KPI پالایشگاه‌ها و مخازن">
      <PanelHeading
        title="عملکرد پالایشگاه‌ها و مخازن"
        description={`${cards.length} مرکز؛ ${refineryCount} پالایشگاه و ${storageCount} مخزن`}
      />
      <div className={styles.grid}>
        {cards.map((card) => <FacilityCard key={card.id} card={card} />)}
      </div>
      <p className={styles.note}>مقادیر برای بازه انتخاب‌شده از سرویس تولید دریافت می‌شوند. نرخ ناموجود با خط تیره نمایش داده می‌شود.</p>
    </section>
  )
}

function FacilityCard({ card }: { card: RefiningProductionCard }) {
  const isStorage = card.name.startsWith('انبار')
  const { receivedFeed: totalFeed, convertRate, fuelOilRate } = selectFacilityTotals(card)

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div>
          <h3>{card.name}</h3>
          <span className={isStorage ? styles.storage : styles.refinery}>{isStorage ? 'مخزن' : 'پالایشگاه'}</span>
          <span className={styles.headerRate}>{formatPersianRate(convertRate)} نرخ تبدیل خوراک</span>
        </div>
        <div className={styles.cardIcon} aria-hidden="true">
          <Icon name={isStorage ? 'tank' : 'factory'} size={25} />
        </div>
      </header>

      <section className={styles.feed} aria-label={`خوراک ورودی ${card.name}`}>
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

      <section className={styles.products} aria-label={`محصولات تولیدی ${card.name}`}>
        <div className={styles.sectionTitle}>
          <span>محصولات تولیدی</span>
          <small>هزار بشکه در روز</small>
        </div>
        <div className={styles.productGrid}>
          {outputProducts.map((product) => (
            <div className={`${styles.product} ${styles[product.tone]}`} key={product.key}>
              <span>{product.label}</span>
              <strong>{formatQuantity(card[product.key])}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.rates}>
        <div>
          <span>نرخ تبدیل خوراک</span>
          <strong>{formatPersianRate(convertRate)}</strong>
        </div>
        <div>
          <span>نسبت نفت کوره به کل تولید</span>
          <strong>{formatPersianRate(fuelOilRate)}</strong>
        </div>
      </footer>
    </article>
  )
}
