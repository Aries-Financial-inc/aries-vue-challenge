import { OptionContract } from "../types/options";

export const DEFAULT_OPTION_CONTRACT: OptionContract = {
  type: "call",
  strikePrice: 100,
  premium: 5,
  quantity: 1,
};

export const UNDERLYING_PRICES = Array.from({ length: 10 }, (_, i) => 101 + i); // Prices from 101 to 110
