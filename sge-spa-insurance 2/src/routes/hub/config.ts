import {
  INSURANCE_PORTAL_NAME,
  PREVIOUS_PORTAL_NAME,
  TERMS_AND_CONDITIONS_NAME,
} from '@app/utils/constants'
import { RoutesHubAlias } from '@app/utils/enums'
import { RouteConfig, formatPath } from '@app/routes/config'

export const APP_ROUTES_CONFIG = Object.freeze<Record<RoutesHubAlias, RouteConfig>>({
  INSURANCE_PORTAL: {
    key: RoutesHubAlias.INSURANCE_PORTAL,
    path: formatPath('seguros'),
    title: INSURANCE_PORTAL_NAME,
  },

  TERMS_AND_CONDITIONS: {
    key: RoutesHubAlias.TERMS_AND_CONDITIONS,
    path: formatPath('terminos'), // todo validar
    title: TERMS_AND_CONDITIONS_NAME,
  },

  PREVIOUS_PRODUCT: {
    key: RoutesHubAlias.PREVIOUS_PRODUCT,
    path: formatPath('posventa'),
    title: PREVIOUS_PORTAL_NAME,
  },
  PREVIOUS_PRODUCT_DETAIL: {
    key: RoutesHubAlias.PREVIOUS_PRODUCT_DETAIL,
    path: formatPath('posventa-detalle'),
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
  NOT_CLIENT_INFORMATION: {
    key: RoutesHubAlias.NOT_CLIENT_INFORMATION,
    path: formatPath('no-cliente'),
    title: INSURANCE_PORTAL_NAME,
  },
  FAILED_OFFERABLE_DATA: {
    key: RoutesHubAlias.FAILED_OFFERABLE_DATA,
    path: formatPath('no-oferta'),
    title: INSURANCE_PORTAL_NAME,
  },

  // Additional
  RETRY_ACCEPTANCE: {
    key: RoutesHubAlias.RETRY_ACCEPTANCE,
    path: formatPath('reintentar-aceptacion'),
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
