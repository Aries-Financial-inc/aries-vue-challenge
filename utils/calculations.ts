import {
  AnalysisResult,
  OptionContract,
  OptionDetails,
} from "../types/options";

export const calculateProfitLoss = (
  contracts: OptionContract[],
  underlyingPrices: number[]
): { results: AnalysisResult[][]; details: OptionDetails[] } => {
  const results = contracts.map((contract) =>
    underlyingPrices.map((price) => {
      const { type, strikePrice, premium, quantity } = contract;
      const intrinsicValue =
        type === "call"
          ? Math.max(0, price - strikePrice)
          : Math.max(0, strikePrice - price);
      const profitLoss = (intrinsicValue - premium) * quantity;
      return { priceAtExpiry: price, profitLoss };
    })
  );

  const details: OptionDetails[] = contracts.map((contract) => {
    const { type, strikePrice, premium, quantity } = contract;
    const maxProfit = type === "call" ? "Unlimited" : strikePrice - premium;
    const maxLoss = type === "call" ? premium * quantity : "Unlimited";
    const breakeven =
      type === "call" ? strikePrice + premium : strikePrice - premium;
    return {
      type,
      strikePrice,
      longShort: type === "call" ? "long" : "short",
      maxProfit,
      maxLoss,
      breakeven,
    };
  });

  return { results, details };
};
