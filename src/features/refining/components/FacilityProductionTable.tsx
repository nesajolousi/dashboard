import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import type { ProductKey, RefiningProductionCard } from '../refining.types'
import styles from './FacilityProductionTable.module.css'

type FacilityProductionTableProps = { cards: RefiningProductionCard[] }

const columns: { key: ProductKey; label: string }[] = [
  { key: 'gasoline', label: 'بنزین' },
  { key: 'gasOil', label: 'گازوئیل' },
  { key: 'fuelOil', label: 'نفت کوره' },
  { key: 'crudeOil', label: 'نفت خام' },
  { key: 'gasCondensate', label: 'میعانات گازی' },
]

function formatQuantity(value: string) {
  const parsed = Number(value || 0)
  if (!Number.isFinite(parsed)) return '۰٫۰۰۰'

  return new Intl.NumberFormat('fa-IR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(parsed)
}

export function FacilityProductionTable({ cards }: FacilityProductionTableProps) {
  const refineryCount = cards.filter((card) => !card.name.startsWith('انبار')).length
  const storageCount = cards.length - refineryCount

  return (
    <article className={`${sharedStyles.panel} ${styles.panel}`}>
      <PanelHeading title="تولید مراکز" description={`${cards.length} مرکز؛ ${refineryCount} پالایشگاه و ${storageCount} انبار`} />
      <div className={styles.tableWrap} role="region" aria-label="تولید پالایشگاه‌ها و انبارها" tabIndex={0}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">مرکز</th>
              <th scope="col">نوع مرکز</th>
              {columns.map((column) => <th scope="col" key={column.key}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => {
              const isStorage = card.name.startsWith('انبار')
              return (
                <tr key={card.id}>
                  <th scope="row" className={styles.name}>{card.name}</th>
                  <td><span className={`${styles.type} ${isStorage ? styles.storage : styles.refinery}`}>{isStorage ? 'انبار' : 'پالایشگاه'}</span></td>
                  {columns.map((column) => <td key={column.key}>{formatQuantity(card[column.key])}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.note}>مقادیر برای بازه انتخاب‌شده از سرویس تولید دریافت می‌شوند. مقدار خالی به‌صورت صفر نمایش داده می‌شود.</p>
    </article>
  )
}
