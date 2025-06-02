import { RoutesFraudAlias, RoutesHubAlias } from '@app/utils/enums'
import { APP_ROUTES_CONFIG as APP_ROUTES_FRAUD } from './fraud'
import { APP_ROUTES_CONFIG as APP_ROUTES_HUB } from './hub'

// todo validar para mejorar
export interface RouteConfig<T extends string = string> {
  key: T
  path: string
  title: string
}

export type AllRouteAliases = RoutesFraudAlias | RoutesHubAlias
type RecordRoutes = Record<AllRouteAliases, string>

// todo ajustar esto
export function formatPath(path: string): string {
  const BASE_PATH = process.env.PUBLIC_URL ?? '/'
  const basePathEndsWithSlash = BASE_PATH.endsWith('/')
  const currentPath = basePathEndsWithSlash ? path : '/' + path
  return BASE_PATH + currentPath
}

export const APP_ROUTES_CONFIG = {
  ...APP_ROUTES_HUB,
  ...APP_ROUTES_FRAUD,
}

export const APP_ROUTES: Record<AllRouteAliases, string> = Object.keys(
  APP_ROUTES_CONFIG
).reduce<RecordRoutes>(
  (acc, key) => ({
    ...acc,
    [key]: APP_ROUTES_CONFIG[key as AllRouteAliases].path,
  }),
  {} as RecordRoutes
)

export const getRoutKeyByPath = (path: string): AllRouteAliases | undefined => {
  const route = Object.keys(APP_ROUTES_CONFIG).find(
    (key) => APP_ROUTES_CONFIG[key as AllRouteAliases].path === path
  )

  return route as AllRouteAliases
}

export function mapperRouts(routeCode: string) {
  if (!routeCode || !APP_ROUTES) return ''
  switch (routeCode) {
    // Hub
    case 'INSURANCE_PORTAL':
      return APP_ROUTES.INSURANCE_PORTAL
    case 'TERMS_AND_CONDITIONS':
      return APP_ROUTES.TERMS_AND_CONDITIONS
    case 'GENERAL_ERROR':
      return APP_ROUTES.GENERAL_ERROR
    case 'NOT_ACCOUNT':
      return APP_ROUTES.NOT_ACCOUNT
    case 'RETRY_ACCEPTANCE':
      return APP_ROUTES.RETRY_ACCEPTANCE
    case 'PREVIOUS':
      return APP_ROUTES.PREVIOUS
    case 'PREVIOUS_PRODUCT':
      return APP_ROUTES.PREVIOUS_PRODUCT
    case 'ALREADY_PRODUCT':
      return APP_ROUTES.ALREADY_PRODUCT
    case 'NOT_PRODUCT':
      return APP_ROUTES.NOT_PRODUCT
    case 'IN_PROGRESS':
      return APP_ROUTES.IN_PROGRESS

    // Fraud
    case 'PRODUCT_DETAIL':
      return APP_ROUTES.PRODUCT_DETAIL
    case 'PRODUCT':
      return APP_ROUTES.PRODUCT
    case 'ACCEPTANCE':
      return APP_ROUTES.ACCEPTANCE
    case 'SUCCESS':
      return APP_ROUTES.SUCCESS

    default:
      return ''
  }
}
