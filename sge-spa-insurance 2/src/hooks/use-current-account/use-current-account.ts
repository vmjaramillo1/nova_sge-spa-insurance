import useFlow from '@app/context/flow-context/use-flow'
import useApp from '@app/context/app-context/use-app'

import { ACCOUNT_FORMATS } from '@app/utils'

const useCurrentAccount = () => {
  const { accounts } = useApp()

  const { accountHashSelected } = useFlow()

  if (accounts.length === 0) return null

  const value = accounts.find((account) => account.hash === accountHashSelected)

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
