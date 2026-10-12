import type {
  ProductOutput,
  ProductionUnit,
  RefiningMetric,
  RefiningProductionResponse,
} from './model/refining.types'

// Sample values for the initial page; replace these with API data when available.
export const refiningMetrics: RefiningMetric[] = [
  {
    label: 'تولید روزانه فرآورده‌ها',
    value: '۱۲۸٫۴',
    unit: 'هزار بشکه',
    caption: 'برنامه روزانه: ۱۲۵ هزار بشکه',
    icon: 'factory',
    tone: 'teal',
  },
  {
    label: 'خوراک ورودی',
    value: '۱۴۶٫۶',
    unit: 'هزار بشکه',
    caption: 'نفت خام ورودی به واحدهای پالایش',
    icon: 'tank',
    tone: 'blue',
  },
  {
    label: 'تحقق برنامه تولید',
    value: '۱۰۲٫۷',
    unit: 'درصد',
    caption: '۲٫۷ درصد بالاتر از برنامه روزانه',
    icon: 'chart',
    tone: 'gold',
  },
  {
    label: 'واحدهای در حال بهره‌برداری',
    value: '۳',
    unit: 'از ۴ واحد',
    caption: '۱ واحد در حال تعمیرات برنامه‌ریزی‌شده',
    icon: 'settings',
    tone: 'coral',
  },
]

export const productionUnits: ProductionUnit[] = [
  {
    code: 'CDU-01',
    name: 'تقطیر اتمسفریک ۱',
    throughput: '۶۴٫۲',
    capacity: '۷۰',
    utilization: 91.7,
    utilizationLabel: '۹۱٫۷٪',
    status: 'operating',
  },
  {
    code: 'CDU-02',
    name: 'تقطیر اتمسفریک ۲',
    throughput: '۵۸٫۸',
    capacity: '۶۵',
    utilization: 90.5,
    utilizationLabel: '۹۰٫۵٪',
    status: 'operating',
  },
  {
    code: 'HDS-01',
    name: 'گوگردزدایی گازوئیل',
    throughput: '۳۸٫۱',
    capacity: '۴۵',
    utilization: 84.7,
    utilizationLabel: '۸۴٫۷٪',
    status: 'operating',
  },
  {
    code: 'CCR-01',
    name: 'تبدیل کاتالیستی',
    throughput: '۰',
    capacity: '۲۰',
    utilization: 0,
    utilizationLabel: '۰٪',
    status: 'maintenance',
  },
]

export const productOutputs: ProductOutput[] = [
  { name: 'بنزین', actual: '۵۲٫۳', target: '۵۰', achievement: 104.6, achievementLabel: '۱۰۴٫۶٪' },
  { name: 'گازوئیل', actual: '۴۸٫۶', target: '۴۸', achievement: 101.3, achievementLabel: '۱۰۱٫۳٪' },
  { name: 'نفت سفید', actual: '۱۸٫۱', target: '۱۸', achievement: 100.6, achievementLabel: '۱۰۰٫۶٪' },
  { name: 'سایر فرآورده‌ها', actual: '۹٫۴', target: '۹', achievement: 104.4, achievementLabel: '۱۰۴٫۴٪' },
]

// Development fallback used until the production API is available locally.
export const fallbackRefiningResponse: RefiningProductionResponse = {
  gasoline: '2.117',
  gasOil: '0.000',
  fuelOil: '0.000',
  crudeOil: '0.000',
  gasCondensate: '0.000',
  cards: [
    { id: 9, name: 'پالایشگاه تهران', gasoline: '0.053', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 7, name: 'پالایشگاه ستاره خلیج فارس', gasoline: '0.703', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 11, name: 'پالایشگاه اصفهان', gasoline: '0.256', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 10, name: 'پالایشگاه شیراز', gasoline: '0.031', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 12, name: 'پالایشگاه تبریز', gasoline: '0.056', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 13, name: 'پالایشگاه کرمانشاه', gasoline: '0.009', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 14, name: 'پالایشگاه آبادان', gasoline: '0.157', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 15, name: 'پالایشگاه شازند اراک', gasoline: '0.241', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 16, name: 'پالایشگاه بندرعباس', gasoline: '0.178', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 8, name: 'پالایشگاه لاوان', gasoline: '0.042', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 5, name: 'انبار بندر عباس 2', gasoline: '0.186', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
    { id: 3, name: 'انبار ماهشهر', gasoline: '0.205', gasOil: '', fuelOil: '', crudeOil: '', gasCondensate: '', fuelOilRate: null, convertRate: null },
  ],
}
