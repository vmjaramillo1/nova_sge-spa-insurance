import { isStringTruthy } from '@app/utils/common'
import { SmartFormatCallback } from '@app/utils/format/smart-format'
export const ACCEPTED_TYPES = ['string', 'number']

const locales: Intl.LocalesArgument = 'es-EC'

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

export const moneyFormatter = new Intl.NumberFormat(locales, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
})

export const money: SmartFormatCallback = (
  value,
  fixed = '2',
  thousandsSeparator = 'false',
  spacing = 'false',
  monetarySymbol = 'false'
) => {
  if (!value || !ACCEPTED_TYPES.includes(typeof value)) return '$ 0,00'

  const fixedValue = Number(fixed)

  let [result, decimals] = moneyFormatter
    .format(Number(value))
    .replace('$', '$ ')
    .split(',')

  const skipThousandsSeparator = isStringTruthy(thousandsSeparator)

  if (skipThousandsSeparator) {
    result = result.replace(/\./g, '')
  }

  const skipSpacing = isStringTruthy(spacing)

  if (skipSpacing) {
    result = result.replace(/\s/g, '')
  }

  const skipMonetarySymbol = isStringTruthy(monetarySymbol)

  if (skipMonetarySymbol) {
    result = result.replace('$', '')
  }

  if (fixedValue === 0) return result

  decimals = decimals.slice(0, fixedValue).padEnd(fixedValue, '0')

  return `${result},${decimals}`
}
