import type {
  Kpi,
  ProductMixData,
  ProductionTrendData,
  Shipment,
} from './dashboard.types'

// داده نمونه؛ پس از آماده‌شدن API داشبورد با داده واقعی جایگزین می‌شود
export const productionTrendWeek: ProductionTrendData = {
  unit: 'هزار بشکه',
  labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
  actual: [90, 101, 108, 98, 120, 128, 141],
  plan: [92, 98, 104, 100, 112, 118, 126],
}

// سی روز گذشته: برچسب هر نقطه شماره روز است (۱ تا ۳۰)
const monthDays = Array.from({ length: 30 }, (_, index) => index)

export const productionTrendMonth: ProductionTrendData = {
  unit: 'هزار بشکه',
  labels: monthDays.map((day) => (day + 1).toLocaleString('fa-IR')),
  actual: monthDays.map((day) => Math.round(95 + day * 0.9 + 8 * Math.sin(day * 0.9))),
  plan: monthDays.map((day) => Math.round(96 + day * 0.8 + 3 * Math.sin(day * 0.5))),
}

export const productMix: ProductMixData = {
  total: '۱۲۸٫۴',
  unit: 'هزار بشکه',
  items: [
    { key: 'petrol', label: 'بنزین', value: 42 },
    { key: 'diesel', label: 'گازوئیل', value: 31 },
    { key: 'kerosene', label: 'نفت سفید', value: 17 },
    { key: 'other', label: 'سایر محصولات', value: 10 },
  ],
}

export const kpis: Kpi[] = [
  {
    label: 'تولید روزانه',
    value: '۱۲۸٫۴',
    unit: 'هزار بشکه',
    change: '+۴٫۸٪',
    tone: 'teal',
    icon: 'factory',
    caption: 'نسبت به روز گذشته',
  },
  {
    label: 'ارسال به بازار',
    value: '۹۶٫۲',
    unit: 'هزار بشکه',
    change: '+۲٫۱٪',
    tone: 'blue',
    icon: 'truck',
    caption: 'نسبت به روز گذشته',
  },
  {
    label: 'ظرفیت عملیاتی',
    value: '۸۷٫۶',
    unit: 'درصد',
    change: '+۱٫۳٪',
    tone: 'gold',
    icon: 'chart',
    caption: 'از ظرفیت کل',
  },
  {
    label: 'موجودی مخازن',
    value: '۷۲٫۸',
    unit: 'درصد',
    change: '-۳٫۲٪',
    tone: 'coral',
    icon: 'tank',
    caption: 'میانگین کل مخازن',
  },
]
export const shipments: Shipment[] = [
  {
    product: 'بنزین یورو ۴',
    code: 'محموله #۴۸۲۱',
    destination: 'پایانه شمال',
    volume: '۲۴٬۰۰۰',
    status: 'در حال بارگیری',
    statusClass: 'loading',
    progress: 72,
    date: 'امروز، ۱۰:۴۵',
  },
  {
    product: 'گازوئیل',
    code: 'محموله #۴۸۱۸',
    destination: 'پایانه شرق',
    volume: '۱۸٬۵۰۰',
    status: 'ارسال شده',
    statusClass: 'sent',
    progress: 100,
    date: 'امروز، ۰۹:۱۲',
  },
  {
    product: 'نفت سفید',
    code: 'محموله #۴۸۱۵',
    destination: 'انبار مرکزی',
    volume: '۱۲٬۰۰۰',
    status: 'در انتظار',
    statusClass: 'waiting',
    progress: 28,
    date: 'امروز، ۰۸:۳۰',
  },
]
