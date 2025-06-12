import { ACCOUNT_FORMATS } from '@app/utils'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorAccounts,
  selectorAccountHashSelected,
} from '@app/store/selectors/selectors'

const useCurrentAccount = () => {
  const accounts = useAppSelector(selectorAccounts)
  const allAccounts = {
    ...accounts.accounts,
    ...accounts.cards,
  }

  const hashAccountList = Object.keys(allAccounts)
  const accountHashSelected = useAppSelector(selectorAccountHashSelected)

  if (hashAccountList.length === 0) return null

  const value = allAccounts[accountHashSelected]

  if (!value) return null

  const format = ACCOUNT_FORMATS[value.paymentType]

  return {
    description: value.mask,
    alias: value.alias,
    label: value.alias ?? format.label,
    accountHash: value.hash,
    amount: value.balance,
    type: value.type,
    mask: value.mask,
    paymentType: value.paymentType,
  }
}

export default useCurrentAccount
