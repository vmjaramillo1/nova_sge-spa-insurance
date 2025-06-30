import { OfferableProduct } from '../interfaces/offerable-product.interface'
import { reduceOffer } from './reduce'
import { type ReducedPortal } from './portal-reduce-utils'

import { type AppState } from '@app/store/reducers/app-slice/app-slice.interface'

import { reduceAccounts } from '@app/utils/reduce'
import { ACCOUNT_TYPES, PAYMENT_METHODS } from '@app/utils/constants'

import { AccountRule } from '../interfaces/rule.interface'

export type OfferableWithType = OfferableProduct[]

export interface GetDefaultContextParams {
  offers: OfferableProduct[]
  paymentOptions: {
    accounts: {
      checking: Array<AccountRule>
      savings: Array<AccountRule>
    }
    cards: Array<AccountRule>
  }
}

type AppStateProductInfo<TPortal> = Omit<AppState<TPortal>, 'lopdp' | 'offer'>

export function getAppInfo<TContent = unknown, TParams = Record<string, unknown>>(
  params: GetDefaultContextParams
): AppStateProductInfo<ReducedPortal<TContent, TParams>> {
  const { offers, paymentOptions } = params

  const products = offers.reduce((acc, item) => {
    const offer = reduceOffer<TContent, TParams>(item)

    return {
      ...acc,
      [offer.code]: offer,
    }
  }, {})

  const accountInfo = {
    checking: reduceAccounts(
      paymentOptions.accounts.checking,
      ACCOUNT_TYPES.CHECKING_ACCOUNT
    ),
    savings: reduceAccounts(
      paymentOptions.accounts.savings,
      ACCOUNT_TYPES.SAVINGS_ACCOUNT
    ),
  }

  const paymentCards = reduceAccounts(paymentOptions.cards, PAYMENT_METHODS.CREDIT_CARD)

  return {
    products,
    paymentOptions: {
      accounts: { ...accountInfo.checking, ...accountInfo.savings },
      cards: paymentCards,
    },
  }
}
