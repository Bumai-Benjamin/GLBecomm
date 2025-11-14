const NAD_FORMATTER = new Intl.NumberFormat('en-NA', {
  style: 'currency',
  currency: 'NAD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPrice(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return NAD_FORMATTER.format(0)
  }
  return NAD_FORMATTER.format(value)
}
