export interface OptionContract {
  type: "call" | "put";
  strikePrice: number;
  premium: number;
  quantity: number;
}

export interface AnalysisResult {
  priceAtExpiry: number;
  profitLoss: number;
}
