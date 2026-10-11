import { Footer } from '../../../components/layout/Footer'
import { AlertsPanel } from '../components/AlertsPanel'
import { KpiGrid } from '../components/KpiGrid'
import { PageHeader } from '../components/PageHeader'
import { ProductMix } from '../components/ProductMix'
import { ProductionTrend } from '../components/ProductionTrend'
import { ShipmentTable } from '../components/ShipmentTable'
import { UnitStatus } from '../components/UnitStatus'
import { kpis, shipments } from '../dashboard.data'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  return (
    <div className={styles['page-content']}>
      <PageHeader />
      <KpiGrid items={kpis} />
      <section className={styles['main-grid']}>
        <ProductionTrend />
        <ProductMix />
      </section>
      <section className={styles['lower-grid']}>
        <UnitStatus />
        <AlertsPanel />
      </section>
      <ShipmentTable rows={shipments} />
      <Footer />
    </div>
  )
}
