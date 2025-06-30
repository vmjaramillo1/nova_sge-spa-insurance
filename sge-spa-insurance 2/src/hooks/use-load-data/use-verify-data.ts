import {
  ValidateOfferResponse,
  FindOfferResponse,
} from '@app/services/insurance/insurance.service.interface'
import { ResponseError } from '@app/utils/classes'
import { ErrorCode } from '@app/utils/enums'
import { ZERO } from '@app/utils/constants'
import { isSuccessResponse } from '@app/utils/guards'

const useVerifyData = () => {
  const verifyValidateOffer = (validateResult: ValidateOfferResponse) => {
    if (!isSuccessResponse(validateResult)) {
      throw new ResponseError(validateResult)
    }

    if (
      validateResult.value.previousProducts.length === ZERO &&
      validateResult.value.offerableProducts.length === ZERO
    ) {
      throw new ResponseError({
        code: ErrorCode.NOT_OFFERABLE_NOT_PREVIOUS,
        message: 'No hay productos ofertables ni productos anteriores',
      })
    }
  }

  const verifyFindOffer = (offerResult: FindOfferResponse) => {
    if (offerResult.code === ErrorCode.TRANSACTION_IN_PROGRESS) {
      throw new ResponseError({
        code: ErrorCode.TRANSACTION_IN_PROGRESS,
        message: 'Transaction in progress',
      })
    }
  }

  return {
    verifyValidateOffer,
    verifyFindOffer,
  }
}

export default useVerifyData
