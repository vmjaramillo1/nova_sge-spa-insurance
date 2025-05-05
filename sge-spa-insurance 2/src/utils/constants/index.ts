export const HUB_NAME = 'Hub de seguros'
export const PRODUCT_NAME = 'Seguro por robos y fraudes'

export const ALLOW_DEVTOOLS = ['development', 'local'].includes(
  process.env.REACT_APP_ENVIRONMENT ?? ''
)

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
