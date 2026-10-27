import { PieChart } from '@mui/x-charts/PieChart'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import {
  chartSx,
  formatChartNumber,
  useChartPalette,
  type ChartPalette,
} from '../../../shared/charts/chartTheme'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import { productMix } from '../dashboard.data'
import type { ProductMixItem } from '../dashboard.types'
import styles from './ProductMix.module.css'

// رنگ هر محصول از پالت تم فعلی خوانده می‌شود
const toneByProduct: Record<ProductMixItem['key'], keyof ChartPalette> = {
  petrol: 'teal',
  diesel: 'blue',
  kerosene: 'gold',
  other: 'neutral',
}

export function ProductMix() {
  const palette = useChartPalette()
  const items = productMix.items.map((item) => ({
    ...item,
    color: palette[toneByProduct[item.key]],
  }))

  return (
    <article className={`${sharedStyles.panel} ${styles['distribution-panel']}`}>
      <PanelHeading title="توزیع سبد تولید" description="بر اساس محصول نهایی">
        <button className={panelHeadingStyles['more-button']} aria-label="گزینه‌ها">
          <Icon name="more" size={19} />
        </button>
      </PanelHeading>

      <div className={styles['donut-wrap']}>
        <div className={styles['donut']} role="img" aria-label="نمودار توزیع سبد تولید">
          <PieChart
            width={120}
            height={120}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            hideLegend
            series={[
              {
                innerRadius: 42,
                outerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 3,
                data: items.map((item) => ({
                  id: item.key,
                  label: item.label,
                  value: item.value,
                  color: item.color,
                })),
                valueFormatter: ({ value }) => `${formatChartNumber(value)}٪`,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            sx={chartSx}
          />

          {/* عدد وسط نمودار */}
          <div className={styles['donut-center']}>
            <strong>{productMix.total}</strong>
            <span>{productMix.unit}</span>
          </div>
        </div>
      </div>

      <div className={styles['distribution-legend']}>
        {items.map((item) => (
          <div key={item.key}>
            <span
              className={styles['legend-square']}
              style={{ background: item.color }}
            />
            <span>{item.label}</span>
            <strong>{formatChartNumber(item.value)}٪</strong>
          </div>
        ))}
      </div>
    </article>
  )
}
