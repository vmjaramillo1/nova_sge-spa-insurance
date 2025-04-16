import { ResponseWithError } from '../../interfaces'

export class ResponseError extends Error {
  _code: string
  _message: string

  constructor(response: ResponseWithError) {
    super(response.message)
    this._code = response.code
    this._message = response.message
  }
}

export default ResponseError
