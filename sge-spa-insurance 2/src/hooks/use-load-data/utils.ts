import { MergeOfferablePreviousType } from '@app/utils/enums'
import { AppAccounts } from '@app/store/reducers/app-slice/app-slice.interface'

type ItemWIthType = { type: MergeOfferablePreviousType }

// todo ajustar prueba
export function isOffer<T extends ItemWIthType>(item: T) {
  return item.type === MergeOfferablePreviousType.OFFER
}

export function getFavoriteAccountHash(appAccounts: AppAccounts): string {
  const allAccounts = [
    ...Object.values(appAccounts.accounts),
    ...Object.values(appAccounts.cards),
  ]

  const favoriteAccount = allAccounts.find((account) => account.favorite)

  return favoriteAccount?.hash ?? allAccounts[0]?.hash ?? ''
}
