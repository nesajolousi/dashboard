import { Icon, type IconName } from '../ui/Icon'
import { useAppContext } from '../../context/AppContext'
import sharedStyles from '../../styles/shared.module.css'
import styles from './Sidebar.module.css'


const navItems: { label: string; icon: IconName }[] = [
  { label: 'نمای کلی', icon: 'grid' },
  { label: 'پالایش و تولید', icon: 'factory' },
  { label: 'توزیع و فروش', icon: 'truck' },
  { label: 'مخازن و انبارها', icon: 'tank' },
  { label: 'تحلیل عملکرد', icon: 'chart' },
  { label: 'گزارش‌ها', icon: 'file' },
]

export function Sidebar() {
  const { activeNav, menuOpen, sidebarCollapsed, selectNav, closeMenu } = useAppContext()
  return (
    <aside className={`${styles['sidebar']} ${menuOpen ? styles['is-open'] : ''} ${sidebarCollapsed ? styles['is-collapsed'] : ''}`}>
      <div className={styles['brand']}>
        <div className={styles['brand-mark']}>
          <span />
        </div>
        <div>
          <strong>پترو دیدبان</strong>
          <small>سامانه مدیریت عملیات</small>
        </div>
        <button className={styles['sidebar-close']} onClick={closeMenu} aria-label="بستن منو">
          <Icon name="close" size={18} />
        </button>
      </div>
      <div className={styles['side-label']}>داشبورد</div>
      <nav className={styles['main-nav']} aria-label="منوی اصلی">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles['nav-item']} ${activeNav === item.label ? styles['active'] : ''}`}
            onClick={() => {
              selectNav(item.label)
              closeMenu()
            }}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            {item.label === 'نمای کلی' && <span className={styles['nav-pulse']} />}
          </button>
        ))}
      </nav>
      <div className={`${styles['side-label']} ${styles['side-label-spaced']}`}>سایر</div>
      <button className={styles['nav-item']} onClick={() => selectNav('تنظیمات')}>
        <Icon name="settings" size={19} />
        <span>تنظیمات</span>
      </button>
      <div className={styles['sidebar-bottom']}>
        <div className={styles['support-card']}>
          <div className={styles['support-icon']}>
            <Icon name="alert" size={18} />
          </div>
          <strong>نیاز به راهنمایی دارید؟</strong>
          <span>با پشتیبانی عملیات در تماس باشید.</span>
          <button>
            مرکز پشتیبانی <Icon name="chevron" size={14} />
          </button>
        </div>
        <div className={styles['side-user']}>
          <div className={`${sharedStyles.avatar} ${sharedStyles['avatar-small']}`}>م</div>
          <div>
            <strong>محمد رضایی</strong>
            <span>مدیر عملیات</span>
          </div>
          <button aria-label="خروج">
            <Icon name="logout" size={17} />
          </button>
        </div>
      </div>
    </aside>
  )
}
