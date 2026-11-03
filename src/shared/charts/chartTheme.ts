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

export type ChartColor = keyof typeof chartColors

// استایل مشترک همه نمودارها: فونت فارسی، رنگ محورها و خطوط شبکه از متغیرهای تم.
// نمودار همیشه LTR رسم می‌شود تا محورها به‌هم نریزند؛ متن‌های فارسی خودشان درست نمایش داده می‌شوند.
export const chartSx = {
  direction: 'ltr',
  '& text': {
    fontFamily: "'Vazirmatn', Tahoma, sans-serif",
  },
  '& .MuiChartsAxis-tickLabel': {
    fill: 'var(--muted-2)',
    fontSize: 11,
  },
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
    stroke: 'var(--line)',
  },
  '& .MuiChartsGrid-line': {
    stroke: 'var(--line-soft)',
    strokeDasharray: '3 5',
  },
}

// قالب‌بندی عدد فارسی؛ مقدار تهی با «—» نمایش داده می‌شود
export function formatChartNumber(
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = {},
) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('fa-IR', options).format(value)
}
