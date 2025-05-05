import { INSURANCE_PORTAL_NAME } from '@app/utils/constants'
import { RoutesHubAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

export const APP_ROUTES_CONFIG = Object.freeze<Record<RoutesHubAlias, RouteConfig>>({
  HOME: {
    key: RoutesHubAlias.INSURANCE_PORTAL,
    path: formatPath('home'),
    title: INSURANCE_PORTAL_NAME,
  },
  // Errors
  GENERAL_ERROR: {
    key: RoutesHubAlias.GENERAL_ERROR,
    path: formatPath('error'),
    title: INSURANCE_PORTAL_NAME,
  },
  NOT_ACCOUNT: {
    key: RoutesHubAlias.NOT_ACCOUNT,
    path: formatPath('cuenta-no-disponible'),
    title: INSURANCE_PORTAL_NAME,
  },

  // Additional
  RETRY_ACCEPTANCE: {
    key: RoutesHubAlias.RETRY_ACCEPTANCE,
    path: formatPath('reintentar-aceptacion'),
    title: INSURANCE_PORTAL_NAME,
  },
  PREVIOUS: {
    key: RoutesHubAlias.PREVIOUS,
    path: formatPath('posventa-otros-canales'),
    title: INSURANCE_PORTAL_NAME,
  },
  PREVIOUS_PRODUCT: {
    key: RoutesHubAlias.PREVIOUS_PRODUCT,
    path: formatPath('posventa'),
    title: INSURANCE_PORTAL_NAME,
  },
  ALREADY_PRODUCT: {
    key: RoutesHubAlias.ALREADY_PRODUCT,
    path: formatPath('no-cumple-regla-negocio'),
    title: INSURANCE_PORTAL_NAME,
  },
  NOT_PRODUCT: {
    key: RoutesHubAlias.NOT_PRODUCT,
    path: formatPath('producto-no-disponible'),
    title: INSURANCE_PORTAL_NAME,
  },
  IN_PROGRESS: {
    key: RoutesHubAlias.IN_PROGRESS,
    path: formatPath('en-progreso'),
    title: INSURANCE_PORTAL_NAME,
  },
})
