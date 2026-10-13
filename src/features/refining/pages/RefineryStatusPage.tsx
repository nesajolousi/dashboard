import { useState } from 'react'
import { Footer } from '../../../components/layout/Footer'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import { navigationLabels } from '../../../config/navigation'
import { formatPersianNumber, formatPersianRate } from '../../../shared/lib/number'
import sharedStyles from '../../../styles/shared.module.css'
import { useRefiningProduction } from '../api/useRefiningProduction'
import { PersianDateRangePicker } from '../components/PersianDateRangePicker'
import { RefiningNavigation } from '../components/RefiningNavigation'
import { getInitialDateRange } from '../model/refining.dates'
import {
  selectRefineryStatus,
  type RefineryStatusKey,
  type RefineryStatusRow,
} from '../model/refinery-status'
import pageStyles from './RefiningProductionPage.module.css'
import styles from './RefineryStatusPage.module.css'

export function RefineryStatusPage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const state = useRefiningProduction(dateRange)
  const rows = selectRefineryStatus(state.data.cards)
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0]

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.header}>
        <div>
          <div className={pageStyles.eyebrow}>
            <Icon name="settings" size={15} /> مدیریت عملیات پالایش
          </div>
          <h1>{navigationLabels.refiningStatus}</h1>
          <p>نمایش وضعیت عملیاتی یک پالایشگاه در بازه انتخاب‌شده</p>
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
          ? 'در حال به‌روزرسانی وضعیت پالایشگاه...'
          : state.source === 'backend'
            ? 'اطلاعات از سرویس تولید دریافت شد'
            : state.error || 'داده‌های نمونه'}
      </div>

      <section className={`${sharedStyles.panel} ${styles.selectorPanel}`} aria-label="انتخاب پالایشگاه">
        <PanelHeading title="انتخاب پالایشگاه" description="در هر لحظه وضعیت یک پالایشگاه در محتوای صفحه نمایش داده می‌شود." />
        <div className={styles.selectorRow}>
          <label className={styles.selector}>
            <span>پالایشگاه مورد بررسی</span>
            <select
              value={selected?.id ?? ''}
              onChange={(event) => setSelectedId(Number(event.target.value))}
              disabled={rows.length === 0}
            >
              {rows.length === 0 && <option value="">پالایشگاهی موجود نیست</option>}
              {rows.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}
            </select>
          </label>
          {selected && <StatusBadge status={selected.status} label={selected.statusLabel} />}
        </div>
      </section>

      {!selected ? (
        <section className={`${sharedStyles.panel} ${styles.empty}`}>
          <Icon name="factory" size={30} />
          <h2>اطلاعات پالایشگاهی موجود نیست</h2>
          <p>برای نمایش وضعیت، بازه زمانی دیگری را انتخاب کنید.</p>
        </section>
      ) : (
        <RefineryDetail row={selected} />
      )}
      <Footer />
    </div>
  )
}

function RefineryDetail({ row }: { row: RefineryStatusRow }) {
  const consumptionRate = row.consumptionRate ?? 0
  const statusMessage = row.status === 'watch'
    ? 'مصرف به آستانه پایش نزدیک شده است.'
    : row.status === 'unknown'
      ? 'اطلاعات مصرف این پالایشگاه کامل نیست.'
      : 'مصرف در محدوده پایدار قرار دارد.'

  return (
    <section className={`${sharedStyles.panel} ${styles.detailPanel}`} aria-label={'وضعیت ' + row.name}>
      <div className={styles.detailHeader}>
        <div>
          <div className={styles.detailEyebrow}><Icon name="factory" size={15} /> وضعیت پالایشگاه</div>
          <h2>{row.name}</h2>
          <p>شاخص‌های عملیاتی و مصرف خوراک برای پالایشگاه انتخاب‌شده</p>
        </div>
        <StatusBadge status={row.status} label={row.statusLabel} />
      </div>

      <div className={styles.metrics}>
        <MetricCard icon="truck" tone="teal" label="تحویل خوراک" value={formatQuantity(row.delivered)} caption="هزار بشکه در روز" />
        <MetricCard icon="factory" tone="blue" label="مصرف خوراک" value={formatQuantity(row.consumed)} caption="هزار بشکه در روز" />
        <MetricCard icon="chart" tone="gold" label="نسبت مصرف به تحویل" value={formatPersianRate(row.consumptionRate)} caption="درصد مصرف‌شده" />
        <MetricCard icon="settings" tone="coral" label="نرخ تبدیل خوراک" value={formatPersianRate(row.convertRate)} caption="فرآورده اصلی نسبت به خوراک" />
      </div>

      <div className={styles.consumptionPanel}>
        <div className={styles.consumptionHeading}>
          <div>
            <h3>پایش مصرف خوراک</h3>
            <p>نسبت مصرف این پالایشگاه از خوراک تحویلی</p>
          </div>
          <strong>{formatPersianRate(row.consumptionRate)}</strong>
        </div>
        <div className={styles.progressTrack} aria-label={'نسبت مصرف ' + row.name}>
          <span className={`${styles.progress} ${styles[row.status]}`} style={{ width: `${Math.min(consumptionRate, 100)}%` }} />
        </div>
        <div className={styles.consumptionMeta}>
          <span>مانده خوراک: <strong>{formatQuantity(row.remaining)} هزار بشکه در روز</strong></span>
          <span>{statusMessage}</span>
        </div>
      </div>

      <p className={styles.note}>وضعیت «نیازمند پایش» زمانی نمایش داده می‌شود که نسبت مصرف به تحویل به ۹۸٪ یا بیشتر برسد. داده‌های ناقص با «—» نمایش داده می‌شوند.</p>
    </section>
  )
}

function formatQuantity(value: number | null) {
  return value === null ? '—' : formatPersianNumber(value, { maximumFractionDigits: 3 })
}

function MetricCard({ icon, tone, label, value, caption }: { icon: 'truck' | 'factory' | 'chart' | 'settings'; tone: 'teal' | 'blue' | 'gold' | 'coral'; label: string; value: string; caption: string }) {
  return (
    <article className={styles.metricCard}>
      <div className={`${styles.metricIcon} ${styles[tone]}`}><Icon name={icon} size={19} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{caption}</p>
    </article>
  )
}

function StatusBadge({ status, label }: { status: RefineryStatusKey; label: string }) {
  return <span className={`${styles.status} ${styles[status]}`}>{label}</span>
}
