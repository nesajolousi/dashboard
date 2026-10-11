import { useAppContext } from '../../../context/AppContext'
import { Icon } from '../../../components/ui/Icon'
import { PanelHeading } from '../../../components/ui/PanelHeading'
import sharedStyles from '../../../styles/shared.module.css'
import panelHeadingStyles from '../../../components/ui/PanelHeading.module.css'
import styles from './ProductionTrend.module.css'

export function ProductionTrend() {
  const { productionRange, toggleProductionRange } = useAppContext()

  return (
    <article className={`${sharedStyles.panel} ${styles['production-panel']}`}>
      <PanelHeading title="روند تولید و ارسال" description="مقایسه عملکرد واقعی با برنامه‌ریزی">
        <div className={panelHeadingStyles['panel-tools']}>
          <button
            className={panelHeadingStyles['select-control']}
            onClick={toggleProductionRange}
          >
            {productionRange}
            <Icon name="chevron" size={14} />
          </button>
          <button className={panelHeadingStyles['more-button']} aria-label="گزینه‌ها">
            <Icon name="more" size={19} />
          </button>
        </div>
      </PanelHeading>
      <div className={styles['chart-legend']}>
        <span>
          <i className={`${styles['legend-dot']} ${styles.actual}`} /> تولید واقعی
        </span>
        <span>
          <i className={`${styles['legend-dot']} ${styles.plan}`} /> برنامه تولید
        </span>
      </div>
      <div className={styles['chart-wrap']}>
        <div className={styles['y-labels']}>
          <span>۱۵۰</span>
          <span>۱۲۰</span>
          <span>۹۰</span>
          <span>۶۰</span>
          <span>۳۰</span>
          <span>۰</span>
        </div>
        <svg
          className={styles['line-chart']}
          viewBox="0 0 680 255"
          role="img"
          aria-label="نمودار روند تولید و ارسال"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1e9a8a" stopOpacity=".16" />
              <stop offset="1" stopColor="#1e9a8a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className={styles['grid-lines']}>
            <path d="M0 15H680M0 60H680M0 105H680M0 150H680M0 195H680M0 240H680" />
          </g>
          <path
            className={styles['area']}
            d="M0 129 C40 120 55 112 95 120 S145 151 190 114 S240 78 285 99 S335 125 380 84 S430 50 475 72 S525 94 570 54 S630 42 680 27 L680 240 L0 240Z"
          />
          <path
            className={styles['plan-line']}
            d="M0 112 C45 100 55 121 95 105 S145 112 190 91 S240 85 285 76 S335 89 380 63 S430 75 475 52 S525 60 570 43 S630 53 680 31"
          />
          <path
            className={styles['actual-line']}
            d="M0 129 C40 120 55 112 95 120 S145 151 190 114 S240 78 285 99 S335 125 380 84 S430 50 475 72 S525 94 570 54 S630 42 680 27"
          />
          <g className={styles['chart-points']}>
            <circle cx="190" cy="114" r="4" />
            <circle cx="380" cy="84" r="4" />
            <circle cx="570" cy="54" r="4" />
            <circle cx="680" cy="27" r="4" />
          </g>
        </svg>
        <div className={styles['x-labels']}>
          <span>شنبه</span>
          <span>یکشنبه</span>
          <span>دوشنبه</span>
          <span>سه‌شنبه</span>
          <span>چهارشنبه</span>
          <span>پنج‌شنبه</span>
          <span>جمعه</span>
        </div>
      </div>
      <div className={styles['chart-insight']}>
        <div className={styles['insight-icon']}>
          <Icon name="arrowUp" size={16} />
        </div>
        <p>
          تولید واقعی در این هفته <strong>۴٫۸٪ رشد</strong> داشته و از برنامه روزانه جلوتر است.
        </p>
        <button>
          جزئیات بیشتر <Icon name="chevron" size={14} />
        </button>
      </div>
    </article>
  )
}
