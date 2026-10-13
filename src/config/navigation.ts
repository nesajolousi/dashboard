import type { IconName } from '../components/ui/Icon'

export const navigationLabels = {
  overview: 'نمای کلی',
  refining: 'پالایش و تولید',
  refiningComparison: 'مقایسه پالایشگاه‌ها',
  refiningFeed: 'میزان تحویل و مصرف خوراک',
  refiningStatus: 'وضعیت پالایشگاه',
  distribution: 'توزیع و فروش',
  storage: 'مخازن و انبارها',
  analytics: 'تحلیل عملکرد',
  reports: 'گزارش‌ها',
  settings: 'تنظیمات',
} as const

export type NavigationLabel = typeof navigationLabels[keyof typeof navigationLabels]
export type NavigationItem = {
  label: NavigationLabel
  icon: IconName
  children?: { label: NavigationLabel; icon: IconName }[]
}

export const navigationItems: NavigationItem[] = [
  { label: navigationLabels.overview, icon: 'grid' },
  {
    label: navigationLabels.refining,
    icon: 'factory',
    children: [
      { label: navigationLabels.refiningComparison, icon: 'chart' },
      { label: navigationLabels.refiningFeed, icon: 'tank' },
      { label: navigationLabels.refiningStatus, icon: 'settings' },
    ],
  },
  { label: navigationLabels.distribution, icon: 'truck' },
  { label: navigationLabels.storage, icon: 'tank' },
  { label: navigationLabels.analytics, icon: 'chart' },
  { label: navigationLabels.reports, icon: 'file' },
]
