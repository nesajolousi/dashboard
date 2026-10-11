import { AppProvider, useAppContext } from './context/AppContext'
import { AppShell } from './components/layout/AppShell'
import { navigationLabels } from './config/navigation'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'
import { RefiningProductionPage } from './features/refining/pages/RefiningProductionPage'

function AppContent() {
  const { activeNav } = useAppContext()

  return activeNav === navigationLabels.refining ? <RefiningProductionPage /> : <DashboardPage />
}

function App() {
  return (
    <AppProvider>
      <AppShell>
        <AppContent />
      </AppShell>
    </AppProvider>
  )
}

export default App
