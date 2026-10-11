import { AppProvider } from './context/AppContext'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'

function App() {
  return (
    <AppProvider>
      <AppShell>
        <DashboardPage />
      </AppShell>
    </AppProvider>
  )
}

export default App
