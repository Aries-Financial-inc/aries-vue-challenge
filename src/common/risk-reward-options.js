export function isOptionFilled(option) {
  return Boolean(option.strike_price && option.bid && option.ask);
}
