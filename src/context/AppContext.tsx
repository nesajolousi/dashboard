import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { navigationLabels, type NavigationLabel } from '../config/navigation'

export type Theme = 'light' | 'dark'

type AppContextValue = {
  activeNav: NavigationLabel
  menuOpen: boolean
  sidebarCollapsed: boolean
  theme: Theme
  showNotifications: boolean
  productionRange: string
  selectNav: (label: NavigationLabel) => void
  openMenu: () => void
  closeMenu: () => void
  toggleSidebar: () => void
  toggleTheme: () => void
  toggleNotifications: () => void
  toggleProductionRange: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'petro-theme'

// تم ذخیره‌شده را می‌خواند؛ اگر نبود یا مرورگر اجازه نداد، تم روشن
function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const initialActiveNav: NavigationLabel = navigationLabels.overview
// برچسب بازه‌های نمودار «روند تولید و ارسال»؛ نمودار با همین مقدارها بازه را تشخیص می‌دهد
export const productionRanges = {
  week: '\u0647\u0641\u062a \u0631\u0648\u0632 \u06af\u0630\u0634\u062a\u0647',
  month: '\u0633\u06cc \u0631\u0648\u0632 \u06af\u0630\u0634\u062a\u0647',
} as const

const initialProductionRange: string = productionRanges.week
const alternateProductionRange: string = productionRanges.month

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState(initialActiveNav)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState<Theme>(readStoredTheme)
  const [showNotifications, setShowNotifications] = useState(false)
  const [productionRange, setProductionRange] = useState(initialProductionRange)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ذخیره‌سازی مرورگر در دسترس نیست؛ تم فقط تا بستن صفحه می‌ماند
    }
  }, [theme])

  const value: AppContextValue = {
    activeNav,
    menuOpen,
    sidebarCollapsed,
    theme,
    showNotifications,
    productionRange,
    selectNav: setActiveNav,
    openMenu: () => setMenuOpen(true),
    closeMenu: () => setMenuOpen(false),
    toggleSidebar: () => setSidebarCollapsed((collapsed) => !collapsed),
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    toggleNotifications: () => setShowNotifications((visible) => !visible),
    toggleProductionRange: () =>
      setProductionRange((current) =>
        current === initialProductionRange ? alternateProductionRange : initialProductionRange,
      ),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
