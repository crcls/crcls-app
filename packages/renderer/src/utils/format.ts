export function formatCurrency(value: number): string {
  const float = Math.round(value * 100) / 100

  // TODO: get local currency symbols
  return '$' + float.toLocaleString(navigator.languages, {
    minimumFractionDigits: 2,
  })
}