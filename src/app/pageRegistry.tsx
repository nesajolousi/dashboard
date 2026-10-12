import type { ComponentType } from 'react'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { RefiningProductionPage } from '../features/refining/pages/RefiningProductionPage'
import { navigationLabels, type NavigationLabel } from '../config/navigation'

type AppPage = ComponentType

const pageRegistry: Partial<Record<NavigationLabel, AppPage>> = {
  [navigationLabels.overview]: DashboardPage,
  [navigationLabels.refining]: RefiningProductionPage,
}

export function resolvePage(label: NavigationLabel): AppPage {
  return pageRegistry[label] ?? DashboardPage
}
