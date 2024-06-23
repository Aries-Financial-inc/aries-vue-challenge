import { OptionContract, AnalysisResult } from "../types/options";

export const calculateProfitLoss = (
  contracts: OptionContract[],
  underlyingPrices: number[]
): AnalysisResult[] => {
  return underlyingPrices.map((price) => {
    const profitLoss = contracts.reduce((acc, contract) => {
      const { type, strikePrice, premium, quantity } = contract;
      const intrinsicValue =
        type === "call"
          ? Math.max(0, price - strikePrice)
          : Math.max(0, strikePrice - price);
      return acc + (intrinsicValue - premium) * quantity;
    }, 0);
    return { priceAtExpiry: price, profitLoss };
  });
};
