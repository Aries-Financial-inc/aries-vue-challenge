export const calculateProfitItem = (item) => {
  const { strike_price, type, bid, ask, long_short } = item;

  let breakevenPoint = 0;
  let maxLoss = 0;
  let maxProfit = 0;

  // Calculate Call Premium
  const callPremium = ask - bid;

  // Calculate Maximum profit, Maximum Loss, and Break Even Point
  if (type === "Call") {
    breakevenPoint = strike_price + callPremium;

    if (long_short === "long") {
      maxLoss = bid;
      maxProfit = 10000000;
    } else {
      breakevenPoint = strike_price + callPremium;
      maxProfit = bid ;
      maxLoss = 10000000;
    }
  } else if (type === "Put") {
    breakevenPoint = strike_price - callPremium;

    if (long_short === "long") {
      maxLoss = bid
      maxProfit = strike_price;
    } else {
      breakevenPoint = strike_price - callPremium;
      maxLoss = 1000000;
      maxProfit = bid
    }
  }

  return { strike_price, maxLoss, maxProfit, breakevenPoint }
}