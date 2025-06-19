export const INSURANCE_PORTAL_NAME = 'Seguros'
export const PREVIOUS_PORTAL_NAME = 'Seguros contratados'
export const TERMS_AND_CONDITIONS_NAME = 'Autorización de uso de datos'
export const PRODUCT_NAME_FRAUD = 'Seguro por robos y fraudes'
export const PRODUCT_NAME_LIFE = 'Seguro de Vida + Salud'
export const PRODUCT_NAME_PAYMENT = 'Forma de pago'
export const PRODUCT_NAME_ACCEPTANCE = 'Confirmar contratación'

export const PROD_CODE_LIFE_HEALTH = 'LIFE_HEALTH'
export const PROD_CODE_TU_BAN_PRO = 'TU_BAN_PRO'

export const PRODUCTS_CODES = [PROD_CODE_LIFE_HEALTH, PROD_CODE_TU_BAN_PRO] as const

export const MAP_INSURANCE_STATUS = {
  success: 'Estás al día',
  error: 'Cancelado',
  warning: 'Pendiente',
  info: 'Pendiente',
} as const

export const ALLOW_DEVTOOLS = ['development', 'local'].includes(
  process.env.REACT_APP_ENVIRONMENT ?? ''
)

export const CARD_BRANDS = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  UNKNOWN: 'UNKNOWN',
}

export const PAYMENT_METHODS = {
  ACCOUNT: 'ACCOUNT',
  CREDIT_CARD: 'CREDIT_CARD',
}

export const ACCOUNT_TYPES = {
  SAVING_ACCOUNT: 'SAVING_ACCOUNT',
  CHECKING_ACCOUNT: 'CHECKING_ACCOUNT',
}

export const BASE_PATH = process.env.PUBLIC_URL ?? '/'

export const OPEN_ACCOUNTS_FLOW_URL =
  process.env.REACT_APP_EXTERNAL_FLOW_ACCOUNT_URL!
export const PORTAL_INSURANCE_URL =
  'https://www.pichincha.com/portal/seguros-en-linea'

export const BP_CALL_NUMBER_LINK = 'tel:022999999'

export const WHATSAPP_LINK =
  'https://api.whatsapp.com/send?phone=593995546002&text=Hola,%20vengo%20de%20mi%20Banca%20M%C3%B3vil%20de%20Banco%20Pichincha%20y%20necesito%20informaci%C3%B3n%20sobre%20mi%20seguro%20por%20robos%20y%20fraudes.'
export const ACCEPTED_STATUS = 'ACCEPTED'

const MILLISECOND = 1
const SECOND = MILLISECOND * 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const DELAY_SMOOTH_SCROLL = SECOND

export const SOFT_TOKEN_SIZE = 16
export const SOFT_TOKEN_TIME = 49
export const SOFT_TOKEN_ANIMATION_FR = 46.5

export const ZERO = 0

export const DOCUMENT_DOWNLOAD_STATIC_CODES = Object.freeze({
  USE_GUIDE: 'DOC_FRAUDS_USE_GUIDE',
})

export const TIME = Object.freeze({
  SECOND,
  MINUTE,
  HOUR,
})
