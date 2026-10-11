import type { IconName } from '../components/ui/Icon'

export const navigationLabels = {
  overview: 'نمای کلی',
  refining: 'پالایش و تولید',
  distribution: 'توزیع و فروش',
  storage: 'مخازن و انبارها',
  analytics: 'تحلیل عملکرد',
  reports: 'گزارش‌ها',
  settings: 'تنظیمات',
} as const

export const navigationItems: { label: string; icon: IconName }[] = [
  { label: navigationLabels.overview, icon: 'grid' },
  { label: navigationLabels.refining, icon: 'factory' },
  { label: navigationLabels.distribution, icon: 'truck' },
  { label: navigationLabels.storage, icon: 'tank' },
  { label: navigationLabels.analytics, icon: 'chart' },
  { label: navigationLabels.reports, icon: 'file' },
]
