import {
  PRODUCT_NAME_FRAUD,
  PRODUCT_NAME_PAYMENT,
  PRODUCT_NAME_ACCEPTANCE,
} from '@app/utils/constants'
import { RoutesFraudAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

// tood cambiar apra q sea generic el nombre
export const APP_ROUTES_CONFIG = Object.freeze<
  Record<RoutesFraudAlias, RouteConfig<RoutesFraudAlias>>
>({
  PRODUCT_DETAIL: {
    key: RoutesFraudAlias.PRODUCT_DETAIL,
    path: formatPath('detalle-producto'),
    title: PRODUCT_NAME_FRAUD,
  },
  PLAN_SELECTION: {
    key: RoutesFraudAlias.PLAN_SELECTION,
    path: formatPath('detalle-producto1'),
    title: PRODUCT_NAME_FRAUD,
  },
  PRODUCT: {
    key: RoutesFraudAlias.PRODUCT,
    path: formatPath('pago'),
    title: PRODUCT_NAME_PAYMENT,
  },
  ACCEPTANCE: {
    key: RoutesFraudAlias.ACCEPTANCE,
    path: formatPath('soft-token'),
    title: PRODUCT_NAME_ACCEPTANCE,
  },
  SUCCESS: {
    key: RoutesFraudAlias.SUCCESS,
    path: formatPath('compra-exitosa'),
    title: PRODUCT_NAME_FRAUD,
  },
})
