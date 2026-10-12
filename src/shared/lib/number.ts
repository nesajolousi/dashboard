export function parseNumeric(value: unknown): number {
  if (value === null || value === undefined || value === '') return 0

  const normalized = String(value)
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/٫/g, '.')
    .replace(/[٬,]/g, '')
  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : 0
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
