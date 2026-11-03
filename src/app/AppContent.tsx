import { Suspense } from 'react'
import { PageErrorBoundary } from '../components/ui/PageErrorBoundary'
import { PageLoader } from '../components/ui/PageLoader'
import { useAppContext } from '../context/AppContext'
import { resolvePage } from './pageRegistry'

export function AppContent() {
  const { activeNav } = useAppContext()
  const Page = resolvePage(activeNav)

  // key باعث می‌شود با رفتن به صفحه دیگر، خطای صفحه قبلی پاک شود
  return (
    <PageErrorBoundary key={activeNav}>
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    </PageErrorBoundary>
  )
}
