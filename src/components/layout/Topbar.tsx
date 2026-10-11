import { useAppContext } from "../../context/AppContext";
import { Icon } from "../ui/Icon";
import sharedStyles from "../../styles/shared.module.css";
import styles from "./Topbar.module.css";

export function Topbar() {
  const {
    activeNav,
    sidebarCollapsed,
    theme,
    showNotifications,
    openMenu,
    toggleSidebar,
    toggleTheme,
    toggleNotifications,
  } = useAppContext();

  return (
    <header className={styles["topbar"]}>
      <button
        className={styles["sidebar-toggle"]}
        aria-label={
          sidebarCollapsed
            ? "\u0646\u0645\u0627\u06cc\u0634 \u0646\u0648\u0627\u0631 \u06a9\u0646\u0627\u0631\u06cc"
            : "\u067e\u0646\u0647\u0627\u0646 \u06a9\u0631\u062f\u0646 \u0646\u0648\u0627\u0631 \u06a9\u0646\u0627\u0631\u06cc"
        }
        aria-pressed={sidebarCollapsed}
        onClick={toggleSidebar}
      >
        <Icon name="menu" size={19} />
      </button>
      <button
        className={styles["mobile-menu"]}
        onClick={openMenu}
        aria-label="باز کردن منو"
      >
        <Icon name="menu" size={21} />
      </button>
      <div className={styles["breadcrumb"]}>
        <span>داشبورد</span>
        <Icon name="chevron" size={14} />
        <strong>{activeNav}</strong>
      </div>
      <div className={styles["topbar-actions"]}>
        <div className={styles["search-box"]}>
          <Icon name="search" size={18} />
          <input aria-label="جستجو" placeholder="جستجو در داشبورد..." />
        </div>
        <button
          className={`${styles["icon-button"]} ${styles["theme-toggle"]}`}
          aria-label={
            theme === "dark"
              ? "\u062a\u063a\u06cc\u06cc\u0631 \u0628\u0647 \u0646\u0648\u0631\u06cc"
              : "\u062a\u063a\u06cc\u06cc\u0631 \u0628\u0647 \u062a\u0627\u0631\u06cc\u06a9\u06cc"
          }
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
        </button>
        <button
          className={`${styles["icon-button"]} ${styles["notification-button"]}`}
          aria-label="اعلان‌ها"
          onClick={toggleNotifications}
        >
          <Icon name="bell" size={19} />
          <span />
        </button>
        {showNotifications && (
          <div className={styles["notification-popover"]}>
            <strong>اعلان‌های جدید</strong>
            <p>
              <Icon name="alert" size={15} /> فشار واحد تقطیر در محدوده هشدار
              است.
            </p>
            <small>۵ دقیقه پیش</small>
          </div>
        )}
        <div className={styles["top-user"]}>
          <div className={sharedStyles.avatar}>م</div>
          <div>
            <strong> علی غفاری نژاد</strong>
            <span>مدیر سیستم</span>
          </div>
          <Icon name="chevron" size={15} />
        </div>
      </div>
    </header>
  );
}
