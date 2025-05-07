import { OfferableProduct } from '../interfaces/offerable-product.interface'
import { type ReducedPortal, reducePortal } from './portal-reduce-utils'
import {
  mapperProduct,
  reduceGeneric,
  reducePaymentMethodsOptions,
  reducePlans,
} from './reduce'
import { AppState } from '@app/context/app-context'
import { MergeOfferablePreviousType } from '../enums/merge-offerable-previous-type'

export interface OfferableWithType extends OfferableProduct {
  type: MergeOfferablePreviousType
}

export interface GetDefaultContextParams {
  offerablePrevious: OfferableWithType
}

type AppStateProductInfo<TPortal> = Omit<
  AppState<TPortal>,
  'accounts' | 'lopdp' | 'hasOffer'
>

export function getAppInfo<TContent = unknown, TParams = Record<string, unknown>>(
  params: GetDefaultContextParams
): AppStateProductInfo<ReducedPortal<TContent, TParams>> {
  const { offerablePrevious } = params

  const { product, plans, paymentPeriodicityOptions, portal, insuranceName, sale } =
    offerablePrevious

  const { code, name, coverages, benefits, assistances, exclusions } =
    mapperProduct(product)

  const coveragesById = reduceGeneric(product.coverages, 'id')

  const paymentMethodOptions = reducePaymentMethodsOptions(
    offerablePrevious.paymentMethodOptions
  )

  const plansResult = reducePlans(
    plans,
    coveragesById,
    paymentMethodOptions,
    paymentPeriodicityOptions
  )

  const portalResult = reducePortal<TContent, TParams>(portal)

  return {
    code,
    name,
    sale,
    coverages,
    benefits,
    assistances,
    exclusions,
    insuranceName,
    plans: plansResult,
    portal: portalResult,
  }
}
