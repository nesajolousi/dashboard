import type { IconName } from '../../components/ui/Icon'

export type Kpi = {
  label: string
  value: string
  unit: string
  change: string
  tone: 'teal' | 'blue' | 'gold' | 'coral'
  icon: IconName
  caption: string
}

export type ProductionTrendData = {
  unit: string
  labels: string[]
  actual: number[]
  plan: number[]
}

export type ProductMixItem = {
  key: 'petrol' | 'diesel' | 'kerosene' | 'other'
  label: string
  /** سهم از کل تولید، به درصد */
  value: number
}

export type ProductMixData = {
  total: string
  unit: string
  items: ProductMixItem[]
}

export type Shipment = {
  product: string
  code: string
  destination: string
  volume: string
  status: string
  statusClass: 'loading' | 'sent' | 'waiting'
  progress: number
  date: string
}
