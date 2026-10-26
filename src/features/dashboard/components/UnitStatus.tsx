
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './UnitStatus.module.css'

// اطلاعات واحدهای پالایشگاهی و انبار نفت
const units = [
  {
    name: 'پالایشگاه تهران',
    caption: 'ظرفیت تولید',
    value: '۹۱٪',
    progress: 91,
    status: 'پایدار',
    statusClass: 'online',
    icon: 'factory',
  },
  {
    name: 'پالایشگاه اصفهان',
    caption: 'ظرفیت تولید',
    value: '۸۴٪',
    progress: 84,
    status: 'پایدار',
    statusClass: 'online',
    icon: 'factory',
  },
  {
    name: 'انبار نفت مرکزی',
    caption: 'موجودی مخازن',
    value: '۶۸٪',
    progress: 68,
    status: 'نیاز به توجه',
    statusClass: 'warning',
    icon: 'tank',
  },
]

export function UnitStatus() {
  return (
    <article
      className={`${sharedStyles.panel} ${styles['unit-panel']}`}
    >
      {/* عنوان پنل و دکمه مشاهده همه */}
      <PanelHeading
        title="وضعیت واحدها"
        description="نمایش لحظه‌ای خطوط اصلی"
      >
        <button
          type="button"
          className={panelHeadingStyles['view-all']}
        >
          مشاهده همه
          <Icon name="chevron" size={14} />
        </button>
      </PanelHeading>

      {/* فهرست وضعیت واحدها */}
      <div className={styles['unit-list']}>
        {units.map((unit) => {
          const isStorage = unit.icon === 'tank'

          return (
            <div className={styles['unit-row']} key={unit.name}>
              {/* آیکون واحد */}
              <div
                className={`${styles['unit-avatar']} ${
                  isStorage
                    ? styles['storage']
                    : styles['refinery']
                }`}
              >
                <Icon name={unit.icon} size={18} />
              </div>

              {/* نام و توضیحات واحد */}
              <div className={styles['unit-info']}>
                <strong>{unit.name}</strong>
                <span>{unit.caption}</span>
              </div>

              {/* درصد ظرفیت یا موجودی */}
              <div className={styles['unit-progress']}>
                <div>
                  <span>{unit.value}</span>
                  <small>{isStorage ? 'پرشدگی' : 'فعال'}</small>
                </div>

                <div className={styles['progress-track']}>
                  <i
                    style={{ width: `${unit.progress}%` }}
                  />
                </div>
              </div>

              {/* وضعیت عملیاتی */}
              <span
                className={`${styles['live-status']} ${
                  styles[unit.statusClass]
                }`}
              >
                <i />
                {unit.status}
              </span>
            </div>
          )
        })}
      </div>
    </article>
  )
}
