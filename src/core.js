import moment from 'moment'

export function generateChartData(option) {
  const { strike_price, type, bid, ask, long_short, expiration_date } = option;

  let priceX = [];
  let profitLossY = [];

  const dateRange = getExpiryPriceRange(expiration_date);

  for (let price = 0; price <= dateRange; price++ ) {
    let profit;

    if (type === 'Call') {
      profit = long_short === 'long' ? Math.max(0, price - strike_price) - ask : Math.min(0, strike_price - price) + bid;
    } else if (type === 'Put') {
      profit = long_short === 'long' ? Math.max(0, strike_price - price) - ask : Math.min(0, price - strike_price) + bid;
    }

    priceX.push(price);
    profitLossY.push(profit);
  }

  return {
    x: priceX,
    y: profitLossY,
  }
}

export function getRiskRewardRatio(profitLoss) {
  const maxProfit = Math.max(...profitLoss);
  const maxLoss = Math.min(...profitLoss);

  const ratio = maxProfit / Math.abs(maxLoss);
  return {
    ratio: `1 : ${Math.floor(ratio)}`,
    maxProfit,
    maxLoss
  }
}

export function getProfitProbability(profitLoss) {
  const totalScenarios = profitLoss.length;
  const profitableScenarios = profitLoss.filter(profit => profit > 0).length;

  return ((profitableScenarios / totalScenarios) * 100).toFixed(0);
}


function getExpiryPriceRange(date) {
  return moment(date).diff(moment(), 'day');
}
