import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

type AppContextValue = {
  activeNav: string
  menuOpen: boolean
  sidebarCollapsed: boolean
  theme: Theme
  showNotifications: boolean
  productionRange: string
  selectNav: (label: string) => void
  openMenu: () => void
  closeMenu: () => void
  toggleSidebar: () => void
  toggleTheme: () => void
  toggleNotifications: () => void
  toggleProductionRange: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const initialActiveNav = '\u0646\u0645\u0627\u06cc \u06a9\u0644\u06cc'
const initialProductionRange = '\u0647\u0641\u062a \u0631\u0648\u0632 \u06af\u0630\u0634\u062a\u0647'
const alternateProductionRange = '\u0633\u06cc \u0631\u0648\u0632 \u06af\u0630\u0634\u062a\u0647'

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState(initialActiveNav)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const [showNotifications, setShowNotifications] = useState(false)
  const [productionRange, setProductionRange] = useState(initialProductionRange)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
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
