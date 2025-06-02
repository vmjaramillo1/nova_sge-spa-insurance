import { PRODUCT_NAME } from '@app/utils/constants'
import { RoutesFraudAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

export const APP_ROUTES_CONFIG = Object.freeze<
  Record<RoutesFraudAlias, RouteConfig<RoutesFraudAlias>>
>({
  PRODUCT_DETAIL: {
    key: RoutesFraudAlias.PRODUCT_DETAIL,
    path: formatPath('detalle-producto'),
    title: PRODUCT_NAME,
  },
  PRODUCT: {
    key: RoutesFraudAlias.PRODUCT,
    path: formatPath('pago'),
    title: PRODUCT_NAME,
  },
  ACCEPTANCE: {
    key: RoutesFraudAlias.ACCEPTANCE,
    path: formatPath('soft-token'),
    title: PRODUCT_NAME,
  },
  SUCCESS: {
    key: RoutesFraudAlias.SUCCESS,
    path: formatPath('compra-exitosa'),
    title: PRODUCT_NAME,
  },
})
