import { APP_ROUTES_CONFIG } from './config'

import Page from '@app/components/molecules/page'

import ProductDetail, {
  ProductDetailPageFallback,
} from '@app/components/pages/shared/product-detail-page'
import AcceptancePage from '@app/components/pages/shared/acceptance-page'
import ProductPage from '@app/components/pages/shared/product-page'
import SuccessPage from '@app/components/pages/shared/success-page'
import { type RouteObject } from 'react-router-dom'
import PlanSelection from '@app/components/pages/shared/plan-selection-page'

const FraudRoutes: Array<RouteObject> = [
  // PLAN_SELECTION
  {
    path: APP_ROUTES_CONFIG.PLAN_SELECTION.path,
    element: (
      <Page
        title={APP_ROUTES_CONFIG.PLAN_SELECTION.title}
        fallback={<ProductDetailPageFallback />}
      >
        <PlanSelection />
      </Page>
    ),
  },
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
        title={APP_ROUTES_CONFIG.SUCCESS.title}
        fallback={<ProductDetailPageFallback />}
      >
        <SuccessPage />
      </Page>
    ),
  },
]

export default FraudRoutes
