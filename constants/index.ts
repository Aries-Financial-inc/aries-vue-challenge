import { OptionContract } from "../types/options";

export const DEFAULT_OPTION_CONTRACT: OptionContract = {
  type: "call",
  strikePrice: 100,
  premium: 2,
  quantity: 1,
  bid: 1.9, // Default bid value
  ask: 2.1, // Default ask value
  long_short: "long", // Default long/short value
};

export const UNDERLYING_PRICES = Array.from(
  { length: 20 },
  (_, i) => 90 + i * 2
); // Prices from 90 to 128, incremented by 2
