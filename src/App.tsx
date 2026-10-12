import { AppContent } from './app/AppContent'
import { AppShell } from './components/layout/AppShell'
import { AppProvider } from './context/AppContext'

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
