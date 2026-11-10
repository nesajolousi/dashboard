// رنگ نمودارها در src/styles/colors.css تعریف شده‌اند (متغیرهای --chart-*).
// اینجا فقط به آن متغیرها اشاره می‌کنیم؛ چون رنگ‌ها CSS variable هستند، با عوض‌شدن تم
// (روشن/تاریک) خودکار تغییر می‌کنند و نیازی به هوک یا محاسبه در جاوااسکریپت نیست.
export const chartColors = {
  teal: 'var(--chart-teal)',
  blue: 'var(--chart-blue)',
  gold: 'var(--chart-gold)',
  coral: 'var(--chart-coral)',
  plan: 'var(--chart-plan)',
  neutral: 'var(--chart-neutral)',
} as const

// رنگ‌های اختصاصی دسته‌ها (مثلاً هر پالایشگاه)؛ مقدارها در colors.css هستند
export const categoryColors = Array.from({ length: 10 }, (_, index) => `var(--chart-cat-${index + 1})`)

/** رنگ ثابت دسته‌ی شماره index؛ بعد از ده دسته از اول تکرار می‌شود. */
export function categoryColorAt(index: number): string {
  return categoryColors[index % categoryColors.length]
}

export type ChartColor = keyof typeof chartColors

// قالب‌بندی عدد فارسی؛ مقدار تهی با «—» نمایش داده می‌شود
export function formatChartNumber(
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = {},
) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('fa-IR', options).format(value)
}
