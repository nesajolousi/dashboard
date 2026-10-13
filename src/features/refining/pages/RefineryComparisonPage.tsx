import { useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import { navigationLabels } from '../../../config/navigation'
import { formatPersianNumber } from '../../../shared/lib/number'
import sharedStyles from '../../../styles/shared.module.css'
import { useRefiningProduction } from '../api/useRefiningProduction'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { RefiningNavigation } from '../components/RefiningNavigation'
import {
  comparisonMetrics,
  formatComparisonValue,
  selectRefineryComparisons,
  sortRefineryComparisons,
  type ComparisonMetricKey,
} from '../model/refining.comparison'
import { getInitialDateRange } from '../model/refining.dates'
import pageStyles from './RefiningProductionPage.module.css'
import styles from './RefineryComparisonPage.module.css'

export function RefineryComparisonPage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange)
  const [selectedIds, setSelectedIds] = useState<number[] | null>(null)
  const [metricKey, setMetricKey] = useState<ComparisonMetricKey>('gasoline')
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc')
  const state = useRefiningProduction(dateRange)
  const refineries = selectRefineryComparisons(state.data.cards)
  const selected = refineries.filter((refinery) => selectedIds === null || selectedIds.includes(refinery.id))
  const metric = comparisonMetrics.find((item) => item.key === metricKey)!
  const rows = sortRefineryComparisons(selected, metricKey, direction)
  const knownRows = rows.filter((row) => row.values[metricKey] !== null)
  const best = sortRefineryComparisons(knownRows, metricKey, metric.preferLower ? 'asc' : 'desc')[0]
  const average = knownRows.length
    ? knownRows.reduce((total, row) => total + row.values[metricKey]!, 0) / knownRows.length
    : null
  const maximum = Math.max(0, ...knownRows.map((row) => row.values[metricKey]!))
  const unitLabel = metric.unit === 'rate' ? 'درصد' : 'واحد گزارش سرویس'

  const toggleRefinery = (id: number) => {
    setSelectedIds((current) => {
      const ids = current ?? refineries.map((refinery) => refinery.id)
      return ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]
    })
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.header}>
        <div>
          <div className={pageStyles.eyebrow}>
            <Icon name="factory" size={15} /> مدیریت عملیات پالایش
          </div>
          <h1>{navigationLabels.refiningComparison}</h1>
          <p>مقایسه خوراک، تولید و شاخص‌های پالایشگاه‌ها در یک بازه زمانی مشترک</p>
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
          ? 'در حال به‌روزرسانی اطلاعات مقایسه...'
          : state.source === 'backend'
            ? 'اطلاعات از سرویس تولید دریافت شد'
            : state.error || 'داده‌های نمونه'}
      </div>

      <section className={`${sharedStyles.panel} ${styles.selection}`} aria-label="انتخاب پالایشگاه‌ها">
        <PanelHeading title="پالایشگاه‌های مورد مقایسه" description="پالایشگاه‌های دلخواه را برای مقایسه انتخاب کنید.">
          <div className={styles.selectionActions}>
            <button type="button" onClick={() => setSelectedIds(null)} disabled={selected.length === refineries.length}>انتخاب همه</button>
            <button type="button" onClick={() => setSelectedIds([])} disabled={selected.length === 0}>پاک کردن انتخاب</button>
          </div>
        </PanelHeading>
        <div className={styles.refineryOptions}>
          {refineries.map((refinery) => {
            const checked = selectedIds === null || selectedIds.includes(refinery.id)
            return (
              <label key={refinery.id} className={`${styles.refineryOption} ${checked ? styles.checked : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleRefinery(refinery.id)} />
                <span>{refinery.name}</span>
              </label>
            )
          })}
        </div>
        {!refineries.length && <p className={styles.note}>اطلاعات پالایشگاهی برای این بازه موجود نیست.</p>}
      </section>

      <div className={styles.toolbar}>
        <label className={styles.metricControl}>
          <span>شاخص مقایسه</span>
          <select
            value={metricKey}
            onChange={(event) => {
              const key = event.target.value as ComparisonMetricKey
              setMetricKey(key)
              setDirection(comparisonMetrics.find((item) => item.key === key)?.preferLower ? 'asc' : 'desc')
            }}
          >
            {comparisonMetrics.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </label>
        <button
          type="button"
          className={styles.sortButton}
          aria-label={`تغییر ترتیب مقایسه؛ ترتیب فعلی ${direction === 'desc' ? 'نزولی' : 'صعودی'}`}
          onClick={() => setDirection((current) => current === 'desc' ? 'asc' : 'desc')}
        >
          <Icon name={direction === 'desc' ? 'arrowDown' : 'arrowUp'} size={16} />
          {direction === 'desc' ? 'از بیشترین به کمترین' : 'از کمترین به بیشترین'}
        </button>
        <span className={styles.selectionCount}>{formatPersianNumber(selected.length)} پالایشگاه انتخاب شده</span>
      </div>

      <div className={`${styles.results} ${state.loading ? styles.loading : ''}`} aria-busy={state.loading}>
        {selected.length === 0 ? (
          <section className={`${sharedStyles.panel} ${styles.empty}`}>
            <Icon name="factory" size={30} />
            <h2>{refineries.length ? 'پالایشگاهی انتخاب نشده است' : 'داده‌ای برای مقایسه موجود نیست'}</h2>
            <p>{refineries.length ? 'برای شروع مقایسه، حداقل دو پالایشگاه را انتخاب کنید.' : 'بازه زمانی دیگری را انتخاب کنید.'}</p>
            {refineries.length > 0 && <button type="button" onClick={() => setSelectedIds(null)}>انتخاب همه پالایشگاه‌ها</button>}
          </section>
        ) : (
          <>
            {selected.length === 1 && <p className={styles.note}>برای مقایسه، حداقل یک پالایشگاه دیگر را انتخاب کنید.</p>}
            <div className={styles.summary}>
              <article className={`${sharedStyles.panel} ${styles.summaryCard}`}>
                <div className={styles.summaryIcon}><Icon name="factory" size={20} /></div>
                <span>پالایشگاه‌های دارای داده</span>
                <strong>{formatPersianNumber(knownRows.length)} <small>از {formatPersianNumber(selected.length)} پالایشگاه</small></strong>
                <p>برای شاخص {metric.label}</p>
              </article>
              <article className={`${sharedStyles.panel} ${styles.summaryCard}`}>
                <div className={`${styles.summaryIcon} ${styles.blue}`}><Icon name="chart" size={20} /></div>
                <span>{metric.preferLower ? 'کمترین' : 'بیشترین'} {metric.label}</span>
                <strong>{formatComparisonValue(best?.values[metricKey] ?? null, metric)}</strong>
                <p>{best?.name ?? 'داده کافی موجود نیست'}</p>
              </article>
              <article className={`${sharedStyles.panel} ${styles.summaryCard}`}>
                <div className={`${styles.summaryIcon} ${styles.gold}`}><Icon name="grid" size={20} /></div>
                <span>میانگین {metric.label}</span>
                <strong>{formatComparisonValue(average, metric)}</strong>
                <p>{metric.unit === 'rate' ? 'میانگین ساده نرخ پالایشگاه‌های دارای داده' : unitLabel}</p>
              </article>
            </div>

            <section className={`${sharedStyles.panel} ${styles.chart}`} aria-label={`نمودار مقایسه ${metric.label}`}>
              <PanelHeading title={`مقایسه ${metric.label}`} description={`مقادیر بازه انتخاب‌شده · ${unitLabel}`} />
              {knownRows.length === 0 ? (
                <div className={styles.chartEmpty}>برای این شاخص داده‌ای موجود نیست؛ شاخص دیگری را انتخاب کنید.</div>
              ) : (
                <div className={styles.chartRows}>
                  {rows.map((row) => {
                    const value = row.values[metricKey]
                    return (
                      <div key={row.id} className={styles.chartRow}>
                        <span className={styles.chartName}>{row.name}</span>
                        <div className={styles.barTrack} aria-hidden="true">
                          {value !== null && (
                            <div
                              className={`${styles.bar} ${row.id === best?.id ? styles.bestBar : ''}`}
                              style={{ width: `${maximum > 0 ? (value! / maximum) * 100 : 0}%` }}
                            />
                          )}
                        </div>
                        <strong className={styles.chartValue}>{formatComparisonValue(value, metric)}</strong>
                      </div>
                    )
                  })}
                </div>
              )}
              <p className={styles.note}>مقدار ناموجود با «—» نمایش داده می‌شود و در میانگین محاسبه نمی‌شود.</p>
            </section>

            <section className={`${sharedStyles.panel} ${styles.tablePanel}`} aria-label="جدول مقایسه پالایشگاه‌ها">
              <PanelHeading title="جزئیات مقایسه پالایشگاه‌ها" description="همه شاخص‌ها کنار هم؛ ترتیب ردیف‌ها بر اساس شاخص انتخاب‌شده است." />
              <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="جدول شاخص‌ها؛ قابل پیمایش افقی">
                <table className={styles.table}>
                  <caption>مقایسه پالایشگاه‌های انتخاب‌شده؛ مقادیر تولید و خوراک بر حسب واحد گزارش سرویس و نرخ‌ها بر حسب درصد</caption>
                  <thead>
                    <tr>
                      <th scope="col">پالایشگاه</th>
                      {comparisonMetrics.map((item) => (
                        <th key={item.key} scope="col" className={item.key === metricKey ? styles.activeColumn : ''}>
                          {item.label}
                          <small>{item.unit === 'rate' ? 'درصد' : 'واحد گزارش سرویس'}</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <th scope="row">{row.name}</th>
                        {comparisonMetrics.map((item) => (
                          <td key={item.key} className={item.key === metricKey ? styles.activeColumn : ''}>
                            {formatComparisonValue(row.values[item.key], item)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.note}>مجموع خوراک = نفت خام + میعانات گازی؛ مجموع تولید = بنزین + گازوئیل + نفت کوره. مجموع‌ها و نرخ‌های محاسباتی تنها با داده کامل نمایش داده می‌شوند.</p>
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
