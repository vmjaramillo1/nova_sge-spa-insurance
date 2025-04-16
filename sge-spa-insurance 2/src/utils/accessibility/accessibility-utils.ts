import { ACCOUNT_FORMATS } from '..'

export function getAriaAccountNumber(accountMask: string) {
  return accountMask.slice(-4).split('').join(' ')
}

export function getAriaAccountMoney(amount: number) {
  const [currency, cents] = amount.toString().split('.')
  const currencyLabel = `${currency} dólares`
  const centsLabel = cents ? ` con ${cents} centavos` : ''
  return `${currencyLabel}${centsLabel}`
}

export function getAriaAccountLabel(type: string, alias: string | null) {
  const aliasLabel = alias ? ` ${alias.toLowerCase()}` : ''
  return `${ACCOUNT_FORMATS[type].aria}${aliasLabel}`
}

export function getMoneyAriaLabel(amount: number | string) {
  const valueNumber = typeof amount === 'string' ? Number(amount) : amount

  const [currency, cents] = valueNumber.toString().split('.')

  const currencyLabel = `${parseInt(currency, 10)} dólares`
  const centsLabel = cents ? ` con ${parseInt(cents, 10)} centavos` : ''

  return currencyLabel.concat(centsLabel)
}

export function getAriaNumber(value?: string) {
  if (!value) return ''

  return value.split('').join(' ')
}
