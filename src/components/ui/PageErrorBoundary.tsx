import { Component, type ErrorInfo, type ReactNode } from 'react'
import styles from './PageState.module.css'

type PageErrorBoundaryProps = {
  children: ReactNode
}

type PageErrorBoundaryState = {
  failed: boolean
}

// اگر بارگذاری یا نمایش یک صفحه شکست بخورد (مثلاً قطع اتصال به سرور هنگام دریافت فایل صفحه،
// یا نصب نسخه جدید برنامه روی سرور هنگامی که کاربر صفحه قدیمی را باز دارد)،
// فقط ناحیه محتوا پیام خطا نشان می‌دهد و منو و نوار بالا سر جایشان می‌مانند.
export class PageErrorBoundary extends Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  state: PageErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('خطا در نمایش صفحه', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className={styles['state']} role="alert">
        <span>نمایش این صفحه با خطا روبه‌رو شد. اتصال به سرور را بررسی کنید.</span>
        <button
          type="button"
          className={styles['retry']}
          onClick={() => window.location.reload()}
        >
          بارگذاری دوباره
        </button>
      </div>
    )
  }
}
