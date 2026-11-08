import { LineChart } from '@mui/x-charts/LineChart'
import { productionRanges, useAppContext } from '../../../context/AppContext'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import {
  chartSx,
  formatChartNumber,
  chartColors,
} from '../../../shared/charts/chartTheme'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import { productionTrendMonth, productionTrendWeek } from '../dashboard.data'
import styles from './ProductionTrend.module.css'

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

export function ProductionTrend() {
  const { productionRange, toggleProductionRange } = useAppContext()
  const isMonth = productionRange === productionRanges.month
  const { labels, actual, plan, unit } = isMonth ? productionTrendMonth : productionTrendWeek
  const periodLabel = isMonth ? 'در سی روز گذشته' : 'در این هفته'

  // درصد اختلاف مجموع تولید واقعی با برنامه
  const planTotal = sum(plan)
  const difference = planTotal > 0 ? ((sum(actual) - planTotal) / planTotal) * 100 : 0
  const isAhead = difference >= 0
  const differenceLabel = `${formatChartNumber(Math.abs(difference), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}٪`

  const formatValue = (value: number | null) =>
    value === null ? '—' : `${formatChartNumber(value)} ${unit}`

  return (
    <article
      className={`${sharedStyles.panel} ${styles['production-panel']}`}
    >
      {/* عنوان پنل و ابزارهای انتخاب بازه */}
      <PanelHeading
        title="روند تولید و ارسال"
        description="مقایسه عملکرد واقعی با برنامه‌ریزی"
      >
        <div className={panelHeadingStyles['panel-tools']}>
          <button
            type="button"
            className={panelHeadingStyles['select-control']}
            onClick={toggleProductionRange}
            aria-label="تغییر بازه زمانی نمودار"
          >
            {productionRange}
            <Icon name="chevron" size={14} />
          </button>

          <button
            type="button"
            className={panelHeadingStyles['more-button']}
            aria-label="گزینه‌های نمودار"
          >
            <Icon name="more" size={19} />
          </button>
        </div>
      </PanelHeading>

      {/* راهنمای نمودار */}
      <div className={styles['chart-legend']}>
        <span>
          <i className={`${styles['legend-dot']} ${styles.actual}`} />
          تولید واقعی
        </span>

        <span>
          <i className={`${styles['legend-dot']} ${styles.plan}`} />
          برنامه تولید
        </span>
      </div>

      {/* نمودار روند تولید */}
      <div className={styles['chart-wrap']} role="img" aria-label="نمودار روند تولید و ارسال">
        <LineChart
          height={160}
          margin={{ top: 10, right: 12, bottom: 4, left: 0 }}
          hideLegend
          grid={{ horizontal: true }}
          xAxis={[
            {
              scaleType: 'point',
              data: labels,
              disableLine: true,
              disableTicks: true,
              // در نمای سی‌روزه فقط هر پنج روز یک برچسب نشان داده می‌شود تا شلوغ نشود
              tickLabelInterval: isMonth ? (_value: unknown, index: number) => index % 5 === 0 : undefined,
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 150,
              tickNumber: 6,
              disableLine: true,
              disableTicks: true,
              valueFormatter: (value: number) => formatChartNumber(value),
            },
          ]}
          series={[
            {
              id: 'plan',
              label: 'برنامه تولید',
              data: plan,
              color: chartColors.plan,
              curve: 'monotoneX',
              showMark: false,
              valueFormatter: formatValue,
            },
            {
              id: 'actual',
              label: 'تولید واقعی',
              data: actual,
              color: chartColors.teal,
              curve: 'monotoneX',
              area: true,
              valueFormatter: formatValue,
            },
          ]}
          sx={{
            ...chartSx,
            // خط برنامه تولید خط‌چین است (از نسخه ۹ انتخاب سری با data-series انجام می‌شود)
            'path[data-series="plan"]': {
              strokeWidth: 1.5,
              strokeDasharray: '4 4',
            },
          }}
        />
      </div>

      {/* خلاصه تحلیلی */}
      <div className={styles['chart-insight']}>
        <div className={styles['insight-icon']}>
          <Icon name={isAhead ? 'arrowUp' : 'arrowDown'} size={16} />
        </div>

        <p>
          تولید واقعی {periodLabel} <strong>{differenceLabel} {isAhead ? 'رشد' : 'کاهش'}</strong>{' '}
          داشته و از برنامه {isAhead ? 'جلوتر' : 'عقب‌تر'} است.
        </p>

        <button type="button">
          جزئیات بیشتر
          <Icon name="chevron" size={14} />
        </button>
      </div>
    </article>
  )
}
