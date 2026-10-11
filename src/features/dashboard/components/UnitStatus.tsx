import { Icon, type IconName } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './UnitStatus.module.css'

export function UnitStatus() {
  return (
    <article className={`${sharedStyles.panel} ${styles['unit-panel']}`}>
      <PanelHeading title="وضعیت واحدها" description="نمایش لحظه‌ای خطوط اصلی">
        <button className={panelHeadingStyles['view-all']}>
          مشاهده همه <Icon name="chevron" size={14} />
        </button>
      </PanelHeading>
      <div className={styles['unit-list']}>
        {[
          ['پالایشگاه تهران', 'ظرفیت تولید', '۹۱٪', 'پایدار', 'online', 'factory'],
          ['پالایشگاه اصفهان', 'ظرفیت تولید', '۸۴٪', 'پایدار', 'online', 'factory'],
          ['انبار نفت مرکزی', 'موجودی مخازن', '۶۸٪', 'نیاز به توجه', 'warning', 'tank'],
        ].map(([name, caption, value, status, statusClass, icon]) => (
          <div className={styles['unit-row']} key={name}>
            <div className={`${styles['unit-avatar']} ${icon === 'tank' ? styles['storage'] : styles['refinery']}`}>
              <Icon name={icon as IconName} size={18} />
            </div>
            <div className={styles['unit-info']}>
              <strong>{name}</strong>
              <span>{caption}</span>
            </div>
            <div className={styles['unit-progress']}>
              <div>
                <span>{value}</span>
                <small>{icon === 'tank' ? 'پرشدگی' : 'فعال'}</small>
              </div>
              <div className={styles['progress-track']}>
                <i style={{ width: value }} />
              </div>
            </div>
            <span className={`${styles['live-status']} ${styles[statusClass]}`}>
              <i /> {status}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
