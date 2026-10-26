
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './ShipmentTable.module.css'

// جدول آخرین محموله‌های ارسالی
export function ShipmentTable({ rows }) {
  return (
    <section
      className={`${sharedStyles.panel} ${styles['shipments-panel']}`}
    >
      {/* عنوان جدول و دکمه مشاهده همه */}
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

      {/* جدول با امکان پیمایش افقی در صفحه‌های باریک */}
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
                {/* نام محصول و کد محموله */}
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

                {/* مقصد ارسال */}
                <td>{shipment.destination}</td>

                {/* حجم محموله */}
                <td className={styles['numeric']}>
                  {shipment.volume}
                </td>

                {/* وضعیت ارسال */}
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

                {/* درصد پیشرفت ارسال */}
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

                {/* تاریخ آخرین بروزرسانی */}
                <td className={styles['date-cell']}>
                  {shipment.date}
                </td>

                {/* گزینه‌های محموله */}
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
