
import { Footer } from "../../../components/layout/Footer";
import { AlertsPanel } from "../components/AlertsPanel";
import { KpiGrid } from "../components/KpiGrid";
import { PageHeader } from "../components/PageHeader";
import { ProductMix } from "../components/ProductMix";
import { ProductionTrend } from "../components/ProductionTrend";
import { ShipmentTable } from "../components/ShipmentTable";
import { UnitStatus } from "../components/UnitStatus";
import { kpis, shipments } from "../dashboard.data";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
  return (
    <div className={styles["page-content"]}>
      {/* هدر جمع‌وجور داشبورد */}
      <PageHeader />

      {/* ردیف اول: کارت‌های شاخص کلیدی */}
      <section className={styles["kpi-section"]}>
        <KpiGrid items={kpis} />
      </section>

      {/* ردیف دوم: روند تولید و وضعیت واحدها */}
      <section className={styles["operations-grid"]}>
        <div className={styles["production-panel"]}>
          <ProductionTrend />
        </div>

        <div className={styles["unit-status-panel"]}>
          <UnitStatus />
        </div>
      </section>

      {/* ردیف سوم: سبد تولید و هشدارها */}
      <section className={styles["insights-grid"]}>
        <div className={styles["product-mix-panel"]}>
          <ProductMix />
        </div>

        <div className={styles["alerts-panel"]}>
          <AlertsPanel />
        </div>
      </section>

      {/* ردیف چهارم: آخرین محموله‌ها در تمام عرض صفحه */}
      <section className={styles["shipments-section"]}>
        <ShipmentTable rows={shipments} />
      </section>

      {/* پابرگ داشبورد */}
      <Footer />
    </div>
  );
}
