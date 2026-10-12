import { Icon, type IconName } from '../../../components/ui/Icon'
import { formatPersianNumber } from '../../../shared/lib/number'
import { selectProductionRatios } from '../model/refining.selectors'
import type { ProductKey, RefiningProductionResponse } from '../model/refining.types'
import styles from './ProductTotals.module.css'

type ProductTotalsProps = { data: RefiningProductionResponse }
type ProductTone = 'teal' | 'blue' | 'gold' | 'coral' | 'purple'
type ProductDefinition = { key: ProductKey; label: string; icon: IconName; tone: ProductTone }
type ProductionRatio = { label: string; value: number | null; caption: string; icon: IconName; tone: ProductTone }

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
  return formatPersianNumber(value, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
}

function getProductionRatios(data: RefiningProductionResponse): ProductionRatio[] {
  const { convertRate, fuelOilRate } = selectProductionRatios(data)

  return [
    {
      label: 'نرخ تبدیل خوراک به فرآورده اصلی',
      value: convertRate,
      caption: 'فرآورده‌های اصلی تولیدی نسبت به خوراک دریافتی',
      icon: 'chart',
      tone: 'teal',
    },
    {
      label: 'نسبت نفت کوره به کل تولید (فرآورده اصلی)',
      value: fuelOilRate,
      caption: 'نفت کوره تولیدی نسبت به کل فرآورده‌های اصلی',
      icon: 'tank',
      tone: 'gold',
    },
  ]
}

export function ProductTotals({ data }: ProductTotalsProps) {
  const ratios = getProductionRatios(data)

  return (
    <div className={styles.groups} aria-label="مجموع ورود و خروج فرآورده‌های نفتی و شاخص‌های کل تولید">
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
      <section className={styles.ratios} aria-label="شاخص‌های کل تولید">
        <div className={styles.ratioHeading}>
          <div className={styles.groupIcon}>
            <Icon name="chart" size={18} />
          </div>
          <div>
            <h2>شاخص‌های کل تولید</h2>
            <p>محاسبه‌شده بر اساس مجموع ورودی و خروجی پالایشگاه‌ها</p>
          </div>
        </div>
        <div className={styles.ratioCards}>
          {ratios.map((ratio) => (
            <article key={ratio.label} className={`${styles.ratioCard} ${styles[ratio.tone]}`}>
              <div className={styles.icon}><Icon name={ratio.icon} size={19} /></div>
              <h3>{ratio.label}</h3>
              <div className={styles.ratioValue}>
                <strong>{ratio.value === null ? '—' : formatPersianNumber(ratio.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
                <span>درصد</span>
              </div>
              <p>{ratio.caption}</p>
            </article>
          ))}
        </div>
      </section>
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
