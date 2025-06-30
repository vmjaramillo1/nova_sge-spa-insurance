import { SmartFormatCallback, DateFormats } from '@app/utils/format/smart-format'
import { isStringTruthy } from '@app/utils/common'
import { formatMoney } from '@app/utils/format/formats'
import { money } from '@app/utils/format/formats'

const toMoney: SmartFormatCallback = (
  value,
  fixed = '2',
  thousandsSeparator = 'true'
) => {
  const fixedValue = parseInt(fixed, 10)

  if (!value) return `$ 0,${'0'.repeat(fixedValue)}`

  return formatMoney(value, fixedValue, isStringTruthy(thousandsSeparator))
}

const toDate: SmartFormatCallback = (value, type = 'short') => {
  if (!value) return ''

  const date =
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(value + 'T00:00:00') // fuerza hora local
      : new Date(value)

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const formatMonth = monthByNumber[month]
  const formatType = type as keyof DateFormats

  return `${day} ${formatMonth[formatType]} ${year}`
}

export const monthByNumber: Record<string | number, DateFormats> = {
  0: { short: 'ene.', full: 'Enero', aria: 'de enero' },
  1: { short: 'feb.', full: 'Febrero', aria: 'de febrero' },
  2: { short: 'mar.', full: 'Marzo', aria: 'de marzo' },
  3: { short: 'abr.', full: 'Abril', aria: 'de abril' },
  4: { short: 'may.', full: 'Mayo', aria: 'de mayo' },
  5: { short: 'jun.', full: 'Junio', aria: 'de junio' },
  6: { short: 'jul.', full: 'Julio', aria: 'de julio' },
  7: { short: 'ago.', full: 'Agosto', aria: 'de agosto' },
  8: { short: 'sep.', full: 'Septiembre', aria: 'de septiembre' },
  9: { short: 'oct.', full: 'Octubre', aria: 'de octubre' },
  10: { short: 'nov.', full: 'Noviembre', aria: 'de noviembre' },
  11: { short: 'dic.', full: 'Diciembre', aria: 'de diciembre' },
}

// -----------------------------

const fixed: SmartFormatCallback = (value, spaces = '0') => {
  return Number(value).toFixed(Number(spaces))
}

const toTitleCase: SmartFormatCallback = (value, _) => {
  if (!value || typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const prependText: SmartFormatCallback = (value, str) => {
  return `${str}${value}`
}

const lower: SmartFormatCallback = (value) => {
  return value?.toLowerCase() ?? ''
}

const upper: SmartFormatCallback = (value) => {
  return value?.toUpperCase() ?? ''
}

const multiply: SmartFormatCallback = (value, multiplier) => {
  const result = Number(value) * Number(multiplier)

  return result.toString()
}

const bolder: SmartFormatCallback = (value) => {
  return `<strong class='font-semibold'>${value}</strong>`
}

const tooltip: SmartFormatCallback = (value, content) => {
  return `<sf-tooltip content="${content}">${value}</sf-tooltip>`
}

const link: SmartFormatCallback = (value, to = '#') => {
  return `<sf-link to="${to}">${value}</sf-link>`
}

const none: SmartFormatCallback = (value) => value

export const formats: Record<string, SmartFormatCallback> = {
  toTitleCase,
  fixed,
  prependText,
  lower,
  upper,
  money,
  multiply,
  none,
  toMoney,
  toDate,

  // components
  bolder,
  tooltip,
  link,
}

export default formats
