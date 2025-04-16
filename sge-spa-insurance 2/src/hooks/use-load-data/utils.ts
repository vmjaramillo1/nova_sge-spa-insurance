import { AccountInfo, MergeOfferPreviousList } from '@app/services/insurance'
import { OfferableWithType } from '@app/utils'
import { MergeOfferablePreviousType } from '@app/utils/enums'

type ItemWIthType = { type: MergeOfferablePreviousType }

export function isOffer<T extends ItemWIthType>(list: Array<T>) {
  return list.some((item) => item.type === MergeOfferablePreviousType.OFFER)
}

export function getFavoriteAccountHash(accounts: Array<AccountInfo>): string {
  const favoriteAccountByFlag = accounts.find((account) => account.favorite)
  if (favoriteAccountByFlag) return favoriteAccountByFlag.hash

  const [firstAccount] = accounts
  return firstAccount.hash
}

export function mergeOfferAndPrevious(
  data: MergeOfferPreviousList
): Array<OfferableWithType> {
  const result: Array<OfferableWithType> = []

  const offerableProducts = data.find(
    (item) => item.type === MergeOfferablePreviousType.OFFER
  )

  if (offerableProducts?.data) {
    const mappedOfferableProducts = offerableProducts.data.map((offerable) => ({
      ...offerable,
      type: offerableProducts.type,
    }))

    result.push(...mappedOfferableProducts)
  }

  const previousProducts = data.find(
    (item) => item.type === MergeOfferablePreviousType.PREVIOUS
  )

  if (previousProducts?.data) {
    const mappedPreviousProducts = previousProducts.data.map((previous) => ({
      ...previous,
      type: previousProducts.type,
    }))

    result.push(...mappedPreviousProducts)
  }

  return result
}
