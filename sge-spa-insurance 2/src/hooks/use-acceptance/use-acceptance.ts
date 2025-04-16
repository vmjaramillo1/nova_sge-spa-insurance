import useApp from '@app/context/app-context/use-app'
import useFlow from '@app/context/flow-context/use-flow'

import useCurrentAccount from '@app/hooks/use-current-account'
import useIdentity from '@app/hooks/use-identity'

import { InvalidBodyError, ResponseError } from '@app/utils/classes'
import InsuranceService from '@app/services/insurance'
import { ACCEPTED_STATUS, isSuccessResponse } from '@app/utils'
import { customMessage, trackingConversion } from '@app/utils/messages'

const useAcceptance = () => {
  const { code: productCode, plans } = useApp()
  const { key, transactionReference, planSelected, periodicitySelected } = useFlow()
  const identity = useIdentity()

  const currentAccount = useCurrentAccount()

  return async (acceptanceReference: string) => {
    if (!key || !transactionReference || !currentAccount || !identity) {
      throw new InvalidBodyError(
        'Missing fields: [key or transactionReference or currentAccount or identity]'
      )
    }

    const { type: accountType, value: accountValue } = currentAccount
    const { cif, dni, dniType } = identity
    const [paymentMethodCode] = Object.keys(plans[planSelected].paymentMethodOptions)

    const method = plans[planSelected].paymentMethodOptions[paymentMethodCode]
    const periodicity = plans[planSelected].periodicityOptions[periodicitySelected]

    const response = await InsuranceService.processTransaction({
      key,
      transactionReference,
      acceptanceReference,
      accountType,
      accountValue,
      paymentMethodCode,
      paymentPeriodicityCode: periodicitySelected,
      planCode: planSelected,
      productCode,
      identity: { cif, dni, dniType },
    })

    if (!isSuccessResponse(response)) {
      throw new ResponseError(response)
    }

    if (response.value !== ACCEPTED_STATUS) {
      throw new ResponseError({
        code: 'REJECTED',
        message: 'Transaction rejected',
      })
    }

    customMessage()

    trackingConversion({
      subProduct: 'fraudes',
      value: periodicity?.totalPrice,
      aux: periodicity?.name?.toLowerCase(),
      aux2: method?.name?.toLowerCase(),
    })

    return response
  }
}

export default useAcceptance
