import { useAppContext } from '../context/AppContext'
import { resolvePage } from './pageRegistry'

export function AppContent() {
  const { activeNav } = useAppContext()
  const Page = resolvePage(activeNav)

  return <Page />
}
