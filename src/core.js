import moment from 'moment';

export const generateChartData = (option) => {
  const { strike_price, type, bid, ask, long_short, expiration_date } = option;

  const strikePrice = Number(strike_price);
  const bidPrice = Number(bid);
  const askPrice = Number(ask);

  if (isNaN(strikePrice) || isNaN(bidPrice) || isNaN(askPrice)) {
    throw new Error("Invalid input: strike_price, bid, and ask must be numbers");
  }

  let priceX = [];
  let profitLossY = [];

  const dateRange = getExpiryPriceRange(expiration_date);

  for (let price = 0; price <= dateRange; price++) {
    let profit = calculateProfit(price, strikePrice, bidPrice, askPrice, type, long_short);
    priceX.push(price);
    profitLossY.push(profit);
  }

  return {
    x: priceX,
    y: profitLossY,
  };
};


const calculateProfit = (price, strikePrice, bid, ask, type, longShort) => {
  if (type === 'Call') {
    return longShort === 'Long'
      ? Math.max(0, price - strikePrice) - ask
      : Math.min(0, strikePrice - price) + bid;
  } else if (type === 'Put') {
    return longShort === 'Long'
      ? Math.max(0, strikePrice - price) - ask
      : Math.min(0, price - strikePrice) + bid;
  }
  return 0;
};


export const getRiskRewardRatio = (profitLoss) => {
  const maxProfit = Math.max(...profitLoss);
  const maxLoss = Math.min(...profitLoss);
  const ratio = maxProfit / Math.abs(maxLoss);
  return {
    ratio: `1 : ${Math.floor(ratio)}`,
    maxProfit,
    maxLoss,
  };
};


export const getProfitProbability = (profitLoss) => {
  const totalScenarios = profitLoss.length;
  const profitableScenarios = profitLoss.filter((profit) => profit > 0).length;

  return ((profitableScenarios / totalScenarios) * 100).toFixed(0);
};


const getExpiryPriceRange = (date) => moment(date).diff(moment(), 'days');
