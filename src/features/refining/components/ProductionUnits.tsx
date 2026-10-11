import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import type { ProductionUnit } from '../refining.types'
import styles from './ProductionUnits.module.css'

type ProductionUnitsProps = { units: ProductionUnit[] }

export function ProductionUnits({ units }: ProductionUnitsProps) {
  return (
    <article className={`${sharedStyles.panel} ${styles.panel}`}>
      <PanelHeading title="وضعیت واحدهای پالایش" description="ظرفیت و خوراک عبوری؛ هزار بشکه در روز" />
      <div className={styles.tableWrap} role="region" aria-label="جدول وضعیت واحدهای پالایش" tabIndex={0}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">واحد</th>
              <th scope="col">خوراک عبوری</th>
              <th scope="col">ظرفیت اسمی</th>
              <th scope="col">بهره‌برداری</th>
              <th scope="col">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.code}>
                <th scope="row" className={styles.unitName}>
                  <strong>{unit.name}</strong>
                  <bdi>{unit.code}</bdi>
                </th>
                <td>{unit.throughput}</td>
                <td>{unit.capacity}</td>
                <td className={styles.utilization}>
                  <span>{unit.utilizationLabel}</span>
                  <progress value={unit.utilization} max={100} aria-label={`بهره‌برداری ${unit.name}`} />
                </td>
                <td>
                  <span className={`${styles.status} ${styles[unit.status]}`}>
                    {unit.status === 'operating' ? 'در حال بهره‌برداری' : 'تعمیرات'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.note}>خوراک عبوری هر واحد مستقل است و مجموع این مقادیر، خوراک کل پالایشگاه نیست.</p>
    </article>
  )
}
