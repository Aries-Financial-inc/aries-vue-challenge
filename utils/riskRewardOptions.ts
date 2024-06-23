import { OptionContract } from "../types/options";

export function isOptionFilled(option: OptionContract): boolean {
  return Boolean(
    option.strikePrice &&
      option.bid &&
      option.ask &&
      option.premium &&
      option.quantity
  );
}
