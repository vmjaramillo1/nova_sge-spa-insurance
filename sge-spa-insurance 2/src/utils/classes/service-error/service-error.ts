import { HttpStatusCode } from '@app/utils/enums'

export const serviceErrorCode = 'SERVICE_ERROR'

export class ServiceError extends Error {
  _code: string
  _status: HttpStatusCode
  _message: string

  constructor(message: string, status: HttpStatusCode) {
    super(message)
    this._code = serviceErrorCode
    this._message = message
    this._status = status
  }
}

export default ServiceError
