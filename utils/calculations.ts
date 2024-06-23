import { OptionContract, AnalysisResult } from "../types/options";

export const calculateProfitLoss = (
  contracts: OptionContract[],
  underlyingPrices: number[]
): AnalysisResult[][] => {
  return contracts.map((contract) =>
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
};
