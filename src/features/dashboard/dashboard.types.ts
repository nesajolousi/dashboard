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
