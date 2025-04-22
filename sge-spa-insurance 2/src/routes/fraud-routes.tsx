import { APP_ROUTES_CONFIG } from './config'

import Page from '@app/components/molecules/page'

import ProductDetail, {
  ProductDetailPageFallback,
} from '@app/components/pages/product-detail-page'
import AcceptancePage from '@app/components/pages/acceptance-page'
import NotAccountPage from '@app/components/pages/not-account-page'
import ProductPage from '@app/components/pages/product-page'
import SelectAccountPage from '@app/components/pages/select-account-page'
import SuccessPage from '@app/components/pages/success-page'
import PreviousProduct from '@app/components/pages/previous-product-page'
import ErrorPage from '@app/components/pages/error-page'
import AlreadyPage from '@app/components/pages/already-page'
import NotProductPage from '@app/components/pages/not-product-page'
import RetryAcceptancePage from '@app/components/pages/retry-acceptance-page'
import PreviousPage from '@app/components/pages/previous-page'
import InProgressPage from '@app/components/pages/in-progress-page'
import { type RouteObject } from 'react-router-dom'

const FraudRoutes: Array<RouteObject> = [
  {
    path: APP_ROUTES_CONFIG.PRODUCT_DETAIL.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PRODUCT_DETAIL.title}
        fallback={<ProductDetailPageFallback />}
      >
        <ProductDetail />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.PRODUCT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PRODUCT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <ProductPage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.SELECT_ACCOUNT.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.SELECT_ACCOUNT.title}
        fallback={<ProductDetailPageFallback />}
      >
        <SelectAccountPage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.ACCEPTANCE.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.ACCEPTANCE.title}
        fallback={<ProductDetailPageFallback />}
      >
        <AcceptancePage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.SUCCESS.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.ACCEPTANCE.title}
        fallback={<ProductDetailPageFallback />}
      >
        <AcceptancePage />
      </Page>
    ),
  },
  {
    path: APP_ROUTES_CONFIG.SUCCESS.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.SUCCESS.title}
        fallback={<ProductDetailPageFallback />}
      >
        <SuccessPage />
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
    path: APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.key,
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

export default FraudRoutes
