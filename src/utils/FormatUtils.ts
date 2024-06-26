/**
 * Format price to currency
 * @param price
 * @returns formatted price or original value if not a number
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatPrice = (price: number, stripIfInteger?: boolean) => {
  if (stripIfInteger) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(price)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
