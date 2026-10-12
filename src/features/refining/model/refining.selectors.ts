import { parseNumeric } from '../../../shared/lib/number'
import type { RefiningProductionCard, RefiningProductionResponse } from './refining.types'

export const inputProductKeys = ['crudeOil', 'gasCondensate'] as const
export const outputProductKeys = ['gasoline', 'gasOil', 'fuelOil'] as const

function sumProducts(source: RefiningProductionResponse | RefiningProductionCard, keys: readonly string[]) {
  return keys.reduce((total, key) => total + parseNumeric(source[key as keyof typeof source]), 0)
}

function calculateRate(numerator: number, denominator: number) {
  return denominator > 0 ? (numerator / denominator) * 100 : null
}

function readSuppliedRate(value: number | null | undefined) {
  if (value === null || value === undefined) return null

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function selectProductionTotals(data: RefiningProductionResponse) {
  const receivedFeed = sumProducts(data, inputProductKeys)
  const mainProduction = sumProducts(data, outputProductKeys)

  return {
    receivedFeed,
    mainProduction,
    fuelOil: parseNumeric(data.fuelOil),
  }
}

export function selectProductionRatios(data: RefiningProductionResponse) {
  const { receivedFeed, mainProduction, fuelOil } = selectProductionTotals(data)

  return {
    convertRate: calculateRate(mainProduction, receivedFeed),
    fuelOilRate: calculateRate(fuelOil, mainProduction),
  }
}

export function selectFacilityTotals(card: RefiningProductionCard) {
  const receivedFeed = sumProducts(card, inputProductKeys)
  const mainProduction = sumProducts(card, outputProductKeys)
  const suppliedConvertRate = readSuppliedRate(card.convertRate)
  const suppliedFuelOilRate = readSuppliedRate(card.fuelOilRate)

  return {
    receivedFeed,
    mainProduction,
    convertRate: suppliedConvertRate ?? calculateRate(mainProduction, receivedFeed),
    fuelOilRate: suppliedFuelOilRate ?? calculateRate(parseNumeric(card.fuelOil), mainProduction),
  }
}
