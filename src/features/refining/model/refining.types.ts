import type { IconName } from '../../../components/ui/Icon'

export type RefiningMetric = {
  label: string
  value: string
  unit: string
  caption: string
  icon: IconName
  tone: 'teal' | 'blue' | 'gold' | 'coral'
}

export type ProductionUnit = {
  code: string
  name: string
  throughput: string
  capacity: string
  utilization: number
  utilizationLabel: string
  status: 'operating' | 'maintenance'
}

export type ProductOutput = {
  name: string
  actual: string
  target: string
  achievement: number
  achievementLabel: string
}

export type ProductionDateRange = {
  from: string
  to: string
}

export type RefiningProductionCard = {
  id: number
  name: string
  gasoline: string
  gasOil: string
  fuelOil: string
  crudeOil: string
  gasCondensate: string
  fuelOilRate: number | null
  convertRate: number | null
}

export type RefiningProductionResponse = {
  gasoline: string
  gasOil: string
  fuelOil: string
  crudeOil: string
  gasCondensate: string
  cards: RefiningProductionCard[]
}

export type ProductKey =
  | 'gasoline'
  | 'gasOil'
  | 'fuelOil'
  | 'crudeOil'
  | 'gasCondensate'
