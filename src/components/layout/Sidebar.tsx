import { Icon } from "../ui/Icon";
import { useAppContext } from "../../context/AppContext";
import { navigationItems, navigationLabels } from "../../config/navigation";
import sharedStyles from "../../styles/shared.module.css";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { activeNav, menuOpen, sidebarCollapsed, selectNav, closeMenu } =
    useAppContext();
  return (
    <aside
      className={`${styles["sidebar"]} ${menuOpen ? styles["is-open"] : ""} ${sidebarCollapsed ? styles["is-collapsed"] : ""}`}
    >
      <div className={styles["brand"]}>
        <div className={styles["brand-mark"]}>
          <span />
        </div>
        <div>
          <strong>سامانه پایش</strong>
          <small>مرکز پایش و تحلیل داده</small>
        </div>
        <button
          className={styles["sidebar-close"]}
          onClick={closeMenu}
          aria-label="بستن منو"
        >
          <Icon name="close" size={18} />
        </button>
      </div>
      <div className={styles["side-label"]}>داشبورد</div>
      <nav className={styles["main-nav"]} aria-label="منوی اصلی">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            className={`${styles["nav-item"]} ${activeNav === item.label ? styles["active"] : ""}`}
            aria-current={activeNav === item.label ? "page" : undefined}
            onClick={() => {
              selectNav(item.label);
              closeMenu();
            }}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            {item.label === navigationLabels.overview && (
              <span className={styles["nav-pulse"]} />
            )}
          </button>
        ))}
      </nav>
      <div className={`${styles["side-label"]} ${styles["side-label-spaced"]}`}>
        سایر
      </div>
      <button
        className={styles["nav-item"]}
        onClick={() => selectNav(navigationLabels.settings)}
      >
        <Icon name="settings" size={19} />
        <span>تنظیمات</span>
      </button>
      <div className={styles["sidebar-bottom"]}>
        <div className={styles["support-card"]}>
          <div className={styles["support-icon"]}>
            <Icon name="alert" size={18} />
          </div>
          <strong>نیاز به راهنمایی دارید؟</strong>
          <span>با پشتیبانی عملیات در تماس باشید.</span>
          <button>
            مرکز پشتیبانی <Icon name="chevron" size={14} />
          </button>
        </div>
        <div className={styles["side-user"]}>
          <div
            className={`${sharedStyles.avatar} ${sharedStyles["avatar-small"]}`}
          >
            م
          </div>
          <div>
            <strong> علی غفاری نژاد</strong>
            <span>مدیر سیستم</span>
          </div>
          <button aria-label="خروج">
            <Icon name="logout" size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
