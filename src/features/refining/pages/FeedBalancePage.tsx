import { useMemo, useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import { navigationLabels } from '../../../config/navigation'
import { useChartPalette } from '../../../shared/charts/chartTheme'
import { HorizontalBarChart } from '../../../shared/charts/HorizontalBarChart'
import { formatPersianNumber } from '../../../shared/lib/number'
import sharedStyles from '../../../styles/shared.module.css'
import { useRefiningProduction } from '../api/useRefiningProduction'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { RefiningNavigation } from '../components/RefiningNavigation'
import {
  feedBalanceMetrics,
  formatFeedBalanceValue,
  selectFeedBalance,
  selectFeedBalanceSummary,
  type FeedBalanceMetric,
  type FeedBalanceRow,
} from '../model/feed-balance'
import { getInitialDateRange } from '../model/refining.dates'
import pageStyles from './RefiningProductionPage.module.css'
import styles from './FeedBalancePage.module.css'

type SortKey = 'delivered' | 'consumed' | 'remaining' | 'consumptionRate'

const quantityUnit = 'هزار بشکه در روز'

function valueFor(row: FeedBalanceRow, key: SortKey) {
  return row[key]
}

function metricFor(key: SortKey): FeedBalanceMetric {
  return feedBalanceMetrics.find((metric) => metric.key === key) ?? feedBalanceMetrics[0]
}

export function FeedBalancePage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange)
  const [sortKey, setSortKey] = useState<SortKey>('delivered')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const palette = useChartPalette()
  const state = useRefiningProduction(dateRange)
  const rows = selectFeedBalance(state.data.cards)
  const summary = selectFeedBalanceSummary(rows)
  const sortedRows = useMemo(() => [...rows].sort((left, right) => {
    const leftValue = valueFor(left, sortKey)
    const rightValue = valueFor(right, sortKey)
    if (leftValue === null && rightValue !== null) return 1
    if (rightValue === null && leftValue !== null) return -1
    if (leftValue !== null && rightValue !== null && leftValue !== rightValue) {
      return sortDirection === 'desc' ? rightValue - leftValue : leftValue - rightValue
    }
    return left.name.localeCompare(right.name, 'fa')
  }), [rows, sortDirection, sortKey])
  const estimatedRows = rows.filter((row) => row.isEstimated).length
  const hasConsumptionData = rows.some((row) => row.consumed !== null)

  const selectSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => current === 'desc' ? 'asc' : 'desc')
      return
    }
    setSortKey(key)
    setSortDirection('desc')
  }

  const renderSummary = (key: 'delivered' | 'consumed' | 'remaining' | 'consumptionRate') => {
    const metric = metricFor(key)
    return formatFeedBalanceValue(summary[key], metric.unit)
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.header}>
        <div>
          <div className={pageStyles.eyebrow}>
            <Icon name="tank" size={15} /> مدیریت عملیات پالایش
          </div>
          <h1>{navigationLabels.refiningFeed}</h1>
          <p>رصد میزان تحویل، مصرف و مانده خوراک پالایشگاه‌ها در بازه انتخاب‌شده</p>
        </div>
        <PersianDateRangePicker value={dateRange} onChange={setDateRange} />
      </header>

      <RefiningNavigation />

      <div
        className={`${pageStyles.dataStatus} ${state.source === 'backend' ? pageStyles.live : pageStyles.sample}`}
        role="status"
      >
        <span className={pageStyles.statusDot} />
        {state.loading
          ? 'در حال به‌روزرسانی اطلاعات خوراک...'
          : state.source === 'backend'
            ? 'اطلاعات از سرویس تولید دریافت شد'
            : state.error || 'داده‌های نمونه'}
      </div>

      <div className={styles.summary} aria-label="خلاصه تحویل و مصرف خوراک">
        <SummaryCard
          icon="truck"
          tone="teal"
          label="مجموع تحویل خوراک"
          value={renderSummary('delivered')}
          caption={quantityUnit}
        />
        <SummaryCard
          icon="factory"
          tone="blue"
          label="مجموع مصرف خوراک"
          value={renderSummary('consumed')}
          caption={quantityUnit}
        />
        <SummaryCard
          icon="tank"
          tone="gold"
          label="مانده خوراک"
          value={renderSummary('remaining')}
          caption="تحویل منهای مصرف"
        />
        <SummaryCard
          icon="chart"
          tone="coral"
          label="نسبت مصرف به تحویل"
          value={renderSummary('consumptionRate')}
          caption="درصد مصرف‌شده از خوراک تحویلی"
        />
      </div>

      <section className={`${sharedStyles.panel} ${styles.chartPanel}`} aria-label="نمودار تحویل و مصرف خوراک">
        <PanelHeading
          title="تحویل و مصرف به تفکیک پالایشگاه"
          description="مقایسه مقدار تحویل‌شده با مقدار مصرف‌شده در بازه انتخابی"
        />
        <div className={styles.legend}>
          <span><i className={styles.deliveredLegend} /> تحویل خوراک</span>
          <span><i className={styles.consumedLegend} /> مصرف خوراک</span>
        </div>
        {rows.length === 0 ? (
          <div className={styles.empty}>اطلاعات پالایشگاهی برای این بازه موجود نیست.</div>
        ) : (
          <HorizontalBarChart
            ariaLabel="نمودار میله‌ای تحویل و مصرف خوراک پالایشگاه‌ها"
            categories={sortedRows.map((row) => row.name)}
            valueFormatter={(value) => formatFeedBalanceValue(value, 'quantity')}
            series={[
              {
                id: 'delivered',
                label: 'تحویل خوراک',
                color: palette.teal,
                data: sortedRows.map((row) => row.delivered),
              },
              {
                id: 'consumed',
                label: 'مصرف خوراک',
                color: palette.blue,
                data: sortedRows.map((row) => row.consumed),
              },
            ]}
          />
        )}
        <p className={styles.note}>تحویل و مصرف روی یک محور مشترک رسم شده‌اند؛ برای دیدن مقدار دقیق، نشانگر را روی هر میله ببرید. مقدار ناموجود رسم نمی‌شود.</p>
      </section>

      <section className={`${sharedStyles.panel} ${styles.tablePanel}`} aria-label="جدول میزان تحویل و مصرف خوراک">
        <PanelHeading
          title="جزئیات خوراک پالایشگاه‌ها"
          description={`${formatPersianNumber(rows.length)} پالایشگاه · واحد مقادیر: ${quantityUnit}`}
        />
        <div className={styles.tableToolbar}>
          <span>مرتب‌سازی بر اساس:</span>
          {feedBalanceMetrics.map((metric) => (
            <button
              type="button"
              key={metric.key}
              className={sortKey === metric.key ? styles.activeSort : ''}
              onClick={() => selectSort(metric.key)}
              aria-pressed={sortKey === metric.key}
            >
              {metric.label}
              {sortKey === metric.key && <Icon name={sortDirection === 'desc' ? 'arrowDown' : 'arrowUp'} size={13} />}
            </button>
          ))}
        </div>
        {rows.length === 0 ? (
          <div className={styles.empty}>برای نمایش جدول، بازه زمانی دیگری را انتخاب کنید.</div>
        ) : (
          <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="جدول خوراک؛ قابل پیمایش افقی">
            <table className={styles.table}>
              <caption>میزان تحویل، مصرف، مانده و نسبت مصرف خوراک هر پالایشگاه</caption>
              <thead>
                <tr>
                  <th scope="col">پالایشگاه</th>
                  <th scope="col">تحویل خوراک<small>{quantityUnit}</small></th>
                  <th scope="col">مصرف خوراک<small>{quantityUnit}</small></th>
                  <th scope="col">مانده خوراک<small>{quantityUnit}</small></th>
                  <th scope="col">نسبت مصرف<small>درصد</small></th>
                  <th scope="col">وضعیت مصرف</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.name}</th>
                    <td>{formatFeedBalanceValue(row.delivered, 'quantity')}</td>
                    <td>{formatFeedBalanceValue(row.consumed, 'quantity')}</td>
                    <td className={row.remaining !== null && row.remaining < 0 ? styles.negative : ''}>{formatFeedBalanceValue(row.remaining, 'quantity')}</td>
                    <td>{formatFeedBalanceValue(row.consumptionRate, 'rate')}</td>
                    <td><StatusBadge row={row} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={styles.note}>
          {hasConsumptionData
            ? `مقادیر دریافت‌شده از سرویس تولید نمایش داده می‌شوند.${estimatedRows ? ` ${formatPersianNumber(estimatedRows)} ردیف فاقد یکی از فیلدهای اختصاصی تحویل یا مصرف است.` : ''}`
            : 'فیلد اختصاصی مصرف خوراک در پاسخ سرویس موجود نیست؛ برای جلوگیری از برآورد نادرست، مصرف و شاخص‌های وابسته با «—» نمایش داده می‌شوند.'}
        </p>
      </section>
      <Footer />
    </div>
  )
}

function SummaryCard({ icon, tone, label, value, caption }: { icon: 'truck' | 'factory' | 'tank' | 'chart'; tone: 'teal' | 'blue' | 'gold' | 'coral'; label: string; value: string; caption: string }) {
  return (
    <article className={`${sharedStyles.panel} ${styles.summaryCard}`}>
      <div className={`${styles.summaryIcon} ${styles[tone]}`}><Icon name={icon} size={20} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{caption}</p>
    </article>
  )
}

function StatusBadge({ row }: { row: FeedBalanceRow }) {
  if (row.consumed === null || row.delivered === null) return <span className={`${styles.status} ${styles.unknown}`}>داده ناقص</span>
  if (row.remaining !== null && row.remaining < 0) return <span className={`${styles.status} ${styles.alert}`}>مصرف بیشتر از تحویل</span>
  if (row.consumptionRate !== null && row.consumptionRate >= 98) return <span className={`${styles.status} ${styles.warning}`}>نزدیک به سقف</span>
  return <span className={`${styles.status} ${styles.ok}`}>متعادل</span>
}
