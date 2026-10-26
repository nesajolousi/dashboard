
import { useAppContext } from "../../context/AppContext";
import { navigationItems } from "../../config/navigation";
import { Icon } from "../ui/Icon";
import sharedStyles from "../../styles/shared.module.css";
import logo from "../../assets/logo.png";
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

  const parentPage = navigationItems.find((item) =>
    item.children?.some((child) => child.label === activeNav)
  );

  return (
    <header className={styles["topbar"]}>
      {/* منوی دسکتاپ */}
      <button
        type="button"
        className={styles["sidebar-toggle"]}
        aria-label={
          sidebarCollapsed
            ? "نمایش نوار کناری"
            : "پنهان کردن نوار کناری"
        }
        aria-pressed={sidebarCollapsed}
        onClick={toggleSidebar}
      >
        <Icon name="menu" size={19} />
      </button>

      {/* منوی موبایل */}
      <button
        type="button"
        className={styles["mobile-menu"]}
        onClick={openMenu}
        aria-label="باز کردن منو"
      >
        <Icon name="menu" size={21} />
      </button>

      {/* لوگو و نام شرکت در یک خط */}
      <div className={styles["brand"]}>
        <img
          className={styles["brand-logo"]}
          src={logo}
          alt="لوگوی شرکت ملی پالایش و پخش فرآورده‌های نفتی ایران"
        />

        <div className={styles["brand-text"]}>
          <strong>
            شرکت ملی پالایش و پخش فرآورده‌های نفتی ایران
          </strong>
        </div>
      </div>

      {/* مسیر صفحه فعلی */}
      <div className={styles["breadcrumb"]}>
        <span>سامانه پایش</span>
        <Icon name="chevron" size={14} />

        {parentPage && (
          <>
            <span>{parentPage.label}</span>
            <Icon name="chevron" size={14} />
          </>
        )}

        <strong>{activeNav}</strong>
      </div>

      {/* ابزارهای هدر */}
      <div className={styles["topbar-actions"]}>
        <div className={styles["search-box"]}>
          <Icon name="search" size={18} />
          <input
            aria-label="جستجو"
            placeholder="جستجو در داشبورد..."
          />
        </div>

        {/* تغییر تم */}
        <button
          type="button"
          className={`${styles["icon-button"]} ${styles["theme-toggle"]}`}
          aria-label={
            theme === "dark"
              ? "تغییر به روشن"
              : "تغییر به تاریک"
          }
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <Icon
            name={theme === "dark" ? "sun" : "moon"}
            size={18}
          />
        </button>

        {/* اعلان‌ها */}
        <button
          type="button"
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
              <Icon name="alert" size={15} />
              فشار واحد تقطیر در محدوده هشدار است.
            </p>
            <small>۵ دقیقه پیش</small>
          </div>
        )}

        {/* اطلاعات کاربر */}
        <div className={styles["top-user"]}>
          <div className={sharedStyles.avatar}>م</div>

          <div>
            <strong>علی غفاری نژاد</strong>
            <span>مدیر سیستم</span>
          </div>

          <Icon name="chevron" size={15} />
        </div>
      </div>
    </header>
  );
}
