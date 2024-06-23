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

export interface CombinedAnalysisResult {
  priceAtExpiry: number;
  [key: string]: number; // Index signature for dynamic keys
}

export interface OptionDetails {
  type: "call" | "put";
  strikePrice: number;
  longShort: "long" | "short";
  maxProfit: number | string;
  maxLoss: number | string;
  breakeven: number;
}
