import { formatPrice } from '@/utils/FormatUtils'

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(100)).toBe('$100.00')
    expect(formatPrice(-100)).toBe('-$100.00')
    expect(formatPrice(100000)).toBe('$100,000.00')
  })

  it('should format price correctly and strip if integer', () => {
    expect(formatPrice(100, true)).toBe('$100')
    expect(formatPrice(100.55, true)).toBe('$100.55')
  })
})
