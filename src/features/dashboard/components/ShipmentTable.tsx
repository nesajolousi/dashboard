import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import type { Shipment } from '../dashboard.types'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './ShipmentTable.module.css'

// نوع اطلاعات ورودی جدول
type ShipmentTableProps = {
  rows: Shipment[]
}

// جدول آخرین محموله‌های ارسالی
export function ShipmentTable({ rows }: ShipmentTableProps) {
  return (
    <section
      className={`${sharedStyles.panel} ${styles['shipments-panel']}`}
    >
      <PanelHeading
        title="آخرین محموله‌ها"
        description="پیگیری وضعیت ارسال محصولات"
      >
        <button
          type="button"
          className={panelHeadingStyles['view-all']}
        >
          مشاهده همه محموله‌ها
          <Icon name="chevron" size={14} />
        </button>
      </PanelHeading>

      <div className={styles['table-scroll']}>
        <table>
          <thead>
            <tr>
              <th>محصول</th>
              <th>مقصد</th>
              <th>حجم (لیتر)</th>
              <th>وضعیت</th>
              <th>پیشرفت</th>
              <th>آخرین بروزرسانی</th>
              <th aria-label="عملیات" />
            </tr>
          </thead>

          <tbody>
            {rows.map((shipment) => (
              <tr key={shipment.code}>
                <td>
                  <div className={styles['product-cell']}>
                    <div className={styles['product-icon']}>
                      <Icon name="truck" size={16} />
                    </div>

                    <div>
                      <strong>{shipment.product}</strong>
                      <span>{shipment.code}</span>
                    </div>
                  </div>
                </td>

                <td>{shipment.destination}</td>

                <td className={styles['numeric']}>
                  {shipment.volume}
                </td>

                <td>
                  <span
                    className={`${styles['shipment-status']} ${
                      styles[shipment.statusClass] || ''
                    }`}
                  >
                    <i />
                    {shipment.status}
                  </span>
                </td>

                <td>
                  <div className={styles['table-progress']}>
                    <span>{shipment.progress}٪</span>

                    <div>
                      <i
                        style={{
                          width: `${shipment.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className={styles['date-cell']}>
                  {shipment.date}
                </td>

                <td>
                  <button
                    type="button"
                    className={styles['row-more']}
                    aria-label={`گزینه‌های محموله ${shipment.code}`}
                  >
                    <Icon name="more" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}