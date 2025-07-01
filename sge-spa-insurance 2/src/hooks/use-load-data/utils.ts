import { AppAccounts } from '@app/store/reducers/app-slice/app-slice.interface'

export function getFavoriteAccountHash(appAccounts: AppAccounts): string {
  const allAccounts = [
    ...Object.values(appAccounts.accounts),
    ...Object.values(appAccounts.cards),
  ]

  const favoriteAccount = allAccounts.find((account) => account.favorite)

  return favoriteAccount?.hash ?? allAccounts[0]?.hash ?? ''
}
