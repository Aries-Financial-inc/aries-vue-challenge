export const calculateProfitLoss = (price, option) => {
  const { strike_price, type, bid, ask, long_short } = option;
  const priceDiff = type === 'Call' ? price - strike_price : strike_price - price;
  const intrinsicValue = Math.max(priceDiff, 0);
  const premium = long_short === 'long' ? ask : bid;

  return (long_short === 'long' ? intrinsicValue - premium : premium - intrinsicValue) * 100;
};
