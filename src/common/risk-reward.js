export const getPremium = (option) => {
  return ((option.bid || 0) + (option.ask || 0)) / 2;
};

export const isLong = (option) => {
  return option.long_short.toLowerCase() === "long";
};

export const isCall = (option) => {
  return option.type.toLowerCase() === "call";
};

export const longShortCompute = (option, innerOptionPrice) => {
  return option.isLong ? innerOptionPrice - option.premium : option.premium - innerOptionPrice;
};

export const callOptionCalculate = (option, basePrice) => {
  return longShortCompute(option, Math.max(0, basePrice - option.strike_price));
};

export const putOptionCalculate = (option, basePrice) => {
  return longShortCompute(option, Math.max(0, option.strike_price - basePrice));
};

export const adapterOptionCalculate = (option) => {
  return {
    isCall: isCall(option),
    isLong: isLong(option),
    premium: getPremium(option),
    strike_price: option.strike_price,
  };
};

export const calculateRiskRewardOption = (option, basePrice) => {
  return option.isCall ? callOptionCalculate(option, basePrice) : putOptionCalculate(option, basePrice);
};

export const getCurrentColor = (index) => {
  let color = "#ec77c3";

  switch (index) {
  case 1:
    color = "#653198";
    break;
  case 2:
    color = "#78d3cb";
    break;
  case 3:
    color = "#9eca7e";
    break;
  }
  
  return color;
};

export const calculateRiskReward = (options) => {
  const strikePrices = options.map(el => el.strike_price);
  const minimum = Math.floor(Math.min(...strikePrices) / 2);
  const maximum = Math.ceil(Math.max(...strikePrices) * 1.5);
  const underlyingPricesLength = Math.max(
    Math.min(
      (maximum - minimum) / strikePrices.length,
      400,
    ),
    200,
  );
  const step = Math.ceil((maximum - minimum) / (underlyingPricesLength - 1));
  
  const underlyingPrice = Array.from(
    {length: underlyingPricesLength},
    (_, i) => minimum + i * step);
  
  const datasets = options.map((option, optionIndex) => {
    const optionCalculatePayload = adapterOptionCalculate(option);
    
    let lastLossPricePointIndex = null;
    
    let noLossPricePoint = null;
    let maxProfit = 0;
    let maxLoss = 0;
    
    const dataset = underlyingPrice.map((price, idx) => {
      const calculatedOption = calculateRiskRewardOption(optionCalculatePayload, price);

      if (calculatedOption > maxProfit) maxProfit = calculatedOption;
      if (calculatedOption < maxLoss) maxLoss = calculatedOption;
      
      if (calculatedOption >= 0) {
        if (lastLossPricePointIndex === null) {
          noLossPricePoint = price;
        } else {
          noLossPricePoint = underlyingPrice[lastLossPricePointIndex + 1] ?? underlyingPrice[lastLossPricePointIndex];
        }
      }
      
      if (calculatedOption < 0) {
        lastLossPricePointIndex = idx;
      }
      
      return calculatedOption;
    });
    
    return {
      borderColor: getCurrentColor(optionIndex),
      borderWidth: 1,
      data: dataset,
      fill: false,
      label: `Line №${optionIndex + 1}`,
      maxLoss,
      maxProfit,
      noLossPricePoint,
      showLine: false,
    };
  });
  
  return {
    datasets,
    labels: underlyingPrice,
  };
};
