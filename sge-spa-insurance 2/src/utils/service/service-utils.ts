import { AxiosResponse } from 'axios'

import { Response, ResponseWithError } from '@app/utils/interfaces'
import { HttpStatusCode } from '@app/utils/enums'
import { isSuccessResponse } from '@app/utils/guards'
import { EncryptError, ResponseError, ServiceError } from '@app/utils/classes'
import { formatPemKeys } from '@app/utils/common'
import { EncryptLibrary } from '@pichincha/encrypt-microsite'

export const encryptUtil = new EncryptLibrary()

encryptUtil.publicKey = formatPemKeys(
  process.env.REACT_APP_INSURANCE_PUBLIC_KEY!,
  'public'
)

const serviceErrors: Array<HttpStatusCode> = [
  HttpStatusCode.INTERNAL_SERVER_ERROR,
  HttpStatusCode.NOT_FOUND,
  HttpStatusCode.NOT_IMPLEMENTED,
  HttpStatusCode.METHOD_NOT_ALLOWED,
  HttpStatusCode.NOT_ACEPTABLE,
  HttpStatusCode.SERVICE_UNAVAILABLE,
  HttpStatusCode.BAD_GATEWAY,
]

export function validateResult<TResult>(result: AxiosResponse<Response<TResult>>) {
  if (serviceErrors.includes(result.status)) {
    throw new ServiceError('Service not available', result.status)
  }

  const { data: response } = result
  if (!isSuccessResponse(response)) {
    throw new ResponseError(response)
  }

  return response
}

export function encryptBody(body: unknown) {
  try {
    return encryptUtil.encrypt(JSON.stringify(body))
  } catch {
    throw new EncryptError("Can't encrypt payload")
  }
}

export const resolveError = (error: unknown): ResponseWithError => {
  if (error instanceof ServiceError) {
    return {
      code: error._code,
      message: error._message,
    }
  }

  if (error instanceof ResponseError) {
    return {
      code: error._code,
      message: error._message,
    }
  }

  if (error instanceof EncryptError) {
    return {
      code: error._code,
      message: error._message,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN',
      message: error.message,
    }
  }

  return {
    code: 'EXECUTION',
    message: JSON.stringify(error),
  }
}
