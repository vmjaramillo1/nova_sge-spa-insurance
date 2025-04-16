import { PRODUCT_NAME } from '@app/utils/constants'
import { RoutesAlias } from '@app/utils/enums'

interface RouteConfig {
  key: RoutesAlias
  path: string
  title: string
}
type RecordRoutes = Record<RoutesAlias, string>

export const BASE_PATH = process.env.PUBLIC_URL ?? '/'

function formatPath(path: string): string {
  const basePathEndsWithSlash = BASE_PATH.endsWith('/')
  const currentPath = basePathEndsWithSlash ? path : '/' + path
  return BASE_PATH + currentPath
}

export const APP_ROUTES_CONFIG = Object.freeze<Record<RoutesAlias, RouteConfig>>({
  PRODUCT_DETAIL: {
    key: RoutesAlias.PRODUCT_DETAIL,
    path: formatPath('detalle-producto'),
    title: PRODUCT_NAME,
  },
  PRODUCT: {
    key: RoutesAlias.PRODUCT,
    path: formatPath('pago'),
    title: PRODUCT_NAME,
  },
  SELECT_ACCOUNT: {
    key: RoutesAlias.SELECT_ACCOUNT,
    path: formatPath('seleccionar-cuenta'),
    title: 'Elige tu cuenta',
  },
  ACCEPTANCE: {
    key: RoutesAlias.ACCEPTANCE,
    path: formatPath('soft-token'),
    title: PRODUCT_NAME,
  },
  SUCCESS: {
    key: RoutesAlias.SUCCESS,
    path: formatPath('compra-exitosa'),
    title: PRODUCT_NAME,
  },

  // Errors
  GENERAL_ERROR: {
    key: RoutesAlias.GENERAL_ERROR,
    path: formatPath('error'),
    title: PRODUCT_NAME,
  },
  NOT_ACCOUNT: {
    key: RoutesAlias.NOT_ACCOUNT,
    path: formatPath('cuenta-no-disponible'),
    title: PRODUCT_NAME,
  },

  // Additional
  RETRY_ACCEPTANCE: {
    key: RoutesAlias.RETRY_ACCEPTANCE,
    path: formatPath('reintentar-aceptacion'),
    title: PRODUCT_NAME,
  },
  PREVIOUS: {
    key: RoutesAlias.PREVIOUS,
    path: formatPath('posventa-otros-canales'),
    title: PRODUCT_NAME,
  },
  PREVIOUS_PRODUCT: {
    key: RoutesAlias.PREVIOUS_PRODUCT,
    path: formatPath('posventa'),
    title: PRODUCT_NAME,
  },
  ALREADY_PRODUCT: {
    key: RoutesAlias.ALREADY_PRODUCT,
    path: formatPath('no-cumple-regla-negocio'),
    title: PRODUCT_NAME,
  },
  NOT_PRODUCT: {
    key: RoutesAlias.NOT_PRODUCT,
    path: formatPath('producto-no-disponible'),
    title: PRODUCT_NAME,
  },
  IN_PROGRESS: {
    key: RoutesAlias.IN_PROGRESS,
    path: formatPath('en-progreso'),
    title: PRODUCT_NAME,
  },
})

export const APP_ROUTES = Object.keys(APP_ROUTES_CONFIG).reduce<RecordRoutes>(
  (acc, key) => ({
    ...acc,
    [key]: APP_ROUTES_CONFIG[key as RoutesAlias].path,
  }),
  {} as RecordRoutes
)

export const getRoutKeyByPath = (path: string): RoutesAlias | undefined => {
  const route = Object.keys(APP_ROUTES_CONFIG).find(
    (key) => APP_ROUTES_CONFIG[key as RoutesAlias].path === path
  )

  return route as RoutesAlias
}
