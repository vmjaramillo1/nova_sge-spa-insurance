import useCurrentAccount from '@app/hooks/use-current-account'
import useIdentity from '@app/hooks/use-identity'

import { InvalidBodyError, ResponseError } from '@app/utils/classes'
import InsuranceService from '@app/services/insurance'
import { ACCEPTED_STATUS, isSuccessResponse } from '@app/utils'
import { customMessage, trackingConversion } from '@app/utils/messages'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorPlans,
  selectorCode,
  selectorKey,
  selectorTransactionReference,
  selectorPlanSelected,
  selectorPeriodicitySelected,
} from '@app/store/selectors/selectors'

const useAcceptance = () => {
  const productCode = useAppSelector(selectorCode)
  const plans = useAppSelector(selectorPlans)

  const key = useAppSelector(selectorKey)
  const transactionReference = useAppSelector(selectorTransactionReference)
  const planSelected = useAppSelector(selectorPlanSelected)
  const periodicitySelected = useAppSelector(selectorPeriodicitySelected)

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
