export const calculatePnL = (options, priceRange) => {
    const pnl = priceRange.map((price) => {
      let profitLoss = 0;
      options.forEach((option) => {
        const { type, strike, premium, quantity } = option;
        if (type === 'call') {
          profitLoss += Math.max(price - strike, 0) * quantity - premium * quantity;
        } else if (type === 'put') {
          profitLoss += Math.max(strike - price, 0) * quantity - premium * quantity;
        }
      });
      return { price, profitLoss };
    });
    return pnl;
  };
  