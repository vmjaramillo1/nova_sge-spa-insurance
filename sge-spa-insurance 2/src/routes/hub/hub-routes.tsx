import { type RouteObject } from 'react-router-dom'
import { APP_ROUTES_CONFIG } from './config'
import Page from '@app/components/molecules/page'

import { ProductDetailPageFallback } from '@app/components/pages/shared/product-detail-page'
import { PreviousProductPageFallback } from '@app/components/pages/hub/previous-product-page'
import TermsAndConditionPage from '@app/components/pages/hub/terms-and-condition-page'
import { TermsAndConditionPageFallback } from '@app/components/pages/hub/terms-and-condition-page'
import NotAccountPage from '@app/components/pages/shared/not-account-page'
import PreviousProductDetailPage from '@app/components/pages/hub/previous-product-detail-page'
import ErrorPage from '@app/components/pages/shared/error-page'
import NotBusinessRulePage from '@app/components/pages/shared/not-business-rule-page'
import NotProductPage from '@app/components/pages/shared/not-product-page'
import RetryAcceptancePage from '@app/components/pages/shared/retry-acceptance-page'
import PreviousProductPage from '@app/components/pages/hub/previous-product-page'
import InProgressPage from '@app/components/pages/shared/in-progress-page'
import InsurancePage from '@app/components/pages/hub/insurance-page'
import InsurancePageFallback from '@app/components/pages/hub/insurance-page/insurance-page-fallback'
import NotClientPage from '@app/components/pages/shared/not-client-page'
import NotOfferPage from '@app/components/pages/shared/not-offer-page'

const HubRoutes: Array<RouteObject> = [
  // Home de hub
  {
    path: APP_ROUTES_CONFIG.INSURANCE_PORTAL.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.INSURANCE_PORTAL.title}
        fallback={<InsurancePageFallback />}
      >
        <InsurancePage />
      </Page>
    ),
  },
  // Terminos y condiciones
  {
    path: APP_ROUTES_CONFIG.TERMS_AND_CONDITIONS.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.TERMS_AND_CONDITIONS.title}
        fallback={<TermsAndConditionPageFallback />}
      >
        <TermsAndConditionPage />
      </Page>
    ),
  },
  // No cuenta
  {
    path: APP_ROUTES_CONFIG.NOT_ACCOUNT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.NOT_ACCOUNT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <NotAccountPage />
      </Page>
    ),
  },
  // Sin productos ofertables
  {
    path: APP_ROUTES_CONFIG.ALREADY_PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.ALREADY_PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <NotBusinessRulePage />
      </Page>
    ),
  },
  // no producto // todo validar
  {
    path: APP_ROUTES_CONFIG.NOT_PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.NOT_PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <NotProductPage />
      </Page>
    ),
  },
  // re intento - OTP
  {
    path: APP_ROUTES_CONFIG.RETRY_ACCEPTANCE.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.RETRY_ACCEPTANCE.title}
        fallback={<ProductDetailPageFallback />}
      >
        <RetryAcceptancePage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <PreviousProductPage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.PREVIOUS_PRODUCT_DETAIL.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT_DETAIL.title}
        fallback={<PreviousProductPageFallback />}
      >
        <PreviousProductDetailPage />
      </Page>
    ),
  },

  {
    // transaccion en progreso
    path: APP_ROUTES_CONFIG.IN_PROGRESS.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.IN_PROGRESS.title}
        fallback={<ProductDetailPageFallback />}
      >
        <InProgressPage />
      </Page>
    ),
  },
  {
    // sin informacion de cliente
    path: APP_ROUTES_CONFIG.NOT_CLIENT_INFORMATION.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.NOT_CLIENT_INFORMATION.title}
        fallback={<ProductDetailPageFallback />}
      >
        <NotClientPage />
      </Page>
    ),
  },

  {
    // sin informacion de oferta
    path: APP_ROUTES_CONFIG.FAILED_OFFERABLE_DATA.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.FAILED_OFFERABLE_DATA.title}
        fallback={<ProductDetailPageFallback />}
      >
        <NotOfferPage />
      </Page>
    ),
  },
  {
    // error
    path: APP_ROUTES_CONFIG.GENERAL_ERROR.path,
    element: <ErrorPage />,
  },
]

export default HubRoutes
