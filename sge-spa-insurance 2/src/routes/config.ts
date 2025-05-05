import { RoutesFraudAlias, RoutesHubAlias } from '@app/utils/enums'
import { APP_ROUTES_CONFIG as APP_ROUTES_FRAUD } from './fraud'
import { APP_ROUTES_CONFIG as APP_ROUTES_HUB } from './hub'
// import { BASE_PATH } from '@app/utils/constants'

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
