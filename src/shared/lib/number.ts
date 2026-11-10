// تبدیل رقم‌های فارسی/عربی و جداکننده‌ها به عدد قابل‌محاسبه؛ تنها جای خواندن عدد در کل پروژه
function normalizeNumericText(value: unknown): string {
  return String(value)
    .trim()
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/٫/g, '.')
    .replace(/[٬,]/g, '')
}

/** عدد را می‌خواند؛ مقدار خالی یا نامعتبر را صفر برمی‌گرداند. */
export function parseNumeric(value: unknown): number {
  if (value === null || value === undefined || String(value).trim() === '') return 0

  const parsed = Number(normalizeNumericText(value))

  return Number.isFinite(parsed) ? parsed : 0
}

/** عدد نامنفی را می‌خواند؛ مقدار خالی، نامعتبر یا منفی را null برمی‌گرداند (یعنی «نامشخص»). */
export function readNumber(value: unknown): number | null {
  if (value === null || value === undefined || String(value).trim() === '') return null

  const parsed = Number(normalizeNumericText(value))

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export function formatPersianNumber(value: unknown, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('fa-IR', options).format(parseNumeric(value))
}

export function formatPersianRate(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'

  return `${new Intl.NumberFormat('fa-IR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}٪`
}
