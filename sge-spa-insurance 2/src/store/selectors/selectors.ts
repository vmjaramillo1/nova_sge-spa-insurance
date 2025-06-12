import { createSelector } from '@reduxjs/toolkit'

import { type RootState } from '../store'

//#region Global
export const selectorError = createSelector(
  (store: RootState) => store.global.error,
  (error) => error
)

export const selectorAuthEvent = createSelector(
  (store: RootState) => store.global.security.authEvent,
  (authEvent) => authEvent
)

export const selectorPortalHub = createSelector(
  (store: RootState) => store.global.portalHub,
  (portalHub) => portalHub
)
//#endregion

//#region App

export const selectorOfferProducts = createSelector(
  (store: RootState) => store.app.offer,
  (offer) => offer
)

export const selectorProducts = createSelector(
  (store: RootState) => store.app.products,
  (products) => products
)

export const selectorAccounts = createSelector(
  (store: RootState) => store.app.paymentOptions,
  (paymentOptions) => paymentOptions
)

export const selectorPlans = createSelector(
  (store: RootState) => store.app.products[0]?.plans,
  (plans) => plans
)

export const selectorSale = createSelector(
  (store: RootState) => store.app.products[0]?.sale,
  (sale) => sale
)

export const selectorPortal = createSelector(
  (store: RootState) => store.app.products[0]?.portal,
  (portal) => portal
)

export const selectorLopdp = createSelector(
  (store: RootState) => store.app.lopdp,
  (lopdp) => lopdp
)
//#endregion

//#region Flow
export const selectorProductCode = createSelector(
  (store: RootState) => store.flow.shared.productCode,
  (productCode) => productCode
)
export const selectorKey = createSelector(
  (store: RootState) => store.flow.shared.key,
  (key) => key
)

export const selectorTransactionReference = createSelector(
  (store: RootState) => store.flow.shared.transactionReference,
  (transactionReference) => transactionReference
)

export const selectorAccountHashSelected = createSelector(
  (store: RootState) => store.flow.shared.accountHashSelected,
  (accountHashSelected) => accountHashSelected
)

export const selectorPlanSelected = createSelector(
  (store: RootState) => store.flow.shared.planSelected,
  (planSelected) => planSelected
)

export const selectorPeriodicitySelected = createSelector(
  (store: RootState) => store.flow.shared.periodicitySelected,
  (periodicitySelected) => periodicitySelected
)

export const selectorStatus = createSelector(
  (store: RootState) => store.flow.shared.status,
  (status) => status
)

export const selectorStep = createSelector(
  (store: RootState) => store.flow.shared.step,
  (step) => step
)

export const selectorContentLoaded = createSelector(
  (store: RootState) => store.flow.shared.contentLoaded,
  (contentLoaded) => contentLoaded
)
//#endregion
