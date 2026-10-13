import { Icon } from '../../../components/ui/Icon'
import { navigationLabels } from '../../../config/navigation'
import { useAppContext } from '../../../context/AppContext'
import styles from './RefiningNavigation.module.css'

const pages = [
  { label: navigationLabels.refining, title: 'نمای تولید', icon: 'factory' },
  { label: navigationLabels.refiningComparison, title: navigationLabels.refiningComparison, icon: 'chart' },
  { label: navigationLabels.refiningFeed, title: navigationLabels.refiningFeed, icon: 'tank' },
  { label: navigationLabels.refiningStatus, title: navigationLabels.refiningStatus, icon: 'settings' },
] as const

export function RefiningNavigation() {
  const { activeNav, selectNav } = useAppContext()

  return (
    <nav className={styles.navigation} aria-label="صفحه‌های پالایش و تولید">
      {pages.map((page) => (
        <button
          key={page.label}
          type="button"
          className={`${styles.item} ${activeNav === page.label ? styles.active : ''}`}
          aria-current={activeNav === page.label ? 'page' : undefined}
          onClick={() => selectNav(page.label)}
        >
          <Icon name={page.icon} size={16} />
          {page.title}
        </button>
      ))}
    </nav>
  )
}
