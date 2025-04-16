export const ACCEPTED_TYPES = ['string', 'number']

export const formatMoney = (
  value: number | string,
  fixed = 2,
  withThousandsSeparator = true
) => {
  if (!value || !ACCEPTED_TYPES.includes(typeof value)) return '$ 0,00'

  const format = Number(value).toFixed(Number(fixed)).toLocaleString().split('.')

  const [integer, decimal] = format

  const numberValue = Number(integer)
    .toLocaleString()
    .replace(/,/g, withThousandsSeparator ? '.' : '')

  return `$ ${numberValue},${decimal}`
}
