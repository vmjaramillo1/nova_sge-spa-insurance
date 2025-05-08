import { OfferableProduct } from '../interfaces/offerable-product.interface'
import { reduceOffer } from './reduce'
import { type ReducedPortal } from './portal-reduce-utils'

import { type AppState } from '@app/store/reducers/app-slice/app-slice.interface'

import { MergeOfferablePreviousType } from '../enums/merge-offerable-previous-type'
import { reduceAccounts } from '@app/utils/reduce'

import { AccountRule } from '../interfaces/rule.interface'

export interface OfferableWithType extends OfferableProduct {
  type: MergeOfferablePreviousType
}

export interface GetDefaultContextParams {
  offers: Array<OfferableWithType>
  accounts: Array<AccountRule>
}

type AppStateProductInfo<TPortal> = Omit<AppState<TPortal>, 'lopdp'>

export function getAppInfo<TContent = unknown, TParams = Record<string, unknown>>(
  params: GetDefaultContextParams
): AppStateProductInfo<ReducedPortal<TContent, TParams>> {
  const { offers, accounts } = params

  const products = offers.reduce<any>((acc, item) => {
    const offer = reduceOffer<TContent, TParams>(item)

    return {
      ...acc,
      [offer.code]: offer,
    }
  }, {})

  const accountInfo = reduceAccounts(accounts)

  return {
    products,
    accounts: accountInfo,
  }

  // const { offerablePrevious } = params

  // const { product, plans, paymentPeriodicityOptions, portal, insuranceName, sale } =
  //   offerablePrevious

  // const { code, name, coverages, benefits, assistances, exclusions } =
  //   mapperProduct(product)

  // const coveragesById = reduceGeneric(product.coverages, 'id')

  // const paymentMethodOptions = reducePaymentMethodsOptions(
  //   offerablePrevious.paymentMethodOptions
  // )

  // const plansResult = reducePlans(
  //   plans,
  //   coveragesById,
  //   paymentMethodOptions,
  //   paymentPeriodicityOptions
  // )

  // const portalResult = reducePortal<TContent, TParams>(portal)

  // return {
  //   code,
  //   name,
  //   sale,
  //   coverages,
  //   benefits,
  //   assistances,
  //   exclusions,
  //   insuranceName,
  //   plans: plansResult,
  //   portal: portalResult,
  // }
}
