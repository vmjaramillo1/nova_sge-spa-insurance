import { FC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { APP_ROUTES_CONFIG, BASE_PATH } from './config'

import Page from '@app/components/molecules/page'
import Layout from '@app/components/molecules/layout'

import InsurancePage from '@app/components/pages/insurance-page'
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

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={BASE_PATH} element={<Layout />}>
        <Route
          key={APP_ROUTES_CONFIG.INSURANCE_PORTAL.key}
          path={APP_ROUTES_CONFIG.INSURANCE_PORTAL.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.INSURANCE_PORTAL.title}
              fallback={<ProductDetailPageFallback />}
            >
              <InsurancePage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.PRODUCT_DETAIL.key}
          path={APP_ROUTES_CONFIG.PRODUCT_DETAIL.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.PRODUCT_DETAIL.title}
              fallback={<ProductDetailPageFallback />}
            >
              <ProductDetail />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.PRODUCT.key}
          path={APP_ROUTES_CONFIG.PRODUCT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.PRODUCT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <ProductPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.SELECT_ACCOUNT.key}
          path={APP_ROUTES_CONFIG.SELECT_ACCOUNT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.SELECT_ACCOUNT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <SelectAccountPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.ACCEPTANCE.key}
          path={APP_ROUTES_CONFIG.ACCEPTANCE.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.ACCEPTANCE.title}
              fallback={<ProductDetailPageFallback />}
            >
              <AcceptancePage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.SUCCESS.key}
          path={APP_ROUTES_CONFIG.SUCCESS.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.SUCCESS.title}
              fallback={<ProductDetailPageFallback />}
            >
              <SuccessPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.NOT_ACCOUNT.key}
          path={APP_ROUTES_CONFIG.NOT_ACCOUNT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.NOT_ACCOUNT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <NotAccountPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.key}
          path={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <PreviousProduct />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.ALREADY_PRODUCT.key}
          path={APP_ROUTES_CONFIG.ALREADY_PRODUCT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.ALREADY_PRODUCT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <AlreadyPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.NOT_PRODUCT.key}
          path={APP_ROUTES_CONFIG.NOT_PRODUCT.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.NOT_PRODUCT.title}
              fallback={<ProductDetailPageFallback />}
            >
              <NotProductPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.RETRY_ACCEPTANCE.key}
          path={APP_ROUTES_CONFIG.RETRY_ACCEPTANCE.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.RETRY_ACCEPTANCE.title}
              fallback={<ProductDetailPageFallback />}
            >
              <RetryAcceptancePage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.PREVIOUS.key}
          path={APP_ROUTES_CONFIG.PREVIOUS.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.PREVIOUS.title}
              fallback={<ProductDetailPageFallback />}
            >
              <PreviousPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.IN_PROGRESS.key}
          path={APP_ROUTES_CONFIG.IN_PROGRESS.path}
          element={
            <Page
              title={APP_ROUTES_CONFIG.IN_PROGRESS.title}
              fallback={<ProductDetailPageFallback />}
            >
              <InProgressPage />
            </Page>
          }
        />
        <Route
          key={APP_ROUTES_CONFIG.GENERAL_ERROR.key}
          path={APP_ROUTES_CONFIG.GENERAL_ERROR.path}
          element={<ErrorPage />}
        />
      </Route>
    </Routes>
  )
}

export default memo(AppRoutes)
