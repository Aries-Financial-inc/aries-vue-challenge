import { OptionContract } from "../types/options";

export const getPremium = (option: OptionContract): number => {
  return ((option.bid || 0) + (option.ask || 0)) / 2;
};

export const isLong = (option: OptionContract): boolean => {
  return option.long_short.toLowerCase() === "long";
};

export const isCall = (option: OptionContract): boolean => {
  return option.type.toLowerCase() === "call";
};

export const longShortCompute = (
  option: OptionContract,
  innerOptionPrice: number
): number => {
  const premium = getPremium(option);
  return isLong(option)
    ? innerOptionPrice - premium
    : premium - innerOptionPrice;
};

export const callOptionCalculate = (
  option: OptionContract,
  basePrice: number
): number => {
  return longShortCompute(option, Math.max(0, basePrice - option.strikePrice));
};

export const putOptionCalculate = (
  option: OptionContract,
  basePrice: number
): number => {
  return longShortCompute(option, Math.max(0, option.strikePrice - basePrice));
};

export const adapterOptionCalculate = (option: OptionContract): any => {
  return {
    isCall: isCall(option),
    isLong: isLong(option),
    premium: getPremium(option),
    strikePrice: option.strikePrice,
  };
};

export const calculateRiskRewardOption = (
  option: any,
  basePrice: number
): number => {
  return option.isCall
    ? callOptionCalculate(option, basePrice)
    : putOptionCalculate(option, basePrice);
};

export const calculateRiskReward = (options: OptionContract[]): any => {
  const strikePrices = options.map((el) => el.strikePrice);
  const minimum = Math.floor(Math.min(...strikePrices) / 2);
  const maximum = Math.ceil(Math.max(...strikePrices) * 1.5);
  const underlyingPricesLength = Math.max(
    Math.min((maximum - minimum) / strikePrices.length, 400),
    200
  );
  const step = Math.ceil((maximum - minimum) / (underlyingPricesLength - 1));

  const underlyingPrice = Array.from(
    { length: underlyingPricesLength },
    (_, i) => minimum + i * step
  );

  const datasets = options.map((option, optionIndex) => {
    const optionCalculatePayload = adapterOptionCalculate(option);

    let lastLossPricePointIndex: number | null = null;
    let noLossPricePoint: number | null = null;
    let maxProfit = 0;
    let maxLoss = 0;

    const dataset = underlyingPrice.map((price, idx) => {
      const calculatedOption = calculateRiskRewardOption(
        optionCalculatePayload,
        price
      );

      if (calculatedOption > maxProfit) maxProfit = calculatedOption;
      if (calculatedOption < maxLoss) maxLoss = calculatedOption;

      if (calculatedOption >= 0) {
        if (lastLossPricePointIndex === null) {
          noLossPricePoint = price;
        } else {
          noLossPricePoint =
            underlyingPrice[lastLossPricePointIndex + 1] ??
            underlyingPrice[lastLossPricePointIndex];
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
      breakeven: noLossPricePoint,
      showLine: false,
    };
  });

  return {
    datasets,
    labels: underlyingPrice,
  };
};

export const getCurrentColor = (index: number): string => {
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
