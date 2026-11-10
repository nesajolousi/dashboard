import { BarChart } from '@mui/x-charts/BarChart'
import { formatChartNumber } from './chartTheme'
import chartStyles from './charts.module.css'

export type HorizontalBarSeries = {
  id: string
  label: string
  color: string
  /** مقدار هر دسته؛ مقدار تهی رسم نمی‌شود */
  data: (number | null)[]
  /** سری‌هایی که stack یکسان دارند روی هم قرار می‌گیرند */
  stack?: string
  /** اگر داده شود، کنار هر میله این متن (مثلاً «تحویل») و مقدارش به‌صورت کم‌رنگ نوشته می‌شود */
  barLabelPrefix?: string
}

type HorizontalBarChartProps = {
  categories: string[]
  series: HorizontalBarSeries[]
  valueFormatter: (value: number | null) => string
  /** رنگ هر دسته هم‌ترتیب با categories؛ اگر داده شود هر میله رنگ دسته‌ی خودش را می‌گیرد */
  categoryColors?: string[]
  ariaLabel: string
  /** عرض ستون نام‌ها در سمت چپ نمودار */
  labelWidth?: number
  rowHeight?: number
}

// نمودار میله‌ای افقی مشترک برای صفحه‌های مقایسه پالایشگاه‌ها و خوراک
export function HorizontalBarChart({
  categories,
  series,
  valueFormatter,
  categoryColors,
  ariaLabel,
  labelWidth = 150,
  rowHeight = 34,
}: HorizontalBarChartProps) {
  // سری‌های هم‌پشته یک میله حساب می‌شوند؛ بقیه کنار هم رسم می‌شوند
  const barsPerCategory = Math.max(1, new Set(series.map((item) => item.stack ?? item.id)).size)
  const height = Math.max(160, categories.length * rowHeight * barsPerCategory + 40)

  // برچسب کنار میله‌ها در حاشیه‌ی راست نمودار نوشته می‌شود؛ برای جاشدنش حاشیه بزرگ‌تر می‌شود
  const hasBarLabels = series.some((item) => item.barLabelPrefix)

  return (
    <div role="img" aria-label={ariaLabel} dir="ltr">
      <BarChart
        layout="horizontal"
        height={height}
        margin={{ top: 4, right: hasBarLabels ? 110 : 16, bottom: 4, left: 0 }}
        hideLegend
        grid={{ vertical: true }}
        borderRadius={4}
        yAxis={[
          {
            scaleType: 'band',
            data: categories,
            colorMap: categoryColors
              ? { type: 'ordinal', values: categories, colors: categoryColors }
              : undefined,
            width: labelWidth,
            disableLine: true,
            disableTicks: true,
          },
        ]}
        xAxis={[
          {
            min: 0,
            valueFormatter: (value: number) =>
              formatChartNumber(value, { maximumFractionDigits: 3 }),
          },
        ]}
        series={series.map(({ barLabelPrefix, ...item }) => ({
          ...item,
          valueFormatter,
          ...(barLabelPrefix
            ? {
                barLabelPlacement: 'outside' as const,
                barLabel: ({ value }: { value: number | null }) =>
                  value === null ? '' : `${barLabelPrefix} ${valueFormatter(value)}`,
              }
            : {}),
        }))}
        className={`${chartStyles.chart} ${chartStyles.categoryLabels}`}
      />
    </div>
  )
}
