import { Option, OptionType, PositionType } from '@/models/Option'

export const calculateProfitLossAtPrice = (option: Option, price: number) => {
  const isCall = option.type === OptionType.Call
  const isLong = option.position === PositionType.Long
  const optionPrice = (option.bid + option.ask) / 2

  let intrinsicValue
  if (isCall) {
    intrinsicValue = Math.max(price - option.strike_price, 0)
  } else {
    intrinsicValue = Math.max(option.strike_price - price, 0)
  }

  const profitLoss = isLong
    ? intrinsicValue - optionPrice
    : optionPrice - intrinsicValue
  return profitLoss
}

export const calculateStrategyProfitLoss = (
  options: Option[],
  price: number
) => {
  return options.reduce(
    (total, option) => total + calculateProfitLossAtPrice(option, price),
    0
  )
}

export const getBreakEvenPoints = (options: Option[]) => {
  // Basic logic to determine break even points
  // This is simplified and should be expanded for accuracy
  return options.map((option) => {
    const optionPrice = (option.bid + option.ask) / 2
    if (option.type === OptionType.Call) {
      return option.position === PositionType.Long
        ? option.strike_price + optionPrice
        : option.strike_price - optionPrice
    } else {
      return option.position === PositionType.Long
        ? option.strike_price - optionPrice
        : option.strike_price + optionPrice
    }
  })
}

export const getMaxProfit = (options: Option[]) => {
  // Simplified logic for max profit
  // Should be expanded based on specific strategies
  return options.reduce((maxProfit, option) => {
    const optionPrice = (option.bid + option.ask) / 2
    const intrinsicValue =
      option.type === OptionType.Call ? option.strike_price : 0

    const profit =
      option.position === PositionType.Long
        ? intrinsicValue - optionPrice
        : optionPrice - intrinsicValue

    return Math.max(maxProfit, profit)
  }, 0)
}

export const getMaxLoss = (options: Option[]) => {
  // Simplified logic for max loss
  // Should be expanded based on specific strategies
  return options.reduce((maxLoss, option) => {
    const optionPrice = (option.bid + option.ask) / 2
    const intrinsicValue =
      option.type === OptionType.Put ? option.strike_price : 0

    const loss =
      option.position === PositionType.Long
        ? optionPrice - intrinsicValue
        : intrinsicValue - optionPrice

    return Math.min(maxLoss, loss)
  }, 0)
}

export const calculateMedianStrikePrice = (options: Option[]) => {
  const strikePrices = options.map((option) => option.strike_price)
  strikePrices.sort((a, b) => a - b)

  const middleIndex = Math.floor(strikePrices.length / 2)
  return strikePrices[middleIndex]
}

export const generateChartData = (options: Option[]) => {
  const prices = []
  const profits = []

  const CHART_PRICE_RANGE = 0.5 // 50% above and below median strike price
  const CHART_STEP_COUNT = 10 // Number of steps to calculate

  const strikePriceMedian = calculateMedianStrikePrice(options)
  const startPrice = Math.round(strikePriceMedian * CHART_PRICE_RANGE)
  const endPrice = Math.round(strikePriceMedian + startPrice)
  const step = Math.round((endPrice - startPrice) / CHART_STEP_COUNT)

  for (let i = startPrice; i <= endPrice; i += step) {
    prices.push(i)
    profits.push(calculateStrategyProfitLoss(options, i))
  }

  return { prices, profits }
}
