import { useAppContext } from '../../context/AppContext'

// پالت رنگ نمودارها. کتابخانه نمودار رنگ‌ها را به‌صورت مقدار مستقیم می‌گیرد،
// بنابراین برای هر تم (روشن و تاریک) یک پالت جداگانه نگه می‌داریم.
export type ChartPalette = {
  teal: string
  blue: string
  gold: string
  coral: string
  plan: string
  neutral: string
}

const lightPalette: ChartPalette = {
  teal: '#199d8e',
  blue: '#4d80dc',
  gold: '#d8a348',
  coral: '#db7165',
  plan: '#bdc9d2',
  neutral: '#dfe6ec',
}

const darkPalette: ChartPalette = {
  teal: '#2bc0ae',
  blue: '#6b98ec',
  gold: '#e6b45c',
  coral: '#ec8a7e',
  plan: '#5b7086',
  neutral: '#3a4d62',
}

export function useChartPalette(): ChartPalette {
  const { theme } = useAppContext()
  return theme === 'dark' ? darkPalette : lightPalette
}

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
