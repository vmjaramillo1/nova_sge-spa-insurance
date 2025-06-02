import { type RouteObject } from 'react-router-dom'
import { APP_ROUTES_CONFIG } from './config'
import Page from '@app/components/molecules/page'

import { ProductDetailPageFallback } from '@app/components/pages/shared/product-detail-page'
import TermsAndConditionPage from '@app/components/pages/hub/terms-and-condition-page'
import { TermsAndConditionPageFallback } from '@app/components/pages/hub/terms-and-condition-page'
import NotAccountPage from '@app/components/pages/not-account-page'
import PreviousProduct from '@app/components/pages/previous-product-page'
import ErrorPage from '@app/components/pages/error-page'
import AlreadyPage from '@app/components/pages/already-page'
import NotProductPage from '@app/components/pages/not-product-page'
import RetryAcceptancePage from '@app/components/pages/retry-acceptance-page'
import PreviousPage from '@app/components/pages/previous-page'
import InProgressPage from '@app/components/pages/in-progress-page'
import InsurancePage from '@app/components/pages/hub/insurance-page'

const HubRoutes: Array<RouteObject> = [
  {
    path: APP_ROUTES_CONFIG.INSURANCE_PORTAL.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.INSURANCE_PORTAL.title}
        fallback={<ProductDetailPageFallback />}
      >
        <InsurancePage />
      </Page>
    ),
  },

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
  {
    path: APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <PreviousProduct />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.ALREADY_PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.ALREADY_PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <AlreadyPage />
      </Page>
    ),
  },
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
    path: APP_ROUTES_CONFIG.PREVIOUS.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PREVIOUS.title}
        fallback={<ProductDetailPageFallback />}
      >
        <PreviousPage />
      </Page>
    ),
  },
  {
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
    path: APP_ROUTES_CONFIG.GENERAL_ERROR.path,
    element: <ErrorPage />,
  },
]

export default HubRoutes
