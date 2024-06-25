/**
 * Format price to currency
 * @param price
 * @returns formatted price or original value if not a number
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatPrice = (price: any) => {
  if (isNaN(price)) return price
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
