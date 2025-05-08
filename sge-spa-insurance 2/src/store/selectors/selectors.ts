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
export const selectorAccounts = createSelector(
  (store: RootState) => store.app.accounts,
  (accounts) => accounts
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

export const selectorHasOffer = createSelector(
  (store: RootState) => store.app.products[0]?.hasOffer,
  (hasOffer) => hasOffer
)

export const selectorCode = createSelector(
  (store: RootState) => store.app.products[0]?.code,
  (code) => code
)
//#endregion

//#region Flow
export const selectorKey = createSelector(
  (store: RootState) => store.flow.key,
  (key) => key
)

export const selectorTransactionReference = createSelector(
  (store: RootState) => store.flow.transactionReference,
  (transactionReference) => transactionReference
)

export const selectorAccountHashSelected = createSelector(
  (store: RootState) => store.flow.accountHashSelected,
  (accountHashSelected) => accountHashSelected
)

export const selectorPlanSelected = createSelector(
  (store: RootState) => store.flow.planSelected,
  (planSelected) => planSelected
)

export const selectorPeriodicitySelected = createSelector(
  (store: RootState) => store.flow.periodicitySelected,
  (periodicitySelected) => periodicitySelected
)

export const selectorStatus = createSelector(
  (store: RootState) => store.flow.status,
  (status) => status
)

export const selectorStep = createSelector(
  (store: RootState) => store.flow.step,
  (step) => step
)

export const selectorContentLoaded = createSelector(
  (store: RootState) => store.flow.contentLoaded,
  (contentLoaded) => contentLoaded
)
//#endregion