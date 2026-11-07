import type { ComponentType } from 'react'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { RefiningProductionPage } from '../features/refining/pages/RefiningProductionPage'
import { RefineryComparisonPage } from '../features/refining/pages/RefineryComparisonPage'
import { FeedBalancePage } from '../features/refining/pages/FeedBalancePage'
import { RefineryStatusPage } from '../features/refining/pages/RefineryStatusPage'
import { navigationLabels, type NavigationLabel } from '../config/navigation'

type AppPage = ComponentType

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
