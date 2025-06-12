import useCurrentAccount from '@app/hooks/use-current-account'
import useIdentity from '@app/hooks/use-identity'

import { InvalidBodyError, ResponseError } from '@app/utils/classes'
import InsuranceService from '@app/services/insurance'
import { ACCEPTED_STATUS, isSuccessResponse } from '@app/utils'
import { customMessage, trackingConversion } from '@app/utils/messages'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorKey,
  selectorTransactionReference,
  selectorPlanSelected,
  selectorPeriodicitySelected,
} from '@app/store/selectors/selectors'
import {
  type PortalType,
  useGenericProductByCodeSelector,
} from '@app/store/hooks/use-generic-portal-selector'

import { selectorProductCode } from '@app/store/selectors/selectors'

const useAcceptance = () => {
  const productCode = useAppSelector(selectorProductCode)
  const [, productData] = useGenericProductByCodeSelector(productCode as PortalType)

  const plans = productData?.plans

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

    const { type: accountType, accountHash: accountValue } = currentAccount
    const { cif, dni, dniType } = identity
    const [paymentMethodCode] = Object.keys(plans[planSelected].paymentMethodOptions)

    const method = plans[planSelected].paymentMethodOptions[paymentMethodCode]
    const periodicity = plans[planSelected].periodicityOptions[periodicitySelected]

    const response = await InsuranceService.processTransaction({
      key,
      transactionReference,
      acceptanceReference,
      accountType,
      accountValue, // todo asjutar aqui antes se vnaia el valuer pero ya no existe
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

    // todo emitir evento de tracking de MOENGAGE

    return response
  }
}

export default useAcceptance
