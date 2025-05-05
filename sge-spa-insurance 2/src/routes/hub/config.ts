import { HUB_NAME } from '@app/utils/constants'
import { RoutesHubAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

export const APP_ROUTES_CONFIG = Object.freeze<Record<RoutesHubAlias, RouteConfig>>({
  HOME: {
    key: RoutesHubAlias.HUB_NAME,
    path: formatPath('home'),
    title: HUB_NAME,
  },
  // Errors
  GENERAL_ERROR: {
    key: RoutesHubAlias.GENERAL_ERROR,
    path: formatPath('error'),
    title: HUB_NAME,
  },
  NOT_ACCOUNT: {
    key: RoutesHubAlias.NOT_ACCOUNT,
    path: formatPath('cuenta-no-disponible'),
    title: HUB_NAME,
  },

  // Additional
  RETRY_ACCEPTANCE: {
    key: RoutesHubAlias.RETRY_ACCEPTANCE,
    path: formatPath('reintentar-aceptacion'),
    title: HUB_NAME,
  },
  PREVIOUS: {
    key: RoutesHubAlias.PREVIOUS,
    path: formatPath('posventa-otros-canales'),
    title: HUB_NAME,
  },
  PREVIOUS_PRODUCT: {
    key: RoutesHubAlias.PREVIOUS_PRODUCT,
    path: formatPath('posventa'),
    title: HUB_NAME,
  },
  ALREADY_PRODUCT: {
    key: RoutesHubAlias.ALREADY_PRODUCT,
    path: formatPath('no-cumple-regla-negocio'),
    title: HUB_NAME,
  },
  NOT_PRODUCT: {
    key: RoutesHubAlias.NOT_PRODUCT,
    path: formatPath('producto-no-disponible'),
    title: HUB_NAME,
  },
  IN_PROGRESS: {
    key: RoutesHubAlias.IN_PROGRESS,
    path: formatPath('en-progreso'),
    title: HUB_NAME,
  },
})
