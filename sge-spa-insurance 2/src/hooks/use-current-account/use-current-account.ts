import { ACCOUNT_FORMATS } from '@app/utils'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorAccounts,
  selectorAccountHashSelected,
} from '@app/store/selectors/selectors'

const useCurrentAccount = () => {
  const accounts = useAppSelector(selectorAccounts)
  const hashAccountList = Object.keys(accounts)
  const accountHashSelected = useAppSelector(selectorAccountHashSelected)

  if (hashAccountList.length === 0) return null

  const value = accounts[accountHashSelected]

  if (!value) return null

  const format = ACCOUNT_FORMATS[value.type]

  return {
    description: value.mask,
    alias: value.alias,
    label: value.alias ?? format.label,
    accountHash: value.hash,
    amount: value.balance,
    type: value.type,
    value: value.value,
    mask: value.mask,
  }
}

export default useCurrentAccount
