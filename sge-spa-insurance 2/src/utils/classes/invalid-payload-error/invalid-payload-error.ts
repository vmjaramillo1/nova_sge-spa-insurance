export class InvalidBodyError extends Error {
  _code: string
  _message: string

  constructor(message: string) {
    super(message)
    this._code = 'INVALID_BODY_ERROR'
    this._message = message
  }
}

export default InvalidBodyError
