import { Icon, type IconName } from '../../../components/ui/Icon'
import type { ProductKey, RefiningProductionResponse } from '../refining.types'
import styles from './ProductTotals.module.css'

type ProductTotalsProps = { data: RefiningProductionResponse }
type ProductTone = 'teal' | 'blue' | 'gold' | 'coral' | 'purple'
type ProductDefinition = { key: ProductKey; label: string; icon: IconName; tone: ProductTone }

const inputProducts: ProductDefinition[] = [
  { key: 'crudeOil', label: 'نفت خام', icon: 'tank', tone: 'coral' },
  { key: 'gasCondensate', label: 'میعانات گازی', icon: 'settings', tone: 'purple' },
]

const outputProducts: ProductDefinition[] = [
  { key: 'gasoline', label: 'بنزین', icon: 'truck', tone: 'teal' },
  { key: 'gasOil', label: 'گازوئیل', icon: 'factory', tone: 'blue' },
  { key: 'fuelOil', label: 'نفت کوره', icon: 'tank', tone: 'gold' },
]

function formatQuantity(value: string) {
  const parsed = Number(value || 0)
  if (!Number.isFinite(parsed)) return '۰٫۰۰۰'

  return new Intl.NumberFormat('fa-IR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(parsed)
}

export function ProductTotals({ data }: ProductTotalsProps) {
  return (
    <div className={styles.groups} aria-label="مجموع ورود و خروج فرآورده‌های نفتی">
      <ProductGroup
        title="مجموع ورودی‌ها"
        description="خوراک ورودی پالایشگاه‌ها"
        products={inputProducts}
        data={data}
        className={styles.inputs}
        icon="tank"
      />
      <ProductGroup
        title="مجموع خروجی‌ها"
        description="فرآورده‌های خروجی پالایشگاه‌ها"
        products={outputProducts}
        data={data}
        className={styles.outputs}
        icon="truck"
      />
    </div>
  )
}

function ProductGroup({
  title,
  description,
  products,
  data,
  className,
  icon,
}: {
  title: string
  description: string
  products: ProductDefinition[]
  data: RefiningProductionResponse
  className: string
  icon: IconName
}) {
  return (
    <section className={`${styles.group} ${className}`}>
      <div className={styles.groupHeading}>
        <div className={styles.groupIcon}>
          <Icon name={icon} size={18} />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.cards}>
        {products.map((product) => (
          <article key={product.key} className={`${styles.card} ${styles[product.tone]}`}>
            <div className={styles.icon}><Icon name={product.icon} size={19} /></div>
            <h3>{product.label}</h3>
            <strong className={styles.value}>{formatQuantity(data[product.key])}</strong>
            <span className={styles.unit}>واحد گزارش سرویس</span>
          </article>
        ))}
      </div>
    </section>
  )
}
