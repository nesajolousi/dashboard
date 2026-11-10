import styles from '../../styles/progress.module.css'

/** کلاس CSS عرض نوار پیشرفت را برمی‌گرداند؛ مقدار به ۰ تا ۱۰۰ محدود و گرد می‌شود. */
export function progressWidthClass(value: unknown): string {
  const number = Number(value)
  const percent = Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : 0

  return styles[`w${percent}`]
}
