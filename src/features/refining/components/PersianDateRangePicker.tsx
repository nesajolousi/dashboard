import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../../components/ui/Icon'
import type { ProductionDateRange } from '../refining.types'
import styles from './PersianDateRangePicker.module.css'

type PersianDateRangePickerProps = {
  value: ProductionDateRange
  onChange: (value: ProductionDateRange) => void
  disabled?: boolean
}

type PersianDate = { year: number; month: number; day: number }
type CalendarMonth = Pick<PersianDate, 'year' | 'month'>

const dayMilliseconds = 24 * 60 * 60 * 1000
const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]
const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
const persianNumber = new Intl.NumberFormat('fa-IR', { useGrouping: false })
const persianCalendarFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function getPersianDateParts(date: Date): PersianDate {
  const parts = persianCalendarFormatter.formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  }
}

function toDate(value: string) {
  return new Date(`${value}T12:00:00Z`)
}

function toIsoDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toPersianDate(value: string) {
  return getPersianDateParts(toDate(value))
}

function formatPersianDate(value: string) {
  if (!value) return 'انتخاب نشده'
  const date = toPersianDate(value)
  return `${persianNumber.format(date.day)} ${monthNames[date.month - 1]} ${persianNumber.format(date.year)}`
}

// The Persian new year is close to 20 March. Searching around an estimated
// Gregorian date keeps the picker dependency-free while handling leap years.
function fromPersianDate(date: PersianDate) {
  const monthOffset = date.month <= 6
    ? (date.month - 1) * 31
    : 186 + (date.month - 7) * 30
  const estimate = Date.UTC(date.year + 621, 2, 20) + (monthOffset + date.day - 1) * dayMilliseconds

  for (let offset = -12; offset <= 12; offset += 1) {
    const candidate = new Date(estimate + offset * dayMilliseconds)
    const candidateParts = getPersianDateParts(candidate)
    if (
      candidateParts.year === date.year &&
      candidateParts.month === date.month &&
      candidateParts.day === date.day
    ) {
      return candidate
    }
  }

  return new Date(estimate)
}

function shiftMonth(month: CalendarMonth, amount: number): CalendarMonth {
  const index = month.year * 12 + month.month - 1 + amount
  return { year: Math.floor(index / 12), month: (index % 12) + 1 }
}

function getMonthDays(month: CalendarMonth) {
  const first = fromPersianDate({ ...month, day: 1 })
  const next = fromPersianDate({ ...shiftMonth(month, 1), day: 1 })
  return Math.round((next.getTime() - first.getTime()) / dayMilliseconds)
}

function getFirstWeekday(month: CalendarMonth) {
  // JavaScript starts the week on Sunday; this dashboard starts on Saturday.
  return (fromPersianDate({ ...month, day: 1 }).getUTCDay() + 1) % 7
}

export function PersianDateRangePicker({ value, onChange, disabled = false }: PersianDateRangePickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)
  const [viewMonth, setViewMonth] = useState<CalendarMonth>(() => toPersianDate(value.from))
  const [selecting, setSelecting] = useState<'from' | 'to'>('from')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    setDraft(value)
  }, [value.from, value.to])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  const togglePicker = () => {
    if (disabled) return
    if (!open) {
      setDraft(value)
      setSelecting('from')
      setViewMonth(toPersianDate(value.from))
      setValidationError('')
    }
    setOpen((current) => !current)
  }

  const selectDay = (isoDate: string) => {
    setValidationError('')

    if (selecting === 'from' || (draft.from && draft.to)) {
      setDraft({ from: isoDate, to: '' })
      setSelecting('to')
      return
    }

    if (isoDate < draft.from) {
      setDraft({ from: isoDate, to: draft.from })
    } else {
      setDraft({ ...draft, to: isoDate })
    }
    setSelecting('from')
  }

  const applyRange = () => {
    if (!draft.from || !draft.to) {
      setValidationError('ابتدا تاریخ شروع و سپس تاریخ پایان را انتخاب کنید.')
      return
    }

    if (draft.from > draft.to) {
      setValidationError('تاریخ شروع باید قبل از تاریخ پایان باشد.')
      return
    }

    onChange(draft)
    setValidationError('')
    setOpen(false)
  }

  const monthDays = getMonthDays(viewMonth)
  const firstWeekday = getFirstWeekday(viewMonth)
  const calendarCells = Array.from({ length: firstWeekday + monthDays }, (_, index) => {
    if (index < firstWeekday) return null
    const day = index - firstWeekday + 1
    const date = fromPersianDate({ ...viewMonth, day })
    return { day, isoDate: toIsoDate(date) }
  })

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="dialog"
        disabled={disabled}
        onClick={togglePicker}
      >
        <Icon name="calendar" size={17} />
        <span>
          <small>بازه زمانی</small>
          <strong>{formatPersianDate(value.from)} تا {formatPersianDate(value.to)}</strong>
        </span>
        <Icon name="chevron" size={14} />
      </button>

      {open && (
        <div className={styles.popover} role="dialog" aria-label="انتخاب بازه زمانی شمسی">
          <div className={styles.popoverHeading}>
            <strong>انتخاب بازه زمانی شمسی</strong>
            <span>{selecting === 'from' ? 'تاریخ شروع را انتخاب کنید' : 'تاریخ پایان را انتخاب کنید'}</span>
          </div>

          <div className={styles.calendarHeader}>
            <button type="button" className={styles.monthButton} aria-label="ماه بعد" onClick={() => setViewMonth((current) => shiftMonth(current, 1))}>
              <Icon name="chevron" size={15} />
            </button>
            <strong>{monthNames[viewMonth.month - 1]} {persianNumber.format(viewMonth.year)}</strong>
            <button type="button" className={`${styles.monthButton} ${styles.previous}`} aria-label="ماه قبل" onClick={() => setViewMonth((current) => shiftMonth(current, -1))}>
              <Icon name="chevron" size={15} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
          </div>
          <div className={styles.calendarGrid}>
            {calendarCells.map((cell, index) => {
              if (!cell) return <span key={`empty-${index}`} className={styles.emptyDay} aria-hidden="true" />

              const isStart = cell.isoDate === draft.from
              const isEnd = cell.isoDate === draft.to
              const isInRange = Boolean(draft.from && draft.to && cell.isoDate > draft.from && cell.isoDate < draft.to)
              return (
                <button
                  type="button"
                  key={cell.isoDate}
                  className={`${styles.day} ${isInRange ? styles.inRange : ''} ${isStart || isEnd ? styles.selected : ''}`}
                  aria-label={formatPersianDate(cell.isoDate)}
                  aria-pressed={isStart || isEnd}
                  onClick={() => selectDay(cell.isoDate)}
                >
                  {persianNumber.format(cell.day)}
                </button>
              )
            })}
          </div>

          <div className={styles.selectionSummary}>
            <span>شروع: <strong>{formatPersianDate(draft.from)}</strong></span>
            <span>پایان: <strong>{formatPersianDate(draft.to)}</strong></span>
          </div>
          {validationError && <p className={styles.error}>{validationError}</p>}
          <div className={styles.actions}>
            <button type="button" onClick={() => setOpen(false)}>انصراف</button>
            <button type="button" className={styles.apply} onClick={applyRange}>اعمال بازه</button>
          </div>
        </div>
      )}
    </div>
  )
}
