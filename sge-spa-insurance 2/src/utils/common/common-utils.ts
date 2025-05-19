import { WithIsActive, WithOrder } from '@app/utils/interfaces'
import { FlowStatus } from '@app/utils/enums'
import { ZERO } from '../constants'
import { smartFormat } from '@app/utils/format'
import { parseHtmlToJsx, smartFormatParseOptions } from '@app/utils/converter'
import { type UnknownRecord } from '@app/utils/interfaces'
import { formats } from '@app/utils/format'

export function sortArrayBy<T>(array: Array<T>, filter: keyof T): Array<T> {
  if (!array || array.length <= 0) return array

  return [...array].sort((a, b) => (a[filter] > b[filter] ? 1 : -1))
}

export function stringFormat<T extends string | number>(
  template: string,
  fields: Array<T>
): string {
  if (!fields.length) return template

  return fields.reduce((previousValue, field, index) => {
    const regex = new RegExp(`\\{${index}\\}`, 'g')

    return previousValue.replace(regex, `${field}`)
  }, template)
}

export function isValid(value: unknown) {
  return value !== undefined && value !== null
}

export function isValidValues(...args: unknown[]) {
  return args.every(isValid)
}

export function isLastItemInArray<T>(array: Array<T>, index: number) {
  return index === array.length - 1
}

export function filterIsActive<T extends WithIsActive>(element: T) {
  return element.isActive
}

export function sortByOrder<T extends WithOrder>(array: Array<T>) {
  return sortArrayBy(array, 'order')
}

export const filterAndSort = <T extends WithOrder & WithIsActive>(
  array: Array<T>
) => {
  return sortByOrder(array.filter(filterIsActive))
}

export function formatPemKeys(key: string, type: 'public' | 'private') {
  if (key.startsWith('-----BEGIN') && key.endsWith('KEY-----')) return key

  const typeValue = type.toUpperCase()
  return `-----BEGIN ${typeValue} KEY-----\n${key}\n-----END ${typeValue} KEY-----`
}

export const isStringTruthy = (value: string) => {
  return !!value && (value === 'true' || value === '1')
}

export const calculateAcceptanceNextStatus = (status: FlowStatus) => {
  switch (status) {
    case FlowStatus.RETRY_ACCEPTANCE_INITIAL:
      return FlowStatus.RETRY_ACCEPTANCE_LAST
    case FlowStatus.RETRY_ACCEPTANCE_LAST:
      return FlowStatus.RETRY_ACCEPTANCE_ERROR
    default:
      return FlowStatus.RETRY_ACCEPTANCE_INITIAL
  }
}

export function arrayIsEmpty<T>(array?: Array<T> | null) {
  return !array || !Array.isArray(array) || array.length <= ZERO
}

export function capitalize(value: string) {
  const [char, ...restWord] = value.split('')
  return `${char.toUpperCase()}${restWord.join('').toLowerCase()}`
}

export function smartParse(value: string, context: UnknownRecord = {}) {
  const valueFormatted = smartFormat(value, context, formats)
  return parseHtmlToJsx(valueFormatted, smartFormatParseOptions)
}
