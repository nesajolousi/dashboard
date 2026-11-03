import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { navigationLabels, type NavigationLabel } from '../config/navigation'

type AppPage = LazyExoticComponent<ComponentType>

// هر صفحه در یک فایل جداگانه بسته‌بندی می‌شود و فقط هنگام اولین ورود به آن صفحه بارگذاری می‌شود.
// صفحه‌ها export نام‌دار دارند؛ این تابع آن را به default تبدیل می‌کند که lazy لازم دارد،
// و نام صفحه با تایپ بررسی می‌شود (اگر نام اشتباه باشد، بیلد خطا می‌دهد).
function lazyPage<Name extends string>(
  load: () => Promise<Record<Name, ComponentType>>,
  name: Name,
): AppPage {
  return lazy(() => load().then((module) => ({ default: module[name] })))
}

const DashboardPage = lazyPage(
  () => import('../features/dashboard/pages/DashboardPage'),
  'DashboardPage',
)
const RefiningProductionPage = lazyPage(
  () => import('../features/refining/pages/RefiningProductionPage'),
  'RefiningProductionPage',
)
const RefineryComparisonPage = lazyPage(
  () => import('../features/refining/pages/RefineryComparisonPage'),
  'RefineryComparisonPage',
)
const FeedBalancePage = lazyPage(
  () => import('../features/refining/pages/FeedBalancePage'),
  'FeedBalancePage',
)
const RefineryStatusPage = lazyPage(
  () => import('../features/refining/pages/RefineryStatusPage'),
  'RefineryStatusPage',
)

const pageRegistry: Partial<Record<NavigationLabel, AppPage>> = {
  [navigationLabels.overview]: DashboardPage,
  [navigationLabels.refining]: RefiningProductionPage,
  [navigationLabels.refiningComparison]: RefineryComparisonPage,
  [navigationLabels.refiningFeed]: FeedBalancePage,
  [navigationLabels.refiningStatus]: RefineryStatusPage,
}

export function resolvePage(label: NavigationLabel): AppPage {
  return pageRegistry[label] ?? DashboardPage
}
