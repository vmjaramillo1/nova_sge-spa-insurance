import { EMPTY_STRING } from '@app/utils/constants'
import { RoutesSharedAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

// tood cambiar apra q sea generic el nombre
export const APP_ROUTES_CONFIG = Object.freeze<
  Record<RoutesSharedAlias, RouteConfig<RoutesSharedAlias>>
>({
  PRODUCT_DETAIL: {
    key: RoutesSharedAlias.PRODUCT_DETAIL,
    path: formatPath('detalle-producto'),
    title: EMPTY_STRING,
  },
  PLAN_SELECTION: {
    key: RoutesSharedAlias.PLAN_SELECTION,
    path: formatPath('detalle-producto1'),
    title: EMPTY_STRING,
  },
  PRODUCT: {
    key: RoutesSharedAlias.PRODUCT,
    path: formatPath('pago'),
    title: EMPTY_STRING,
  },
  ACCEPTANCE: {
    key: RoutesSharedAlias.ACCEPTANCE,
    path: formatPath('soft-token'),
    title: EMPTY_STRING,
  },
  SUCCESS: {
    key: RoutesSharedAlias.SUCCESS,
    path: formatPath('compra-exitosa'),
    title: EMPTY_STRING,
  },
})
