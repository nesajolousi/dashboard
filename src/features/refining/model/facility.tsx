import type { RefiningProductionCard } from './refining.types'

// پیشوند نام انبارها در پاسخ فعلی سرور؛ فقط وقتی استفاده می‌شود که سرور نوع مرکز را نفرستاده باشد
const STORAGE_NAME_PREFIX = 'انبار'

/** تنها جای تشخیص «انبار» از «پالایشگاه» در کل پروژه. */
export function isStorageFacility(card: Pick<RefiningProductionCard, 'name' | 'facilityType'>): boolean {
  if (card.facilityType) return card.facilityType === 'storage'

  return card.name.trim().startsWith(STORAGE_NAME_PREFIX)
}
