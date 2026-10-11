import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import styles from './AlertsPanel.module.css'

export function AlertsPanel() {
  return (
    <article className={`${sharedStyles.panel} ${styles['alert-panel']}`}>
      <PanelHeading title="هشدارهای اخیر" description="موارد نیازمند پیگیری">
        <span className={styles['alert-count']}>۳</span>
      </PanelHeading>
      <div className={styles['alert-list']}>
        <div className={`${styles['alert-item']} ${styles['warning-alert']}`}>
          <div className={styles['alert-icon']}>
            <Icon name="alert" size={17} />
          </div>
          <div>
            <strong>افزایش فشار واحد تقطیر</strong>
            <span>پالایشگاه تهران · ۵ دقیقه پیش</span>
          </div>
        </div>
        <div className={`${styles['alert-item']} ${styles['info-alert']}`}>
          <div className={styles['alert-icon']}>
            <Icon name="clock" size={17} />
          </div>
          <div>
            <strong>تأخیر در بارگیری محموله</strong>
            <span>پایانه شمال · ۲۸ دقیقه پیش</span>
          </div>
        </div>
        <div className={`${styles['alert-item']} ${styles['success-alert']}`}>
          <div className={styles['alert-icon']}>
            <Icon name="check" size={17} />
          </div>
          <div>
            <strong>تعمیرات دوره‌ای تکمیل شد</strong>
            <span>پالایشگاه اصفهان · ۱ ساعت پیش</span>
          </div>
        </div>
      </div>
    </article>
  )
}
