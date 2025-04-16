export * from './common'
export * from './constants'
export * from './format'
export * from './reduce'
export * from './guards'
export * from './accessibility'
export * from './service'

interface AccountFormat {
  label: string
  type: string
  alias: string
  aria: string
}

export const ACCOUNT_FORMATS: Record<string, AccountFormat> = {
  SAVINGS_ACCOUNT: {
    label: 'Cta. Ahorros',
    type: 'Transaccional',
    alias: 'Ahorros',
    aria: 'de ahorros',
  },
  CHECKING_ACCOUNT: {
    label: 'Corriente',
    type: 'Corriente',
    alias: 'Corriente',
    aria: 'corriente',
  },
  DEFAULT: {
    label: 'Cta.',
    type: '',
    alias: '',
    aria: '',
  },
}
