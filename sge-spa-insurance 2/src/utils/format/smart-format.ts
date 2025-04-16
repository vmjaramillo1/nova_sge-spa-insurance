import { isStringTruthy } from '../common'
import { formatMoney } from './formats'

export interface SmartFormatValue {
  value: string
  format: Array<{ value: string }>
}

export type SmartFormatCallback = (
  value?: string,
  ...args: Array<string | undefined>
) => string

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

  const date = new Date(value)

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const formatMonth = monthByNumber[month]
  const formatType = type as keyof DateFormats

  return `${day} ${formatMonth[formatType]} ${year}`
}

export const smartFormats: Record<string, SmartFormatCallback> = {
  toMoney,
  toDate,
}

export default smartFormats

interface DateFormats {
  short: string
  full: string
  aria: string
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
